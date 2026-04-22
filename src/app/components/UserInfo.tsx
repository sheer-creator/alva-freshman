/**
 * [INPUT]: AppShell sidebar
 * [OUTPUT]: 用户浮窗 — Basic Info / Usage / 菜单 / Social
 * [POS]: shell 层 — 用户信息弹出面板
 */

import { useLayoutEffect, useRef, useState } from 'react';
import svgPaths from "@/data/svg-guyqw4in5w";
import { AVATAR_COLOR_PALETTE } from '@/lib/chart-theme';
import { CdnIcon } from '@/app/components/shared/CdnIcon';

/* ========== Constants ========== */

const USER = { name: 'sheer', email: 'sheer@alva.xyz' };
const FONT = "'Delight', sans-serif";

const CREDITS = {
  daily:   1000,
  monthly: 3000,
  pack:    12000,
};
const AVAILABLE = 12000;

/* ========== Icons ========== */

function ArrowRight() {
  return <CdnIcon name="arrow-right-l2" size={12} color="rgba(0,0,0,0.5)" />;
}

function GoogleLogo() {
  return (
    <svg className="w-[14px] h-[14px] shrink-0" viewBox="0 0 14 14" fill="none">
      <rect width="14" height="14" rx="7" fill="white" />
      <g transform="translate(0.7 0.7) scale(1)">
        <path d={svgPaths.p1336a380} fill="#4285F4" />
        <path d={svgPaths.p1ab03700} fill="#34A853" />
        <path d={svgPaths.p21044080} fill="#FBBC05" />
        <path d={svgPaths.p1b002980} fill="#EB4335" />
      </g>
    </svg>
  );
}

/* ========== Auto-fit number ========== */
/**
 * 把 value 渲染在 min-w-0 容器里，超宽时以 1px 为步长从 maxSize 逐步下降到 minSize，
 * 保证完整展示不截断。容器宽度变化（右列文案变长）会通过 ResizeObserver 重新 fit。
 */
function AutoFitValue({
  value,
  maxSize,
  minSize,
  className,
  style,
}: {
  value: string;
  maxSize: number;
  minSize: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState(maxSize);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const text = textRef.current;
    if (!wrap || !text) return;

    const fit = () => {
      const available = wrap.clientWidth;
      if (available === 0) return;
      let next = maxSize;
      text.style.fontSize = `${next}px`;
      while (next > minSize && text.scrollWidth > available) {
        next -= 1;
        text.style.fontSize = `${next}px`;
      }
      setSize(next);
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [value, maxSize, minSize]);

  return (
    <div ref={wrapRef} className="min-w-0 overflow-hidden leading-none">
      <span
        ref={textRef}
        className={className}
        style={{ ...style, fontSize: `${size}px`, whiteSpace: 'nowrap', display: 'block' }}
      >
        {value}
      </span>
    </div>
  );
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
      className="flex items-center justify-between py-[12px] px-[20px] -mx-[20px] w-[calc(100%+40px)] text-left transition-colors hover:bg-black/5 cursor-pointer bg-transparent border-none"
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
          className="flex gap-[12px] items-center py-[20px] -mx-[20px] px-[20px] w-[calc(100%+40px)] cursor-pointer transition-colors hover:bg-black/5"
        >
          <div className="w-[48px] h-[48px] rounded-full shrink-0 flex items-center justify-center" style={{ background: avatarColor }}>
            <span className="text-[21px] text-white leading-none" style={{ fontFamily: FONT }}>{initial}</span>
          </div>
          <div className="flex flex-col gap-[2px] min-w-0 flex-1">
            <div className="flex items-center gap-[6px] min-w-0">
              <span className="text-[18px] font-medium leading-[28px] tracking-[0.18px] truncate" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>{USER.name}</span>
              <span
                className="text-[11px] font-medium leading-[18px] tracking-[0.11px] px-[6px] rounded-full shrink-0"
                style={{ color: '#ffffff', background: '#49a3a6', fontFamily: FONT }}
              >
                Pro
              </span>
              <span
                className="text-[11px] leading-[18px] tracking-[0.11px] px-[6px] rounded-full shrink-0"
                style={{ color: '#49a3a6', background: 'rgba(73,163,166,0.1)', fontFamily: FONT }}
              >
                Annual
              </span>
            </div>
            <div className="flex items-center gap-[4px] min-w-0">
              <GoogleLogo />
              <span className="text-[12px] leading-[20px] tracking-[0.12px] truncate" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>{USER.email}</span>
            </div>
          </div>
          <ArrowRight />
        </div>

        {/* divider — 不通栏 */}
        <div className="h-[0.5px] w-full" style={{ background: 'rgba(0,0,0,0.07)' }} />

        {/* Usage — 标题 + 数据卡片共享一个点击区域，hover 通栏 */}
        <button
          type="button"
          onClick={() => go('billing')}
          className="group flex flex-col gap-[8px] mt-[8px] pt-[12px] pb-[12px] px-[20px] -mx-[20px] w-[calc(100%+40px)] text-left transition-colors hover:bg-black/5 cursor-pointer bg-transparent border-none"
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-[8px]">
              <CdnIcon name="credit-l" size={20} color="rgba(0,0,0,0.9)" />
              <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>Usage</span>
            </div>
            <ArrowRight />
          </div>
          <div
            className="flex items-end justify-between gap-[12px] rounded-[8px] px-[12px] py-[12px] w-full bg-black/[0.03] transition-colors group-hover:bg-black/[0.06]"
          >
            <div className="flex flex-col gap-[6px] min-w-0 flex-1">
              <span className="text-[10px] leading-none tracking-[0.1px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>Available</span>
              <AutoFitValue
                value={AVAILABLE.toLocaleString()}
                maxSize={24}
                minSize={14}
                className="leading-none tracking-[0.24px]"
                style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}
              />
            </div>
            <div className="flex flex-col gap-[4px] shrink-0 items-end">
              <div className="flex items-center gap-[8px]">
                <span className="text-[10px] leading-none tracking-[0.1px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>Daily</span>
                <span className="text-[10px] leading-none tracking-[0.1px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>
                  {CREDITS.daily.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-[8px]">
                <span className="text-[10px] leading-none tracking-[0.1px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>Monthly</span>
                <span className="text-[10px] leading-none tracking-[0.1px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>
                  {CREDITS.monthly.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-[8px]">
                <span className="text-[10px] leading-none tracking-[0.1px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>Pack</span>
                <span className="text-[10px] leading-none tracking-[0.1px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>
                  {CREDITS.pack.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </button>

        {/* Menu items — 与 Usage hover 区无间距 */}
        <div className="pb-[8px] flex flex-col">
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
            label="Settings"
            onClick={() => go('account')}
          />
          <MenuItem
            icon={<CdnIcon name="logout-l" size={20} color="rgba(0,0,0,0.9)" />}
            label="Log Out"
          />
        </div>

        {/* divider — 不通栏 */}
        <div className="h-[0.5px] w-full" style={{ background: 'rgba(0,0,0,0.07)' }} />

        {/* Social — 四个按钮 hover 不通栏，只高亮按钮本身 */}
        <div className="flex gap-[8px] py-[20px]">
          {[svgPaths.p1705fd00, svgPaths.p30e25500, svgPaths.p1a857180, svgPaths.p1ae3a8f0].map((path, i) => (
            <button
              key={i}
              type="button"
              className="flex-1 h-[32px] rounded-[6px] flex items-center justify-center cursor-pointer transition-colors hover:bg-black/5 bg-transparent"
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
