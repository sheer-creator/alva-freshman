/**
 * [INPUT]: AppShell, DropdownMenu, ReactECharts
 * [OUTPUT]: 组件库页（TabBar + DataFeed 卡片列表）
 * [POS]: 页面层 — Library
 */

import type { Page } from '@/app/App';
import { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import UserInfo from '@/app/components/UserInfo';
import { AppShell } from '@/app/components/shell/AppShell';
import { CHART_DOT_BG, AVATAR_COLOR_PALETTE } from '@/lib/chart-theme';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';

/* ========== Tab 组件 ========== */

function TabItem({ label, isActive, onClick }: { label: string; isActive?: boolean; onClick?: () => void }) {
  return (
    <div
      className={`flex items-center justify-center px-[16px] py-[6px] rounded-[4px] shrink-0 cursor-pointer transition-colors ${
        isActive ? 'bg-[rgba(73,163,166,0.2)]' : 'bg-[rgba(0,0,0,0.03)] hover:bg-[rgba(0,0,0,0.06)]'
      }`}
      onClick={onClick}
    >
      <p className={`font-['Delight',sans-serif] font-normal leading-[22px] text-[14px] tracking-[0.14px] ${
        isActive ? 'text-[rgba(0,0,0,0.9)]' : 'text-[rgba(0,0,0,0.7)]'
      }`}>
        {label}
      </p>
    </div>
  );
}

function TabBar({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
  return (
    <div className="flex gap-[12px] items-start justify-center w-full">
      <TabItem label="Universe"   isActive={activeTab === 'universe'}   onClick={() => onTabChange('universe')} />
      <TabItem label="Data Feeds" isActive={activeTab === 'dataFeeds'}  onClick={() => onTabChange('dataFeeds')} />
      <TabItem label="File"       isActive={activeTab === 'file'}       onClick={() => onTabChange('file')} />
    </div>
  );
}

/* ========== 真实数据（月频，2025-02 ~ 2026-02） ========== */

const SPY_DATA:    [string, number][] = [['2025-02',576],['2025-03',555],['2025-04',528],['2025-05',564],['2025-06',548],['2025-07',565],['2025-08',558],['2025-09',572],['2025-10',583],['2025-11',595],['2025-12',588],['2026-01',600],['2026-02',604]];
const BTC_DATA:    [string, number][] = [['2025-02',97000],['2025-03',86000],['2025-04',84000],['2025-05',103000],['2025-06',107000],['2025-07',117000],['2025-08',104000],['2025-09',95000],['2025-10',98000],['2025-11',88000],['2025-12',95000],['2026-01',109000],['2026-02',97000]];
const T2Y_DATA:    [string, number][] = [['2025-02',4.22],['2025-03',4.02],['2025-04',3.88],['2025-05',3.95],['2025-06',3.78],['2025-07',3.92],['2025-08',3.85],['2025-09',3.62],['2025-10',3.72],['2025-11',4.15],['2025-12',4.28],['2026-01',4.18],['2026-02',4.24]];
const T5Y_DATA:    [string, number][] = [['2025-02',4.15],['2025-03',3.95],['2025-04',3.82],['2025-05',3.98],['2025-06',3.68],['2025-07',3.88],['2025-08',3.82],['2025-09',3.55],['2025-10',3.65],['2025-11',4.12],['2025-12',4.22],['2026-01',4.12],['2026-02',4.18]];
const T10Y_DATA:   [string, number][] = [['2025-02',4.52],['2025-03',4.28],['2025-04',4.18],['2025-05',4.38],['2025-06',4.02],['2025-07',4.18],['2025-08',4.18],['2025-09',3.98],['2025-10',4.02],['2025-11',4.45],['2025-12',4.58],['2026-01',4.48],['2026-02',4.52]];
const GOLD_DATA:   [string, number][] = [['2025-02',2862],['2025-03',3102],['2025-04',3130],['2025-05',3220],['2025-06',3265],['2025-07',3380],['2025-08',3492],['2025-09',3625],['2025-10',2718],['2025-11',2624],['2025-12',2639],['2026-01',2745],['2026-02',2902]];
const OIL_DATA:    [string, number][] = [['2025-02',72],['2025-03',68],['2025-04',62],['2025-05',65],['2025-06',67],['2025-07',73],['2025-08',71],['2025-09',67],['2025-10',70],['2025-11',68],['2025-12',69],['2026-01',76],['2026-02',72]];
const EURUSD_DATA: [string, number][] = [['2025-02',1.038],['2025-03',1.082],['2025-04',1.132],['2025-05',1.126],['2025-06',1.135],['2025-07',1.172],['2025-08',1.108],['2025-09',1.094],['2025-10',1.082],['2025-11',1.053],['2025-12',1.043],['2026-01',1.030],['2026-02',1.042]];
const NASDAQ_DATA: [string, number][] = [['2025-02',19152],['2025-03',17754],['2025-04',16776],['2025-05',19113],['2025-06',19714],['2025-07',19918],['2025-08',19574],['2025-09',19791],['2025-10',19890],['2025-11',20776],['2025-12',19311],['2026-01',19627],['2026-02',19972]];
const VIX_DATA:    [string, number][] = [['2025-02',19],['2025-03',23],['2025-04',32],['2025-05',26],['2025-06',17],['2025-07',13],['2025-08',22],['2025-09',17],['2025-10',14],['2025-11',13],['2025-12',18],['2026-01',16],['2026-02',22]];
const ETH_DATA:    [string, number][] = [['2025-02',2727],['2025-03',2093],['2025-04',1815],['2025-05',2524],['2025-06',2521],['2025-07',3280],['2025-08',2469],['2025-09',2383],['2025-10',2626],['2025-11',3100],['2025-12',3360],['2026-01',3245],['2026-02',2794]];

/* ========== ECharts option 工厂 ========== */

const NO_AXES  = { show: false };
const MINI_GRID = { left: 0, right: 0, top: 2, bottom: 0 };

function mkLine(data: [string, number][], color: string, area = false): object {
  return {
    animation: false,
    tooltip: { show: false },
    legend:  { show: false },
    grid: MINI_GRID,
    xAxis: { type: 'category', data: data.map(d => d[0]), ...NO_AXES, boundaryGap: false },
    yAxis: { type: 'value', ...NO_AXES, scale: true },
    series: [{
      type: 'line',
      data: data.map(d => d[1]),
      smooth: 0.4,
      symbol: 'none',
      lineStyle: { width: 1, color },
      itemStyle: { color },
      ...(area ? {
        areaStyle: {
          color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{ offset: 0, color: color + '30' }, { offset: 1, color: color + '00' }] },
        },
      } : {}),
    }],
  };
}

