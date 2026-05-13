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
  /**
   * When true the sidebar renders in icon-only mode (56px wide). Used
   * by AppShell at viewports between 640–1023px to keep nav reachable
   * without consuming a quarter of the content width.
   */
  collapsed?: boolean;
  /**
   * When true the sidebar drops its own `position: fixed` and renders as
   * a normal block element so an outer wrapper can position/animate it
   * (e.g. mobile slide-in drawer in AppShell).
   */
  inDrawer?: boolean;
}

/* ========== 导航项组件 ========== */

function NavItem({ label, icon, badge, active, deprecated, collapsed, onClick }: { label: string; icon?: string; badge?: string | number; active?: boolean; deprecated?: boolean; collapsed?: boolean; onClick?: () => void }) {
  const textClass = deprecated
    ? 'text-white/35'
    : active
      ? 'text-[#49A3A6]'
      : 'text-white hover:bg-white/5';
  const iconColor = deprecated ? 'rgba(255,255,255,0.35)' : active ? '#49A3A6' : '#ffffff';
  return (
    <div
      className={`content-stretch flex gap-[8px] h-[36px] items-center overflow-clip py-[4px] relative rounded-[6px] shrink-0 w-full transition-colors ${textClass} ${onClick ? 'cursor-pointer' : ''} ${collapsed ? 'justify-center px-0' : 'px-[8px]'}`}
      onClick={onClick}
      title={deprecated ? 'Deprecated — use New Chat' : (collapsed ? label : undefined)}
    >
      {icon && (
        <div className="overflow-clip relative shrink-0 size-[16px]">
          <CdnIcon name={icon} size={16} color={iconColor} />
        </div>
      )}
      {!collapsed && (
        <p className={`font-['Delight',sans-serif] leading-[22px] overflow-hidden relative text-[13px] text-ellipsis tracking-[0.13px] whitespace-nowrap ${badge != null ? 'shrink-0' : 'flex-[1_0_0] min-w-px'}`}>
          {label}
        </p>
      )}
      {!collapsed && badge != null && (
        <div
          className="shrink-0 flex flex-col items-start justify-center min-w-[16px] px-[4px] rounded-[12px]"
          style={{ background: 'var(--main-m1, #49A3A6)' }}
        >
          <p className="font-['Delight',sans-serif] text-[10px] leading-[16px] font-medium text-white text-center tracking-[0.1px] whitespace-nowrap">
            {badge}
          </p>
        </div>
      )}
    </div>
  );
}

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="content-stretch flex gap-0 h-[36px] items-center overflow-clip px-[8px] py-[4px] relative rounded-[6px] shrink-0 w-full">
      <p className="font-['Delight',sans-serif] font-normal leading-[20px] opacity-50 overflow-hidden relative shrink-0 text-[12px] text-ellipsis text-white tracking-[0.12px] whitespace-nowrap">
        {label}
      </p>
    </div>
  );
}

/* ========== Logo ========== */

function Logo() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-between px-[8px] py-[16px] relative shrink-0 w-full z-[9]">
      <div className="h-[14px] relative shrink-0 w-[81px]">
        <img src={`${import.meta.env.BASE_URL}logo-alva-beta.svg`} alt="Alva" className="absolute inset-0 block size-full object-contain object-left" />
      </div>
      <div className="relative shrink-0 size-[16px]">
        <img src={`${import.meta.env.BASE_URL}sidebar-onoff.svg`} alt="" className="absolute inset-0 block size-full" />
      </div>
    </div>
  );
}

/* ========== "+ New Playbook" CTA ========== */

function NewPlaybookButton({ onClick }: { active?: boolean; onClick?: () => void }) {
  return (
    <div className="content-stretch flex flex-col items-start py-[4px] relative shrink-0 w-full">
      <button
        onClick={onClick}
        className="bg-transparent border-[0.5px] border-[rgba(255,255,255,0.3)] border-solid content-stretch flex gap-[6px] h-[32px] items-center justify-center overflow-clip px-[16px] py-[6px] relative rounded-[6px] shrink-0 w-full transition-colors cursor-pointer hover:bg-white/5"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
          <path d="M7 1.75V12.25M1.75 7H12.25" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="font-['Delight',sans-serif] font-medium leading-[20px] text-[12px] text-white tracking-[0.12px] whitespace-nowrap">
          New Chat
        </span>
      </button>
    </div>
  );
}

/* ========== 主组件 ========== */

