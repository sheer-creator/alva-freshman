/**
 * [INPUT]: AppShell, PlaybookTopbar, Community 组件, ECharts
 * [OUTPUT]: Playbook Detail 社区功能 Demo 页面
 * [POS]: 页面层 — 展示 Agent's Take / Chart+KPI / Social / Technical / News
 *
 * 布局（8-column grid per Alva Design System）:
 *   Topbar: PlaybookTopbar (sticky)
 *   Row 1: Performance Chart (col-4) | Key Metrics (col-4)
 *   Section: Social Sentiment
 *   Row 2: Twitter Buzz (col-4) | Reddit Discussion (col-4)
 *   Section: Technical Analysis
 *   Row 3: MACD+RSI Chart (col-5) | Fear & Greed + Indicators (col-3)
 *   Section: News & Media
 *   Row 4: News Feed (col-5) | Podcasts (col-3)
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { AlvaWatermark } from '@/app/components/alva-ui-kit';
import { PlaybookTopbar } from '@/app/components/community/PlaybookTopbar';
import { DiscussionPanel } from '@/app/components/community/DiscussionPanel';
import { MOCK_ASSET } from '@/data/community-mock';
import ReactECharts from 'echarts-for-react';
import {
  CHART_DOT_BG, CHART_COLORS, FONT,
  tooltipConfig, tooltipFormatter, timeXAxisConfig, valueYAxisConfig,
  lineSeriesConfig, GRID_DEFAULT,
} from '@/lib/chart-theme';

/* ========== Grid Style Constants ========== */

/* ========== 通用 Section Title ========== */

function SectionTitle({ icon, title, sub }: { icon: string; title: string; sub?: string }) {
  return (
    <div className="inline-flex items-center gap-[12px]">
      <span className="text-[22px] leading-[1]">{icon}</span>
      <span className="text-[22px]" style={{ color: 'var(--text-n9)', fontWeight: 400, letterSpacing: 0.3 }}>{title}</span>
      {sub && (
        <span className="text-[11px] pl-[8px]" style={{ color: 'var(--text-n5)', borderLeft: '1px solid var(--line-l07)' }}>{sub}</span>
      )}
    </div>
  );
}

/* ========== Widget Title ========== */

function WTitle({ title, timestamp }: { title: string; timestamp?: string }) {
  return (
    <div className="flex items-center justify-between" style={{ height: 22 }}>
      <p className="text-[14px]" style={{ color: 'var(--text-n9)', letterSpacing: 0.14 }}>{title}</p>
      {timestamp && <span className="text-[12px]" style={{ color: 'var(--text-n5)' }}>{timestamp}</span>}
    </div>
  );
}

/* ========== Feed Card Shell ========== */

function FeedCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 relative flex flex-col" style={{ background: 'var(--grey-g01)', borderRadius: 4, overflow: 'hidden' }}>
      <div className="overflow-y-auto" style={{ flex: 1, padding: '4px 0' }}>
        {children}
      </div>
      <AlvaWatermark />
    </div>
  );
}

function FeedDivider({ isLast }: { isLast: boolean }) {
  if (isLast) return null;
  return <div className="absolute bottom-0 left-[16px] right-[16px] h-[1px]" style={{ background: 'var(--line-l05)' }} />;
}

/* ========== 价格走势 Chart (col-4) ========== */

function PerformanceChart() {
  const option = {
    tooltip: tooltipConfig({
      formatter: (params: { color: string; seriesName: string; data: [string, number] }[]) =>
        tooltipFormatter(params, '$', v => v.toLocaleString()),
    }),
    grid: GRID_DEFAULT,
    xAxis: timeXAxisConfig(),
    yAxis: valueYAxisConfig('Price ($)', {
      axisLabel: {
        color: 'rgba(0,0,0,0.7)', fontFamily: FONT, fontSize: 10,
        formatter: (v: number) => (v / 1000).toFixed(0) + 'K',
      },
    }),
    series: [
      lineSeriesConfig('BTC Price', CHART_COLORS.primary, {
        data: MOCK_ASSET.priceData,
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(73,163,166,0.15)' }, { offset: 1, color: 'rgba(73,163,166,0)' }] } },
      }),
    ],
  };

  return (
    <div style={{ flex: 1, minWidth: 0 }} className="flex flex-col gap-[16px]">
      <WTitle title="Performance" timestamp="Updated Mar 2026" />
      <div className="relative flex-1" style={{ ...CHART_DOT_BG, borderRadius: 4, padding: 16, minHeight: 180 }}>
        <ReactECharts option={option} style={{ height: '100%', minHeight: 180 }} />
        <AlvaWatermark />
      </div>
    </div>
  );
}

