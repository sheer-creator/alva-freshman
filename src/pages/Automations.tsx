/**
 * [INPUT]: SettingsLayout
 * [OUTPUT]: Automations 设置页 — Feed 列表 (All / Active / Paused) (Figma 6083:44561)
 * [POS]: 页面层
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { SettingsLayout } from '@/app/components/shell/SettingsLayout';
import { Avatar } from '@/app/components/shared/Avatar';
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

/* ========== Mock ========== */

const FEEDS: AutomationFeed[] = [
  { id: '1', name: 'Capacity-Monitor', status: 'active', lastRun: '15m', runEvery: 'Every 5 minutes', totalRuns: 142,
    usedBy: [{ author: 'YGGYLL', name: 'BTC Ultimate AI Trader', target: 'workspace' as Page }, { author: 'YGGYLL', name: 'BTC Ultimate AI Trader', target: 'workspace' as Page }] },
  { id: '2', name: 'Capacity-Monitor', status: 'active', lastRun: '15m', runEvery: 'Every 5 minutes', totalRuns: 142,
    usedBy: [{ author: 'YGGYLL', name: 'BTC Ultimate AI Trader', target: 'workspace' as Page }, { author: 'YGGYLL', name: 'BTC Ultimate AI Trader', target: 'workspace' as Page }] },
  { id: '3', name: 'Capacity-Monitor', status: 'active', lastRun: '15m', runEvery: 'Every 5 minutes', totalRuns: 142,
    usedBy: [{ author: 'YGGYLL', name: 'BTC Ultimate AI Trader', target: 'workspace' as Page }, { author: 'YGGYLL', name: 'BTC Ultimate AI Trader', target: 'workspace' as Page }] },
  { id: '4', name: 'Whale Alert Monitor', status: 'active', lastRun: '15m', runEvery: 'Every 5 minutes', totalRuns: 142 },
  { id: '5', name: 'Capacity-Monitor', status: 'paused', totalRuns: 142,
    usedBy: [{ author: 'YGGYLL', name: 'BTC Ultimate AI Trader', target: 'workspace' as Page }, { author: 'YGGYLL', name: 'BTC Ultimate AI Trader', target: 'workspace' as Page }] },
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

function FeedCard({ feed, onNavigate, onOpen }: { feed: AutomationFeed; onNavigate: (page: Page) => void; onOpen: () => void }) {
  const hasUsedBy = !!feed.usedBy?.length;
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(); } }}
      className="flex flex-col gap-[8px] items-center justify-center p-[20px] rounded-[8px] w-full cursor-pointer transition-colors hover:brightness-[0.98]"
      style={{ background: '#fafafa' }}
    >
      {/* Row 1: dot + name + right meta */}
      <div className="flex gap-[8px] items-center w-full">
        <StatusDot status={feed.status === 'active' ? 'green' : 'grey'} size={14} />
        <p
          className="leading-[26px] text-[16px] tracking-[0.16px] whitespace-nowrap shrink-0"
          style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}
        >
          {feed.name}
        </p>
        <div
          className="flex flex-1 min-w-0 gap-[4px] items-center justify-end leading-[20px] text-[12px] tracking-[0.12px] whitespace-nowrap"
          style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}
        >
          {feed.status === 'active' ? (
            <>
              <p>Last Run: {feed.lastRun}</p>
              <p>•</p>
              <p>{feed.runEvery}</p>
              <p>•</p>
              <p>{feed.totalRuns} Runs</p>
            </>
          ) : (
            <p>{feed.totalRuns} Runs</p>
          )}
        </div>
      </div>

      {/* Row 2: Used By chips */}
      {hasUsedBy && (
        <div className="flex flex-wrap gap-[8px] items-center w-full">
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

  const filtered = tab === 'all'
    ? FEEDS
    : FEEDS.filter(f => f.status === tab);

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
          <FeedCard key={f.id} feed={f} onNavigate={onNavigate} onOpen={() => setActiveFeed(f)} />
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
