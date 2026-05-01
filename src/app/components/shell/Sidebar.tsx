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
}

/* ========== 导航项组件 ========== */

function NavItem({ label, icon, badge, active, deprecated, onClick }: { label: string; icon?: string; badge?: string | number; active?: boolean; deprecated?: boolean; onClick?: () => void }) {
  const textClass = deprecated
    ? 'text-white/35'
    : active
      ? 'text-[#49A3A6]'
      : 'text-white hover:bg-white/5';
  const iconColor = deprecated ? 'rgba(255,255,255,0.35)' : active ? '#49A3A6' : '#ffffff';
  return (
    <div
      className={`content-stretch flex gap-[8px] h-[36px] items-center overflow-clip px-[8px] py-[4px] relative rounded-[6px] shrink-0 w-full transition-colors ${textClass} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      title={deprecated ? 'Deprecated — use New Chat' : undefined}
    >
      {icon && (
        <div className="overflow-clip relative shrink-0 size-[16px]">
          <CdnIcon name={icon} size={16} color={iconColor} />
        </div>
      )}
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

export function Sidebar({ activePage, onNavigate, onOpenSearch, onUserMouseEnter, onUserMouseLeave, onOpenReferral }: SidebarProps) {
  return (
    <div className="antialiased bg-[#2a2a38] flex flex-col gap-0 h-screen fixed left-0 top-0 isolate items-start p-[8px] shrink-0 w-[228px] z-[2] overflow-y-auto" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.4) 0.6px, transparent 0.6px)', backgroundSize: '3px 3px' }}>
      <Logo />

      {/* New Playbook CTA — own group per Figma 2951:34936 */}
      <NewPlaybookButton onClick={() => onNavigate('new-chat')} />

      {/* 主导航 */}
      <div className="content-stretch flex flex-col gap-0 items-start py-[4px] relative shrink-0 w-full z-[7]">
        <NavItem label="Explore" icon="sidebar-discover-normal" active={activePage === 'explore-2'} onClick={() => onNavigate('explore-2')} />
        <NavItem label="Portfolio" icon="sidebar-portfolio-normal" active={activePage === 'portfolio' || activePage === 'portfolio-settings'} onClick={() => onNavigate('portfolio')} />
        <NavItem label="Agent" icon="sidebar-agent-normal" active={activePage === 'agent'} onClick={() => onNavigate('agent')} />
        <NavItem label="Alva Skill" icon="sidebar-skills-normal" active={activePage === 'alva-skills'} onClick={() => onNavigate('alva-skills')} />
      </div>

      {/* Starred */}
      <div className="content-stretch flex flex-col gap-0 items-start py-[4px] relative shrink-0 w-full z-[6]">
        <SectionHeader label="Starred" />
        <NavItem label="Template-Screener" icon="sidebar-dashboard-normal" active={activePage === 'template-screener'} onClick={() => onNavigate('template-screener')} />
        <NavItem label="Template-Thesis" icon="sidebar-dashboard-normal" active={activePage === 'template-thesis'} onClick={() => onNavigate('template-thesis')} />
        <NavItem label="Template-Whatif" icon="sidebar-dashboard-normal" active={activePage === 'template-whatif'} onClick={() => onNavigate('template-whatif')} />
        <NavItem label="Template-Notification" icon="sidebar-dashboard-normal" active={activePage === 'template-notification'} onClick={() => onNavigate('template-notification')} />
      </div>

      {/* My Playbooks */}
      <div className="content-stretch flex flex-col flex-[1_0_0] gap-0 items-start min-h-px py-[4px] relative w-full z-[5]">
        <SectionHeader label="My Playbooks" />
        <NavItem label="Feed Test" icon="sidebar-dashboard-normal" active={activePage === 'screener'} onClick={() => onNavigate('screener')} />
      </div>

      {/* 用户行 */}
      <div
        className="content-stretch flex gap-[8px] items-center p-[8px] relative rounded-[6px] shrink-0 w-full z-[2] cursor-pointer hover:bg-white/5 transition-colors"
        onMouseEnter={onUserMouseEnter}
        onMouseLeave={onUserMouseLeave}
        onClick={() => onNavigate('user-profile')}
      >
        <Avatar name="YGGYLL" size={24} />
        <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-w-px relative text-[13px] text-white tracking-[0.13px] truncate">YGGYLL</p>
      </div>
    </div>
  );
}