/* ========== KPI Card (col-4) ========== */

const KPI_ITEMS = [
  { label: 'Annualized Return', value: MOCK_ASSET.kpi.annualizedReturn, color: 'var(--main-m3)' },
  { label: 'Sharpe Ratio', value: MOCK_ASSET.kpi.sharpeRatio, color: 'var(--text-n9)' },
  { label: 'Max Drawdown', value: MOCK_ASSET.kpi.maxDrawdown, color: 'var(--main-m4)' },
  { label: 'Win Rate', value: MOCK_ASSET.kpi.winRate, color: 'var(--text-n9)' },
];

function KeyMetrics() {
  return (
    <div style={{ flex: 1, minWidth: 0 }} className="flex flex-col gap-[16px]">
      <WTitle title="Key Metrics" />
      <div className="flex-1 flex flex-wrap gap-[20px] content-start relative" style={{ background: 'var(--grey-g01)', borderRadius: 4, padding: 20 }}>
        {KPI_ITEMS.map(kpi => (
          <div key={kpi.label} style={{ minWidth: 120, flex: '1 1 auto' }}>
            <p className="text-[22px]" style={{ color: kpi.color, fontFamily: "'Delight', sans-serif", fontWeight: 400 }}>{kpi.value}</p>
            <p className="text-[12px] mt-[4px]" style={{ color: 'var(--text-n5)' }}>{kpi.label}</p>
          </div>
        ))}
        <AlvaWatermark />
      </div>
    </div>
  );
}

/* ========== Twitter Buzz (col-4, Feed Card) ========== */

function TwitterBuzz() {
  const tweets = MOCK_ASSET.twitterBuzz;
  return (
    <div style={{ flex: 1, minWidth: 0 }} className="flex flex-col gap-[16px]">
      <WTitle title="Twitter / X Buzz" timestamp="Live" />
      <FeedCard>
        {tweets.map((t, i) => (
          <div key={t.id} className="flex items-start gap-[8px] px-[16px] py-[12px] relative">
            <div className="shrink-0 w-[32px] h-[32px] rounded-full flex items-center justify-center text-[14px]" style={{ background: 'var(--main-m2-10)', color: 'var(--main-m2)' }}>
              𝕏
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-[8px]">
                <span className="text-[14px]" style={{ color: 'var(--text-n9)', fontWeight: 500 }}>{t.author}</span>
                <span className="text-[12px]" style={{ color: 'var(--text-n5)' }}>{t.time}</span>
              </div>
              <p className="text-[12px] mt-[4px]" style={{ color: 'var(--text-n7)', lineHeight: '20px' }}>{t.text}</p>
              <div className="flex items-center gap-[16px] mt-[6px]">
                <span className="text-[11px]" style={{ color: 'var(--text-n5)' }}>{t.likes.toLocaleString()} likes</span>
                <span className="text-[11px]" style={{ color: 'var(--text-n5)' }}>{t.retweets.toLocaleString()} retweets</span>
              </div>
            </div>
            <FeedDivider isLast={i === tweets.length - 1} />
          </div>
        ))}
      </FeedCard>
    </div>
  );
}

/* ========== Reddit Discussion (col-4, Feed Card) ========== */

const SENTIMENT_STYLE = {
  bullish: { color: 'var(--main-m3)', bg: 'var(--main-m3-10)' },
  bearish: { color: 'var(--main-m4)', bg: 'var(--main-m4-10)' },
  neutral: { color: 'var(--text-n5)', bg: 'var(--grey-g03)' },
} as const;

