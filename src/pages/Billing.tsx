/**
 * [INPUT]: AppShell
 * [OUTPUT]: Billing 页 — 订阅 & 用量 & 消耗记录
 * [POS]: 页面层 — 计费中心
 */

import { useState, useRef, useEffect } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';

/* ========== Data ========== */

const PLAN = {
  name: 'Pro', price: '$29', interval: 'month',
  startDate: '01/08/2026', nextBilling: '01/08/2027',
};

const CREDITS = {
  daily:   { used: 1820, total: 3000,  color: '#6BC4B0', status: 'Resets in 6h',    statusColor: 'var(--text-n5)' },
  monthly: { used: 8640, total: 30000, color: '#49A3A6', status: 'Resets in 23d',   statusColor: 'var(--text-n5)' },
  pack:    { used: 2100, total: 5000,  color: '#2D7F83', status: 'Never expires',   statusColor: 'var(--text-n5)' },
};

const TOTAL_AVAILABLE = CREDITS.daily.total + CREDITS.monthly.total + CREDITS.pack.total - CREDITS.daily.used - CREDITS.monthly.used - CREDITS.pack.used;

const HISTORY = [
  { detail: 'Viral Video Spotlight', date: '12/12/2025', credits: -80 },
  { detail: 'Monitoring Twitter for Crypto Token Performance', date: '12/12/2025', credits: -500 },
  { detail: 'New Feature Launch', date: '12/12/2025', credits: -1000 },
  { detail: 'Bitcoin News, Sentiment, and Market Analysis', date: '12/12/2025', credits: -2000 },
  { detail: 'Marketing Campaign Analysis', date: '12/12/2025', credits: -300 },
  { detail: 'Operation promotion', date: '12/12/2025', credits: 1500 },
  { detail: 'App Crash Reports', date: '12/12/2025', credits: -1200 },
  { detail: 'Website Traffic Surge', date: '12/12/2025', credits: -5000 },
  { detail: 'Clarification Needed for Number Inquiry', date: '12/12/2025', credits: -450 },
  { detail: 'Product Update Rollout', date: '12/12/2025', credits: -200 },
  { detail: 'Invitation code submitted', date: '12/12/2025', credits: 20000 },
];

const CREDIT_RATE = 1000; // 1 USD = 1,000 credits
const PRESETS = [5, 10, 50, 100] as const;

/* ========== Auto-refill Modal ========== */

function AutoRefillModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: (threshold: string, topUp: string) => void }) {
  const [threshold, setThreshold] = useState('5');
  const [topUp, setTopUp] = useState('15');

  const thresholdCredits = (Number(threshold) || 0) * CREDIT_RATE;
  const topUpCredits = (Number(topUp) || 0) * CREDIT_RATE;
  const valid = Number(threshold) > 0 && Number(topUp) > 0 && Number(topUp) > Number(threshold);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="w-[440px] rounded-[12px] flex flex-col" style={{ background: '#fff', boxShadow: 'var(--shadow-l, 0 10px 20px rgba(0,0,0,0.08))' }} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="px-[24px] pt-[24px] pb-[16px] flex items-center justify-between">
          <span className="text-[18px] leading-[28px] tracking-[0.18px]" style={{ color: 'var(--text-n9)' }}>Turn on auto-refill?</span>
          <button className="w-[28px] h-[28px] flex items-center justify-center rounded-[4px] cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.05)]" onClick={onClose}>
            <span className="text-[18px] leading-none" style={{ color: 'var(--text-n5)' }}>&times;</span>
          </button>
        </div>

        <div className="h-[0.5px] mx-[24px]" style={{ background: 'rgba(0,0,0,0.08)' }} />

        <div className="px-[24px] pt-[20px] pb-[24px] flex flex-col gap-[20px]">

          <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n7)' }}>
            Automatically buy more credits when your Pack balance runs low.
          </span>

          {/* Threshold */}
          <div className="flex flex-col gap-[6px]">
            <span className="text-[12px] leading-[18px] tracking-[0.12px] font-medium" style={{ color: 'var(--text-n5)' }}>When balance falls below</span>
            <div className="relative">
              <span className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[14px]" style={{ color: 'var(--text-n5)' }}>$</span>
              <input
                type="number"
                min="1"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                className="w-full h-[44px] pl-[28px] pr-[12px] rounded-[8px] text-[14px] outline-none transition-all"
                style={{ color: 'var(--text-n9)', border: '1px solid rgba(0,0,0,0.12)', background: 'transparent' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--main-m1, #49A3A6)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'; }}
              />
            </div>
            {Number(threshold) > 0 && (
              <span className="text-[12px] leading-[18px] tracking-[0.12px]" style={{ color: 'var(--text-n3)' }}>
                = {thresholdCredits.toLocaleString()} credits
              </span>
            )}
          </div>

          {/* Top up */}
          <div className="flex flex-col gap-[6px]">
            <span className="text-[12px] leading-[18px] tracking-[0.12px] font-medium" style={{ color: 'var(--text-n5)' }}>Top up to</span>
            <div className="relative">
              <span className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[14px]" style={{ color: 'var(--text-n5)' }}>$</span>
              <input
                type="number"
                min="1"
                value={topUp}
                onChange={(e) => setTopUp(e.target.value)}
                className="w-full h-[44px] pl-[28px] pr-[12px] rounded-[8px] text-[14px] outline-none transition-all"
                style={{ color: 'var(--text-n9)', border: '1px solid rgba(0,0,0,0.12)', background: 'transparent' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--main-m1, #49A3A6)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'; }}
              />
            </div>
            {Number(topUp) > 0 && (
              <span className="text-[12px] leading-[18px] tracking-[0.12px]" style={{ color: 'var(--text-n3)' }}>
                = {topUpCredits.toLocaleString()} credits
              </span>
            )}
          </div>

          {/* Disclaimer */}
          <span className="text-[12px] leading-[18px] tracking-[0.12px]" style={{ color: 'var(--text-n3)' }}>
            Your card on file will be charged ${topUp || '—'} whenever your Pack balance drops below ${threshold || '—'} worth of credits. To cancel, turn off auto-refill.
          </span>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-[8px]">
            <button
              className="h-[40px] px-[20px] rounded-[8px] text-[14px] font-medium cursor-pointer transition-all"
              style={{ color: 'var(--text-n7)', border: '0.5px solid rgba(0,0,0,0.2)', background: 'transparent' }}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="h-[40px] px-[20px] rounded-[8px] text-[14px] font-medium cursor-pointer transition-all"
              style={{
                color: '#fff',
                background: valid ? 'var(--main-m1, #49A3A6)' : 'rgba(0,0,0,0.12)',
                border: 'none',
                opacity: valid ? 1 : 0.6,
                pointerEvents: valid ? 'auto' : 'none',
              }}
              onClick={() => { onConfirm(threshold, topUp); }}
            >
              Turn on
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========== Add Credits Modal ========== */

function AddCreditsModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<number | null>(10);
  const [custom, setCustom] = useState('');
  const [step, setStep] = useState<'select' | 'processing' | 'success'>('select');

  const isCustom = selected === null;
  const amount = isCustom ? (Number(custom) || 0) : selected;
  const credits = amount * CREDIT_RATE;
  const valid = amount > 0;

  const handlePay = () => {
    if (!valid) return;
    setStep('processing');
    setTimeout(() => setStep('success'), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="w-[440px] rounded-[12px] flex flex-col" style={{ background: '#fff', boxShadow: 'var(--shadow-l, 0 10px 20px rgba(0,0,0,0.08))' }} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="px-[24px] pt-[24px] pb-[16px] flex items-center justify-between">
          <span className="text-[18px] leading-[28px] tracking-[0.18px]" style={{ color: 'var(--text-n9)' }}>Add Credits</span>
          <button className="w-[28px] h-[28px] flex items-center justify-center rounded-[4px] cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.05)]" onClick={onClose}>
            <span className="text-[18px] leading-none" style={{ color: 'var(--text-n5)' }}>&times;</span>
          </button>
        </div>

        <div className="h-[0.5px] mx-[24px]" style={{ background: 'rgba(0,0,0,0.08)' }} />

        {step === 'select' && (
          <div className="px-[24px] pt-[20px] pb-[24px] flex flex-col gap-[20px]">

            {/* Presets */}
            <div className="flex flex-col gap-[8px]">
              <span className="text-[12px] leading-[18px] tracking-[0.12px] font-medium" style={{ color: 'var(--text-n5)' }}>Select amount</span>
              <div className="grid grid-cols-4 gap-[8px]">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    className="h-[44px] rounded-[8px] text-[15px] font-medium cursor-pointer transition-all"
                    style={{
                      color: selected === p ? '#fff' : 'var(--text-n9)',
                      background: selected === p ? 'var(--main-m1, #49A3A6)' : 'transparent',
                      border: selected === p ? '1px solid var(--main-m1, #49A3A6)' : '1px solid rgba(0,0,0,0.12)',
                    }}
                    onClick={() => { setSelected(p); setCustom(''); }}
                  >
                    ${p}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom input */}
            <div className="flex flex-col gap-[8px]">
              <span className="text-[12px] leading-[18px] tracking-[0.12px] font-medium" style={{ color: 'var(--text-n5)' }}>Or enter custom amount</span>
              <div className="relative">
                <span className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[15px]" style={{ color: 'var(--text-n5)' }}>$</span>
                <input
                  type="number"
                  min="1"
                  placeholder="Enter amount"
                  value={custom}
                  onFocus={() => setSelected(null)}
                  onChange={(e) => { setSelected(null); setCustom(e.target.value); }}
                  className="w-full h-[44px] pl-[28px] pr-[12px] rounded-[8px] text-[15px] outline-none transition-all"
                  style={{
                    color: 'var(--text-n9)',
                    border: isCustom ? '1px solid var(--main-m1, #49A3A6)' : '1px solid rgba(0,0,0,0.12)',
                    background: 'transparent',
                  }}
                />
              </div>
            </div>

            {/* Summary */}
            <div className="flex items-center justify-between px-[16px] py-[12px] rounded-[8px]" style={{ background: 'rgba(73,163,166,0.06)' }}>
              <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n7)' }}>You'll receive</span>
              <span className="text-[16px] leading-[24px] font-medium" style={{ color: valid ? 'var(--main-m1, #49A3A6)' : 'var(--text-n3)' }}>
                {valid ? `${credits.toLocaleString()} credits` : '— credits'}
              </span>
            </div>

            {/* Pay button */}
            <button
              className="h-[44px] rounded-[8px] text-[14px] font-medium cursor-pointer transition-all flex items-center justify-center gap-[8px]"
              style={{
                color: '#fff',
                background: valid ? 'var(--main-m1, #49A3A6)' : 'rgba(0,0,0,0.12)',
                border: 'none',
                opacity: valid ? 1 : 0.6,
                pointerEvents: valid ? 'auto' : 'none',
              }}
              onClick={handlePay}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              Pay ${amount} with Stripe
            </button>

            <span className="text-[12px] leading-[18px] tracking-[0.12px] text-center" style={{ color: 'var(--text-n3)' }}>
              Credits will be added to your Pack balance and never expire.
            </span>
          </div>
        )}

        {step === 'processing' && (
          <div className="px-[24px] py-[48px] flex flex-col items-center gap-[16px]">
            <div className="w-[32px] h-[32px] rounded-full border-[3px] border-[rgba(0,0,0,0.08)] animate-spin" style={{ borderTopColor: 'var(--main-m1, #49A3A6)' }} />
            <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n7)' }}>Processing payment...</span>
          </div>
        )}

        {step === 'success' && (
          <div className="px-[24px] py-[40px] flex flex-col items-center gap-[16px]">
            <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center" style={{ background: 'rgba(73,163,166,0.12)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--main-m1, #49A3A6)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="flex flex-col items-center gap-[4px]">
              <span className="text-[16px] leading-[24px] font-medium" style={{ color: 'var(--text-n9)' }}>Payment successful</span>
              <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5)' }}>
                {credits.toLocaleString()} credits added to your Pack balance.
              </span>
            </div>
            <button
              className="h-[40px] px-[24px] rounded-[8px] text-[14px] font-medium cursor-pointer transition-all mt-[4px]"
              style={{ color: '#fff', background: 'var(--main-m1, #49A3A6)', border: 'none' }}
              onClick={onClose}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ========== Manage Dropdown ========== */

function ManageDropdown({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        className="flex items-center gap-[4px] h-[28px] px-[8px] rounded-[4px] text-[12px] font-medium leading-[20px] tracking-[0.12px] cursor-pointer transition-all"
        style={{ color: 'var(--text-n7)', background: 'transparent', border: '0.5px solid var(--line-l3)' }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.5)'; }}
        onMouseLeave={(e) => { if (!open) e.currentTarget.style.borderColor = 'var(--line-l3)'; }}
        onClick={() => setOpen(!open)}
      >
        <div className="w-[14px] h-[14px]" style={{ background: 'var(--text-n7)', WebkitMask: 'url(https://alva-ai-static.b-cdn.net/icons/settings-l.svg) center / contain no-repeat', mask: 'url(https://alva-ai-static.b-cdn.net/icons/settings-l.svg) center / contain no-repeat' }} />
        Manage
      </button>

      {open && (
        <div className="absolute right-0 top-[36px] z-10 min-w-[180px] rounded-[6px] py-[8px]" style={{ background: '#fff', boxShadow: 'var(--shadow-s, 0 6px 20px rgba(0,0,0,0.04))', border: '0.5px solid rgba(0,0,0,0.2)' }}>
          <button
            className="w-full text-left px-[16px] py-[7px] text-[14px] leading-[22px] tracking-[0.14px] cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.03)]"
            style={{ color: 'var(--text-n9)' }}
            onClick={() => { setOpen(false); onNavigate('pricing'); }}
          >
            Change Plan
          </button>
          <button
            className="w-full text-left px-[16px] py-[7px] text-[14px] leading-[22px] tracking-[0.14px] cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.03)]"
            style={{ color: 'var(--main-m4, #e05357)' }}
            onClick={() => { setOpen(false); }}
          >
            Cancel Subscription
          </button>
        </div>
      )}
    </div>
  );
}

/* ========== Page ========== */

export default function Billing({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [showAddCredits, setShowAddCredits] = useState(false);
  const [showAutoRefill, setShowAutoRefill] = useState(false);
  const [autoRefill, setAutoRefill] = useState(false);
  const [refillThreshold, setRefillThreshold] = useState('5');
  const [refillTopUp, setRefillTopUp] = useState('15');
  const grandTotal = CREDITS.daily.total + CREDITS.monthly.total + CREDITS.pack.total;
  const tiers = [
    { key: 'daily',   label: 'Daily',   ...CREDITS.daily },
    { key: 'monthly', label: 'Monthly', ...CREDITS.monthly },
    { key: 'pack',    label: 'Pack',    ...CREDITS.pack },
  ] as const;

  return (
    <AppShell activePage="billing" onNavigate={onNavigate}>
      <div className="min-h-full" style={{ background: 'var(--b0-page, #fff)' }}>

        {/* Back */}
        <div className="px-[28px] pt-[28px]">
          <div className="flex items-center gap-[4px] cursor-pointer group w-fit"
            onClick={() => { if (window.history.length > 1) window.history.back(); else onNavigate('home'); }}
          >
            <div className="w-[12px] h-[12px] bg-[rgba(0,0,0,0.5)] group-hover:bg-[rgba(0,0,0,0.9)] transition-colors"
              style={{ WebkitMask: 'url(https://alva-ai-static.b-cdn.net/icons/arrow-left-l2.svg) center / contain no-repeat', mask: 'url(https://alva-ai-static.b-cdn.net/icons/arrow-left-l2.svg) center / contain no-repeat' }}
            />
            <span className="text-[12px] leading-[20px] tracking-[0.12px] text-[rgba(0,0,0,0.5)] group-hover:text-[rgba(0,0,0,0.9)] transition-colors">Back</span>
          </div>
        </div>

        <div className="px-[28px] pt-[24px] pb-[80px]"><div className="max-w-[960px] mx-auto">

          {/* Title */}
          <h1 className="text-[28px] leading-[38px] mb-[24px]" style={{ color: 'var(--text-n9)', fontFamily: "'Delight', -apple-system, BlinkMacSystemFont, sans-serif", fontWeight: 400 }}>
            Billing
          </h1>

          {/* Credits card — unified */}
          <div className="rounded-[12px] mb-[24px] flex flex-col" style={{ border: '0.5px solid rgba(0,0,0,0.12)', background: '#fff' }}>

            {/* Top section: plan info + actions */}
            <div className="px-[24px] pt-[24px] pb-[20px] flex items-start justify-between">
              <div className="flex flex-col gap-[12px]">
                <div className="flex items-center gap-[10px]">
                  <span className="text-[18px] font-normal leading-[28px] tracking-[0.18px]" style={{ color: 'var(--text-n9)' }}>{PLAN.name}</span>
                  <span className="text-[11px] leading-[18px] tracking-[0.11px] px-[8px] py-[1px] rounded-[4px]" style={{ color: 'var(--main-m1, #49A3A6)', background: 'rgba(73,163,166,0.15)' }}>Annually</span>
                  <span className="text-[12px] leading-[20px] tracking-[0.12px] cursor-pointer transition-colors hover:underline" style={{ color: 'var(--main-m1, #49A3A6)' }} onClick={() => onNavigate('pricing')}>View Plan →</span>
                </div>
                <div className="flex items-center gap-[24px]">
                  <div className="flex items-center gap-[6px]">
                    <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5)' }}>Start Date</span>
                    <span className="text-[14px] leading-[22px] tracking-[0.14px] font-medium" style={{ color: 'var(--text-n9)' }}>{PLAN.startDate}</span>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5)' }}>Next Billing</span>
                    <span className="text-[14px] leading-[22px] tracking-[0.14px] font-medium" style={{ color: 'var(--text-n9)' }}>{PLAN.nextBilling}</span>
                  </div>
                </div>
              </div>
              {/* Action buttons */}
              <div className="flex items-center gap-[8px]">
                <button
                  className="flex items-center gap-[4px] h-[28px] px-[8px] rounded-[4px] text-[12px] font-medium leading-[20px] tracking-[0.12px] cursor-pointer transition-all"
                  style={{ color: 'var(--main-m1, #49A3A6)', background: 'transparent', border: '0.5px solid rgba(73,163,166,0.4)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(73,163,166,0.06)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  onClick={() => setShowAddCredits(true)}
                >
                  <span className="text-[14px] leading-none">+</span>
                  Add Credits
                </button>
                <ManageDropdown onNavigate={onNavigate} />
              </div>
            </div>

            {/* Divider */}
            <div className="h-[0.5px] mx-[24px]" style={{ background: 'rgba(0,0,0,0.08)' }} />

            {/* Credits section */}
            <div className="px-[24px] pt-[20px] pb-[24px] flex flex-col gap-[20px]">

              {/* Available total */}
              <div className="flex flex-col gap-[4px]">
                <span className="text-[12px] leading-[18px] tracking-[0.6px] uppercase font-medium" style={{ color: 'var(--text-n5)' }}>Available</span>
                <div className="flex items-baseline gap-[8px]">
                  <span className="text-[40px] font-normal leading-[48px] tracking-[-0.5px]" style={{ color: 'var(--text-n9)', fontFamily: "'Delight', -apple-system, BlinkMacSystemFont, sans-serif" }}>
                    {TOTAL_AVAILABLE.toLocaleString()}
                  </span>
                  <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5)' }}>credits</span>
                </div>
              </div>

              {/* Stacked progress bar */}
              <div className="w-full h-[8px] rounded-full flex overflow-hidden" style={{ background: 'rgba(0,0,0,0.06)' }}>
                {tiers.map((t) => {
                  const pct = ((t.total - t.used) / grandTotal) * 100;
                  return <div key={t.key} className="h-full" style={{ width: `${pct}%`, background: t.color }} />;
                })}
              </div>

              {/* Tier rows */}
              <div className="flex flex-col gap-[24px]">
                {tiers.map((t) => {
                  const remaining = t.total - t.used;
                  const tierPct = t.total > 0 ? (t.used / t.total) * 100 : 0;
                  return (
                    <div key={t.key} className="grid grid-cols-[80px_1fr_auto] items-center gap-[16px]">
                      <div className="flex items-center gap-[8px]">
                        <div className="w-[8px] h-[8px] rounded-full shrink-0" style={{ background: t.color }} />
                        <span className="text-[14px] leading-[22px] tracking-[0.14px] font-medium" style={{ color: 'var(--text-n9)' }}>{t.label}</span>
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <div className="w-full h-[6px] rounded-full" style={{ background: 'rgba(0,0,0,0.06)' }}>
                          <div className="h-full rounded-full transition-all" style={{ width: `${tierPct}%`, background: t.color }} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-[6px]">
                            <span className="text-[12px] leading-[18px] tracking-[0.12px]" style={{ color: 'var(--text-n5)' }}>
                              {t.used.toLocaleString()} used
                            </span>
                            {t.key === 'daily' && (
                              <span className="text-[10px] leading-[14px] px-[4px] py-[1px] rounded-[3px] font-medium" style={{ color: '#E6A91A', background: 'rgba(230,169,26,0.12)' }}>Limited Bonus</span>
                            )}
                          </div>
                          <span className="text-[12px] leading-[18px] tracking-[0.12px]" style={{ color: t.statusColor }}>
                            {t.status}
                          </span>
                        </div>
                      </div>
                      <span className="text-[20px] leading-[28px] tracking-[-0.2px] font-medium min-w-[80px] text-right" style={{ color: 'var(--text-n9)' }}>
                        {remaining.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Auto-refill */}
              <div className="h-[0.5px]" style={{ background: 'rgba(0,0,0,0.08)' }} />
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-[2px]">
                  <div className="flex items-center gap-[8px]">
                    <span className="text-[14px] leading-[22px] tracking-[0.14px] font-medium" style={{ color: 'var(--text-n9)' }}>Auto-refill</span>
                    {autoRefill && (
                      <span className="text-[12px] leading-[18px] tracking-[0.12px]" style={{ color: 'var(--main-m1, #49A3A6)' }}>
                        Below ${refillThreshold} → top up ${refillTopUp}
                      </span>
                    )}
                  </div>
                  <span className="text-[12px] leading-[18px] tracking-[0.12px]" style={{ color: 'var(--text-n5)' }}>
                    Automatically top up credits when your balance runs low.
                  </span>
                </div>
                <button
                  className="w-[40px] h-[22px] rounded-full p-[2px] cursor-pointer transition-colors shrink-0"
                  style={{ background: autoRefill ? 'var(--main-m1, #49A3A6)' : 'rgba(0,0,0,0.15)' }}
                  onClick={() => { if (autoRefill) setAutoRefill(false); else setShowAutoRefill(true); }}
                >
                  <div
                    className="w-[18px] h-[18px] rounded-full transition-transform"
                    style={{ background: '#fff', transform: autoRefill ? 'translateX(18px)' : 'translateX(0)' }}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* History */}
          <div className="rounded-[12px]" style={{ border: '0.5px solid rgba(0,0,0,0.12)', background: '#fff' }}>
            {/* Header */}
            <div className="px-[24px] py-[16px]">
              <span className="text-[16px] leading-[24px] tracking-[0.16px]" style={{ color: 'var(--text-n9)' }}>Credits History</span>
            </div>
            {/* Table header */}
            <div className="grid grid-cols-[1fr_120px_120px] gap-[8px] px-[24px] py-[10px]" style={{ background: 'rgba(0,0,0,0.02)' }}>
              <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5)' }}>Detail</span>
              <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5)' }}>Date</span>
              <span className="text-[12px] leading-[20px] tracking-[0.12px] text-right" style={{ color: 'var(--text-n5)' }}>Credits Usage</span>
            </div>
            {/* Rows */}
            {HISTORY.map((h, i) => (
              <div key={i} className="grid grid-cols-[1fr_120px_120px] gap-[8px] px-[24px] py-[16px] items-center"
                style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)' }}
              >
                <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n9)' }}>{h.detail}</span>
                <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5)' }}>{h.date}</span>
                <span className="text-[14px] leading-[22px] tracking-[0.14px] text-right font-medium" style={{ color: h.credits > 0 ? 'var(--main-m1, #49A3A6)' : 'var(--text-n9)' }}>
                  {h.credits > 0 ? '+' : ''}{h.credits.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="flex items-center justify-center gap-[6px] pt-[24px]">
            <span className="text-[13px] leading-[20px] tracking-[0.13px]" style={{ color: 'var(--text-n5)' }}>Need help?</span>
            <a href="https://discord.gg/alva" target="_blank" rel="noopener noreferrer" className="text-[13px] leading-[20px] tracking-[0.13px] font-medium no-underline hover:underline" style={{ color: 'var(--main-m1, #49A3A6)' }}>
              Contact us on Discord
            </a>
          </div>

        </div></div>
      </div>
      {showAddCredits && <AddCreditsModal onClose={() => setShowAddCredits(false)} />}
      {showAutoRefill && (
        <AutoRefillModal
          onClose={() => setShowAutoRefill(false)}
          onConfirm={(t, u) => { setRefillThreshold(t); setRefillTopUp(u); setAutoRefill(true); setShowAutoRefill(false); }}
        />
      )}
    </AppShell>
  );
}
