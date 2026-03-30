/**
 * [INPUT]: AppShell sidebar
 * [OUTPUT]: 用户浮窗 — 头像、Plan、Credits 三层明细、菜单、社交
 * [POS]: shell 层 — 用户信息弹出面板
 */

import svgPaths from "@/data/svg-guyqw4in5w";
import { AVATAR_COLOR_PALETTE } from '@/lib/chart-theme';

/* ========== Constants ========== */

const USER = { name: 'YGGYLL', email: 'sheer@alva.xyz' };

const CREDITS = {
  daily:   { remaining: 1180,  color: '#6BC4B0', label: 'Daily' },
  monthly: { remaining: 21360, color: '#49A3A6', label: 'Monthly' },
  pack:    { remaining: 2900,  color: '#2D7F83', label: 'Pack' },
};

const TOTAL = CREDITS.daily.remaining + CREDITS.monthly.remaining + CREDITS.pack.remaining;
const GRAND_TOTAL = 38000;

/* ========== Icons ========== */

function ArrowRight() {
  return (
    <svg className="shrink-0 w-[12px] h-[12px]" viewBox="0 0 12 12" fill="none">
      <path d={svgPaths.p370d6700} fill="black" fillOpacity="0.5" />
    </svg>
  );
}

/* ========== Main ========== */

