/**
 * [INPUT]: AppShell sidebar
 * [OUTPUT]: 用户浮窗 — Basic Info / Pro+Credits / 菜单 / Social
 * [POS]: shell 层 — 用户信息弹出面板
 */

import svgPaths from "@/data/svg-guyqw4in5w";
import { AVATAR_COLOR_PALETTE } from '@/lib/chart-theme';
import { CdnIcon } from '@/app/components/shared/CdnIcon';

/* ========== Constants ========== */

const USER = { name: 'YGGYLL', email: 'sheer@alva.xyz' };
const FONT = "'Delight', sans-serif";

const CREDITS = {
  daily:   { remaining: 1000,  color: '#78C26D', label: 'Daily',   tag: 'Limited Bonus' as string | null },
  monthly: { remaining: 3000,  color: '#2196F3', label: 'Monthly', tag: null },
  pack:    { remaining: 12000, color: '#FFBB1C', label: 'Pack',    tag: null },
};

const TOTAL = CREDITS.daily.remaining + CREDITS.monthly.remaining + CREDITS.pack.remaining;
const GRAND_TOTAL = 15000;

/* ========== Icons ========== */

function ArrowRight() {
  return <CdnIcon name="arrow-right-l2" size={12} color="rgba(0,0,0,0.5)" />;
}

/* ========== Menu item ========== */

function MenuItem({
  icon, label, onClick, dot = false,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  dot?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-between py-[12px] px-[20px] -mx-[20px] w-[calc(100%+40px)] text-left transition-colors hover:bg-[rgba(0,0,0,0.05)] cursor-pointer bg-transparent border-none"
    >
      <div className="flex items-center gap-[8px]">
        {icon}
        <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>{label}</span>
      </div>
      <div className="flex items-center gap-[6px]">
        {dot && <span className="w-[6px] h-[6px] rounded-full" style={{ background: '#49a3a6' }} />}
        <ArrowRight />
      </div>
    </button>
  );
}

/* ========== Main ========== */