function RedditDiscussion() {
  const posts = MOCK_ASSET.redditDiscussion;
  return (
    <div style={{ flex: 1, minWidth: 0 }} className="flex flex-col gap-[16px]">
      <WTitle title="Reddit Discussion" timestamp="Live" />
      <FeedCard>
        {posts.map((p, i) => (
          <div key={p.id} className="flex items-start gap-[8px] px-[16px] py-[12px] relative">
            <div className="shrink-0 flex flex-col items-center justify-center w-[40px] py-[4px] rounded-[4px]" style={{ background: 'var(--grey-g03)' }}>
              <span className="text-[12px]" style={{ color: 'var(--text-n7)' }}>&#9650;</span>
              <span className="text-[12px]" style={{ color: 'var(--text-n9)', fontWeight: 500 }}>{p.upvotes >= 1000 ? (p.upvotes / 1000).toFixed(1) + 'k' : p.upvotes}</span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[11px]" style={{ color: 'var(--text-n5)' }}>{p.subreddit} · {p.time}</span>
              <p className="text-[14px] mt-[2px]" style={{ color: 'var(--text-n9)', lineHeight: '22px' }}>{p.title}</p>
              <div className="flex items-center gap-[12px] mt-[6px]">
                <span className="text-[11px]" style={{ color: 'var(--text-n5)' }}>{p.comments} comments</span>
                <span className="text-[11px] px-[6px] py-[1px] rounded-[2px]" style={{
                  color: SENTIMENT_STYLE[p.sentiment].color,
                  background: SENTIMENT_STYLE[p.sentiment].bg,
                }}>{p.sentiment}</span>
              </div>
            </div>
            <FeedDivider isLast={i === posts.length - 1} />
          </div>
        ))}
      </FeedCard>
    </div>
  );
}

/* ========== Technical Chart — RSI + MACD (col-5) ========== */

function TechnicalChart() {
  const ti = MOCK_ASSET.technicalIndicators;

  const option = {
    tooltip: tooltipConfig({
      formatter: (params: { color: string; seriesName: string; data: [string, number] }[]) =>
        tooltipFormatter(params, '', v => v.toLocaleString()),
    }),
    grid: [
      { left: 36, right: 0, top: 30, bottom: '55%', containLabel: false },
      { left: 36, right: 0, top: '55%', bottom: 20, containLabel: false },
    ],
    xAxis: [
      { ...timeXAxisConfig(), gridIndex: 0, axisLabel: { show: false } },
      { ...timeXAxisConfig(), gridIndex: 1 },
    ],
    yAxis: [
      valueYAxisConfig('RSI', { gridIndex: 0, min: 20, max: 80, axisLabel: { color: 'rgba(0,0,0,0.7)', fontFamily: FONT, fontSize: 10 } }),
      valueYAxisConfig('MACD', { gridIndex: 1, axisLabel: { color: 'rgba(0,0,0,0.7)', fontFamily: FONT, fontSize: 10, formatter: (v: number) => (v / 1000).toFixed(1) + 'K' } }),
    ],
    series: [
      lineSeriesConfig('RSI (14)', CHART_COLORS.primary, {
        data: ti.rsiData,
        xAxisIndex: 0,
        yAxisIndex: 0,
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(73,163,166,0.1)' }, { offset: 1, color: 'rgba(73,163,166,0)' }] } },
        markLine: {
          silent: true, symbol: 'none',
          data: [
            { yAxis: 30, lineStyle: { color: 'rgba(0,0,0,0.08)', type: [3, 2] as unknown as string, width: 1 }, label: { show: false } },
            { yAxis: 70, lineStyle: { color: 'rgba(0,0,0,0.08)', type: [3, 2] as unknown as string, width: 1 }, label: { show: false } },
          ],
          lineStyle: { color: 'rgba(0,0,0,0.08)', type: [3, 2] as unknown as string, width: 1 },
          label: { show: false },
        },
      }),
      lineSeriesConfig('MACD', CHART_COLORS.orange, {
        data: ti.macdData,
        xAxisIndex: 1,
        yAxisIndex: 1,
      }),
      lineSeriesConfig('Signal', CHART_COLORS.blue, {
        data: ti.macdSignalData,
        xAxisIndex: 1,
        yAxisIndex: 1,
      }),
    ],
  };

  return (
    <div style={{ flex: 5, minWidth: 0 }} className="flex flex-col gap-[16px]">
      <WTitle title="RSI & MACD" timestamp="6M" />
      <div className="relative flex-1" style={{ ...CHART_DOT_BG, borderRadius: 4, padding: 16, minHeight: 320 }}>
        <ReactECharts option={option} style={{ height: '100%', minHeight: 320 }} />
        <AlvaWatermark />
      </div>
    </div>
  );
}

/* ========== Fear & Greed + Indicator Summary (col-3) ========== */

