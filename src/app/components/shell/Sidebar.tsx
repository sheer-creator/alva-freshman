/**
 * [INPUT]: Page type from App.tsx
 * [OUTPUT]: 共享侧边栏组件
 * [POS]: Shell 层 — 所有页面的左侧导航
 */

import type { Page } from '@/app/App';
import { Avatar } from '@/app/components/shared/Avatar';

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

function NavItem({ label, badge, active, dimmed, onClick }: { label: string; badge?: string | number; active?: boolean; dimmed?: boolean; onClick?: () => void }) {
  return (
    <div
      className={`flex items-center h-[36px] w-full overflow-hidden whitespace-nowrap rounded-[4px] px-[8px] text-[13px] tracking-[0.13px] transition-colors ${
        active ? 'text-[#49A3A6]' : dimmed ? 'text-white/25' : 'text-white hover:bg-white/5'
      } ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <span className="text-ellipsis overflow-hidden">{label}</span>
      {badge != null && (
        <span
          className="ml-[8px] shrink-0 font-['Delight',sans-serif] text-[10px] leading-[16px] font-medium text-white"
          style={{ background: 'var(--main-m1, #49A3A6)', borderRadius: 999, padding: '0 6px' }}
        >
          {badge}
        </span>
      )}
    </div>
  );
}

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-full">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[4px] relative size-full">
          <p className="font-['Delight',sans-serif] font-normal leading-[20px] not-italic opacity-50 overflow-hidden relative shrink-0 text-[12px] text-ellipsis text-white tracking-[0.12px]">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ========== Logo ========== */

function Logo() {
  return (
    <div className="flex h-[48px] shrink-0 items-center justify-between px-[8px] py-[16px] w-full z-[7]">
      <img src={`${import.meta.env.BASE_URL}logo-alva-beta.svg`} alt="Alva" className="h-[14px] w-auto max-w-[160px] object-contain object-left" />
      <div className="flex items-center justify-center rounded-[6px] p-[2px] opacity-90">
        <img src={`${import.meta.env.BASE_URL}sidebar-onoff.svg`} alt="" width={16} height={16} />
      </div>
    </div>
  );
}

/* ========== 主组件 ========== */

export function Sidebar({ activePage, onNavigate, onOpenSearch, onUserMouseEnter, onUserMouseLeave, onOpenReferral }: SidebarProps) {
  return (
    <div className="antialiased bg-[#2a2a38] flex flex-col h-screen fixed left-0 top-0 isolate items-start p-[8px] shrink-0 w-[228px] z-[2] overflow-y-auto" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.4) 0.6px, transparent 0.6px)', backgroundSize: '3px 3px' }}>
      <Logo />

      {/* 主导航 */}
      <div className="content-stretch flex flex-col items-start py-[4px] relative shrink-0 w-full z-[5]">
        <NavItem label="Home" active={activePage === 'home'} onClick={() => onNavigate('home')} />
        <NavItem label="Explore" active={activePage === 'explore'} onClick={() => onNavigate('explore-2' as any)} />
        <NavItem label="Portfolio" active={activePage === 'portfolio' || activePage === 'portfolio-settings'} onClick={() => onNavigate('portfolio')} />
        <NavItem label="Agent" badge={3} active={activePage === 'agent'} onClick={() => onNavigate('agent')} />
        <NavItem label="Alva Skill" active={activePage === 'alva-skills'} onClick={() => onNavigate('alva-skills')} />
      </div>

      {/* Starred */}
      <div className="content-stretch flex flex-col items-start py-[4px] relative shrink-0 w-full z-[4]">
        <SectionHeader label="Starred" />
        <NavItem label="MAG7 Equal-Weight" />
      </div>

      {/* Playbooks */}
      <div className="content-stretch flex flex-col items-start py-[4px] relative shrink-0 w-full z-[3]">
        <SectionHeader label="Playbooks" />
        <NavItem label="Workspace" active={activePage === 'workspace'} onClick={() => onNavigate('workspace')} />
      </div>


      {/* Upgrade + 用户 — mt-auto 撑到底部 */}
      <div className="shrink-0 w-full z-[1] mt-auto flex flex-col gap-[6px]">
        {/* 用户行 */}
        <div
          className="relative shrink-0 w-full rounded-[4px] cursor-pointer hover:bg-white/5 transition-colors"
          onMouseEnter={onUserMouseEnter}
          onMouseLeave={onUserMouseLeave}
          onClick={() => onNavigate('user-profile')}
        >
          <div className="flex gap-[8px] items-center p-[8px]">
            <Avatar name="YGGYLL" size={24} />
            <p className="flex-1 font-['Delight',sans-serif] font-normal leading-[22px] min-w-0 not-italic relative text-[13px] text-white tracking-[0.13px] truncate">YGGYLL</p>
          </div>
        </div>
      </div>
    </div>
  );
}