function mkBar(data: [string, number][], color: string): object {
  return {
    animation: false,
    tooltip: { show: false },
    legend:  { show: false },
    grid: MINI_GRID,
    xAxis: { type: 'category', data: data.map(d => d[0]), ...NO_AXES, boundaryGap: true },
    yAxis: { type: 'value', ...NO_AXES, min: 0 },
    series: [{
      type: 'bar',
      data: data.map(d => d[1]),
      barMaxWidth: 12,
      itemStyle: { color, opacity: 0.8, borderRadius: [2, 2, 0, 0] },
    }],
  };
}

function mkMultiline(series: { data: [string, number][]; color: string }[]): object {
  return {
    animation: false,
    tooltip: { show: false },
    legend:  { show: false },
    grid: MINI_GRID,
    xAxis: { type: 'category', data: series[0].data.map(d => d[0]), ...NO_AXES, boundaryGap: false },
    yAxis: { type: 'value', ...NO_AXES, scale: true },
    series: series.map(s => ({
      type: 'line',
      data: s.data.map(d => d[1]),
      smooth: 0.35,
      symbol: 'none',
      lineStyle: { width: 1, color: s.color },
      itemStyle: { color: s.color },
    })),
  };
}

/* ========== Feed 数据 ========== */

interface FeedDef {
  creator: string;
  title: string;
  tag: string;
  tagColor: string;
  latestVal: string;
  delta: string;
  positive: boolean;
  createdAt: string;
  option: object;
}

