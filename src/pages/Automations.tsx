/**
 * [INPUT]: SettingsLayout
 * [OUTPUT]: Automations 设置页 — Feed 列表 (All / Active / Paused) (Figma 6083:44561)
 * [POS]: 页面层
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { SettingsLayout } from '@/app/components/shell/SettingsLayout';
import { Avatar } from '@/app/components/shared/Avatar';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { FeedDetailModal } from '@/app/components/community/FeedDetailModal';

const FONT = "'Delight', sans-serif";

/* ========== Status Dot ========== */

function StatusDot({ status = 'green', size = 12 }: { status?: 'green' | 'grey'; size?: number }) {
  const ringColor = status === 'green' ? '#DBEDED' : 'rgba(0,0,0,0.06)';
  const dotColor = status === 'green' ? '#49A3A6' : 'rgba(0,0,0,0.3)';
  return (
    <div className="flex items-center shrink-0" style={{ width: size, height: size }}>
      <div className="flex-1 h-full min-h-px min-w-px overflow-clip relative">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
          <svg className="block size-full" fill="none" viewBox="0 0 12 12">
            <circle cx="6" cy="6" fill={ringColor} r="6" />
          </svg>
        </div>
        <div className="absolute bottom-[28.6%] left-1/2 top-[28.6%] -translate-x-1/2">
          <svg className="block size-full" fill="none" viewBox="0 0 5.136 5.136">
            <circle cx="2.568" cy="2.568" fill={dotColor} r="2.568" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ========== 类型 ========== */

type FeedStatus = 'active' | 'paused';

interface UsedByPlaybook { author: string; name: string; target: Page; }

interface AutomationFeed {
  id: string;
  name: string;
  status: FeedStatus;
  lastRun?: string;     // "15m"
  runEvery?: string;    // "Every 5 minutes"
  totalRuns: number;
  usedBy?: UsedByPlaybook[];
  description?: string;
}

const DEFAULT_DESCRIPTION =
  'Tracks global gas turbine manufacturing capacity across major OEMs. Every 5 minutes, pulls order backlog data, computes total installed capacity (GW), YoY growth rates, and projected supply gaps.';

const BTC_MACD_DESCRIPTION = `**Signal Generation**
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
Sends real-time alerts via Telegram and Slack when a new signal is generated, when a stop-loss is hit, or when the data-quality check fails. Alert messages include the current BTC price, signal direction, confidence score, and a link to the full signal JSON for manual review.`;

/* ========== Mock ========== */

const SIDEBAR_PLAYBOOKS: UsedByPlaybook[] = [
  { author: 'YGGYLL',  name: 'quality-value-screener', target: 'screener' as Page },
  { author: 'satoshi', name: 'btc-macd-1h',            target: 'screener' as Page },
  { author: 'alva',    name: 'whale-flow-tracker',     target: 'screener' as Page },
  { author: 'maya',    name: 'gas-turbine-supply',     target: 'screener' as Page },
  { author: 'quantus', name: 'defi-yield-scanner',     target: 'screener' as Page },
];

const pick = (i: number, n: number) =>
  SIDEBAR_PLAYBOOKS.slice(i, i + n);

const FEEDS: AutomationFeed[] = [
  { id: '1', name: 'Capacity-Monitor', status: 'active', lastRun: '15m', runEvery: 'Every 5 minutes', totalRuns: 142,
    description: BTC_MACD_DESCRIPTION,
    usedBy: pick(0, 2) },
  { id: '2', name: 'Funding-Rate-Watcher', status: 'active', lastRun: '15m', runEvery: 'Every 5 minutes', totalRuns: 142,
    usedBy: pick(2, 1) },
  { id: '3', name: 'Liquidity-Drift-Scanner', status: 'active', lastRun: '15m', runEvery: 'Every 5 minutes', totalRuns: 142,
    usedBy: pick(0, 3) },
  { id: '4', name: 'Whale Alert Monitor', status: 'active', lastRun: '15m', runEvery: 'Every 5 minutes', totalRuns: 142 },
  { id: '5', name: 'Earnings-Surprise-Radar', status: 'paused', totalRuns: 142,
    usedBy: pick(3, 1) },
];

/* ========== Used-By 芯片 ========== */

function PlaybookChip({ playbook, onClick }: { playbook: UsedByPlaybook; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); onClick?.(); }}
      className="flex items-center gap-[2px] justify-center px-[4px] py-px rounded-[2px] shrink-0 cursor-pointer border-none outline-none transition-colors hover:brightness-95"
      style={{ background: 'rgba(0,0,0,0.03)' }}
    >
      <div className="shrink-0 size-[14px] rounded-[2px] overflow-hidden">
        <Avatar name={playbook.author} size={14} />
      </div>
      <p
        className="leading-[20px] text-[12px] tracking-[0.12px] whitespace-nowrap overflow-hidden text-ellipsis"
        style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT, maxWidth: 120 }}
      >
        @{playbook.author}/{playbook.name}
      </p>
    </button>
  );
}