export default function UserInfo({ onNavigate }: { onNavigate?: (hash: string) => void } = {}) {
  const initial = USER.name.trim().charAt(0).toUpperCase();
  const avatarColor = AVATAR_COLOR_PALETTE[[...USER.name].reduce((s, c) => s + c.charCodeAt(0), 0) % AVATAR_COLOR_PALETTE.length];
  const tiers = [CREDITS.daily, CREDITS.monthly, CREDITS.pack] as const;

  const go = (hash: string) => {
    if (onNavigate) onNavigate(hash);
    else if (hash) window.location.hash = hash;
  };

  return (
    <div className="bg-white relative rounded-[8px] size-full" data-name="User Info">
      <div className="flex flex-col px-[20px] overflow-clip rounded-[inherit] size-full">

        {/* Basic info — hover 通栏 */}
        <div
          onClick={() => go('account')}
          className="flex gap-[12px] items-center py-[20px] -mx-[20px] px-[20px] w-[calc(100%+40px)] cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.05)]"
        >
          <div className="w-[48px] h-[48px] rounded-full shrink-0 flex items-center justify-center" style={{ background: avatarColor }}>
            <span className="text-[21px] text-white leading-none" style={{ fontFamily: FONT }}>{initial}</span>
          </div>
          <div className="flex flex-col gap-[2px] min-w-0 flex-1">
            <span className="text-[16px] font-medium leading-[26px] tracking-[0.16px] truncate" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>{USER.name}</span>
            <div className="flex items-center gap-[4px]">
              <svg className="w-[14px] h-[14px] shrink-0" viewBox="0 0 14 14" fill="none">
                <rect width="14" height="14" rx="7" fill="white" />
                <g transform="translate(0.7 0.7) scale(1)">
                  <path d={svgPaths.p1336a380} fill="#4285F4" />
                  <path d={svgPaths.p1ab03700} fill="#34A853" />
                  <path d={svgPaths.p21044080} fill="#FBBC05" />
                  <path d={svgPaths.p1b002980} fill="#EB4335" />
                </g>
              </svg>
              <span className="text-[12px] leading-[20px] tracking-[0.12px] truncate" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>{USER.email}</span>
            </div>
          </div>
          <ArrowRight />
        </div>

        {/* divider — 不通栏 */}
        <div className="h-px w-full" style={{ background: 'rgba(0,0,0,0.07)' }} />

        {/* Pro / Credits */}
        <div className="py-[16px] flex flex-col">

          {/* Plan badges */}
          <div className="flex items-center gap-[4px]">
            <span className="text-[12px] font-medium leading-[20px] tracking-[0.12px]" style={{ color: 'rgba(0,0,0,0.7)', fontFamily: FONT }}>Pro</span>
            <span className="text-[11px] leading-[18px] tracking-[0.11px] px-[6px] rounded-full" style={{ color: '#49a3a6', background: 'rgba(73,163,166,0.1)', fontFamily: FONT }}>Annual</span>
          </div>

          {/* Credits total */}
          <div className="flex items-center gap-[4px] py-[8px]">
            <CdnIcon name="credit-l" size={16} color="rgba(0,0,0,0.7)" />
            <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'rgba(0,0,0,0.7)', fontFamily: FONT }}>Credits</span>
            <div className="flex-1 flex items-baseline justify-end gap-[4px]">
              <span className="text-[18px] leading-[28px] font-medium" style={{ color: '#49a3a6', fontFamily: FONT }}>{TOTAL.toLocaleString()}</span>
              <span className="text-[12px] leading-[20px]" style={{ color: 'rgba(0,0,0,0.3)', fontFamily: FONT }}>/ {GRAND_TOTAL.toLocaleString()}</span>
            </div>
          </div>

          {/* Stacked bar */}
          <div className="w-full h-[6px] rounded-full flex overflow-hidden" style={{ background: 'rgba(0,0,0,0.07)' }}>
            {tiers.map((t) => (
              <div key={t.label} className="h-full" style={{ width: `${(t.remaining / GRAND_TOTAL) * 100}%`, background: t.color }} />
            ))}
          </div>

          {/* Tier rows */}
          <div className="flex flex-col pt-[12px] gap-[4px]">
            {tiers.map((t) => (
              <div key={t.label} className="flex items-center gap-[4px]">
                <div className="w-[6px] h-[6px] rounded-full shrink-0" style={{ background: t.color }} />
                <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'rgba(0,0,0,0.7)', fontFamily: FONT }}>{t.label}</span>
                {t.tag && (
                  <span className="text-[11px] leading-[18px] tracking-[0.11px] px-[6px] rounded-full" style={{ color: '#E6A91A', background: 'rgba(230,169,26,0.1)', fontFamily: FONT }}>
                    {t.tag}
                  </span>
                )}
                <span className="flex-1 text-right text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>
                  {t.remaining.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* divider — 不通栏 */}
        <div className="h-px w-full" style={{ background: 'rgba(0,0,0,0.07)' }} />

        {/* Menu items */}
        <div className="py-[8px] flex flex-col">
          <MenuItem
            icon={<CdnIcon name="credit-l" size={20} color="rgba(0,0,0,0.9)" />}
            label="Billing"
            onClick={() => go('billing')}
          />
          <MenuItem
            icon={<CdnIcon name="gift-l" size={20} color="rgba(0,0,0,0.9)" />}
            label="Referral"
            onClick={() => go('referral-landing')}
          />
          <MenuItem
            icon={<CdnIcon name="wallet-l" size={20} color="rgba(0,0,0,0.9)" />}
            label="Creator Earnings"
            dot
          />
          <MenuItem
            icon={<CdnIcon name="language-l" size={20} color="rgba(0,0,0,0.9)" />}
            label="Language"
          />
          <MenuItem
            icon={<CdnIcon name="settings-l" size={20} color="rgba(0,0,0,0.9)" />}
            label="All Settings"
            onClick={() => go('account')}
          />
          <MenuItem
            icon={<CdnIcon name="logout-l" size={20} color="rgba(0,0,0,0.9)" />}
            label="Log Out"
          />
        </div>

        {/* divider — 不通栏 */}
        <div className="h-px w-full" style={{ background: 'rgba(0,0,0,0.07)' }} />

        {/* Social */}
        <div className="flex gap-[8px] py-[20px]">
          {[svgPaths.p1705fd00, svgPaths.p30e25500, svgPaths.p1a857180, svgPaths.p1ae3a8f0].map((path, i) => (
            <button
              key={i}
              type="button"
              className="flex-1 h-[32px] rounded-[6px] flex items-center justify-center cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.05)] bg-transparent"
              style={{ border: '0.5px solid rgba(0,0,0,0.3)' }}
              onClick={() => { if (i === 3) go('docs'); }}
            >
              <svg className="w-[16px] h-[16px]" viewBox="0 0 16 16" fill="none">
                <path d={path} fill="rgba(0,0,0,0.9)" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Border overlay */}
      <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(0,0,0,0.2)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_6px_20px_0px_rgba(0,0,0,0.04)]" />
    </div>
  );
}
