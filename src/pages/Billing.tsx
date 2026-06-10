/**
 * [INPUT]: SettingsLayout
 * [OUTPUT]: Usage settings page matching Figma Setting/Usage
 * [POS]: settings page
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { SettingsLayout } from '@/app/components/shell/SettingsLayout';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import {
  IconButton,
  OutlineButton,
  PrimaryButton,
  SETTINGS_FONT,
  SettingsSection,
} from '@/app/components/shell/settings-ui';

const HISTORY: { detail: string; icon: 'thread' | 'dashboard'; date: string; credits: number; expanded?: boolean }[] = [
  { detail: 'Viral Video Spotlight', icon: 'thread', date: '12/12/2025', credits: -80 },
  { detail: 'Monitoring Twitter for Crypto Token Performance', icon: 'dashboard', date: '12/12/2025', credits: -500, expanded: true },
  { detail: 'New Feature Launch', icon: 'dashboard', date: '12/12/2025', credits: -1000, expanded: true },
  { detail: 'Bitcoin News, Sentiment, and Market Analysis', icon: 'dashboard', date: '12/12/2025', credits: -2000, expanded: true },
  { detail: 'Marketing Campaign Analysis', icon: 'thread', date: '12/12/2025', credits: -300 },
  { detail: 'Operation promotion', icon: 'thread', date: '12/12/2025', credits: 1500 },
  { detail: 'App Crash Reports', icon: 'dashboard', date: '12/12/2025', credits: -1200, expanded: true },
  { detail: 'Website Traffic Surge', icon: 'dashboard', date: '12/12/2025', credits: -5000, expanded: true },
  { detail: 'Clarification Needed for Number Inquiry', icon: 'thread', date: '12/12/2025', credits: -450 },
  { detail: 'Product Update Rollout', icon: 'thread', date: '12/12/2025', credits: -200 },
  { detail: 'Invitation code submitted', icon: 'thread', date: '12/12/2025', credits: 20000 },
];

const BUCKETS: { label: string; value: string; total?: string; reset: string; color?: string; width?: string; tag?: string }[] = [
  { label: 'Daily', value: '800', total: '1,000', reset: 'Reset in 6h', color: 'var(--chart-green1-2, #78C26D)', width: '101px', tag: 'Limited Bonus' },
  { label: 'Monthly', value: '8,640', total: '21,360', reset: 'Reset in 23d', color: 'var(--main-m2, #2196F3)', width: '231px' },
  { label: 'Pack', value: '2,920', reset: 'Never expires' },
];

function AddCreditsModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-[20px]" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="w-[420px] rounded-[12px] p-[24px] flex flex-col gap-[16px]" style={{ background: '#fff', boxShadow: 'var(--shadow-l)' }} onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center gap-[12px]">
          <p className="flex-1 text-[18px] leading-[28px] tracking-[0.18px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: SETTINGS_FONT }}>Add Credits</p>
          <IconButton icon="close-l" label="Close" onClick={onClose} />
        </div>
        <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: SETTINGS_FONT }}>
          Buy extra Pack credits for workflows that need more capacity.
        </p>
        <PrimaryButton onClick={onClose} className="self-end">Done</PrimaryButton>
      </div>
    </div>
  );
}

function CreditBucket({ bucket }: { bucket: typeof BUCKETS[number] }) {
  return (
    <div className="w-full flex flex-col gap-[12px]">
      <div className="flex items-end justify-between gap-[12px]">
        <div className="min-w-0">
          <div className="flex items-center gap-[4px]">
            <p className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: '#1A1F24', fontFamily: SETTINGS_FONT }}>{bucket.label}</p>
            {bucket.tag && (
              <span className="h-[18px] flex items-center px-[6px] rounded-full text-[11px] leading-[18px] tracking-[0.11px]" style={{ color: 'var(--main-m5, #E6A91A)', background: 'var(--main-m5-10, rgba(230,169,26,0.1))', fontFamily: SETTINGS_FONT }}>
                {bucket.tag}
              </span>
            )}
          </div>
          <div className="flex items-end gap-[4px]">
            <p className="text-[20px] leading-[30px] tracking-[0.2px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: SETTINGS_FONT }}>{bucket.value}</p>
            {bucket.total && (
              <p className="text-[14px] leading-[22px] pb-[3px] tracking-[0.14px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: SETTINGS_FONT }}>/ {bucket.total}</p>
            )}
          </div>
        </div>
        <p className="text-[10px] leading-[16px] pb-[6px] tracking-[0.1px] whitespace-nowrap" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: SETTINGS_FONT }}>{bucket.reset}</p>
      </div>
      {bucket.width && (
        <div className="w-full h-[4px] rounded-[3px] overflow-hidden" style={{ background: 'var(--b-r07, rgba(0,0,0,0.07))' }}>
          <div className="h-full rounded-[3px]" style={{ width: bucket.width, background: bucket.color }} />
        </div>
      )}
    </div>
  );
}

function HistoryTable() {
  return (
    <div className="w-full rounded-[8px] overflow-hidden py-[4px]" style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))', background: 'var(--b0-container, #fff)' }}>
      <div className="mx-[20px] h-[44px] flex items-center gap-[20px]">
        <p className="flex-1 text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: SETTINGS_FONT }}>Detail</p>
        <p className="w-[120px] text-right text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: SETTINGS_FONT }}>Date</p>
        <p className="w-[108px] text-right text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n7, rgba(0,0,0,0.7))', fontFamily: SETTINGS_FONT }}>Usage</p>
        <div className="size-[12px]" />
      </div>
      {HISTORY.map((item) => (
        <div key={item.detail} className="mx-[20px] min-h-[54px] flex items-center gap-[20px]" style={{ borderTop: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' }}>
          <div className="flex-1 min-w-0 flex items-center gap-[8px]">
            <CdnIcon name={item.icon === 'thread' ? 'sidebar-thread-normal' : 'sidebar-dashboard-normal'} size={20} color="var(--text-n7, rgba(0,0,0,0.7))" />
            <p className="text-[14px] leading-[22px] tracking-[0.14px] truncate" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: SETTINGS_FONT }}>{item.detail}</p>
          </div>
          <p className="w-[120px] text-right text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: SETTINGS_FONT }}>{item.date}</p>
          <p className="w-[108px] text-right text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: item.credits > 0 ? 'var(--main-m1, #49A3A6)' : 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: SETTINGS_FONT, fontWeight: 500 }}>
            {item.credits > 0 ? '+' : ''}{item.credits}
          </p>
          <div className="size-[12px]" style={{ opacity: item.expanded ? 1 : 0 }}>
            <CdnIcon name="arrow-down-f2" size={12} color="var(--text-n5, rgba(0,0,0,0.5))" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Billing({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [showAddCredits, setShowAddCredits] = useState(false);
  const [autoRefill, setAutoRefill] = useState(false);

  return (
    <SettingsLayout active="billing" onNavigate={onNavigate}>
      <SettingsSection gap={16}>
        <div className="w-full flex items-center gap-[12px]">
          <div className="flex-1 min-w-0 flex flex-col gap-[2px]">
            <div className="flex items-center gap-[8px]">
              <p className="text-[18px] leading-[28px] tracking-[0.18px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: SETTINGS_FONT }}>Pro</p>
              <span className="h-[18px] flex items-center px-[6px] rounded-full text-[11px] leading-[18px] tracking-[0.11px]" style={{ background: 'var(--main-m1-10, rgba(73,163,166,0.1))', color: 'var(--main-m1, #49A3A6)', fontFamily: SETTINGS_FONT }}>
                Annually
              </span>
            </div>
            <div className="flex items-center gap-[24px] text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: SETTINGS_FONT }}>
              <span className="flex items-start gap-[8px]">
                <span style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>Start Date</span>
                <span style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>01/08/2026</span>
              </span>
              <span className="flex items-start gap-[8px]">
                <span style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>Next Billing</span>
                <span style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>01/08/2027</span>
              </span>
            </div>
          </div>
          <PrimaryButton onClick={() => setShowAddCredits(true)}>
            <CdnIcon name="add-l2" size={14} color="#fff" />
            Add credits
          </PrimaryButton>
          <OutlineButton>
            <CdnIcon name="settings-l" size={14} color="var(--text-n9, rgba(0,0,0,0.9))" />
            Manage
          </OutlineButton>
          <OutlineButton onClick={() => onNavigate('pricing')}>View all plans</OutlineButton>
        </div>

        <div className="w-full rounded-[8px] pt-[24px] px-[24px] pb-[16px] flex flex-col gap-[16px]" style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))', background: 'var(--b0-container, #fff)' }}>
          <div className="w-full flex items-start gap-[24px]">
            <div className="flex-1 min-w-0 self-stretch flex flex-col gap-[12px]">
              <div className="flex-1 flex flex-col gap-[8px] justify-end">
                <div>
                  <p className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n10, #000)', fontFamily: SETTINGS_FONT }}>Available</p>
                  <div className="flex items-end gap-[8px]">
                    <p className="text-[32px] leading-[42px] tracking-[0.32px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: SETTINGS_FONT }}>10,000</p>
                    <div className="flex items-center gap-[4px] py-[7px]">
                      <p className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: SETTINGS_FONT }}>Credits</p>
                      <CdnIcon name="explain-l" size={14} color="var(--text-n5, rgba(0,0,0,0.5))" />
                    </div>
                  </div>
                </div>
                <p className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: SETTINGS_FONT }}>
                  {'300 expire tomorrow, 2,400 in 3 days  •  10% Used'}
                </p>
              </div>
              <div className="w-full px-[16px] py-[12px] rounded-[6px] flex items-center gap-[8px]" style={{ background: 'var(--main-m5-10, rgba(230,169,26,0.1))' }}>
                <CdnIcon name="warning-f" size={16} color="var(--main-m5, #E6A91A)" />
                <p className="flex-1 text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: SETTINGS_FONT }}>
                  Your subscription will expire on Jan 8, 2027 and you will be downgraded to Free afterward.
                </p>
                <CdnIcon name="arrow-right-l1" size={14} color="var(--text-n5, rgba(0,0,0,0.5))" />
              </div>
            </div>
            <div className="w-[320px] pt-[8px] flex flex-col gap-[12px]">
              {BUCKETS.map((bucket) => <CreditBucket key={bucket.label} bucket={bucket} />)}
            </div>
          </div>

          <div className="w-full h-px" style={{ background: 'var(--line-l07, rgba(0,0,0,0.07))' }} />

          <div className="w-full flex items-center gap-[16px]">
            <div className="flex-1 min-w-0">
              <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n10, #000)', fontFamily: SETTINGS_FONT }}>Auto-refill</p>
              <p className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: SETTINGS_FONT }}>
                Automatically top up credits when your balance runs low.
              </p>
            </div>
            <button type="button" onClick={() => setAutoRefill((value) => !value)} className="flex items-center gap-[8px] border-none bg-transparent cursor-pointer">
              <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: SETTINGS_FONT }}>{autoRefill ? 'On' : 'Off'}</span>
              <CdnIcon name="arrow-right-l2" size={12} color="var(--text-n5, rgba(0,0,0,0.5))" />
            </button>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection title="Credits History" gap={16}>
        <HistoryTable />
      </SettingsSection>

      {showAddCredits && <AddCreditsModal onClose={() => setShowAddCredits(false)} />}
    </SettingsLayout>
  );
}