export function Sidebar({ activePage, onNavigate, onOpenSearch, onUserMouseEnter, onUserMouseLeave, onOpenReferral, collapsed = false, inDrawer = false }: SidebarProps) {
  // Hide section headers + section structure shrinks to icon stack when
  // collapsed. Width 228 → 56 with smooth transition. When `inDrawer` is
  // set, the sidebar renders as a static block (the outer wrapper handles
  // positioning + slide animation).
  return (
    <div
      className={`antialiased bg-[#2a2a38] flex flex-col gap-0 h-screen ${inDrawer ? 'relative' : 'fixed left-0 top-0'} isolate items-start shrink-0 z-[2] overflow-y-auto overflow-x-hidden`}
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.4) 0.6px, transparent 0.6px)',
        backgroundSize: '3px 3px',
        width: collapsed ? 56 : 228,
        padding: collapsed ? '8px 4px' : 8,
        transition: 'width 0.25s cubic-bezier(0.4,0,0.2,1), padding 0.25s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      {!collapsed && <Logo />}

      {/* New Playbook CTA — own group per Figma 2951:34936 */}
      {!collapsed && <NewPlaybookButton onClick={() => onNavigate('new-chat')} />}
      {collapsed && (
        <div className="flex flex-col items-center w-full pt-[12px] pb-[8px]">
          <button
            onClick={() => onNavigate('new-chat')}
            className="flex items-center justify-center w-[36px] h-[36px] rounded-[8px] border-[0.5px] border-[rgba(255,255,255,0.3)] bg-transparent hover:bg-white/5 cursor-pointer transition-colors"
            title="New Chat"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1.75V12.25M1.75 7H12.25" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      {/* 主导航 */}
      <div className="content-stretch flex flex-col gap-0 items-start py-[4px] relative shrink-0 w-full z-[7]">
        <NavItem label="Explore" icon="sidebar-discover-normal" active={activePage === 'explore-2'} collapsed={collapsed} onClick={() => onNavigate('explore-2')} />
        <NavItem label="Portfolio" icon="sidebar-portfolio-normal" active={activePage === 'portfolio' || activePage === 'portfolio-settings'} collapsed={collapsed} onClick={() => onNavigate('portfolio')} />
        <NavItem label="Agent" icon="sidebar-agent-normal" active={activePage === 'agent'} collapsed={collapsed} onClick={() => onNavigate('agent')} />
        <NavItem label="Alva Skill" icon="sidebar-skills-normal" active={activePage === 'alva-skills'} collapsed={collapsed} onClick={() => onNavigate('alva-skills')} />
      </div>

      {/* Starred */}
      <div className="content-stretch flex flex-col gap-0 items-start py-[4px] relative shrink-0 w-full z-[6]">
        {!collapsed && <SectionHeader label="Starred" />}
        <NavItem label="Template-Screener" icon="sidebar-dashboard-normal" active={activePage === 'template-screener'} collapsed={collapsed} onClick={() => onNavigate('template-screener')} />
        <NavItem label="Template-Thesis" icon="sidebar-dashboard-normal" active={activePage === 'template-thesis'} collapsed={collapsed} onClick={() => onNavigate('template-thesis')} />
        <NavItem label="Template-Whatif" icon="sidebar-dashboard-normal" active={activePage === 'template-whatif'} collapsed={collapsed} onClick={() => onNavigate('template-whatif')} />
        <NavItem label="Template-Notification" icon="sidebar-dashboard-normal" active={activePage === 'template-notification'} collapsed={collapsed} onClick={() => onNavigate('template-notification')} />
      </div>

      {/* My Playbooks */}
      <div className="content-stretch flex flex-col flex-[1_0_0] gap-0 items-start min-h-px py-[4px] relative w-full z-[5]">
        {!collapsed && <SectionHeader label="My Playbooks" />}
        <NavItem label="Feed Test" icon="sidebar-dashboard-normal" active={activePage === 'screener'} collapsed={collapsed} onClick={() => onNavigate('screener')} />
        <NavItem label="Trade Notification Test" icon="sidebar-dashboard-normal" active={activePage === 'trade-notification-test'} collapsed={collapsed} onClick={() => onNavigate('trade-notification-test')} />
      </div>

      {/* 用户行 */}
      <div
        className={`content-stretch flex gap-[8px] items-center p-[8px] relative rounded-[6px] shrink-0 w-full z-[2] cursor-pointer hover:bg-white/5 transition-colors ${collapsed ? 'justify-center' : ''}`}
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