export default function UserInfo() {
  const initial = USER.name.trim().charAt(0).toUpperCase();
  const avatarColor = AVATAR_COLOR_PALETTE[[...USER.name].reduce((s, c) => s + c.charCodeAt(0), 0) % AVATAR_COLOR_PALETTE.length];
  const tiers = [CREDITS.daily, CREDITS.monthly, CREDITS.pack] as const;

  return (
    <div className="bg-white relative rounded-[6px] size-full" data-name="User Info">
      <div className="flex flex-col px-[20px] overflow-clip rounded-[inherit] size-full">

        {/* Basic info */}
        <div className="flex gap-[12px] items-center py-[20px]" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <div className="w-[48px] h-[48px] rounded-full shrink-0 flex items-center justify-center" style={{ background: avatarColor }}>
            <span className="text-[21px] text-white leading-none" style={{ fontFamily: "'Delight', sans-serif" }}>{initial}</span>
          </div>
          <div className="flex flex-col gap-[2px] min-w-0 flex-1">
            <span className="text-[16px] font-medium leading-[26px] tracking-[0.16px] truncate" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: "'Delight', sans-serif" }}>{USER.name}</span>
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
              <span className="text-[12px] leading-[20px] tracking-[0.12px] truncate" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: "'Delight', sans-serif" }}>{USER.email}</span>
            </div>
          </div>
        </div>

        {/* Credits section */}
        <div className="py-[16px] flex flex-col gap-[12px]" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>

          {/* Plan badges */}
          <div className="flex items-center gap-[6px]">
            <span className="text-[11px] leading-[18px] tracking-[0.11px] px-[8px] py-[1px] rounded-[4px] font-medium" style={{ color: '#fff', background: 'var(--main-m1, #49A3A6)' }}>Pro</span>
            <span className="text-[11px] leading-[18px] tracking-[0.11px] px-[8px] py-[1px] rounded-[4px]" style={{ color: 'var(--main-m1, #49A3A6)', background: 'rgba(73,163,166,0.15)' }}>Annual</span>
          </div>

          {/* Total credits */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[6px]">
              <svg className="w-[16px] h-[16px] shrink-0" viewBox="0 0 20 20" fill="none">
                <path d={svgPaths.p285bff80} fill="black" fillOpacity="0.5" />
              </svg>
              <span className="text-[13px] leading-[20px] tracking-[0.13px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: "'Delight', sans-serif" }}>Credits</span>
            </div>
            <div className="flex items-baseline gap-[2px]">
              <span className="text-[16px] leading-[24px] font-medium" style={{ color: 'var(--main-m1, #49A3A6)', fontFamily: "'Delight', sans-serif" }}>
                {TOTAL.toLocaleString()}
              </span>
              <span className="text-[12px] leading-[18px]" style={{ color: 'rgba(0,0,0,0.3)', fontFamily: "'Delight', sans-serif" }}>
                / {GRAND_TOTAL.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Stacked bar */}
          <div className="w-full h-[6px] rounded-full flex overflow-hidden" style={{ background: 'rgba(0,0,0,0.06)' }}>
            {tiers.map((t) => (
              <div key={t.label} className="h-full" style={{ width: `${(t.remaining / GRAND_TOTAL) * 100}%`, background: t.color }} />
            ))}
          </div>

          {/* Three tier rows */}
          <div className="flex flex-col gap-[6px]">
            {tiers.map((t) => (
              <div key={t.label} className="flex items-center justify-between">
                <div className="flex items-center gap-[6px]">
                  <div className="w-[6px] h-[6px] rounded-full" style={{ background: t.color }} />
                  <span className="text-[12px] leading-[18px] tracking-[0.12px]" style={{ color: 'rgba(0,0,0,0.7)', fontFamily: "'Delight', sans-serif" }}>{t.label}</span>
                  {t.label === 'Daily' && (
                    <span className="text-[10px] leading-[14px] px-[4px] py-[1px] rounded-[3px] font-medium" style={{ color: '#E6A91A', background: 'rgba(230,169,26,0.12)' }}>
                      Limited Bonus
                    </span>
                  )}
                </div>
                <span className="text-[12px] leading-[18px] tracking-[0.12px] font-medium" style={{ color: 'rgba(0,0,0,0.7)', fontFamily: "'Delight', sans-serif" }}>
                  {t.remaining.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Menu items */}
        <div className="py-[8px] flex flex-col" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          {([
            { label: 'Profile', hash: 'user-profile', icon: svgPaths.p3c865280 },
            { label: 'Billing', hash: 'billing', icon: svgPaths.p285bff80 },
            { label: 'API Keys', hash: 'api-keys', icon: null },
            { label: 'Language', hash: '', icon: null },
            { label: 'Log Out', hash: '', icon: null },
          ] as const).map((item) => (
            <button
              key={item.label}
              type="button"
              className="flex items-center justify-between py-[10px] px-[4px] -mx-[4px] rounded-[6px] w-[calc(100%+8px)] text-left transition-colors hover:bg-[rgba(0,0,0,0.03)] cursor-pointer"
              onClick={() => { if (item.hash) window.location.hash = item.hash; }}
            >
              <div className="flex items-center gap-[8px]">
                {item.label === 'API Keys' ? (
                  <svg className="w-[20px] h-[20px] shrink-0" viewBox="0 0 20 20" fill="none">
                    <path d="M12.5005 2C15.5379 2.00018 18.0005 4.46254 18.0005 7.5C18.0005 10.5375 15.5379 12.9998 12.5005 13C11.0342 13 9.70321 12.4245 8.71725 11.4893L6.20553 14.001L7.50143 15.2979C7.89068 15.6883 7.89107 16.3207 7.50143 16.7109L6.20748 18.0059C5.8171 18.3962 5.18396 18.396 4.79342 18.0059L3.49752 16.709L2.85397 17.3535C2.65877 17.5487 2.34221 17.5486 2.14693 17.3535C1.95167 17.1583 1.95167 16.8417 2.14693 16.6465L8.05514 10.7373C7.39241 9.8289 7.00045 8.71056 7.00045 7.5C7.00045 4.46243 9.46288 2 12.5005 2ZM4.20455 16.002L5.50045 17.2988L6.79342 16.0039L5.4985 14.708L4.20455 16.002ZM12.5005 3C10.0152 3 8.00045 5.01472 8.00045 7.5C8.00045 9.98528 10.0152 12 12.5005 12C14.9856 11.9998 17.0005 9.98517 17.0005 7.5C17.0005 5.01483 14.9856 3.00018 12.5005 3Z" fill="black" fillOpacity="0.9" />
                  </svg>
                ) : item.label === 'Language' ? (
                  <svg className="w-[20px] h-[20px] shrink-0" viewBox="0 0 20 20" fill="none">
                    <path d={svgPaths.p7706980} fill="black" fillOpacity="0.9" />
                  </svg>
                ) : item.label === 'Log Out' ? (
                  <svg className="w-[20px] h-[20px] shrink-0" viewBox="0 0 20 20" fill="none">
                    <path d={svgPaths.p982ba80} fill="black" fillOpacity="0.9" />
                  </svg>
                ) : item.label === 'Billing' ? (
                  <svg className="w-[20px] h-[20px] shrink-0" viewBox="0 0 20 20" fill="none">
                    <path d={svgPaths.p285bff80} fill="black" fillOpacity="0.9" />
                  </svg>
                ) : (
                  <svg className="w-[20px] h-[20px] shrink-0" viewBox="0 0 16 16" fill="none">
                    <path d={svgPaths.p3c865280} fill="black" fillOpacity="0.9" />
                  </svg>
                )}
                <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: "'Delight', sans-serif" }}>{item.label}</span>
              </div>
              <ArrowRight />
            </button>
          ))}
        </div>

        {/* Social */}
        <div className="flex gap-[8px] py-[20px]">
          {[svgPaths.p1705fd00, svgPaths.p30e25500, svgPaths.p1a857180, svgPaths.p1ae3a8f0].map((path, i) => (
            <button
              key={i}
              type="button"
              className="flex-1 h-[32px] rounded-[4px] flex items-center justify-center cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.03)]"
              style={{ border: '0.5px solid rgba(0,0,0,0.3)' }}
              onClick={() => { if (i === 3) window.location.hash = 'docs'; }}
            >
              <svg className="w-[16px] h-[16px]" viewBox="0 0 16 16" fill="none">
                <path d={path} fill="black" fillOpacity="0.9" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Border overlay */}
      <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(0,0,0,0.2)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_6px_20px_0px_rgba(0,0,0,0.04)]" />
    </div>
  );
}
