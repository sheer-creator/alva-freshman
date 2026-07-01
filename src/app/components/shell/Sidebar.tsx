/**
 * [INPUT]: Page type from App.tsx
 * [OUTPUT]: 共享侧边栏组件
 * [POS]: Shell 层 — 所有页面的左侧导航
 */

import type { Page } from '@/app/App';
import { Avatar } from '@/app/components/shared/Avatar';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { PLAYBOOK_NAV_ITEMS } from '@/data/playbooks';
import type { ReactNode } from 'react';

/* ========== 类型 ========== */

interface SidebarProps {
  activePage?: Page;
  onNavigate: (page: Page) => void;
  onOpenSearch?: () => void;
  onUserMouseEnter?: () => void;
  onUserMouseLeave?: () => void;
  onOpenReferral?: () => void;
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
}

export const SIDEBAR_W_EXPANDED = 228;
export const SIDEBAR_W_COLLAPSED = 56;

/* ========== 导航项组件 ========== */

const ICON_CDN = 'https://alva-ai-static.b-cdn.net/icons';
const FINTWIT_GRADIENT = 'linear-gradient(90deg, #6BDBD5 0%, #8FAFFF 42%, #C092F6 74%, #F5C579 100%)';

function GradientCdnIcon({ name, size = 16 }: { name: string; size?: number }) {
  const url = `${ICON_CDN}/${name}.svg`;
  return (
    <span
      aria-hidden
      className="block shrink-0"
      style={{
        width: size,
        height: size,
        backgroundImage: FINTWIT_GRADIENT,
        WebkitMaskImage: `url(${url})`,
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskImage: `url(${url})`,
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        maskMode: 'alpha',
        WebkitMaskMode: 'alpha' as never,
      }}
    />
  );
}

