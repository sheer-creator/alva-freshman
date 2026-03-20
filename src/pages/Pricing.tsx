/**
 * [INPUT]: AppShell
 * [OUTPUT]: 定价选择页面（Free / Pro）
 * [POS]: 页面层 — 付费套餐选择
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import bgPricing from '@/assets/bg-pricing.png';

/* ========== 套餐特性数据 ========== */

interface Feature {
  bold: string;
  rest: string;
}

const FREE_FEATURES: Feature[] = [
  { bold: 'Alva Cloud Agent', rest: ' — base quota refreshes every 5 hours' },
  { bold: 'Up to 3 Playbooks', rest: ' — all public, manual refresh' },
  { bold: 'Backtesting', rest: ' — 1-year history, single asset' },
  { bold: 'Full access to public data', rest: ' — price, fundamentals, macro, on-chain, derivatives, technicals & screeners, refreshed daily' },
];

const PRO_FEATURES: Feature[] = [
  { bold: '20x Alva Cloud Agent quota', rest: ' — frontier models, heavy-duty research & building at scale' },
  { bold: 'Unlimited Playbooks', rest: ' — private or public, always-on 24/7 auto-refresh' },
  { bold: 'Real-time data', rest: ' — minute-level refresh for stocks & crypto' },
  { bold: 'Alternative data', rest: ' — smart money flows, analyst estimates & executive compensation' },
  { bold: 'Sentiment & media intelligence', rest: ' — news, X, YouTube, podcasts, Reddit' },
  { bold: 'Advanced backtesting', rest: ' — 10-year history, multi-asset portfolios' },
  { bold: 'Live trading', rest: ' — connect IBKR & Alpaca for stocks, Binance & major crypto exchanges' },
];

/* ========== Toggle ========== */

function AnnualToggle({ annual, onChange }: { annual: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center gap-[8px]">
      <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5)' }}>Annually</span>
      <div
        role="switch"
        aria-checked={annual}
        onClick={() => onChange(!annual)}
        className="relative inline-block w-[32px] h-[16px] rounded-full cursor-pointer transition-colors"
        style={{ background: annual ? 'var(--main-m1, #49A3A6)' : 'rgba(0,0,0,0.1)' }}
      >
        <div
          className="absolute top-1/2 w-[10.67px] h-[10.67px] rounded-full bg-white transition-[left]"
          style={{
            transform: 'translateY(-50%)',
            left: annual ? 'calc(100% - 10.67px - 2.67px)' : '2.67px',
          }}
        />
      </div>
    </div>
  );
}

/* ========== 页面 ========== */

