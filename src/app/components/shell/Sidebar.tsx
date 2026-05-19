/**
 * [INPUT]: Page type from App.tsx
 * [OUTPUT]: 共享侧边栏组件
 * [POS]: Shell 层 — 所有页面的左侧导航
 */

import type { Page } from '@/app/App';
import { Avatar } from '@/app/components/shared/Avatar';
import { CdnIcon } from '@/app/components/shared/CdnIcon';

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

function NavItem({ label, icon, badge, active, deprecated, collapsed, onClick }: { label: string; icon?: string; badge?: string | number; active?: boolean; deprecated?: boolean; collapsed?: boolean; onClick?: () => void }) {
  const textClass = deprecated
    ? 'text-white/35'
    : active
      ? 'text-[var(--main-m1)]'
      : 'text-white hover:bg-white/20';
  const iconColor = deprecated ? 'rgba(255,255,255,0.35)' : active ? 'var(--main-m1)' : '#ffffff';
  return (
    <div
      className={`content-stretch flex h-[36px] items-center overflow-clip relative rounded-[6px] shrink-0 w-full transition-colors ${collapsed ? 'justify-center px-0' : 'gap-[8px] px-[8px] py-[4px]'} ${textClass} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      title={collapsed ? label : deprecated ? 'Deprecated — use New Chat' : undefined}
    >
      {icon && (
        <div className="overflow-clip relative shrink-0 size-[16px]">
          <CdnIcon name={icon} size={16} color={iconColor} />
        </div>
      )}
      {!collapsed && (
        <>
          <p className={`font-['Delight',sans-serif] leading-[22px] overflow-hidden relative text-[13px] text-ellipsis tracking-[0.13px] whitespace-nowrap ${badge != null ? 'shrink-0' : 'flex-[1_0_0] min-w-px'}`}>
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

function SectionHeader({ label, collapsed }: { label: string; collapsed?: boolean }) {
  if (collapsed) {
    return <div className="h-[12px] shrink-0 w-full" aria-hidden />;
  }
  return (
    <div className="content-stretch flex gap-0 h-[36px] items-center overflow-clip px-[8px] py-[4px] relative rounded-[6px] shrink-0 w-full">
      <p className="font-['Delight',sans-serif] font-normal leading-[20px] opacity-50 overflow-hidden relative shrink-0 text-[12px] text-ellipsis text-white tracking-[0.12px] whitespace-nowrap">
        {label}
      </p>
    </div>
  );
}

/* ========== Logo ========== */

function Logo({ collapsed, onToggleCollapsed }: { collapsed?: boolean; onToggleCollapsed?: () => void }) {
  return (
    <div className={`content-stretch flex h-[48px] items-center relative shrink-0 w-full z-[9] ${collapsed ? 'justify-center py-[16px]' : 'justify-between px-[8px] py-[16px]'}`}>
      {!collapsed && (
        <div className="h-[14px] relative shrink-0 w-[81px]">
          <img src={`${import.meta.env.BASE_URL}logo-alva-beta.svg`} alt="Alva" className="absolute inset-0 block size-full object-contain object-left" />
        </div>
      )}
      <button
        type="button"
        onClick={onToggleCollapsed}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="relative shrink-0 size-[16px] flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity bg-transparent border-none p-0"
      >
        <img src={`${import.meta.env.BASE_URL}sidebar-onoff.svg`} alt="" className="block size-[16px]" />
      </button>
    </div>
  );
}

/* ========== "+ New Playbook" CTA ========== */

function NewPlaybookButton({ onClick, collapsed, label = 'New Chat' }: { active?: boolean; onClick?: () => void; collapsed?: boolean; label?: string }) {
  return (
    <div className={`content-stretch flex flex-col items-start relative shrink-0 w-full ${collapsed ? 'py-[4px]' : 'py-[4px]'}`}>
      <button
        onClick={onClick}
        title={collapsed ? label : undefined}
        className={`bg-transparent border-[0.5px] border-[rgba(255,255,255,0.3)] border-solid content-stretch flex h-[32px] items-center justify-center overflow-clip relative rounded-[6px] shrink-0 w-full transition-colors cursor-pointer hover:bg-white/20 ${collapsed ? 'px-0' : 'gap-[6px] px-[16px] py-[6px]'}`}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
          <path d="M7 1.75V12.25M1.75 7H12.25" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        {!collapsed && (
          <span className="font-['Delight',sans-serif] font-semibold leading-[20px] text-[12px] text-white tracking-[0.12px] whitespace-nowrap">
            {label}
          </span>
        )}
      </button>
    </div>
  );
}

/* ========== 主组件 ========== */

export function Sidebar({ activePage, onNavigate, onOpenSearch, onUserMouseEnter, onUserMouseLeave, onOpenReferral, collapsed = false, onToggleCollapsed }: SidebarProps) {
  void onOpenSearch; void onOpenReferral; // 保持已有签名
  return (
    <div
      className="antialiased bg-[var(--b0-sidebar)] flex flex-col gap-0 h-screen fixed left-0 top-0 isolate items-start p-[8px] shrink-0 z-[2] overflow-y-auto overflow-x-hidden"
      style={{
        width: collapsed ? SIDEBAR_W_COLLAPSED : SIDEBAR_W_EXPANDED,
        transition: 'width 200ms ease',
      }}
    >
      <Logo collapsed={collapsed} onToggleCollapsed={onToggleCollapsed} />

      {/* New Playbook CTA — own group per Figma 2951:34936 */}
      <NewPlaybookButton collapsed={collapsed} onClick={() => onNavigate('new-chat')} />
      <NewPlaybookButton collapsed={collapsed} label="New Chat (Opt2)" onClick={() => onNavigate('new-chat-opt2')} />

      {/* 主导航 */}
      <div className="content-stretch flex flex-col gap-0 items-start py-[4px] relative shrink-0 w-full z-[7]">
        <NavItem label="Explore" icon="sidebar-discover-normal" active={activePage === 'explore-2'} collapsed={collapsed} onClick={() => onNavigate('explore-2')} />
        <NavItem label="Portfolio" icon="sidebar-portfolio-normal" active={activePage === 'portfolio' || activePage === 'portfolio-settings'} collapsed={collapsed} onClick={() => onNavigate('portfolio')} />
        <NavItem label="Agent" icon="sidebar-agent-normal" active={activePage === 'agent'} collapsed={collapsed} onClick={() => onNavigate('agent')} />
        <NavItem label="Alva Skill" icon="sidebar-skills-normal" active={activePage === 'alva-skills'} collapsed={collapsed} onClick={() => onNavigate('alva-skills')} />
      </div>

      {/* Starred */}
      <div className="content-stretch flex flex-col gap-0 items-start py-[4px] relative shrink-0 w-full z-[6]">
        <SectionHeader label="Starred" collapsed={collapsed} />
        <NavItem label="Template-Screener" icon="sidebar-dashboard-normal" active={activePage === 'template-screener'} collapsed={collapsed} onClick={() => onNavigate('template-screener')} />
        <NavItem label="Template-Thesis" icon="sidebar-dashboard-normal" active={activePage === 'template-thesis'} collapsed={collapsed} onClick={() => onNavigate('template-thesis')} />
        <NavItem label="Template-Whatif" icon="sidebar-dashboard-normal" active={activePage === 'template-whatif'} collapsed={collapsed} onClick={() => onNavigate('template-whatif')} />
        <NavItem label="Template-Notification" icon="sidebar-dashboard-normal" active={activePage === 'template-notification'} collapsed={collapsed} onClick={() => onNavigate('template-notification')} />
      </div>

      {/* My Playbooks */}
      <div className="content-stretch flex flex-col flex-[1_0_0] gap-0 items-start min-h-px py-[4px] relative w-full z-[5]">
        <SectionHeader label="My Playbooks" collapsed={collapsed} />
        <NavItem label="Feed Test" icon="sidebar-dashboard-normal" active={activePage === 'screener'} collapsed={collapsed} onClick={() => onNavigate('screener')} />
      </div>

      {/* Upgrade to Pro card — sits above the user row */}
      {!collapsed && (
        <div className="shrink-0 w-full px-[8px] pt-[8px] pb-[8px] relative z-[3]">
          <button
            type="button"
            className="relative isolate w-full overflow-hidden rounded-[8px] pt-[6px] pl-[10px] pr-[8px] pb-[8px] text-left transition-colors cursor-pointer"
            style={{
              background: 'rgba(255, 255, 255, 0.10)',
              border: '0.5px solid rgba(255, 255, 255, 0.12)',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.16)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.10)'; }}
            onClick={() => onNavigate('pricing')}
          >
            {/* Decorative top-right glow — soft m3 bloom, diffused via blur */}
            <span
              aria-hidden
              className="pointer-events-none absolute z-[1]"
              style={{
                right: -56,
                top: -56,
                width: 112,
                height: 112,
                background:
                  'radial-gradient(circle, rgba(42,155,125,0.22) 0%, rgba(42,155,125,0.08) 45%, rgba(42,155,125,0) 75%)',
                filter: 'blur(8px)',
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
        className={`content-stretch flex items-center relative rounded-[6px] shrink-0 w-full z-[2] cursor-pointer hover:bg-white/20 transition-colors ${collapsed ? 'justify-center p-[8px]' : 'gap-[8px] p-[8px]'}`}
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
