/**
 * [INPUT]: Figma Page/Creator design
 * [OUTPUT]: Creator Earnings account page
 * [POS]: Pages layer — creator payout and earnings ledger
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { Avatar } from '@/app/components/shared/Avatar';
import { CdnIcon } from '@/app/components/shared/CdnIcon';

type CreatorEarningsProps = {
  onNavigate: (page: Page) => void;
};

type TabKey = 'earnings' | 'withdrawal-history' | 'sealed-playbooks';

type EarningsRow = {
  playbook: string;
  consumer: string;
  avatar: string;
  date: string;
  paid: string;
};

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: 'earnings', label: 'Earnings' },
  { key: 'withdrawal-history', label: 'Withdrawal History' },
  { key: 'sealed-playbooks', label: 'Sealed Playbooks' },
];

const EARNINGS_ROWS: EarningsRow[] = [
  {
    playbook: 'Attribution Analysis Strategy for Price Trends',
    consumer: 'C·a4f9',
    avatar: 'A',
    date: '04/12/2026 21:23:40',
    paid: '+$5,000',
  },
  {
    playbook: 'NVDA Price Fetcher',
    consumer: 'C·b81c',
    avatar: 'B',
    date: '04/12/2026 21:23:40',
    paid: '+$1,000',
  },
  {
    playbook: 'Short-Squeeze Risk Map',
    consumer: 'C·6e2d',
    avatar: 'C',
    date: '04/11/2026 21:23:40',
    paid: '+$1,000',
  },
  {
    playbook: 'Attribution Analysis Strategy for Price Trends',
    consumer: 'C·9f01',
    avatar: 'D',
    date: '04/10/2026 21:23:40',
    paid: '+$1,000',
  },
  {
    playbook: 'Google / X Trends Tracker',
    consumer: 'C·31aa',
    avatar: 'E',
    date: '04/10/2026 21:23:40',
    paid: '+$1,000',
  },
  {
    playbook: 'NVDA Price Fetcher',
    consumer: 'C·77be',
    avatar: 'F',
    date: '04/09/2026 21:23:40',
    paid: '+1,000',
  },
  {
    playbook: 'NVDA Price Fetcher',
    consumer: 'C·77be',
    avatar: 'F',
    date: '04/09/2026 21:23:40',
    paid: '+1,000',
  },
  {
    playbook: 'NVDA Price Fetcher',
    consumer: 'C·77be',
    avatar: 'F',
    date: '04/09/2026 21:23:40',
    paid: '+1,000',
  },
  {
    playbook: 'NVDA Price Fetcher',
    consumer: 'C·77be',
    avatar: 'F',
    date: '04/09/2026 21:23:40',
    paid: '+1,000',
  },
  {
    playbook: 'NVDA Price Fetcher',
    consumer: 'C·77be',
    avatar: 'F',
    date: '04/09/2026 21:23:40',
    paid: '+1,000',
  },
];

function BackButton({ onNavigate }: CreatorEarningsProps) {
  const goBack = () => {
    const returnPage = sessionStorage.getItem('creatorEarningsReturnPage') as Page | null;
    onNavigate(returnPage && returnPage !== 'creator-earnings' ? returnPage : 'new-chat');
  };

  return (
    <button
      type="button"
      onClick={goBack}
      className="flex h-[56px] items-center gap-[4px] bg-white p-0 text-left border-none cursor-pointer"
      aria-label="Back"
    >
      <CdnIcon name="arrow-left-l2" size={12} color="var(--text-n5)" />
      <span className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5)' }}>
        Back
      </span>
    </button>
  );
}

function BalanceSection() {
  return (
    <section
      className="flex flex-col gap-[16px] overflow-hidden rounded-[8px] border-[0.5px] p-[24px]"
      style={{
        background: 'rgba(255, 255, 255, 0.7)',
        borderColor: 'var(--line-l2)',
      }}
    >
      <div className="flex w-full items-center gap-[16px]">
        <div className="flex min-w-0 flex-1 flex-col gap-[8px] overflow-hidden">
          <div className="flex items-center gap-[4px] overflow-hidden">
            <p className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] whitespace-nowrap" style={{ color: 'var(--text-n5)' }}>
              Available to withdraw
            </p>
            <CdnIcon name="explain-l" size={16} color="var(--text-n5)" />
          </div>
          <p className="font-['Delight',sans-serif] text-[32px] leading-[42px] tracking-[0.32px] whitespace-nowrap" style={{ color: 'var(--text-n9)' }}>
            $1,500.24
          </p>
        </div>

        <div className="relative flex w-[103px] shrink-0 flex-col items-start">
          <button
            type="button"
            disabled
            className="flex h-[40px] w-full items-center justify-center rounded-[6px] border-[0.5px] bg-white px-[20px] py-[9px] cursor-not-allowed"
            style={{ borderColor: 'var(--line-l3)' }}
          >
            <span className="font-['Delight',sans-serif] text-[14px] font-medium leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n2)' }}>
              Withdraw
            </span>
          </button>
          <div
            className="absolute right-[-4px] top-[-10px] flex items-center justify-center rounded-[4px] px-[8px] py-[2px] backdrop-blur-[2px]"
            style={{ background: 'rgba(73, 163, 166, 0.2)' }}
          >
            <span className="font-['Delight',sans-serif] text-[10px] font-medium leading-[16px] tracking-[0.1px]" style={{ color: 'var(--main-m1)' }}>
              Coming Soon
            </span>
          </div>
        </div>
      </div>

      <div className="h-px w-full" style={{ background: 'var(--line-l07)' }} />

      <div className="grid w-full grid-cols-2 gap-[16px] overflow-hidden max-sm:grid-cols-1">
        <div className="flex min-w-0 flex-col gap-[4px] overflow-hidden rounded-[8px]">
          <p className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5)' }}>
            Total Earned
          </p>
          <p className="font-['Delight',sans-serif] text-[24px] leading-[34px] tracking-[0.24px]" style={{ color: 'var(--text-n9)' }}>
            $48,750.51
          </p>
        </div>
        <div className="flex min-w-0 flex-col gap-[4px] overflow-hidden rounded-[8px]">
          <p className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5)' }}>
            Total Withdrawn
          </p>
          <p className="font-['Delight',sans-serif] text-[24px] leading-[34px] tracking-[0.24px]" style={{ color: 'var(--text-n9)' }}>
            $36,250.12
          </p>
        </div>
      </div>
    </section>
  );
}

function EarningsTabs({ activeTab, onTabChange }: { activeTab: TabKey; onTabChange: (tab: TabKey) => void }) {
  return (
    <div className="flex h-[58px] items-start gap-[16px] border-b border-solid px-[24px]" style={{ borderColor: 'var(--line-l07)' }}>
      <div className="flex items-center gap-[20px]">
        {TABS.map((tab) => {
          const selected = tab.key === activeTab;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTabChange(tab.key)}
              className="flex h-[58px] flex-col items-start rounded-[4px] border-none bg-transparent p-0 pt-[16px] text-left cursor-pointer"
            >
              <span
                className={`font-['Delight',sans-serif] text-[16px] leading-[26px] tracking-[0.16px] whitespace-nowrap ${selected ? 'font-medium' : 'font-normal'}`}
                style={{ color: selected ? 'var(--text-n9)' : 'var(--text-n7)' }}
              >
                {tab.label}
              </span>
              {selected && <span className="mt-[14px] h-[2px] w-full" style={{ background: 'var(--main-m1)' }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TableHeader() {
  return (
    <div
      className="grid h-[46px] grid-cols-7 items-center gap-x-[16px] border-b-[0.5px] py-[12px] font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px]"
      style={{ borderColor: 'var(--line-l12)', color: 'var(--text-n7)' }}
    >
      <div className="col-span-3">Playbook</div>
      <div className="text-right">Consumer</div>
      <div className="col-span-2 text-right">Date</div>
      <div className="text-right">Paid</div>
    </div>
  );
}

function ConsumerChip({ row }: { row: EarningsRow }) {
  return (
    <div className="flex items-center justify-end overflow-hidden">
      <div className="flex shrink-0 items-center gap-[8px] overflow-hidden rounded-[96px] py-[4px] pl-[4px] pr-[8px]" style={{ background: 'var(--b-r03)' }}>
        <Avatar name={row.avatar} size={20} />
        <div className="flex shrink-0 items-center gap-[4px]">
          <span className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] whitespace-nowrap" style={{ color: 'var(--text-n9)' }}>
            {row.consumer}
          </span>
          <CdnIcon name="arrow-right-l2" size={12} color="var(--text-n5)" />
        </div>
      </div>
    </div>
  );
}

function EarningsTableRow({ row }: { row: EarningsRow }) {
  return (
    <div className="grid h-[64px] grid-cols-7 gap-x-[16px] border-b-[0.5px] py-[16px]" style={{ borderColor: 'var(--line-l12)' }}>
      <div className="col-span-3 flex min-w-0 items-center overflow-hidden">
        <p className="truncate font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n9)' }}>
          {row.playbook}
        </p>
      </div>
      <ConsumerChip row={row} />
      <div className="col-span-2 flex min-w-0 items-center justify-end overflow-hidden">
        <p className="truncate text-right font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n9)' }}>
          {row.date}
        </p>
      </div>
      <div className="flex min-w-0 items-center justify-end overflow-hidden">
        <p className="truncate text-right font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--main-m1)' }}>
          {row.paid}
        </p>
      </div>
    </div>
  );
}

function EmptyTabState() {
  return (
    <div className="flex h-[326px] items-center justify-center px-[24px]">
      <p className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5)' }}>
        No records yet
      </p>
    </div>
  );
}

function EarningsTable() {
  const [activeTab, setActiveTab] = useState<TabKey>('earnings');

  return (
    <section
      className="mt-[23px] w-full overflow-hidden rounded-[8px] border-[0.5px]"
      style={{
        background: 'rgba(255, 255, 255, 0.7)',
        borderColor: 'var(--line-l2)',
      }}
    >
      <EarningsTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'earnings' ? (
        <div className="overflow-x-auto px-[24px]">
          <div className="min-w-[760px]">
            <TableHeader />
            {EARNINGS_ROWS.map((row, index) => (
              <EarningsTableRow key={`${row.playbook}-${row.consumer}-${index}`} row={row} />
            ))}
          </div>
        </div>
      ) : (
        <EmptyTabState />
      )}
    </section>
  );
}

export default function CreatorEarnings({ onNavigate }: CreatorEarningsProps) {
  return (
    <AppShell activePage="creator-earnings" onNavigate={onNavigate}>
      <div className="min-h-full bg-white font-['Delight',sans-serif]">
        <div className="mx-auto w-full max-w-[960px] px-[16px] pb-[96px] lg:px-0">
          <BackButton onNavigate={onNavigate} />
          <header className="flex h-[38px] items-center">
            <h1 className="m-0 font-['Delight',sans-serif] text-[28px] font-normal leading-[38px] tracking-[0.28px] whitespace-nowrap" style={{ color: 'var(--text-n9)' }}>
              Creator Earnings
            </h1>
          </header>
          <div className="mt-[24px]">
            <BalanceSection />
          </div>
          <EarningsTable />
        </div>
      </div>
    </AppShell>
  );
}