function FearGreedAndIndicators() {
  const ti = MOCK_ASSET.technicalIndicators;
  const fgAngle = (ti.fearGreedIndex / 100) * 180;

  const STATUS_COLOR = {
    bullish: 'var(--main-m3)',
    bearish: 'var(--main-m4)',
    neutral: 'var(--text-n7)',
  } as const;

  return (
    <div style={{ flex: 3, minWidth: 0 }} className="flex flex-col gap-[16px]">
      <WTitle title="Indicators" />
      <div className="flex-1 flex flex-col relative" style={{ background: 'var(--grey-g01)', borderRadius: 4, padding: 20 }}>
        {/* Fear & Greed Gauge */}
        <div className="flex flex-col items-center mb-[16px]">
          <svg width="120" height="68" viewBox="0 0 120 68">
            <path d="M 10 60 A 50 50 0 0 1 110 60" fill="none" stroke="var(--grey-g1)" strokeWidth="8" strokeLinecap="round" />
            <defs>
              <linearGradient id="fg-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--main-m4)" />
                <stop offset="50%" stopColor="var(--main-m5)" />
                <stop offset="100%" stopColor="var(--main-m3)" />
              </linearGradient>
            </defs>
            <path d="M 10 60 A 50 50 0 0 1 110 60" fill="none" stroke="url(#fg-grad)" strokeWidth="8" strokeLinecap="round" />
            <line
              x1="60" y1="60"
              x2={60 + 38 * Math.cos(Math.PI - (fgAngle * Math.PI / 180))}
              y2={60 - 38 * Math.sin(Math.PI - (fgAngle * Math.PI / 180))}
              stroke="var(--text-n9)" strokeWidth="2" strokeLinecap="round"
            />
            <circle cx="60" cy="60" r="3" fill="var(--text-n9)" />
          </svg>
          <p className="text-[22px] mt-[4px]" style={{ color: 'var(--text-n9)', fontWeight: 400 }}>{ti.fearGreedIndex}</p>
          <p className="text-[12px]" style={{ color: 'var(--text-n5)' }}>Fear & Greed · {ti.fearGreedLabel}</p>
        </div>

        {/* Divider — 两端与 padding 对齐 */}
        <div className="h-[1px]" style={{ background: 'var(--line-l05)' }} />

        {/* Indicator List — 纵向排列，清晰对齐 */}
        <div className="flex flex-col mt-[12px]">
          {ti.indicators.map((ind, i) => (
            <div key={ind.label} className="flex items-center justify-between py-[8px] relative">
              <span className="text-[12px]" style={{ color: 'var(--text-n5)', lineHeight: '20px' }}>{ind.label}</span>
              <span className="text-[12px]" style={{ color: STATUS_COLOR[ind.status], fontWeight: 500, lineHeight: '20px' }}>{ind.value}</span>
              {i < ti.indicators.length - 1 && (
                <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: 'var(--line-l05)' }} />
              )}
            </div>
          ))}
        </div>
        <AlvaWatermark />
      </div>
    </div>
  );
}

/* ========== News Feed (col-5) ========== */

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  ETF: { bg: 'var(--main-m2-10)', text: 'var(--main-m2)' },
  Macro: { bg: 'var(--main-m5-10)', text: 'var(--main-m5)' },
  Product: { bg: 'var(--main-m1-10)', text: 'var(--main-m1)' },
  Regulation: { bg: 'var(--main-m6-10)', text: 'var(--main-m6)' },
  Mining: { bg: 'var(--main-m3-10)', text: 'var(--main-m3)' },
  Institutional: { bg: 'var(--chart-purple1-main)', text: '#fff' },
};

function NewsFeed() {
  const news = MOCK_ASSET.newsFeed;
  return (
    <div style={{ flex: 5, minWidth: 0 }} className="flex flex-col gap-[16px]">
      <WTitle title="News" timestamp="Today" />
      <FeedCard>
        {news.map((n, i) => (
          <div key={n.id} className="flex items-start gap-[8px] px-[16px] py-[12px] relative">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-[8px]">
                <span className="text-[12px]" style={{ color: 'var(--text-n5)', fontWeight: 500 }}>{n.source}</span>
                <span className="text-[11px]" style={{ color: 'var(--text-n3)' }}>{n.time}</span>
              </div>
              <p className="text-[14px] mt-[4px]" style={{ color: 'var(--text-n9)', lineHeight: '22px' }}>{n.title}</p>
              <span className="inline-block text-[11px] mt-[6px] px-[6px] py-[1px] rounded-[2px]" style={{
                background: TAG_COLORS[n.tag]?.bg || 'var(--grey-g03)',
                color: TAG_COLORS[n.tag]?.text || 'var(--text-n7)',
              }}>{n.tag}</span>
            </div>
            <FeedDivider isLast={i === news.length - 1} />
          </div>
        ))}
      </FeedCard>
    </div>
  );
}

