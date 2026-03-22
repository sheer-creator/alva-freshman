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
  renewDate: 'Apr 20, 2026', credits: { used: 8420, total: 12000 },
};

const HISTORY = [
  { date: 'Mar 20', action: 'Playbook auto-refresh', credits: -120, balance: 8420 },
  { date: 'Mar 19', action: 'BTC Ultimate AI Trader — full analysis', credits: -350, balance: 8540 },
  { date: 'Mar 19', action: 'NVDA Panoramic — data refresh', credits: -80, balance: 8890 },
  { date: 'Mar 18', action: 'Skill: Sentiment Scanner × 12 assets', credits: -240, balance: 8970 },
  { date: 'Mar 18', action: 'Playbook auto-refresh', credits: -120, balance: 9210 },
  { date: 'Mar 17', action: 'Backtest: MAG7 Equal-Weight (3Y)', credits: -500, balance: 9330 },
  { date: 'Mar 17', action: 'Skill: Earnings Analyzer — AAPL', credits: -60, balance: 9830 },
  { date: 'Mar 16', action: 'Playbook auto-refresh', credits: -120, balance: 9890 },
  { date: 'Mar 15', action: 'Monthly credits top-up', credits: 12000, balance: 10010 },
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
        className="flex items-center gap-[6px] h-[32px] px-[12px] rounded-[4px] text-[12px] font-medium leading-[20px] tracking-[0.12px] cursor-pointer transition-all"
        style={{ color: 'var(--text-n7)', background: 'transparent', border: '0.5px solid rgba(0,0,0,0.15)' }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.5)'; }}
        onMouseLeave={(e) => { if (!open) e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)'; }}
        onClick={() => setOpen(!open)}
      >
        <img src="https://alva-ai-static.b-cdn.net/icons/settings-l.svg" alt="" className="w-[14px] h-[14px] opacity-50" />
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
  const remaining = PLAN.credits.total - PLAN.credits.used;

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
          <h1 className="text-[28px] leading-[38px] mb-[28px]" style={{ color: 'var(--text-n9)', fontFamily: "'Delight', serif", fontWeight: 400 }}>
            Billing
          </h1>

          {/* Top row: Plan + Credits side by side */}
          <div className="grid grid-cols-[1fr_1fr] gap-[20px] mb-[20px]">

            {/* Plan card */}
            <div className="relative rounded-[12px] p-[24px] flex flex-col" style={{ border: '0.5px solid rgba(73,163,166,0.2)', background: 'rgba(73,163,166,0.05)' }}>
              <div className="flex items-center justify-between mb-[16px]">
                <div className="flex items-center gap-[8px]">
                  <span className="text-[18px] font-normal leading-[28px] tracking-[0.18px]" style={{ color: 'var(--text-n9)' }}>{PLAN.name}</span>
                  <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5)' }}>Annually</span>
                </div>
                <ManageDropdown onNavigate={onNavigate} />
              </div>
              <div className="flex items-baseline gap-[4px]">
                <span className="text-[32px] font-normal leading-[40px]" style={{ color: 'var(--main-m1, #49A3A6)' }}>{PLAN.price}</span>
                <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5)' }}>/ {PLAN.interval}</span>
              </div>
              <span className="text-[12px] leading-[20px] tracking-[0.12px] mt-[4px]" style={{ color: 'var(--text-n5)' }}>
                Renews {PLAN.renewDate}
              </span>
            </div>

            {/* Credits card */}
            <div className="relative rounded-[12px] p-[24px] flex flex-col" style={{ border: '0.5px solid rgba(0,0,0,0.12)', background: '#fff' }}>
              <div className="flex items-center justify-between mb-[16px]">
                <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5)' }}>Credits</span>
                <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5)' }}>
                  Resets {PLAN.renewDate}
                </span>
              </div>
              <div className="flex items-baseline gap-[6px] mb-[4px]">
                <span className="text-[32px] font-normal leading-[40px]" style={{ color: 'var(--text-n9)' }}>{remaining.toLocaleString()}</span>
                <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5)' }}>/ {PLAN.credits.total.toLocaleString()}</span>
              </div>
              <span className="text-[12px] leading-[20px] tracking-[0.12px] mb-[16px]" style={{ color: 'var(--text-n5)' }}>
                remaining this cycle
              </span>
              {/* Progress bar */}
              <div className="w-full h-[6px] rounded-full" style={{ background: 'rgba(0,0,0,0.06)' }}>
                <div className="h-full rounded-full" style={{ width: `${100 - pct}%`, background: 'var(--main-m1, #49A3A6)' }} />
              </div>
            </div>
          </div>

          {/* History */}
          <div className="rounded-[12px]" style={{ border: '0.5px solid rgba(0,0,0,0.12)', background: '#fff' }}>
            {/* Header */}
            <div className="flex items-center justify-between px-[24px] py-[16px]" style={{ borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>
              <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n9)' }}>Credits History</span>
              <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5)' }}>This billing cycle</span>
            </div>
            {/* Table header */}
            <div className="grid grid-cols-[72px_1fr_100px_100px] gap-[8px] px-[24px] py-[10px]" style={{ borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>
              <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n7)' }}>Date</span>
              <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n7)' }}>Action</span>
              <span className="text-[12px] leading-[20px] tracking-[0.12px] text-right" style={{ color: 'var(--text-n7)' }}>Credits</span>
              <span className="text-[12px] leading-[20px] tracking-[0.12px] text-right" style={{ color: 'var(--text-n7)' }}>Balance</span>
            </div>
            {/* Rows */}
            {HISTORY.map((h, i) => (
              <div key={i} className="grid grid-cols-[72px_1fr_100px_100px] gap-[8px] px-[24px] py-[12px]"
                style={i < HISTORY.length - 1 ? { borderBottom: '0.5px solid rgba(0,0,0,0.04)' } : undefined}
              >
                <span className="text-[13px] leading-[20px] tracking-[0.13px]" style={{ color: 'var(--text-n9)' }}>{h.date}</span>
                <span className="text-[13px] leading-[20px] tracking-[0.13px] truncate" style={{ color: 'var(--text-n9)' }}>{h.action}</span>
                <span className="text-[13px] leading-[20px] tracking-[0.13px] text-right" style={{ color: h.credits > 0 ? 'var(--main-m3, #2a9b7d)' : 'var(--text-n9)' }}>
                  {h.credits > 0 ? '+' : ''}{h.credits.toLocaleString()}
                </span>
                <span className="text-[13px] leading-[20px] tracking-[0.13px] text-right" style={{ color: 'var(--text-n9)' }}>{h.balance.toLocaleString()}</span>
              </div>
            ))}
          </div>

        </div></div>
      </div>
    </AppShell>
  );
}
