/**
 * [INPUT]: SettingsLayout
 * [OUTPUT]: Automations settings page matching Figma Setting/Automations
 * [POS]: settings page
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { SettingsLayout } from '@/app/components/shell/SettingsLayout';
import { Avatar } from '@/app/components/shared/Avatar';
import { FeedDetailModal } from '@/app/components/community/FeedDetailModal';
import { IconButton, SETTINGS_FONT } from '@/app/components/shell/settings-ui';

type FeedStatus = 'active' | 'paused';
type TabKey = 'all' | 'active' | 'paused';

interface UsedByPlaybook {
  label: string;
  target: Page;
}

interface AutomationFeed {
  id: string;
  name: string;
  status: FeedStatus;
  lastRun: string;
  runEvery: string;
  totalRuns: string;
  usedBy?: UsedByPlaybook[];
  description?: string;
}

const DEFAULT_DESCRIPTION =
  'Tracks market and portfolio signals on a schedule, then routes the latest output to playbooks using this automation.';

const FEEDS: AutomationFeed[] = [
  {
    id: 'capacity',
    name: 'Capacity-Monitor',
    status: 'active',
    lastRun: '15m',
    runEvery: 'Every 5 minutes',
    totalRuns: '142',
    usedBy: [
      { label: '@leo/BTC Ultimate AI Trader', target: 'screener' },
      { label: '@sarah/ETH Swing Setup', target: 'screener' },
      { label: '@yggyll/SOL DeFi Hunter', target: 'screener' },
      { label: '@alex/Stablecoin Yield Farm', target: 'screener' },
      { label: '@mike/Altcoin Momentum', target: 'screener' },
    ],
  },
  {
    id: 'whale',
    name: 'Whale-Flow-Scanner',
    status: 'active',
    lastRun: '2h',
    runEvery: 'Every 30 minutes',
    totalRuns: '1,287',
    usedBy: [{ label: '@jane/Macro Rotation', target: 'screener' }],
  },
  {
    id: 'earnings',
    name: 'Earnings-Calendar-Sync',
    status: 'active',
    lastRun: 'Yesterday',
    runEvery: 'Every day at 9:00 AM',
    totalRuns: '48',
  },
  {
    id: 'funding',
    name: 'Funding-Rate-Watcher',
    status: 'paused',
    lastRun: '42m',
    runEvery: 'Every hour',
    totalRuns: '3,210',
    usedBy: [
      { label: '@tom/Options Income', target: 'screener' },
      { label: '@emma/Liquidation Hunter', target: 'screener' },
      { label: '@ryan/Cross-Exchange Arb', target: 'screener' },
    ],
  },
];

const TABS: { key: TabKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'paused', label: 'Paused' },
];

function StatusDot({ status }: { status: FeedStatus }) {
  const active = status === 'active';
  return (
    <span className="relative size-[14px] shrink-0">
      <span className="absolute inset-0 rounded-full" style={{ background: active ? '#DBEDED' : 'var(--b-r07, rgba(0,0,0,0.07))' }} />
      <span className="absolute left-1/2 top-1/2 size-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: active ? 'var(--main-m1, #49A3A6)' : 'rgba(0,0,0,0.3)' }} />
    </span>
  );
}

function playbookAuthor(label: string) {
  return label.replace(/^@/, '').split('/')[0] || 'Alva';
}

function PlaybookChip({ playbook, onClick }: { playbook: UsedByPlaybook; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick?.();
      }}
      className="h-[22px] flex items-center gap-[4px] px-[6px] py-px rounded-[4px] border-none cursor-pointer shrink-0"
      style={{ background: 'var(--b-r03, rgba(0,0,0,0.03))' }}
    >
      <Avatar name={playbookAuthor(playbook.label)} size={14} />
      <span className="text-[12px] leading-[20px] tracking-[0.12px] whitespace-nowrap" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: SETTINGS_FONT }}>
        {playbook.label}
      </span>
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
  return (
    <button
      type="button"
      onClick={onOpen}
      className="w-full p-[20px] rounded-[8px] flex flex-col gap-[16px] text-left cursor-pointer"
      style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))', background: 'var(--b0-container, #fff)', fontFamily: SETTINGS_FONT }}
    >
      <div className="w-full flex items-center gap-[24px]">
        <div className="flex-1 min-w-0 flex items-center gap-[8px]">
          <StatusDot status={feed.status} />
          <p className="flex-1 min-w-0 text-[16px] leading-[26px] tracking-[0.16px] truncate" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{feed.name}</p>
        </div>
        <div className="shrink-0 hidden md:flex items-center gap-[8px] text-[12px] leading-[20px] tracking-[0.12px] whitespace-nowrap" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
          <span>Last Run: {feed.lastRun}</span>
          <span style={{ color: 'var(--text-n2, rgba(0,0,0,0.2))' }}>|</span>
          <span>{feed.runEvery}</span>
          <span style={{ color: 'var(--text-n2, rgba(0,0,0,0.2))' }}>|</span>
          <span>{feed.totalRuns} Runs</span>
        </div>
        <div className="flex items-center gap-[8px] shrink-0">
          <IconButton icon={feed.status === 'active' ? 'pause-l2' : 'play-f'} label={feed.status === 'active' ? 'Pause' : 'Resume'} onClick={onToggleStatus} />
          <IconButton icon="delete-l" label="Delete" onClick={onDelete} />
        </div>
      </div>

      {feed.usedBy && feed.usedBy.length > 0 && (
        <div className="w-full flex items-start">
          <div className="flex-1 min-w-0 flex flex-wrap items-center gap-[8px]">
            <span className="text-[12px] leading-[20px] tracking-[0.12px] whitespace-nowrap" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>Used By</span>
            {feed.usedBy.map((playbook) => (
              <PlaybookChip key={playbook.label} playbook={playbook} onClick={() => onNavigate(playbook.target)} />
            ))}
          </div>
        </div>
      )}
    </button>
  );
}

export default function Automations({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [tab, setTab] = useState<TabKey>('all');
  const [feeds, setFeeds] = useState(FEEDS);
  const [activeFeed, setActiveFeed] = useState<AutomationFeed | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<AutomationFeed | null>(null);

  const visibleFeeds = tab === 'all' ? feeds : feeds.filter((feed) => feed.status === tab);

  const toggleStatus = (id: string) => {
    setFeeds((current) => current.map((feed) => (
      feed.id === id ? { ...feed, status: feed.status === 'active' ? 'paused' : 'active' } : feed
    )));
  };

  return (
    <SettingsLayout active="automations" onNavigate={onNavigate}>
      <div className="w-full max-w-[944px] flex flex-col gap-[16px]">
        <div className="flex items-start gap-[20px]" style={{ borderBottom: '1px solid var(--line-l07, rgba(0,0,0,0.07))' }}>
          {TABS.map((item) => {
            const active = item.key === tab;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setTab(item.key)}
                className={`border-none bg-transparent cursor-pointer p-0 flex flex-col items-start ${active ? 'gap-[6px]' : 'pb-[8px]'}`}
              >
                <span className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: active ? 'var(--text-n9, rgba(0,0,0,0.9))' : 'var(--text-n7, rgba(0,0,0,0.7))', fontFamily: SETTINGS_FONT, fontWeight: active ? 500 : 400 }}>
                  {item.label}
                </span>
                {active && <span className="h-[2px] w-full" style={{ background: 'var(--main-m1, #49A3A6)' }} />}
              </button>
            );
          })}
        </div>

        <div className="w-full flex flex-col gap-[16px]">
          {visibleFeeds.map((feed) => (
            <FeedCard
              key={feed.id}
              feed={feed}
              onNavigate={onNavigate}
              onOpen={() => setActiveFeed(feed)}
              onToggleStatus={() => toggleStatus(feed.id)}
              onDelete={() => setConfirmDelete(feed)}
            />
          ))}
        </div>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-[16px]" style={{ background: 'rgba(0,0,0,0.6)' }} onClick={() => setConfirmDelete(null)}>
          <div className="w-[400px] max-w-full p-[24px] rounded-[12px] flex flex-col gap-[16px]" style={{ background: '#fff', border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))', boxShadow: 'var(--shadow-l)' }} onClick={(event) => event.stopPropagation()}>
            <p className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: SETTINGS_FONT }}>Delete "{confirmDelete.name}"?</p>
            <p className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: SETTINGS_FONT }}>This automation will be permanently removed.</p>
            <div className="flex justify-end gap-[8px]">
              <button type="button" onClick={() => setConfirmDelete(null)} className="px-[14px] py-[6px] rounded-[6px] border-none bg-transparent cursor-pointer" style={{ color: 'var(--text-n7, rgba(0,0,0,0.7))', fontFamily: SETTINGS_FONT }}>Cancel</button>
              <button
                type="button"
                onClick={() => {
                  setFeeds((current) => current.filter((feed) => feed.id !== confirmDelete.id));
                  setConfirmDelete(null);
                }}
                className="px-[14px] py-[6px] rounded-[6px] border-none cursor-pointer"
                style={{ color: '#fff', background: '#d64545', fontFamily: SETTINGS_FONT }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <FeedDetailModal
        open={!!activeFeed}
        onClose={() => setActiveFeed(null)}
        feedName={activeFeed?.name ?? ''}
        description={activeFeed?.description ?? DEFAULT_DESCRIPTION}
        lastRun={activeFeed?.lastRun ?? ''}
        runEvery={activeFeed?.runEvery ?? ''}
        totalRuns={Number((activeFeed?.totalRuns ?? '0').replace(/,/g, ''))}
      />
    </SettingsLayout>
  );
}
