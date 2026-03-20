/**
 * [INPUT]: AppShell
 * [OUTPUT]: 定价选择页面（Free / Pro）
 * [POS]: 页面层 — 付费套餐选择
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';

/* ========== 套餐特性数据 ========== */

interface Feature {
  section: string;
  items: string[];
}

const FREE_FEATURES: Feature[] = [
  {
    section: 'Data Access',
    items: [
      '50 API calls per day',
      'Basic market data (delayed 15 min)',
      'Community playbooks (read-only)',
    ],
  },
  {
    section: 'Skills & Playbooks',
    items: [
      'Up to 3 custom playbooks',
      '5 skill executions per day',
      'Basic charting & visualization',
    ],
  },
];

const PRO_FEATURES: Feature[] = [
  {
    section: 'Data Access',
    items: [
      'Unlimited API calls',
      'Real-time market data',
      'Full access to 250+ data sources',
    ],
  },
  {
    section: 'Skills & Playbooks',
    items: [
      'Unlimited custom playbooks',
      'Unlimited skill executions',
      'Advanced charting & backtesting',
      'Priority cloud execution',
      'Early access to new features',
    ],
  },
];

/* ========== CheckIcon ========== */

function CheckIcon() {
  return (
    <img src="https://alva-ai-static.b-cdn.net/icons/check-l1.svg" alt="" width={16} height={16} style={{ flexShrink: 0, marginTop: 2 }} />
  );
}

/* ========== FeatureList ========== */

function FeatureList({ features }: { features: Feature[] }) {
  return (
    <div className="flex flex-col gap-[16px]">
      {features.map((f) => (
        <div key={f.section} className="flex flex-col gap-[8px]">
          <p className="text-[13px] font-medium leading-[20px]" style={{ color: 'var(--text-n9)' }}>
            {f.section}
          </p>
          {f.items.map((item) => (
            <div key={item} className="flex items-start gap-[8px]">
              <CheckIcon />
              <span className="text-[13px] leading-[20px]" style={{ color: 'var(--text-n7)' }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ========== Toggle ========== */

function AnnualToggle({ annual, onChange }: { annual: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center gap-[8px]">
      <span className="text-[12px] leading-[18px]" style={{ color: 'var(--text-n5)' }}>Annually</span>
      <button
        type="button"
        onClick={() => onChange(!annual)}
        className="relative inline-flex h-[20px] w-[36px] items-center rounded-full transition-colors cursor-pointer"
        style={{ background: annual ? '#49A3A6' : 'rgba(0,0,0,0.15)' }}
      >
        <span
          className="inline-block size-[16px] rounded-full bg-white transition-transform"
          style={{ transform: annual ? 'translateX(18px)' : 'translateX(2px)' }}
        />
      </button>
    </div>
  );
}

/* ========== 页面 ========== */

export default function Pricing({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [annual, setAnnual] = useState(false);
  const proPrice = annual ? 19 : 29;

  return (
    <AppShell activePage="pricing" onNavigate={onNavigate}>
      <div className="flex flex-col items-center min-h-full pb-[80px] rounded-[inherit]"
        style={{ background: 'linear-gradient(135deg, #f8fffe 0%, #f0faf9 40%, #ffffff 100%)' }}
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-[12px] pt-[56px] pb-[40px] px-[28px]">
          <h1 className="text-[32px] leading-[40px] tracking-[-0.3px]"
            style={{ color: 'var(--text-n9)', fontFamily: "'Delight', serif", fontWeight: 400 }}
          >
            Select Your Plan
          </h1>
          <p className="text-[14px] leading-[22px] text-center max-w-[520px]" style={{ color: 'var(--text-n5)' }}>
            Unlock the full power of Alva — real-time data, unlimited skills, and advanced analytics to supercharge your financial research.
          </p>
        </div>

        {/* Cards */}
        <div className="flex gap-[24px] px-[28px] w-full max-w-[800px]">
          {/* Free */}
          <div className="flex-1 flex flex-col rounded-[12px] border border-[rgba(0,0,0,0.08)] bg-white p-[28px]"
            style={{ boxShadow: 'var(--shadow-s)' }}
          >
            <p className="text-[20px] font-medium leading-[28px]" style={{ color: 'var(--text-n9)' }}>Free</p>
            <div className="flex items-baseline gap-[4px] mt-[8px]">
              <span className="text-[40px] leading-[48px]" style={{ color: 'var(--text-n9)', fontWeight: 400 }}>$0</span>
              <span className="text-[14px] leading-[22px]" style={{ color: 'var(--text-n5)' }}>/ month</span>
            </div>
            <button
              className="mt-[20px] w-full h-[40px] rounded-[6px] border border-[rgba(0,0,0,0.15)] text-[14px] font-medium cursor-default"
              style={{ color: 'var(--text-n7)', background: 'transparent' }}
              disabled
            >
              Current Plan
            </button>
            <div className="mt-[24px] border-t border-[rgba(0,0,0,0.06)] pt-[20px]">
              <FeatureList features={FREE_FEATURES} />
            </div>
          </div>

          {/* Pro */}
          <div className="flex-1 flex flex-col rounded-[12px] border border-[rgba(73,163,166,0.25)] bg-white p-[28px]"
            style={{ boxShadow: '0 8px 30px rgba(73,163,166,0.10)' }}
          >
            <div className="flex items-center justify-between">
              <p className="text-[20px] font-medium leading-[28px]" style={{ color: 'var(--text-n9)' }}>Pro</p>
              <AnnualToggle annual={annual} onChange={setAnnual} />
            </div>
            <div className="flex items-baseline gap-[4px] mt-[8px]">
              <span className="text-[40px] leading-[48px]" style={{ color: 'var(--text-n9)', fontWeight: 400 }}>${proPrice}</span>
              <span className="text-[14px] leading-[22px]" style={{ color: 'var(--text-n5)' }}>/ month</span>
            </div>
            {annual && (
              <p className="text-[12px] leading-[18px] mt-[4px]" style={{ color: '#49A3A6' }}>
                Save $120/year vs monthly
              </p>
            )}
            <button
              className="mt-[20px] w-full h-[40px] rounded-[6px] text-[14px] font-medium text-white cursor-pointer transition-opacity hover:opacity-90"
              style={{ background: '#49A3A6' }}
            >
              Upgrade
            </button>
            <div className="mt-[24px] border-t border-[rgba(0,0,0,0.06)] pt-[20px]">
              <FeatureList features={PRO_FEATURES} />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