/* ========== Podcast Feed (col-3) ========== */

function PodcastFeed() {
  const pods = MOCK_ASSET.podcastFeed;
  return (
    <div style={{ flex: 3, minWidth: 0 }} className="flex flex-col gap-[16px]">
      <WTitle title="Podcasts" timestamp="This Week" />
      <FeedCard>
        {pods.map((p, i) => (
          <div key={p.id} className="flex items-start gap-[12px] px-[16px] py-[12px] relative">
            <div className="shrink-0 w-[40px] h-[40px] rounded-[6px] flex items-center justify-center" style={{ background: 'var(--grey-g03)' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4.5 2.5L13 8L4.5 13.5V2.5Z" fill="var(--text-n5)" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-[8px]">
                <span className="text-[12px]" style={{ color: 'var(--main-m1)', fontWeight: 500 }}>{p.show}</span>
                <span className="text-[11px]" style={{ color: 'var(--text-n3)' }}>{p.date}</span>
              </div>
              <p className="text-[14px] mt-[2px]" style={{ color: 'var(--text-n9)', lineHeight: '22px' }}>{p.title}</p>
              <div className="flex items-center gap-[8px] mt-[4px]">
                <span className="text-[11px]" style={{ color: 'var(--text-n5)' }}>{p.host}</span>
                <span className="text-[11px]" style={{ color: 'var(--text-n3)' }}>{p.duration}</span>
              </div>
            </div>
            <FeedDivider isLast={i === pods.length - 1} />
          </div>
        ))}
      </FeedCard>
    </div>
  );
}

/* ========== 页面 ========== */

export function PlaybookDetail({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [discussionOpen, setDiscussionOpen] = useState(false);

  return (
    <AppShell activePage="playbook-detail" onNavigate={onNavigate}>
      <div className="flex h-full">
        {/* 主内容区 — 挤压式：flex-1 自动缩小 */}
        <div className="flex-1 min-w-0 overflow-y-auto">
          <div className="flex flex-col items-center min-h-full pb-[80px] rounded-[inherit]">
            <div className="content-stretch flex flex-col items-center px-[28px] relative w-full">
              <PlaybookTopbar
                title={MOCK_ASSET.name}
                stats={MOCK_ASSET.stats}
                signals={MOCK_ASSET.signals}
                lineage={MOCK_ASSET.lineage}
                comments={MOCK_ASSET.discussion}
                discussionOpen={discussionOpen}
                onToggleDiscussion={() => setDiscussionOpen(v => !v)}
                author={MOCK_ASSET.author}
                pulse={MOCK_ASSET.pulse}
                description={MOCK_ASSET.description}
                builtOn={MOCK_ASSET.builtOn}
                onAuthorClick={() => onNavigate('user-profile')}
              />

              {/* Widget 区域 — 每行 flex row 保证等高 */}
              <div className="flex flex-col gap-[24px] pb-[56px] w-full">

                {/* Row 1: Performance (1:1) + Key Metrics (1:1) */}
                <div className="flex gap-[24px]">
                  <PerformanceChart />
                  <KeyMetrics />
                </div>

                {/* Section: Social Sentiment */}
                <SectionTitle icon="💬" title="Social Sentiment" sub="Twitter · Reddit · Community Pulse" />

                {/* Row 2: Twitter (1:1) + Reddit (1:1) */}
                <div className="flex gap-[24px]">
                  <TwitterBuzz />
                  <RedditDiscussion />
                </div>

                {/* Section: Technical Analysis */}
                <SectionTitle icon="📊" title="Technical Analysis" sub="RSI · MACD · Fear & Greed" />

                {/* Row 3: Chart (5:3) + Indicators (5:3) */}
                <div className="flex gap-[24px]">
                  <TechnicalChart />
                  <FearGreedAndIndicators />
                </div>

                {/* Section: News & Media */}
                <SectionTitle icon="📰" title="News & Media" sub="Headlines · Podcasts · Analysis" />

                {/* Row 4: News (5:3) + Podcasts (5:3) */}
                <div className="flex gap-[24px]">
                  <NewsFeed />
                  <PodcastFeed />
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Discussion 右侧挤压式面板 */}
        <DiscussionPanel
          open={discussionOpen}
          onClose={() => setDiscussionOpen(false)}
          comments={MOCK_ASSET.discussion}
          agentTake={MOCK_ASSET.agentTake}
        />
      </div>
    </AppShell>
  );
}