function NavItem({ label, icon, avatarName, badge, active, deprecated, collapsed, channelAccent, gradient, onClick }: { label: string; icon?: string; avatarName?: string; badge?: string | number; active?: boolean; deprecated?: boolean; collapsed?: boolean; channelAccent?: boolean; gradient?: boolean; onClick?: () => void }) {
  const interactive = Boolean(onClick);
  // channelAccent：demo planc 的 .ch-me 频道样式 — 青色图标 + 青色 active/hover 底
  const activeBg = channelAccent ? 'bg-[rgba(73,163,166,0.16)]' : 'bg-white/5';
  const hoverBg = channelAccent ? 'hover:bg-[rgba(73,163,166,0.11)]' : 'hover:bg-white/5';
  const textClass = deprecated
    ? 'text-white/35'
    : active
      ? `text-white ${activeBg}`
      : interactive
        ? `text-white ${hoverBg}`
        : 'text-white';
  // 仅选中态图标转绿(文字保持白);未选中为白
  const iconColor = deprecated ? 'rgba(255,255,255,0.35)' : active ? 'var(--main-m1, #49A3A6)' : '#ffffff';
  return (
    <div
      className={`content-stretch flex h-[36px] items-center overflow-clip relative rounded-[4px] shrink-0 w-full transition-colors ${collapsed ? 'justify-center px-0' : 'gap-[8px] px-[8px] py-[4px]'} ${textClass} ${interactive ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      title={collapsed ? label : deprecated ? 'Deprecated — use New Chat' : undefined}
    >
      {(avatarName || icon) && (
        <div className="overflow-clip relative shrink-0 size-[16px] flex items-center justify-center">
          {avatarName ? (
            <Avatar name={avatarName} size={16} />
          ) : icon && gradient ? (
            <GradientCdnIcon name={icon} size={16} />
          ) : icon ? (
            <CdnIcon name={icon} size={16} color={iconColor} />
          ) : null}
        </div>
      )}
      {!collapsed && (
        <>
          <p
            className={`font-['Delight',sans-serif] leading-[22px] overflow-hidden relative text-[13px] text-ellipsis tracking-[0.13px] whitespace-nowrap ${badge != null ? 'shrink-0' : 'flex-[1_0_0] min-w-px'} ${gradient ? 'text-transparent bg-clip-text' : ''}`}
            style={gradient ? { backgroundImage: FINTWIT_GRADIENT } : undefined}
          >
            {label}
          </p>
          {badge != null && (
            <div
              className="shrink-0 flex flex-col items-start justify-center min-w-[16px] px-[4px] rounded-[12px]"
              style={{ background: 'var(--main-m1, #49A3A6)' }}
            >
              <p className="font-['Delight',sans-serif] text-[10px] leading-[16px] font-medium text-white text-center tracking-[0.1px] whitespace-nowrap">
                {badge}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function SectionHeader({ label, collapsed, action }: { label: string; collapsed?: boolean; action?: ReactNode }) {
  if (collapsed) {
    return <div className="h-[12px] shrink-0 w-full" aria-hidden />;
  }
  return (
    <div className="content-stretch flex gap-[4px] h-[36px] items-center overflow-clip px-[8px] py-[4px] relative rounded-[4px] shrink-0 w-full">
      <p className="font-['Delight',sans-serif] font-normal leading-[20px] opacity-50 overflow-hidden relative flex-[1_0_0] min-w-px text-[12px] text-ellipsis text-white tracking-[0.12px] whitespace-nowrap">
        {label}
      </p>
      {action && <div className="relative shrink-0 opacity-50">{action}</div>}
    </div>
  );
}

/* ========== Logo ========== */

function Logo({ collapsed }: { collapsed?: boolean }) {
  return (
    <div className={`content-stretch flex items-center relative shrink-0 w-full z-[9] ${collapsed ? 'justify-center py-[12px]' : 'justify-between px-[8px] py-[12px]'}`}>
      {!collapsed && (
        <div className="h-[14px] relative shrink-0 w-[56px]">
          <img src={`${import.meta.env.BASE_URL}logo-alva.svg`} alt="Alva" className="absolute inset-0 block size-full object-contain object-left" />
        </div>
      )}
      {!collapsed && (
        <a
          href={`${import.meta.env.BASE_URL}demo/`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative shrink-0 cursor-pointer font-['Delight',sans-serif] text-[12px] leading-[16px] tracking-[0.12px] no-underline transition-colors hover:text-white"
          style={{ color: 'rgba(255, 255, 255, 0.5)' }}
        >
          Demo
        </a>
      )}
    </div>
  );
}

/* ========== "+ New Playbook" CTA ========== */

function NewPlaybookButton({ onClick, collapsed, label = 'New Chat' }: { active?: boolean; onClick?: () => void; collapsed?: boolean; label?: string }) {
  return (
    <div className={`content-stretch flex flex-col items-start relative shrink-0 w-full ${collapsed ? 'py-[4px]' : 'p-[8px]'}`}>
      <button
        onClick={onClick}
        title={collapsed ? label : undefined}
        className={`bg-transparent border-[0.5px] border-[rgba(255,255,255,0.3)] border-solid content-stretch flex h-[32px] items-center justify-center overflow-clip relative rounded-[4px] shrink-0 w-full transition-colors cursor-pointer hover:bg-white/5 ${collapsed ? 'px-0' : 'gap-[6px] px-[16px] py-[6px]'}`}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
          <path d="M7 1.75V12.25M1.75 7H12.25" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        {!collapsed && (
          <span className="font-['Delight',sans-serif] font-medium leading-[20px] text-[12px] text-white tracking-[0.12px] whitespace-nowrap">
            {label}
          </span>
        )}
      </button>
    </div>
  );
}

/* ========== 主组件 ========== */

export function Sidebar({ activePage, onNavigate, onOpenSearch, onUserMouseEnter, onUserMouseLeave, onOpenReferral, collapsed = false, onToggleCollapsed }: SidebarProps) {
  void onOpenSearch; void onOpenReferral; void onToggleCollapsed; // 保持已有签名
  return (
    <div
      className="antialiased bg-[var(--b0-sidebar)] flex flex-col gap-0 h-screen fixed left-0 top-0 isolate items-start p-[8px] shrink-0 z-[2] overflow-y-auto overflow-x-hidden"
      style={{
        width: collapsed ? SIDEBAR_W_COLLAPSED : SIDEBAR_W_EXPANDED,
        transition: 'width 200ms ease',
      }}
    >
      <Logo collapsed={collapsed} />

      {/* New Playbook CTA — own group per Figma 2951:34936 */}
      <NewPlaybookButton collapsed={collapsed} onClick={() => onNavigate('new-chat')} />

      {/* 主导航 */}
      <div className="content-stretch flex flex-col gap-0 items-start py-[4px] relative shrink-0 w-full z-[7]">
        <NavItem label="Explore" icon="sidebar-discover-normal" active={activePage === 'explore'} collapsed={collapsed} onClick={() => onNavigate('explore')} />
        <NavItem label="Portfolio" icon="sidebar-portfolio-normal" active={activePage === 'portfolio' || activePage === 'portfolio-settings'} collapsed={collapsed} onClick={() => onNavigate('portfolio')} />
        <NavItem label="Alva Skill" icon="sidebar-skills-normal" active={activePage === 'alva-skills'} collapsed={collapsed} onClick={() => onNavigate('alva-skills')} />
        <NavItem label="FinTwit Alpha League" icon="smart-money-l" gradient collapsed={collapsed} />
      </div>

      {/* Channels */}
      <div className="content-stretch flex flex-col gap-0 items-start py-[4px] relative shrink-0 w-full z-[6]">
        <SectionHeader label="Channels" collapsed={collapsed} action={<CdnIcon name="add-l2" size={12} color="#ffffff" />} />
        <NavItem label="Alva Agent" icon="sidebar-agent-normal" active={activePage === 'agent'} collapsed={collapsed} onClick={() => onNavigate('agent')} />
      </div>

      {/* Playbooks */}
      <div className="content-stretch flex flex-col gap-0 items-start py-[4px] relative shrink-0 w-full z-[5]">
        <SectionHeader label="Playbooks" collapsed={collapsed} />
        {PLAYBOOK_NAV_ITEMS.map((item) => (
          <NavItem
            key={item.page}
            label={item.title}
            avatarName={item.owner}
            active={activePage === item.page}
            collapsed={collapsed}
            onClick={() => onNavigate(item.page)}
          />
        ))}
      </div>

      {/* Chats */}
      <div className="content-stretch flex flex-col flex-[1_0_0] gap-0 items-start min-h-px py-[4px] relative w-full z-[4]">
        <SectionHeader label="Chats" collapsed={collapsed} />
        <NavItem label="Crypto Price + AI Trend Pulse" icon="chat-l1" collapsed={collapsed} />
        <NavItem label="Heartbeat Run Counter" icon="chat-l1" collapsed={collapsed} />
      </div>

      {/* Upgrade to Pro card — sits above the user row */}
      {!collapsed && (
        <div className="shrink-0 w-full px-[8px] pt-[8px] pb-[8px] relative z-[3]">
          <button
            type="button"
            className="relative isolate w-full overflow-hidden rounded-[4px] pt-[6px] pl-[10px] pr-[8px] pb-[8px] text-left transition-colors cursor-pointer"
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              border: '0.5px solid rgba(255, 255, 255, 0.12)',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(0, 0, 0, 0.55)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(0, 0, 0, 0.7)'; }}
            onClick={() => onNavigate('pricing')}
          >
            {/* Decorative top-right glow */}
            <span
              aria-hidden
              className="pointer-events-none absolute z-[1]"
              style={{
                right: -46,
                top: -46,
                width: 93,
                height: 93,
                background: 'radial-gradient(circle, rgba(42,155,125,0.45) 0%, rgba(42,155,125,0) 70%)',
              }}
            />
            <div className="relative z-[2] flex items-start gap-[8px]">
              <span
                className="flex items-center justify-center shrink-0 rounded-[4px]"
                style={{ width: 20, height: 20, background: 'rgba(42, 155, 125, 0.20)', marginTop: 4 }}
              >
                <CdnIcon name="arrow-up-f1" size={14} color="var(--main-m3, #2A9B7D)" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span
                  className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px]"
                  style={{ color: '#fff' }}
                >
                  Upgrade to Pro
                </span>
                <span
                  className="font-['Delight',sans-serif] text-[10px] leading-[16px] tracking-[0.1px]"
                  style={{ color: 'rgba(255, 255, 255, 0.5)' }}
                >
                  Unlock unlimited playbooks with 7-day free trial
                </span>
              </span>
            </div>
          </button>
        </div>
      )}

      {/* 用户行 */}
      <div
        className={`content-stretch flex items-center relative rounded-[4px] shrink-0 w-full z-[2] cursor-pointer hover:bg-white/5 transition-colors ${collapsed ? 'justify-center p-[8px]' : 'gap-[8px] p-[8px]'}`}
        onMouseEnter={onUserMouseEnter}
        onMouseLeave={onUserMouseLeave}
        onClick={() => onNavigate('user-profile')}
        title={collapsed ? 'YGGYLL' : undefined}
      >
        <Avatar name="YGGYLL" size={24} />
        {!collapsed && (
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-w-px relative text-[13px] text-white tracking-[0.13px] truncate">YGGYLL</p>
        )}
      </div>
    </div>
  );
}