const FEEDS: FeedDef[] = [
  { creator: 'Alex Chen',     title: 'S&P 500 Historical Data', tag: 'Equity Index',  tagColor: '#3D8BD1', latestVal: '$604',    delta: '+4.9% YTD',  positive: true,  createdAt: '2 days ago',  option: mkLine(SPY_DATA,    '#3D8BD1', true) },
  { creator: 'Sarah Johnson', title: 'Bitcoin Price Feed',       tag: 'Crypto',        tagColor: '#FF9800', latestVal: '$97K',    delta: '-11.0% MoM', positive: false, createdAt: '5 days ago',  option: mkLine(BTC_DATA,    '#FF9800') },
  { creator: 'Mike Zhang',    title: 'US Treasury Yields',       tag: 'Fixed Income',  tagColor: '#117A7D', latestVal: '4.52%',   delta: '10yr',       positive: false, createdAt: '1 week ago',  option: mkMultiline([{ data: T10Y_DATA, color: '#117A7D' }, { data: T5Y_DATA, color: '#77C9C2' }, { data: T2Y_DATA, color: '#A5C7C6' }]) },
  { creator: 'Emma Wilson',   title: 'Gold Spot Prices',         tag: 'Commodity',     tagColor: '#E6A91A', latestVal: '$2,902',  delta: '+5.7% MoM',  positive: true,  createdAt: '1 week ago',  option: mkLine(GOLD_DATA,   '#E6A91A') },
  { creator: 'David Lee',     title: 'Crude Oil Futures',        tag: 'Commodity',     tagColor: '#0D7498', latestVal: '$72',     delta: '-5.3% MoM',  positive: false, createdAt: '2 weeks ago', option: mkBar(OIL_DATA,     '#0D7498') },
  { creator: 'Lisa Brown',    title: 'EUR/USD Exchange Rate',    tag: 'Forex',         tagColor: '#40A544', latestVal: '1.042',   delta: '+1.2% MoM',  positive: true,  createdAt: '2 weeks ago', option: mkLine(EURUSD_DATA, '#40A544') },
  { creator: 'Tom Anderson',  title: 'NASDAQ Composite',         tag: 'Equity Index',  tagColor: '#5F75C9', latestVal: '19,972',  delta: '+1.8% MoM',  positive: true,  createdAt: '3 weeks ago', option: mkLine(NASDAQ_DATA, '#5F75C9', true) },
  { creator: 'Anna Martinez', title: 'VIX Volatility Index',     tag: 'Volatility',    tagColor: '#C76466', latestVal: '22.0',    delta: '+37.5% MoM', positive: false, createdAt: '3 weeks ago', option: mkLine(VIX_DATA,    '#C76466', true) },
  { creator: 'Chris Wang',    title: 'Ethereum Price Data',      tag: 'Crypto',        tagColor: '#A878DC', latestVal: '$2,794',  delta: '-13.9% MoM', positive: false, createdAt: '1 month ago', option: mkLine(ETH_DATA,    '#A878DC') },
];

/* ========== 子组件 ========== */

function CreatorAvatar({ name, size = 20 }: { name: string; size?: number }) {
  const initial = name.trim().charAt(0).toUpperCase();
  const color   = AVATAR_COLOR_PALETTE[[...name].reduce((s, c) => s + c.charCodeAt(0), 0) % AVATAR_COLOR_PALETTE.length];
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: size * 0.44, color: '#fff', lineHeight: 1, fontFamily: "'Delight', sans-serif" }}>
        {initial}
      </span>
    </div>
  );
}

function MoreIcon() {
  return (
    <svg className="block size-[14px]" fill="none" viewBox="0 0 16 16">
      <circle cx="8" cy="3"  r="1.4" fill="rgba(0,0,0,0.4)" />
      <circle cx="8" cy="8"  r="1.4" fill="rgba(0,0,0,0.4)" />
      <circle cx="8" cy="13" r="1.4" fill="rgba(0,0,0,0.4)" />
    </svg>
  );
}

