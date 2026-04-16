/**
 * [INPUT]: title / status / feeds / description / author
 * [OUTPUT]: Playbook Info 悬浮卡片 — 标题 + 运行信息 + Feed 表格 + 作者
 * [POS]: 社区组件 — PlaybookTopbar 左侧 hover 下拉内容 (按 Figma 6080:112803)
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { Avatar } from '@/app/components/shared/Avatar';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { FeedDetailModal } from './FeedDetailModal';
import type { FeedDetailModalProps } from './FeedDetailModal';

/* ========== 状态圆点 (green) ========== */

function StatusDot({ size = 12 }: { size?: number }) {
  return (
    <div className="flex items-center shrink-0" style={{ width: size, height: size }}>
      <div className="flex-1 h-full min-h-px min-w-px overflow-clip relative">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
          <svg className="block size-full" fill="none" viewBox="0 0 12 12">
            <circle cx="6" cy="6" fill="#DBEDED" r="6" />
          </svg>
        </div>
        <div className="absolute bottom-[28.6%] left-1/2 top-[28.6%] -translate-x-1/2">
          <svg className="block size-full" fill="none" viewBox="0 0 5.136 5.136">
            <circle cx="2.568" cy="2.568" fill="#49A3A6" r="2.568" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ========== 类型 ========== */

export interface PlaybookInfoFeed {
  name: string;
  interval: string;
  lastRun: string;
  /** 可选 — 点击该行时弹出的详情数据(按 Figma 6080:113219) */
  detail?: Omit<FeedDetailModalProps, 'open' | 'onClose' | 'feedName'>;
}

export interface PlaybookInfoPopupProps {
  title: string;
  intervalLabel?: string;
  runEvery?: string;
  description: string;
  feeds?: PlaybookInfoFeed[];
  authorName: string;
  /** 导航回调 — 传入时,Feed 表格底部显示 "View all feeds in Settings" 入口 */
  onNavigate?: (page: Page) => void;
}

/* ========== 默认 Feed 数据(Figma 原型,实际场景由外部传入) ========== */

const DEFAULT_FEEDS: PlaybookInfoFeed[] = [
  {
    name: 'Capacity-Monitor',
    interval: '5 minutes',
    lastRun: '15 minutes ago',
    detail: {
      lastRun: '15m',
      runEvery: 'Every 5 minutes',
      totalRuns: 142,
      description: `**Signal Generation**
Monitors BTC/USDT on the 1-hour timeframe using MACD(12, 26, 9). A bullish crossover (MACD line crossing above signal line) triggers a long entry; a bearish crossover triggers an exit. Only one position is held at a time. The histogram slope is used as a secondary filter — flat or declining histograms after a crossover are treated as low-confidence and may be skipped.

**Risk Management**
Each trade risks a maximum of 2% of portfolio equity. A trailing stop-loss is placed at 1.5× ATR(14) below the entry price and tightens as the position moves into profit. If the drawdown exceeds 5% from the local equity peak, the feed pauses new entries until the next confirmed crossover. Position sizing is dynamically adjusted based on 30-day realized volatility.

**Data Sources & Frequency**
Pulls 1-hour OHLCV candles from Binance and Coinbase every 60 seconds, cross-validates the close price, and recomputes the MACD histogram. Divergence between exchanges > 0.3% triggers a data-quality warning instead of a trade. Funding rate data from Binance Futures is also ingested to detect extreme sentiment.

**Multi-Timeframe Confirmation**
Before executing any entry, the feed checks the 4-hour and daily MACD alignment. A long signal on the 1-hour chart is only acted upon if the 4-hour MACD histogram is positive and the daily MACD line is above its signal line. This triple-timeframe filter reduces false signals by approximately 40% based on backtested data from Jan 2023 to Dec 2025.

**Output Signals**
Writes a JSON signal to ~/feeds/btc-macd/signal.json containing: direction (long / flat), entry price, stop-loss level, current P&L, and a confidence score (0–1) derived from histogram momentum. Each signal includes a human-readable rationale string summarizing why the trade was taken or skipped.

**Performance Tracking**
Maintains a rolling 90-day performance ledger at ~/feeds/btc-macd/perf.json. Tracked metrics include: win rate, average R-multiple, Sharpe ratio, max drawdown, and total P&L in both BTC and USD terms. A weekly summary is pushed to the connected Slack webhook every Sunday at 00:00 UTC.

**Alert & Notification**
Sends real-time alerts via Telegram and Slack when a new signal is generated, when a stop-loss is hit, or when the data-quality check fails. Alert messages include the current BTC price, signal direction, confidence score, and a link to the full signal JSON for manual review.`,
    },
  },
  { name: 'OEM-Tracker', interval: '1 hour', lastRun: '2 hours ago' },
  { name: 'Supply-Chain', interval: '6 hours', lastRun: '2 hours ago' },
];

/* ========== Feed 行 ========== */

function FeedRow({ feed, onClick }: { feed: PlaybookInfoFeed; onClick?: () => void }) {
  const clickable = !!onClick;
  const handleKey = (e: React.KeyboardEvent) => {
    if (!onClick) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };
  return (
    <div
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={clickable ? handleKey : undefined}
      className={`px-[20px] w-full transition-colors ${clickable ? 'cursor-pointer hover:bg-[rgba(0,0,0,0.02)]' : ''}`}
    >
      <div
        className="flex gap-[8px] items-center py-[10px] w-full"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}
      >
      <div className="flex flex-1 min-w-0 gap-[4px] items-center">
        <StatusDot size={12} />
        <p className="flex-1 min-w-0 font-['Delight',sans-serif] leading-[22px] text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">
          {feed.name}
        </p>
      </div>
      <p className="w-[100px] font-['Delight',sans-serif] leading-[22px] text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">
        {feed.interval}
      </p>
      <p className="w-[120px] font-['Delight',sans-serif] leading-[22px] text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">
        {feed.lastRun}
      </p>
      <div className="size-[12px] shrink-0 flex items-center justify-center">
        <CdnIcon name="arrow-right-l2" size={12} color="rgba(0,0,0,0.5)" />
      </div>
      </div>
    </div>
  );
}

/* ========== 组件 ========== */

export function PlaybookInfoPopup({
  title,
  intervalLabel = '15m',
  runEvery = 'Every 5 minutes',
  description,
  feeds = DEFAULT_FEEDS,
  authorName,
  onNavigate,
}: PlaybookInfoPopupProps) {
  const [activeFeed, setActiveFeed] = useState<PlaybookInfoFeed | null>(null);

  return (
    <>
      <div
        className="flex flex-col gap-[20px] items-start p-[20px] rounded-[8px] w-full"
        style={{
          background: '#fff',
          border: '0.5px solid rgba(0,0,0,0.2)',
          boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
        }}
      >
        {/* Header */}
        <div className="flex flex-col gap-[4px] items-start w-full">
          <div className="flex gap-[4px] items-center w-full">
            <p className="font-['Delight',sans-serif] leading-[26px] text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-nowrap">
              {title}
            </p>
            <div
              className="flex items-center justify-center gap-[2px] px-[6px] py-px rounded-full shrink-0"
              style={{ border: '1px solid rgba(0,0,0,0.07)' }}
            >
              <StatusDot size={12} />
              <p className="font-['Delight',sans-serif] leading-[20px] text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] whitespace-nowrap">
                {intervalLabel}
              </p>
            </div>
          </div>
          <div className="flex gap-[8px] items-start font-['Delight',sans-serif] leading-[20px] text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] w-full whitespace-nowrap">
            <p>{runEvery}</p>
            <p style={{ color: 'var(--text-n2)' }}>|</p>
            <p>{feeds.length} Feeds</p>
          </div>
          <p className="font-['Delight',sans-serif] leading-[20px] text-[12px] text-[rgba(0,0,0,0.7)] tracking-[0.12px] w-full">
            {description}
          </p>
        </div>

        {/* Feed List — 整体 -mx-20 延伸到 popup 内边距之外,让 row hover 背景通栏;
            分割线留在内部 div (px-20 padding 内),与之前宽度一致 */}
        <div className="flex flex-col -mx-[20px] w-[calc(100%+40px)]">
          {/* 表头 */}
          <div className="px-[20px]">
            <div
              className="flex gap-[8px] items-center py-[10px] w-full"
              style={{ borderTop: '1px solid rgba(0,0,0,0.07)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}
            >
              <p className="flex-1 min-w-0 font-['Delight',sans-serif] leading-[20px] text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">
                Feed
              </p>
              <p className="w-[100px] font-['Delight',sans-serif] leading-[20px] text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">
                Interval
              </p>
              <p className="w-[120px] font-['Delight',sans-serif] leading-[20px] text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">
                Last Run
              </p>
              <div className="size-[12px] opacity-0 shrink-0" />
            </div>
          </div>
          {/* 行 */}
          {feeds.map((feed) => (
            <FeedRow
              key={feed.name}
              feed={feed}
              onClick={feed.detail ? () => setActiveFeed(feed) : undefined}
            />
          ))}
          {/* View all — 仅在传入 onNavigate 时显示,作为 Feed 表尾的次级导航入口 */}
          {onNavigate && (
            <div
              role="button"
              tabIndex={0}
              onClick={() => onNavigate('automations')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onNavigate('automations');
                }
              }}
              className="px-[20px] w-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.02)]"
            >
              <div
                className="flex gap-[8px] items-center py-[10px] w-full"
                style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}
              >
                <p className="flex-1 min-w-0 font-['Delight',sans-serif] leading-[20px] text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">
                  View all feeds in Settings
                </p>
                <div className="size-[12px] shrink-0 flex items-center justify-center">
                  <CdnIcon name="arrow-right-l2" size={12} color="rgba(0,0,0,0.5)" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Author */}
        <div className="flex items-center w-full">
          <div className="flex flex-1 min-w-0 gap-[6px] items-center">
            <div className="shrink-0 size-[22px]">
              <Avatar name={authorName} size={22} />
            </div>
            <p className="flex-1 min-w-0 font-['Delight',sans-serif] leading-[22px] text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">
              {authorName}
            </p>
          </div>
        </div>
      </div>

      {/* Feed 详情 Modal */}
      {activeFeed?.detail && (
        <FeedDetailModal
          open={!!activeFeed}
          onClose={() => setActiveFeed(null)}
          feedName={activeFeed.name}
          description={activeFeed.detail.description}
          lastRun={activeFeed.detail.lastRun}
          runEvery={activeFeed.detail.runEvery}
          totalRuns={activeFeed.detail.totalRuns}
          stats={activeFeed.detail.stats}
          history={activeFeed.detail.history}
          onManage={onNavigate ? () => {
            setActiveFeed(null);
            onNavigate('automations');
          } : undefined}
        />
      )}
    </>
  );
}
