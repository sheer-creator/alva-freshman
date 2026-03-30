/**
 * [INPUT]: AppShell
 * [OUTPUT]: 定价选择页面（Free / Pro）— 优化版
 * [POS]: 页面层 — 付费套餐选择
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import bgPricing from '@/assets/bg-pricing.png';
import cardGradient from '@/assets/card-gradient.png';

/* ========== 套餐特性数据 ========== */

interface Feature {
  bold: string;
  rest: string;
}

const FREE_FEATURES: Feature[] = [
  { bold: 'Alva Cloud Agent', rest: ' — 1,000 credits/day' },
  { bold: '1 active Playbook', rest: ' — full-featured, end to end' },
  { bold: 'Alva Skills', rest: ' — use Alva in your own agents' },
  { bold: 'All public market data', rest: ' — price, fundamentals, on-chain, macro & technicals' },
  { bold: 'Backtesting', rest: ' — 10 years of history, multi-asset' },
  { bold: 'Live execution', rest: ' — Alpaca, IBKR, Binance & more' },
];

const PRO_FEATURES: (Feature & { tag?: string })[] = [
  { bold: '3,000 credits/day', rest: '', tag: 'Limited Bonus' },
  { bold: '30,000 credits/month', rest: ' — for heavy research & iteration' },
  { bold: 'Unlimited Playbooks', rest: ' — 24/7 auto-refresh' },
  { bold: 'Private Playbooks', rest: ' — keep your strategies private' },
  { bold: 'Alternative data', rest: ' — smart money flows, analyst estimates & more' },
  { bold: 'Sentiment & media intelligence', rest: ' — news, X, YouTube, Reddit & more' },
  { bold: 'Early access', rest: ' — new features before anyone else' },
];

/* ========== Toggle ========== */

function BillingToggle({ annual, onChange }: { annual: boolean; onChange: (v: boolean) => void }) {
  return (
    <div
      className="inline-flex rounded-full p-[3px]"
      style={{ background: 'rgba(0,0,0,0.06)' }}
    >
      <button
        className="px-[16px] py-[6px] rounded-full text-[13px] leading-[20px] tracking-[0.13px] font-medium cursor-pointer transition-all"
        style={{
          background: !annual ? '#fff' : 'transparent',
          color: !annual ? 'var(--text-n9)' : 'var(--text-n5)',
          boxShadow: !annual ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
          border: 'none',
        }}
        onClick={() => onChange(false)}
      >
        Monthly
      </button>
      <button
        className="px-[16px] py-[6px] rounded-full text-[13px] leading-[20px] tracking-[0.13px] font-medium cursor-pointer transition-all"
        style={{
          background: annual ? '#fff' : 'transparent',
          color: annual ? 'var(--text-n9)' : 'var(--text-n5)',
          boxShadow: annual ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
          border: 'none',
        }}
        onClick={() => onChange(true)}
      >
        Annually · Save $60
      </button>
    </div>
  );
}

/* ========== Check Icon ========== */

function CheckIcon() {
  return (
    <span
      className="absolute left-0 top-[3px] w-[16px] h-[16px]"
      style={{
        backgroundColor: 'var(--main-m1, #49A3A6)',
        WebkitMask: 'url(https://alva-ai-static.b-cdn.net/icons/check-l1.svg) center / contain no-repeat',
        mask: 'url(https://alva-ai-static.b-cdn.net/icons/check-l1.svg) center / contain no-repeat',
      }}
    />
  );
}

/* ========== 页面 ========== */

