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
  credits: { used: 8000, total: 12000 },
};

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
  const pct = Math.min((PLAN.credits.used / PLAN.credits.total) * 100, 100);

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
          <h1 className="text-[28px] leading-[38px] mb-[24px]" style={{ color: 'var(--text-n9)', fontFamily: "'Delight', serif", fontWeight: 400 }}>
            Billing
          </h1>

          {/* Top row: Plan + Credits side by side */}
          <div className="grid grid-cols-[1fr_1fr] gap-[24px] mb-[24px]">

            {/* Plan card — 178px = 24 + 28 title + 16 + 48 price + 16 + 22 dates + 24 */}
            <div className="relative rounded-[12px] px-[24px] py-[24px] flex flex-col gap-[16px]" style={{ border: '0.5px solid rgba(73,163,166,0.4)', background: 'rgba(73,163,166,0.05)', height: 178 }}>
              <div className="flex items-center justify-between h-[28px]">
                <div className="flex items-center gap-[10px]">
                  <span className="text-[18px] font-normal leading-[28px] tracking-[0.18px]" style={{ color: 'var(--text-n9)' }}>{PLAN.name}</span>
                  <span className="text-[11px] leading-[18px] tracking-[0.11px] px-[8px] py-[1px] rounded-[4px]" style={{ color: 'var(--main-m1, #49A3A6)', background: 'rgba(73,163,166,0.15)' }}>Annually</span>
                </div>
                <ManageDropdown onNavigate={onNavigate} />
              </div>
              <div className="flex items-baseline gap-[4px] h-[48px]">
                <span className="text-[36px] font-normal leading-[48px]" style={{ color: 'var(--main-m1, #49A3A6)' }}>{PLAN.price}</span>
                <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5)' }}>/ {PLAN.interval}</span>
              </div>
              <div className="flex items-center gap-[24px] h-[22px]">
                <div className="flex items-center gap-[6px]">
                  <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5)' }}>Start Date</span>
                  <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n9)' }}>{PLAN.startDate}</span>
                </div>
                <div className="flex items-center gap-[6px]">
                  <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5)' }}>Next Billing</span>
                  <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n9)' }}>{PLAN.nextBilling}</span>
                </div>
              </div>
            </div>

            {/* Credits card — 178px = 24 + 28 title + 16 + 48 number + 16 + 22 bar + 24 */}
            <div className="relative rounded-[12px] px-[24px] py-[24px] flex flex-col gap-[16px]" style={{ border: '0.5px solid rgba(0,0,0,0.12)', background: '#fff', height: 178 }}>
              <div className="flex items-center h-[28px]">
                <span className="text-[18px] leading-[28px] tracking-[0.18px]" style={{ color: 'var(--text-n9)' }}>Credits</span>
              </div>
              <div className="flex items-baseline gap-[6px] h-[48px]">
                <span className="text-[36px] font-normal leading-[48px]" style={{ color: 'var(--text-n9)' }}>{PLAN.credits.used.toLocaleString()}</span>
                <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5)' }}>/ {PLAN.credits.total.toLocaleString()}</span>
              </div>
              {/* Progress bar row — h-22, bar vertically centered */}
              <div className="flex items-center h-[22px]">
                <div className="w-full h-[6px] rounded-full" style={{ background: 'rgba(0,0,0,0.06)' }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: 'var(--main-m1, #49A3A6)' }} />
                </div>
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

        </div></div>
      </div>
    </AppShell>
  );
}
