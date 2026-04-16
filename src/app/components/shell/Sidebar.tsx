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

function NavItem({ label, icon, badge, active, onClick }: { label: string; icon?: string; badge?: string | number; active?: boolean; onClick?: () => void }) {
  return (
    <div
      className={`content-stretch flex gap-[8px] h-[36px] items-center overflow-clip px-[8px] py-[4px] relative rounded-[6px] shrink-0 w-full transition-colors ${
        active ? 'text-[#49A3A6]' : 'text-white hover:bg-white/5'
      } ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {icon && (
        <div className="overflow-clip relative shrink-0 size-[16px]">
          <CdnIcon name={icon} size={16} color={active ? '#49A3A6' : '#ffffff'} />
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

/* ========== 主组件 ========== */

export function Sidebar({ activePage, onNavigate, onOpenSearch, onUserMouseEnter, onUserMouseLeave, onOpenReferral }: SidebarProps) {
  return (
    <div className="antialiased bg-[#2a2a38] flex flex-col gap-0 h-screen fixed left-0 top-0 isolate items-start p-[8px] shrink-0 w-[228px] z-[2] overflow-y-auto" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.4) 0.6px, transparent 0.6px)', backgroundSize: '3px 3px' }}>
      <Logo />

      {/* 主导航 */}
      <div className="content-stretch flex flex-col gap-0 items-start py-[4px] relative shrink-0 w-full z-[7]">
        <NavItem label="Home" icon="sidebar-home-normal" active={activePage === 'home'} onClick={() => onNavigate('home')} />
        <NavItem label="Explore" icon="sidebar-discover-normal" active={activePage === 'explore'} onClick={() => onNavigate('explore-2' as any)} />
        <NavItem label="Portfolio" icon="sidebar-portfolio-normal" active={activePage === 'portfolio' || activePage === 'portfolio-settings'} onClick={() => onNavigate('portfolio')} />
        <NavItem label="Agent" icon="sidebar-agent-normal" badge={32} active={activePage === 'agent'} onClick={() => onNavigate('agent')} />
        <NavItem label="Alva Skill" icon="sidebar-skills-normal" active={activePage === 'alva-skills'} onClick={() => onNavigate('alva-skills')} />
      </div>

      {/* Starred */}
      <div className="content-stretch flex flex-col gap-0 items-start py-[4px] relative shrink-0 w-full z-[6]">
        <SectionHeader label="Starred" />
        <NavItem label="Top-2 Momentum with EMA50 Exit Only" icon="sidebar-dashboard-normal" />
      </div>

      {/* Playbooks */}
      <div className="content-stretch flex flex-col flex-[1_0_0] gap-0 items-start min-h-px py-[4px] relative w-full z-[5]">
        <SectionHeader label="Playbooks" />
        <NavItem label="Storage Dashboard" icon="sidebar-dashboard-normal" active={activePage === 'workspace'} onClick={() => onNavigate('workspace')} />
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