export default function Pricing({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [annual, setAnnual] = useState(true); // 默认年付
  const proPrice = annual ? '24.9' : '29.9';

  return (
    <AppShell activePage="pricing" onNavigate={onNavigate}>
      <div
        className="flex flex-col min-h-full pb-[80px] rounded-[inherit]"
        style={{ background: `#fff url(${bgPricing}) center top / 100% auto no-repeat` }}
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-[16px] pt-[56px] pb-[24px] px-[28px] relative w-full">
          {/* Back button */}
          <div
            className="absolute left-[28px] top-[28px] flex items-center gap-[4px] cursor-pointer group"
            onClick={() => {
              if (window.history.length > 1) window.history.back();
              else onNavigate('home');
            }}
          >
            <div
              className="w-[12px] h-[12px] transition-colors bg-[rgba(0,0,0,0.5)] group-hover:bg-[rgba(0,0,0,0.9)]"
              style={{
                WebkitMask:
                  'url(https://alva-ai-static.b-cdn.net/icons/arrow-left-l2.svg) center / contain no-repeat',
                mask: 'url(https://alva-ai-static.b-cdn.net/icons/arrow-left-l2.svg) center / contain no-repeat',
              }}
            />
            <span className="text-[12px] leading-[20px] tracking-[0.12px] font-normal transition-colors text-[rgba(0,0,0,0.5)] group-hover:text-[rgba(0,0,0,0.9)]">
              Back
            </span>
          </div>

          <h1 className="font-['Delight',sans-serif] text-[22px] leading-[30px] font-normal text-[rgba(0,0,0,0.88)] text-center">
            Upgrade to Alva Pro
          </h1>
        </div>

        {/* Billing Toggle */}
        <div className="pb-[28px] flex justify-center">
          <BillingToggle annual={annual} onChange={setAnnual} />
        </div>

        {/* Cards */}
        <div className="w-full px-[28px] pb-[24px]">
          <div className="grid grid-cols-2 gap-[24px] max-w-[960px] mx-auto items-stretch">
            {/* ── Free ── */}
            <div
              className="flex flex-col gap-[20px] rounded-[16px] bg-white p-[28px] pb-[32px]"
              style={{ border: '0.5px solid var(--line-l2)' }}
            >
              {/* Header */}
              <div className="flex flex-col gap-[12px]">
                <span
                  className="text-[18px] font-normal leading-[28px] tracking-[0.18px]"
                  style={{ color: 'var(--text-n9)' }}
                >
                  Free
                </span>
                <div>
                  <span className="text-[36px] font-normal leading-[46px]" style={{ color: 'var(--text-n9)' }}>
                    $0
                  </span>
                  <span
                    className="text-[14px] leading-[22px] tracking-[0.14px] ml-[4px]"
                    style={{ color: 'var(--text-n5)' }}
                  >
                    / month
                  </span>
                </div>
                {/* 占位：对齐 Pro 的 early bird */}
                {annual && <span className="text-[12px] leading-[18px]">&nbsp;</span>}
              </div>

              {/* CTA */}
              <button
                className="w-full h-[48px] rounded-[6px] text-[14px] font-medium leading-[22px] tracking-[0.14px] cursor-pointer transition-all hover:border-[rgba(0,0,0,0.5)]"
                style={{
                  color: 'var(--text-n7)',
                  background: 'transparent',
                  border: '0.5px solid rgba(0,0,0,0.2)',
                  fontFamily: "'Delight', sans-serif",
                }}
                onClick={() => onNavigate('home')}
              >
                Get started — it's free
              </button>

              {/* Features */}
              <span
                className="text-[14px] font-normal leading-[22px] tracking-[0.14px]"
                style={{ color: 'var(--text-n7)' }}
              >
                Everything you need to research, build & trade
              </span>
              <ul className="flex flex-col gap-[16px] list-none p-0 m-0">
                {FREE_FEATURES.map((f) => (
                  <li
                    key={f.bold}
                    className="text-[14px] leading-[22px] tracking-[0.14px] pl-[24px] relative"
                    style={{ color: 'var(--text-n9)' }}
                  >
                    <CheckIcon />
                    <strong className="font-medium">{f.bold}</strong>
                    {f.rest}
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Pro ── */}
            <div
              className="relative flex flex-col gap-[20px] rounded-[16px] bg-white p-[28px] pb-[32px] overflow-hidden"
              style={{ border: '1.5px solid var(--main-m1, #49A3A6)' }}
            >
              <img src={cardGradient} alt="" className="absolute top-0 right-0 pointer-events-none" />

              {/* Recommended Badge */}
              <div
                className="absolute top-[16px] right-[16px] text-[11px] leading-[16px] tracking-[0.22px] font-medium px-[10px] py-[3px] rounded-full z-10"
                style={{
                  background: 'var(--main-m1, #49A3A6)',
                  color: '#fff',
                  letterSpacing: '0.4px',
                  textTransform: 'uppercase',
                }}
              >
                Recommended
              </div>

              {/* Header */}
              <div className="flex flex-col gap-[12px]">
                <span
                  className="text-[18px] font-normal leading-[28px] tracking-[0.18px]"
                  style={{ color: 'var(--text-n9)' }}
                >
                  Pro
                </span>
                <div className="flex items-baseline gap-[8px]">
                  <span
                    className="text-[36px] font-normal leading-[46px]"
                    style={{ color: 'var(--main-m1, #49A3A6)' }}
                  >
                    ${proPrice}
                  </span>
                  <span
                    className="text-[14px] leading-[22px] tracking-[0.14px]"
                    style={{ color: 'var(--text-n5)' }}
                  >
                    / month
                  </span>
                  {annual && (
                    <span
                      className="text-[14px] leading-[22px] tracking-[0.14px] line-through"
                      style={{ color: 'var(--text-n3)' }}
                    >
                      $29.9
                    </span>
                  )}
                </div>
                {annual && (
                  <span
                    className="inline-flex items-center gap-[5px] text-[11px] leading-[16px] tracking-[0.22px] font-medium px-[10px] py-[3px] rounded-full w-fit"
                    style={{ background: 'rgba(73, 163, 166, 0.10)', color: 'var(--main-m1, #49A3A6)' }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="1.5" y="5" width="9" height="2" rx="0.5" stroke="currentColor" strokeLinejoin="round"/>
                      <rect x="2.5" y="7" width="7" height="3.5" rx="0.5" stroke="currentColor" strokeLinejoin="round"/>
                      <line x1="6" y1="5" x2="6" y2="10.5" stroke="currentColor"/>
                      <path d="M6 5C6 5 6 3 4.5 2C3.5 1.3 2.5 2 3 3C3.5 4 6 5 6 5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6 5C6 5 6 3 7.5 2C8.5 1.3 9.5 2 9 3C8.5 4 6 5 6 5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Early bird — locked in while you subscribe annually
                  </span>
                )}
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
                Upgrade to Pro
              </button>

              {/* Features — grouped */}
              <span
                className="text-[14px] font-normal leading-[22px] tracking-[0.14px]"
                style={{ color: 'var(--text-n7)' }}
              >
                Everything in Free, plus
              </span>

              <ul className="flex flex-col gap-[16px] list-none p-0 m-0">
                {PRO_FEATURES.map((f) => (
                  <li
                    key={f.bold}
                    className="text-[14px] leading-[22px] tracking-[0.14px] pl-[24px] relative"
                    style={{ color: 'var(--text-n9)' }}
                  >
                    <CheckIcon />
                    <strong className="font-medium">{f.bold}</strong>
                    {f.tag && (
                      <span className="ml-[6px] text-[10px] leading-[14px] px-[4px] py-[1px] rounded-[3px] font-medium align-middle" style={{ color: '#E6A91A', background: 'rgba(230,169,26,0.12)' }}>
                        {f.tag}
                      </span>
                    )}
                    {f.rest}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="flex items-center justify-center gap-[6px] pb-[8px]">
          <span className="text-[13px] leading-[20px] tracking-[0.13px]" style={{ color: 'var(--text-n5)' }}>Need help?</span>
          <a href="https://discord.gg/alva" target="_blank" rel="noopener noreferrer" className="text-[13px] leading-[20px] tracking-[0.13px] font-medium no-underline hover:underline" style={{ color: 'var(--main-m1, #49A3A6)' }}>
            Contact us on Discord
          </a>
        </div>

      </div>
    </AppShell>
  );
}