function DataFeedCard({ feed }: { feed: FeedDef }) {
  return (
    <div
      className="bg-white relative flex flex-col rounded-[6px] overflow-hidden"
      style={{
        flex: '1 0 0',
        minWidth: 'calc(33.333% - 8px)',
        maxWidth: 'calc(33.333% - 8px)',
      }}
    >
      {/* 内容区 */}
      <div className="flex flex-col gap-[12px] p-[16px]">

        {/* 头部：创作者 + 更多菜单 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[6px] min-w-0">
            <CreatorAvatar name={feed.creator} size={18} />
            <p className="font-['Delight',sans-serif] font-normal text-[12px] text-[rgba(0,0,0,0.5)] leading-[18px] tracking-[0.12px] truncate">
              {feed.creator}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex cursor-pointer items-center justify-center hover:bg-[rgba(0,0,0,0.05)] rounded-[4px] p-[4px] transition-colors outline-none focus:bg-[rgba(0,0,0,0.08)] shrink-0"
                aria-label="更多操作"
              >
                <MoreIcon />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={4}
              className="w-44 min-w-[8rem] rounded-md border border-[rgba(0,0,0,0.12)] bg-white py-2 shadow-lg font-['Delight',sans-serif] text-sm text-[rgba(0,0,0,0.9)]"
              style={{ boxShadow: '0px 6px 20px 0px rgba(0,0,0,0.04)' }}
            >
              <DropdownMenuItem className="cursor-pointer rounded-sm px-4 py-1.5 focus:bg-[#fafafa] focus:text-[rgba(0,0,0,0.9)]" onSelect={() => {}}>
                Build With
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive" className="cursor-pointer rounded-sm px-4 py-1.5 text-[#e05357] focus:bg-[rgba(224,83,87,0.1)] focus:text-[#e05357]" onSelect={() => {}}>
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* 标题 + tag（同行） */}
        <div className="flex items-center gap-[8px] min-w-0">
          <p className="font-['Delight',sans-serif] font-normal text-[14px] text-[rgba(0,0,0,0.9)] leading-[22px] tracking-[0.14px] truncate flex-1 min-w-0">
            {feed.title}
          </p>
          <span
            className="font-['Delight',sans-serif] text-[10px] leading-[16px] tracking-[0.1px] px-[6px] rounded-[2px] shrink-0"
            style={{ background: feed.tagColor + '18', color: feed.tagColor }}
          >
            {feed.tag}
          </span>
        </div>

        {/* 图表区 — CHART_DOT_BG 点阵背景 */}
        <div
          className="relative w-full h-[110px] rounded-[6px] overflow-hidden"
          style={{ ...CHART_DOT_BG, padding: '8px' }}
        >
          <ReactECharts
            option={feed.option}
            style={{ width: '100%', height: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
          {/* Alva 水印 */}
          <div className="absolute bottom-[6px] left-[8px] font-['Delight',sans-serif] text-[11px] text-[rgba(0,0,0,1)] opacity-20 pointer-events-none select-none">
            Alva
          </div>
        </div>

        {/* 底部：最新数据 + 时间 */}
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-[6px]">
            <p className="font-['Delight',sans-serif] font-normal text-[16px] text-[rgba(0,0,0,0.9)] leading-[22px]">
              {feed.latestVal}
            </p>
            <p
              className="font-['Delight',sans-serif] text-[11px] leading-[18px] tracking-[0.11px]"
              style={{ color: feed.positive ? '#2a9b7d' : '#e05357' }}
            >
              {feed.delta}
            </p>
          </div>
          <p className="font-['Delight',sans-serif] text-[11px] text-[rgba(0,0,0,0.4)] leading-[18px] tracking-[0.11px]">
            {feed.createdAt}
          </p>
        </div>

      </div>

      {/* 边框 overlay */}
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

/* ========== 页面 ========== */

function LibraryContent({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
  return (
    <div className="flex flex-col gap-[20px] items-start max-w-[1200px] w-full">
      <TabBar activeTab={activeTab} onTabChange={onTabChange} />

      {activeTab === 'dataFeeds' && (
        <div className="flex flex-wrap gap-[12px] items-start w-full">
          {FEEDS.map((feed, i) => <DataFeedCard key={i} feed={feed} />)}
        </div>
      )}
      {activeTab === 'universe' && (
        <div className="flex items-center justify-center w-full h-[400px]">
          <p className="font-['Delight',sans-serif] text-[14px] text-[rgba(0,0,0,0.5)] tracking-[0.14px]">Universe content coming soon</p>
        </div>
      )}
      {activeTab === 'file' && (
        <div className="flex items-center justify-center w-full h-[400px]">
          <p className="font-['Delight',sans-serif] text-[14px] text-[rgba(0,0,0,0.5)] tracking-[0.14px]">File content coming soon</p>
        </div>
      )}
    </div>
  );
}

export default function Library({ onNavigate, onOpenSearch }: { onNavigate?: (page: Page) => void; onOpenSearch?: () => void }) {
  const [activeTab, setActiveTab] = useState('dataFeeds');
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);

  return (
    <>
      <AppShell
        activePage="library"
        onNavigate={onNavigate!}
        onOpenSearch={onOpenSearch}
        onUserMouseEnter={() => setIsUserInfoOpen(true)}
        onUserMouseLeave={() => setIsUserInfoOpen(false)}
      >
        <div className="flex flex-col items-center min-h-full">
          <div className="flex flex-col gap-[20px] items-center pb-[40px] pt-[28px] px-[28px] w-full">
            <LibraryContent activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        </div>
      </AppShell>

      {isUserInfoOpen && (
        <div
          className="fixed bottom-[56px] left-[8px] w-[320px] z-[9999]"
          onMouseEnter={() => setIsUserInfoOpen(true)}
          onMouseLeave={() => setIsUserInfoOpen(false)}
        >
          <UserInfo />
        </div>
      )}
    </>
  );
}