export default function Pricing({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [annual, setAnnual] = useState(false);
  const proPrice = annual ? 19 : 29;

  return (
    <AppShell activePage="pricing" onNavigate={onNavigate}>
      <div className="flex flex-col min-h-full pb-[80px] rounded-[inherit]"
        style={{ background: `#fff url(${bgPricing}) center top / 100% auto no-repeat` }}
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-[16px] pt-[56px] pb-[32px] px-[28px] relative w-full">
          {/* Back button */}
          <div
            className="absolute left-[28px] top-[28px] flex items-center gap-[4px] cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div
              className="w-[12px] h-[12px] transition-colors bg-[rgba(0,0,0,0.5)] group-hover:bg-[rgba(0,0,0,0.9)]"
              style={{
                WebkitMask: 'url(https://alva-ai-static.b-cdn.net/icons/arrow-left-l2.svg) center / contain no-repeat',
                mask: 'url(https://alva-ai-static.b-cdn.net/icons/arrow-left-l2.svg) center / contain no-repeat',
              }}
            />
            <span className="text-[12px] leading-[20px] tracking-[0.12px] font-normal transition-colors text-[rgba(0,0,0,0.5)] group-hover:text-[rgba(0,0,0,0.9)]">Back</span>
          </div>
          <h1 className="text-[28px] leading-[38px] text-center"
            style={{ color: 'var(--text-n9)', fontFamily: "'Delight', serif", fontWeight: 400 }}
          >
            Select Your Plan
          </h1>
          <p className="text-[14px] leading-[22px] tracking-[0.14px] text-center max-w-[960px] mx-auto" style={{ color: 'var(--text-n7)' }}>
            Unlock the full power of Alva — real-time data, unlimited skills, and advanced analytics to supercharge your financial research.
          </p>
        </div>

        {/* Cards */}
        <div className="w-full px-[28px] pb-[40px]">
          <div className="grid grid-cols-2 gap-[24px] max-w-[960px] mx-auto">
            {/* Free */}
            <div className="flex flex-col gap-[20px] rounded-[16px] bg-white p-[28px] pb-[32px]"
              style={{ border: '0.5px solid rgba(0,0,0,0.3)' }}
            >
              {/* Header */}
              <div className="flex flex-col gap-[12px]">
                <span className="text-[18px] font-normal leading-[28px] tracking-[0.18px]" style={{ color: 'var(--text-n9)' }}>Free</span>
                <div>
                  <span className="text-[36px] font-normal leading-[46px]" style={{ color: 'var(--text-n9)' }}>$0</span>
                  <span className="text-[14px] leading-[22px] tracking-[0.14px] ml-[4px]" style={{ color: 'var(--text-n5)' }}>/ month</span>
                </div>
              </div>

              {/* CTA */}
              <button
                className="w-full h-[48px] rounded-[6px] text-[16px] font-medium leading-[26px] tracking-[0.16px] cursor-default"
                style={{
                  color: 'var(--text-n9)',
                  background: 'transparent',
                  border: '0.5px solid rgba(0,0,0,0.3)',
                  fontFamily: "'Delight', sans-serif",
                }}
                disabled
              >
                Current Plan
              </button>

              {/* Features */}
              <span className="text-[12px] font-normal leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5)' }}>
                What's included
              </span>
              <ul className="flex flex-col gap-[16px] list-none p-0 m-0">
                {FREE_FEATURES.map((f) => (
                  <li key={f.bold} className="text-[14px] leading-[22px] tracking-[0.14px] pl-[24px] relative" style={{ color: 'var(--text-n9)' }}>
                    <span className="absolute left-0 top-[3px] w-[16px] h-[16px]" style={{
                      backgroundColor: 'var(--main-m1, #49A3A6)',
                      WebkitMask: 'url(https://alva-ai-static.b-cdn.net/icons/check-l1.svg) center / contain no-repeat',
                      mask: 'url(https://alva-ai-static.b-cdn.net/icons/check-l1.svg) center / contain no-repeat',
                    }} />
                    <strong className="font-medium">{f.bold}</strong>{f.rest}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro */}
            <div className="flex flex-col gap-[20px] rounded-[16px] bg-white p-[28px] pb-[32px]"
              style={{ border: '0.5px solid #49A3A6' }}
            >
              {/* Header */}
              <div className="flex flex-col gap-[12px]">
                <div className="flex items-center justify-between">
                  <span className="text-[18px] font-normal leading-[28px] tracking-[0.18px]" style={{ color: 'var(--text-n9)' }}>Pro</span>
                  <AnnualToggle annual={annual} onChange={setAnnual} />
                </div>
                <div>
                  <span className="text-[36px] font-normal leading-[46px]" style={{ color: 'var(--main-m1, #49A3A6)' }}>${proPrice}</span>
                  <span className="text-[14px] leading-[22px] tracking-[0.14px] ml-[4px]" style={{ color: 'var(--text-n5)' }}>/ month</span>
                </div>
              </div>

              {/* CTA */}
              <button
                className="w-full h-[48px] rounded-[6px] text-[16px] font-medium leading-[26px] tracking-[0.16px] text-white cursor-pointer transition-all hover:brightness-90"
                style={{
                  background: 'var(--main-m1, #49A3A6)',
                  border: 'none',
                  fontFamily: "'Delight', sans-serif",
                }}
              >
                Upgrade
              </button>

              {/* Features */}
              <span className="text-[12px] font-normal leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5)' }}>
                Everything in Free, plus
              </span>
              <ul className="flex flex-col gap-[16px] list-none p-0 m-0">
                {PRO_FEATURES.map((f) => (
                  <li key={f.bold} className="text-[14px] leading-[22px] tracking-[0.14px] pl-[24px] relative" style={{ color: 'var(--text-n9)' }}>
                    <span className="absolute left-0 top-[3px] w-[16px] h-[16px]" style={{
                      backgroundColor: 'var(--main-m1, #49A3A6)',
                      WebkitMask: 'url(https://alva-ai-static.b-cdn.net/icons/check-l1.svg) center / contain no-repeat',
                      mask: 'url(https://alva-ai-static.b-cdn.net/icons/check-l1.svg) center / contain no-repeat',
                    }} />
                    <strong className="font-medium">{f.bold}</strong>{f.rest}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
