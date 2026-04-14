/**
 * [INPUT]: SettingsLayout
 * [OUTPUT]: Billing 页 — 订阅卡 + Credits 三档 + Auto-refill + 消耗记录
 * [POS]: 页面层 — 计费中心
 */

import { useState, useRef, useEffect } from 'react';
import type { Page } from '@/app/App';
import { SettingsLayout } from '@/app/components/shell/SettingsLayout';
import { CdnIcon } from '@/app/components/shared/CdnIcon';

const FONT = "'Delight', sans-serif";

/* ========== Data ========== */

const PLAN = { name: 'Pro', startDate: '01/08/2026', nextBilling: '01/08/2027' };

const CREDITS = {
  daily:   { used: 200,  total: 1000,   color: '#78C26D', expires: 'Reset in 6h',  hasBonus: true  },
  monthly: { used: 12720, total: 21360, color: '#2196F3', expires: 'Reset in 23d', hasBonus: false },
  pack:    { used: 1080, total: 4000,   color: '#FFBB1C', expires: 'Never expires', hasBonus: false },
};
const TOTAL_AVAILABLE =
  (CREDITS.daily.total - CREDITS.daily.used) +
  (CREDITS.monthly.total - CREDITS.monthly.used) +
  (CREDITS.pack.total - CREDITS.pack.used);

const HISTORY: { detail: string; icon: 'thread' | 'dashboard'; date: string; credits: number }[] = [
  { detail: 'Viral Video Spotlight',                        icon: 'thread',    date: '12/12/2025', credits: -80    },
  { detail: 'Monitoring Twitter for Crypto Token Performance', icon: 'dashboard', date: '12/12/2025', credits: -500   },
  { detail: 'New Feature Launch',                           icon: 'dashboard', date: '12/12/2025', credits: -1000  },
  { detail: 'Bitcoin News, Sentiment, and Market Analysis', icon: 'dashboard', date: '12/12/2025', credits: -2000  },
  { detail: 'Marketing Campaign Analysis',                  icon: 'thread',    date: '12/12/2025', credits: -300   },
  { detail: 'Operation promotion',                          icon: 'thread',    date: '12/12/2025', credits: 1500   },
  { detail: 'App Crash Reports',                            icon: 'dashboard', date: '12/12/2025', credits: -1200  },
  { detail: 'Website Traffic Surge',                        icon: 'dashboard', date: '12/12/2025', credits: -5000  },
  { detail: 'Clarification Needed for Number Inquiry',      icon: 'thread',    date: '12/12/2025', credits: -450   },
  { detail: 'Product Update Rollout',                       icon: 'thread',    date: '12/12/2025', credits: -200   },
  { detail: 'Invitation code submitted',                    icon: 'thread',    date: '12/12/2025', credits: 20000  },
];

const CREDIT_RATE = 1000;
const PRESETS = [5, 10, 50, 100] as const;

/* ========== Auto-refill Modal ========== */

function AutoRefillModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: (t: string, u: string) => void }) {
  const [threshold, setThreshold] = useState('5');
  const [topUp, setTopUp] = useState('15');
  const valid = Number(threshold) > 0 && Number(topUp) > 0 && Number(topUp) > Number(threshold);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="w-[440px] rounded-[12px] flex flex-col" style={{ background: '#fff', boxShadow: '0 10px 20px rgba(0,0,0,0.08)' }} onClick={(e) => e.stopPropagation()}>
        <div className="px-[24px] pt-[24px] pb-[16px] flex items-center justify-between">
          <span className="text-[18px] leading-[28px] tracking-[0.18px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>Turn on auto-refill?</span>
          <button className="w-[28px] h-[28px] flex items-center justify-center rounded-[4px] cursor-pointer hover:bg-[rgba(0,0,0,0.05)]" style={{ border: 'none', background: 'none' }} onClick={onClose}>
            <span className="text-[18px] leading-none" style={{ color: 'rgba(0,0,0,0.5)' }}>&times;</span>
          </button>
        </div>
        <div className="h-[0.5px] mx-[24px]" style={{ background: 'rgba(0,0,0,0.08)' }} />
        <div className="px-[24px] pt-[20px] pb-[24px] flex flex-col gap-[20px]">
          <span className="text-[14px] leading-[22px]" style={{ color: 'rgba(0,0,0,0.7)', fontFamily: FONT }}>
            Automatically buy more credits when your Pack balance runs low.
          </span>
          {([
            { label: 'When balance falls below', value: threshold, set: setThreshold },
            { label: 'Top up to',                value: topUp,     set: setTopUp    },
          ]).map((f) => (
            <div key={f.label} className="flex flex-col gap-[6px]">
              <span className="text-[12px] leading-[18px] tracking-[0.12px] font-medium" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>{f.label}</span>
              <div className="relative">
                <span className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[14px]" style={{ color: 'rgba(0,0,0,0.5)' }}>$</span>
                <input type="number" min="1" value={f.value} onChange={(e) => f.set(e.target.value)}
                  className="w-full h-[44px] pl-[28px] pr-[12px] rounded-[8px] text-[14px] outline-none"
                  style={{ color: 'rgba(0,0,0,0.9)', border: '1px solid rgba(0,0,0,0.12)', background: 'transparent', fontFamily: FONT }}
                />
              </div>
              {Number(f.value) > 0 && (
                <span className="text-[12px] leading-[18px]" style={{ color: 'rgba(0,0,0,0.3)', fontFamily: FONT }}>
                  = {(Number(f.value) * CREDIT_RATE).toLocaleString()} credits
                </span>
              )}
            </div>
          ))}
          <div className="flex items-center justify-end gap-[8px]">
            <button className="h-[40px] px-[20px] rounded-[8px] text-[14px] font-medium cursor-pointer" style={{ color: 'rgba(0,0,0,0.7)', border: '0.5px solid rgba(0,0,0,0.2)', background: 'transparent', fontFamily: FONT }} onClick={onClose}>Cancel</button>
            <button className="h-[40px] px-[20px] rounded-[8px] text-[14px] font-medium cursor-pointer" style={{ color: '#fff', background: valid ? '#49A3A6' : 'rgba(0,0,0,0.12)', border: 'none', opacity: valid ? 1 : 0.6, pointerEvents: valid ? 'auto' : 'none', fontFamily: FONT }} onClick={() => onConfirm(threshold, topUp)}>Turn on</button>
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
  const amount = isCustom ? (Number(custom) || 0) : selected!;
  const credits = amount * CREDIT_RATE;
  const valid = amount > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="w-[440px] rounded-[12px] flex flex-col" style={{ background: '#fff', boxShadow: '0 10px 20px rgba(0,0,0,0.08)' }} onClick={(e) => e.stopPropagation()}>
        <div className="px-[24px] pt-[24px] pb-[16px] flex items-center justify-between">
          <span className="text-[18px] leading-[28px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>Add Credits</span>
          <button className="w-[28px] h-[28px] flex items-center justify-center rounded-[4px] cursor-pointer hover:bg-[rgba(0,0,0,0.05)]" style={{ border: 'none', background: 'none' }} onClick={onClose}>
            <span className="text-[18px] leading-none" style={{ color: 'rgba(0,0,0,0.5)' }}>&times;</span>
          </button>
        </div>
        <div className="h-[0.5px] mx-[24px]" style={{ background: 'rgba(0,0,0,0.08)' }} />
        {step === 'select' && (
          <div className="px-[24px] pt-[20px] pb-[24px] flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[8px]">
              <span className="text-[12px] leading-[18px] font-medium" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>Select amount</span>
              <div className="grid grid-cols-4 gap-[8px]">
                {PRESETS.map((p) => (
                  <button key={p}
                    className="h-[44px] rounded-[8px] text-[15px] font-medium cursor-pointer"
                    style={{
                      color: selected === p ? '#fff' : 'rgba(0,0,0,0.9)',
                      background: selected === p ? '#49A3A6' : 'transparent',
                      border: selected === p ? '1px solid #49A3A6' : '1px solid rgba(0,0,0,0.12)',
                      fontFamily: FONT,
                    }}
                    onClick={() => { setSelected(p); setCustom(''); }}
                  >
                    ${p}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-[8px]">
              <span className="text-[12px] leading-[18px] font-medium" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>Or enter custom amount</span>
              <div className="relative">
                <span className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[15px]" style={{ color: 'rgba(0,0,0,0.5)' }}>$</span>
                <input type="number" min="1" placeholder="Enter amount" value={custom}
                  onFocus={() => setSelected(null)}
                  onChange={(e) => { setSelected(null); setCustom(e.target.value); }}
                  className="w-full h-[44px] pl-[28px] pr-[12px] rounded-[8px] text-[15px] outline-none"
                  style={{ color: 'rgba(0,0,0,0.9)', border: isCustom ? '1px solid #49A3A6' : '1px solid rgba(0,0,0,0.12)', background: 'transparent', fontFamily: FONT }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between px-[16px] py-[12px] rounded-[8px]" style={{ background: 'rgba(73,163,166,0.06)' }}>
              <span className="text-[14px]" style={{ color: 'rgba(0,0,0,0.7)', fontFamily: FONT }}>You'll receive</span>
              <span className="text-[16px] font-medium" style={{ color: valid ? '#49A3A6' : 'rgba(0,0,0,0.3)', fontFamily: FONT }}>
                {valid ? `${credits.toLocaleString()} credits` : '— credits'}
              </span>
            </div>
            <button
              disabled={!valid}
              onClick={() => { if (!valid) return; setStep('processing'); setTimeout(() => setStep('success'), 1500); }}
              className="h-[44px] rounded-[8px] text-[14px] font-medium cursor-pointer"
              style={{ color: '#fff', background: valid ? '#49A3A6' : 'rgba(0,0,0,0.12)', border: 'none', opacity: valid ? 1 : 0.6, fontFamily: FONT }}
            >
              Pay ${amount} with Stripe
            </button>
          </div>
        )}
        {step === 'processing' && (
          <div className="px-[24px] py-[48px] flex flex-col items-center gap-[16px]">
            <div className="w-[32px] h-[32px] rounded-full border-[3px] border-[rgba(0,0,0,0.08)] animate-spin" style={{ borderTopColor: '#49A3A6' }} />
            <span className="text-[14px]" style={{ color: 'rgba(0,0,0,0.7)', fontFamily: FONT }}>Processing payment...</span>
          </div>
        )}
        {step === 'success' && (
          <div className="px-[24px] py-[40px] flex flex-col items-center gap-[16px]">
            <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center" style={{ background: 'rgba(73,163,166,0.12)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#49A3A6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <span className="text-[16px] font-medium" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>Payment successful</span>
            <span className="text-[14px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>{credits.toLocaleString()} credits added to your Pack balance.</span>
            <button className="h-[40px] px-[24px] rounded-[8px] text-[14px] font-medium cursor-pointer mt-[4px]" style={{ color: '#fff', background: '#49A3A6', border: 'none', fontFamily: FONT }} onClick={onClose}>Done</button>
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
    const fn = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [open]);
  return (
    <div className="relative" ref={ref}>
      <button
        className="flex items-center gap-[4px] h-[28px] px-[8px] rounded-[6px] text-[12px] font-medium leading-[20px] tracking-[0.12px] cursor-pointer"
        style={{ color: 'rgba(0,0,0,0.9)', background: 'transparent', border: '0.5px solid rgba(0,0,0,0.3)', fontFamily: FONT }}
        onClick={() => setOpen(!open)}
      >
        <CdnIcon name="settings-l" size={14} color="rgba(0,0,0,0.9)" />
        Manage
      </button>
      {open && (
        <div className="absolute right-0 top-[36px] z-10 min-w-[180px] rounded-[6px] py-[8px]" style={{ background: '#fff', boxShadow: '0 6px 20px rgba(0,0,0,0.04)', border: '0.5px solid rgba(0,0,0,0.2)' }}>
          <button className="w-full text-left px-[16px] py-[7px] text-[14px] leading-[22px] cursor-pointer hover:bg-[rgba(0,0,0,0.03)]" style={{ color: 'rgba(0,0,0,0.9)', border: 'none', background: 'none', fontFamily: FONT }} onClick={() => { setOpen(false); onNavigate('pricing'); }}>Change Plan</button>
          <button className="w-full text-left px-[16px] py-[7px] text-[14px] leading-[22px] cursor-pointer hover:bg-[rgba(0,0,0,0.03)]" style={{ color: '#e05357', border: 'none', background: 'none', fontFamily: FONT }} onClick={() => setOpen(false)}>Cancel Subscription</button>
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

  const tiers = [
    { key: 'daily',   label: 'Daily',   ...CREDITS.daily },
    { key: 'monthly', label: 'Monthly', ...CREDITS.monthly },
    { key: 'pack',    label: 'Pack',    ...CREDITS.pack },
  ] as const;
  const grandTotal = tiers.reduce((a, t) => a + t.total, 0);

  return (
    <SettingsLayout active="billing" onNavigate={onNavigate}>

      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <h1 className="text-[28px] leading-[38px] tracking-[0.28px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT, fontWeight: 400 }}>Usage</h1>
        <button
          className="h-[28px] px-[12px] rounded-[6px] text-[12px] font-medium leading-[20px] tracking-[0.12px] cursor-pointer"
          style={{ color: 'rgba(0,0,0,0.9)', border: '0.5px solid rgba(0,0,0,0.3)', background: 'transparent', fontFamily: FONT }}
          onClick={() => onNavigate('pricing')}
        >
          View all plans
        </button>
      </div>

      {/* Plan card */}
      <div className="rounded-[12px] flex flex-col gap-[16px] pt-[24px] pb-[16px] px-[24px]" style={{ background: 'rgba(255,255,255,0.7)', border: '0.5px solid rgba(0,0,0,0.2)' }}>

        {/* Top row */}
        <div className="flex items-center gap-[12px]">
          <div className="flex-1 flex items-center gap-[8px]">
            <span className="text-[18px] leading-[28px] tracking-[0.18px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>{PLAN.name}</span>
            <span className="text-[12px] leading-[20px] tracking-[0.12px] px-[6px] rounded-[4px]" style={{ color: '#49a3a6', background: 'rgba(73,163,166,0.1)', fontFamily: FONT }}>Annually</span>
          </div>
          <button
            className="btn btn-primary btn-extra-small"
            style={{ paddingLeft: 'var(--spacing-s)', paddingRight: 'var(--spacing-s)' }}
            onClick={() => setShowAddCredits(true)}
          >
            <CdnIcon name="add-l2" size={14} color="#fff" />
            <span style={{ fontFamily: FONT }}>Add credits</span>
          </button>
          <ManageDropdown onNavigate={onNavigate} />
        </div>

        {/* Dates */}
        <div className="flex gap-[24px] text-[14px] leading-[22px]" style={{ fontFamily: FONT }}>
          <div className="flex gap-[8px]">
            <span style={{ color: 'rgba(0,0,0,0.5)' }}>Start Date</span>
            <span style={{ color: 'rgba(0,0,0,0.7)' }}>{PLAN.startDate}</span>
          </div>
          <div className="flex gap-[8px]">
            <span style={{ color: 'rgba(0,0,0,0.5)' }}>Next Billing</span>
            <span style={{ color: 'rgba(0,0,0,0.7)' }}>{PLAN.nextBilling}</span>
          </div>
        </div>

        <div className="h-px w-full" style={{ background: 'rgba(0,0,0,0.07)' }} />

        {/* Available */}
        <div className="flex flex-col gap-[8px]">
          <div className="flex items-end gap-[8px] h-[64px]">
            <div className="flex flex-col">
              <span className="text-[14px] leading-[22px]" style={{ color: '#000', fontFamily: FONT }}>Available</span>
              <div className="flex items-end gap-[8px]">
                <span className="text-[32px] leading-[42px] tracking-[0.32px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT, fontWeight: 400 }}>
                  {TOTAL_AVAILABLE.toLocaleString()}
                </span>
                <span className="text-[12px] leading-[20px] py-[7px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>Credits</span>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-end py-[7px]">
              <span className="text-[12px] leading-[20px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>
                300 expire tomorrow, 2,400 in 3 days  •  10% Used
              </span>
            </div>
          </div>
          <div className="w-full h-[6px] rounded-full flex overflow-hidden" style={{ background: 'rgba(0,0,0,0.07)' }}>
            {tiers.map(t => (
              <div key={t.key} className="h-full" style={{ width: `${((t.total - t.used) / grandTotal) * 100}%`, background: t.color }} />
            ))}
          </div>
        </div>

        {/* Buckets */}
        <div className="flex gap-[24px] py-[8px]">
          {tiers.map(t => {
            const remaining = t.total - t.used;
            const pct = (remaining / t.total) * 100;
            return (
              <div key={t.key} className="flex-1 min-w-0 flex flex-col gap-[4px]">
                <div className="flex items-end justify-between">
                  <div className="flex flex-col gap-[4px]">
                    <div className="flex items-center gap-[4px]">
                      <span className="text-[13px] font-medium" style={{ color: '#1a1f24', fontFamily: FONT }}>{t.label}</span>
                      {t.hasBonus && (
                        <span className="text-[11px] leading-[18px] tracking-[0.11px] px-[6px] rounded-full" style={{ color: '#e6a91a', background: 'rgba(230,169,26,0.1)', fontFamily: FONT }}>Limited Bonus</span>
                      )}
                    </div>
                    <div className="flex items-end gap-[4px]">
                      <span className="text-[20px] leading-[30px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT, fontWeight: 400 }}>{remaining.toLocaleString()}</span>
                      <span className="text-[14px] leading-[22px] py-[3px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>/ {t.total.toLocaleString()}</span>
                    </div>
                  </div>
                  <span className="text-[10px] leading-[16px] pb-[6px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>{t.expires}</span>
                </div>
                <div className="h-[6px] rounded-[3px] overflow-hidden" style={{ background: 'rgba(0,0,0,0.07)' }}>
                  <div className="h-full rounded-[3px]" style={{ width: `${pct}%`, background: t.color }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Tips */}
        <div className="flex items-center gap-[8px] px-[16px] py-[12px] rounded-[6px]" style={{ background: 'rgba(230,169,26,0.1)' }}>
          <CdnIcon name="warning-f" size={16} color="#e6a91a" />
          <span className="flex-1 text-[14px] leading-[22px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>
            Your subscription will expire on Jan 8, 2027 and you will be downgraded to Free afterward.
          </span>
          <CdnIcon name="arrow-right-l1" size={14} color="rgba(0,0,0,0.5)" />
        </div>

        <div className="h-px w-full" style={{ background: 'rgba(0,0,0,0.07)' }} />

        {/* Auto-refill */}
        <div className="flex items-center gap-[16px]">
          <div className="flex-1 flex flex-col">
            <span className="text-[14px] leading-[22px]" style={{ color: '#000', fontFamily: FONT }}>Auto-refill</span>
            <span className="text-[12px] leading-[20px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>
              {autoRefill ? `Below $${refillThreshold} → top up $${refillTopUp}` : 'Automatically top up credits when your balance runs low.'}
            </span>
          </div>
          <button
            className="flex items-center gap-[8px] cursor-pointer"
            style={{ background: 'none', border: 'none', padding: 0 }}
            onClick={() => { if (autoRefill) setAutoRefill(false); else setShowAutoRefill(true); }}
          >
            <span className="text-[14px] leading-[22px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>{autoRefill ? 'On' : 'Off'}</span>
            <CdnIcon name="arrow-right-l2" size={12} color="rgba(0,0,0,0.5)" />
          </button>
        </div>
      </div>

      {/* Credits History */}
      <div className="rounded-[12px] overflow-hidden flex flex-col" style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.2)' }}>
        <div className="flex items-center px-[24px] py-[16px]">
          <span className="flex-1 text-[16px] leading-[26px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>Credits History</span>
        </div>
        <div className="flex items-center gap-[20px] px-[24px] py-[12px]" style={{ background: 'rgba(0,0,0,0.02)' }}>
          <span className="flex-1 text-[12px] leading-[20px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>Detail</span>
          <span className="w-[100px] text-right text-[12px] leading-[20px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>Date</span>
          <span className="w-[100px] text-right text-[12px] leading-[20px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>Credits Usage</span>
        </div>
        {HISTORY.map((h, i) => (
          <div key={i} className="flex items-center gap-[20px] px-[24px] py-[16px]" style={{ background: i % 2 === 1 ? 'rgba(0,0,0,0.02)' : 'transparent' }}>
            <div className="flex-1 min-w-0 flex items-center gap-[4px]">
              <CdnIcon name={h.icon === 'thread' ? 'sidebar-thread-normal' : 'sidebar-dashboard-normal'} size={20} color="rgba(0,0,0,0.7)" />
              <span className="truncate text-[14px] leading-[22px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>{h.detail}</span>
            </div>
            <span className="w-[100px] text-right text-[14px] leading-[22px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>{h.date}</span>
            <span className="w-[100px] text-right text-[14px] leading-[22px] font-medium" style={{ color: h.credits > 0 ? '#49a3a6' : 'rgba(0,0,0,0.9)', fontFamily: FONT }}>
              {h.credits > 0 ? '+' : ''}{h.credits.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {showAddCredits && <AddCreditsModal onClose={() => setShowAddCredits(false)} />}
      {showAutoRefill && (
        <AutoRefillModal
          onClose={() => setShowAutoRefill(false)}
          onConfirm={(t, u) => { setRefillThreshold(t); setRefillTopUp(u); setAutoRefill(true); setShowAutoRefill(false); }}
        />
      )}
    </SettingsLayout>
  );
}