/* ========== Feed Card ========== */

function RowAction({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className="flex items-center justify-center size-[16px] shrink-0 cursor-pointer bg-transparent border-none outline-none p-0 transition-opacity hover:opacity-60"
    >
      <CdnIcon name={icon} size={16} color="var(--text-n9)" />
    </button>
  );
}

function FeedCard({
  feed,
  onNavigate,
  onOpen,
  onToggleStatus,
  onDelete,
}: {
  feed: AutomationFeed;
  onNavigate: (page: Page) => void;
  onOpen: () => void;
  onToggleStatus: () => void;
  onDelete: () => void;
}) {
  const hasUsedBy = !!feed.usedBy?.length;
  const isActive = feed.status === 'active';
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(); } }}
      className="flex flex-col gap-[8px] items-center justify-center p-[20px] rounded-[8px] w-full cursor-pointer transition-colors hover:brightness-[0.98]"
      style={{ background: '#fafafa' }}
    >
      {/* Row 1: dot + name + actions */}
      <div className="flex gap-[12px] items-center w-full">
        <div className="flex flex-1 min-w-0 gap-[8px] items-center">
          <StatusDot status={isActive ? 'green' : 'grey'} size={14} />
          <p
            className="flex-1 min-w-0 leading-[26px] text-[16px] tracking-[0.16px] whitespace-nowrap overflow-hidden text-ellipsis"
            style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}
          >
            {feed.name}
          </p>
        </div>
        <RowAction
          icon={isActive ? 'pause-l2' : 'play-l'}
          label={isActive ? 'Stop' : 'Resume'}
          onClick={onToggleStatus}
        />
        <RowAction icon="delete-l" label="Delete" onClick={onDelete} />
      </div>

      {/* Row 2: meta (left) + Used By chips (right) */}
      <div className="flex flex-wrap gap-[8px] items-center justify-between w-full">
        <div
          className="flex gap-[8px] items-center leading-[20px] text-[12px] tracking-[0.12px] whitespace-nowrap shrink-0"
          style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}
        >
          <p>Last Run: {feed.lastRun ?? '—'}</p>
          <p style={{ color: 'var(--text-n2)' }}>|</p>
          <p>{feed.runEvery ?? 'Every 5 minutes'}</p>
          <p style={{ color: 'var(--text-n2)' }}>|</p>
          <p>{feed.totalRuns} Runs</p>
        </div>
        {hasUsedBy && (
          <div className="flex gap-[8px] items-center shrink-0">
            <p
              className="leading-[20px] text-[12px] tracking-[0.12px] whitespace-nowrap shrink-0"
              style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}
            >
              Used By
            </p>
            {feed.usedBy!.map((p, i) => (
              <PlaybookChip key={i} playbook={p} onClick={() => onNavigate(p.target)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ========== Tabs ========== */

type TabKey = 'all' | 'active' | 'paused';
const TABS: { key: TabKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'paused', label: 'Paused' },
];

/* ========== 页面 ========== */

export default function Automations({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [tab, setTab] = useState<TabKey>('all');
  const [activeFeed, setActiveFeed] = useState<AutomationFeed | null>(null);
  const [feeds, setFeeds] = useState<AutomationFeed[]>(FEEDS);
  const [confirmDelete, setConfirmDelete] = useState<AutomationFeed | null>(null);

  const filtered = tab === 'all'
    ? feeds
    : feeds.filter(f => f.status === tab);

  const toggleStatus = (id: string) => {
    setFeeds(prev => prev.map(f => f.id === id
      ? { ...f, status: f.status === 'active' ? 'paused' : 'active' }
      : f
    ));
  };
  const deleteFeed = (id: string) => {
    setFeeds(prev => prev.filter(f => f.id !== id));
    setConfirmDelete(null);
  };

  return (
    <SettingsLayout active="automations" onNavigate={onNavigate}>
      {/* Title */}
      <p
        className="leading-[38px] text-[28px] tracking-[0.28px] w-full"
        style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}
      >
        Automations
      </p>

      {/* Tabs */}
      <div
        className="flex gap-[16px] items-start w-full"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}
      >
        {TABS.map(t => {
          const active = t.key === tab;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="flex flex-col items-start gap-[4px] pb-0 cursor-pointer bg-transparent border-none outline-none"
              style={{ padding: 0 }}
            >
              <span
                className="leading-[22px] text-[14px] tracking-[0.14px] whitespace-nowrap"
                style={{
                  color: active ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.7)',
                  fontFamily: FONT,
                  fontWeight: active ? 500 : 400,
                }}
              >
                {t.label}
              </span>
              <div
                className="h-[2px] w-full"
                style={{ background: active ? '#49A3A6' : 'transparent' }}
              />
            </button>
          );
        })}
      </div>

      {/* Feed list */}
      <div className="flex flex-col gap-[16px] items-center w-full max-w-[960px]">
        {filtered.map(f => (
          <FeedCard
            key={f.id}
            feed={f}
            onNavigate={onNavigate}
            onOpen={() => setActiveFeed(f)}
            onToggleStatus={() => toggleStatus(f.id)}
            onDelete={() => setConfirmDelete(f)}
          />
        ))}
        {filtered.length === 0 && (
          <p
            className="py-[40px] text-[14px] leading-[22px] tracking-[0.14px]"
            style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}
          >
            No feeds in this tab.
          </p>
        )}
      </div>

      {/* Delete confirmation */}
      {confirmDelete && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-[16px] py-[28px]"
          style={{ background: 'rgba(0,0,0,0.6)' }}
          onClick={() => setConfirmDelete(null)}
        >
          <div
            className="flex flex-col gap-[16px] w-[400px] max-w-full p-[24px] rounded-[12px]"
            style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.2)', boxShadow: '0 10px 20px rgba(0,0,0,0.08)' }}
            onClick={e => e.stopPropagation()}
          >
            <p className="leading-[26px] text-[16px] tracking-[0.16px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>
              Delete “{confirmDelete.name}”?
            </p>
            <p className="leading-[20px] text-[12px] tracking-[0.12px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>
              This automation will be permanently removed. Playbooks using it will stop receiving data.
            </p>
            <div className="flex gap-[8px] justify-end">
              <button
                type="button"
                onClick={() => setConfirmDelete(null)}
                className="px-[14px] py-[6px] rounded-[6px] text-[14px] leading-[22px] tracking-[0.14px] cursor-pointer bg-transparent border-none outline-none hover:bg-[rgba(0,0,0,0.05)]"
                style={{ color: 'rgba(0,0,0,0.7)', fontFamily: FONT }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => deleteFeed(confirmDelete.id)}
                className="px-[14px] py-[6px] rounded-[6px] text-[14px] leading-[22px] tracking-[0.14px] cursor-pointer border-none outline-none hover:brightness-110"
                style={{ color: '#fff', background: '#d64545', fontFamily: FONT }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feed 详情 Modal */}
      <FeedDetailModal
        open={!!activeFeed}
        onClose={() => setActiveFeed(null)}
        feedName={activeFeed?.name ?? ''}
        description={activeFeed?.description ?? DEFAULT_DESCRIPTION}
        lastRun={activeFeed?.lastRun ?? '15m'}
        runEvery={activeFeed?.runEvery ?? 'Every 5 minutes'}
        totalRuns={activeFeed?.totalRuns ?? 0}
      />
    </SettingsLayout>
  );
}
