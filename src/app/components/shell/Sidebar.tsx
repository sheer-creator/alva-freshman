/**
 * [INPUT]: Page type from App.tsx
 * [OUTPUT]: 共享侧边栏组件
 * [POS]: Shell 层 — 所有页面的左侧导航
 */

import type { Page } from '@/app/App';
import svgPaths from '@/data/svg-nheoeek59y';
import imgAvatar from 'figma:asset/b6ec6224880e49a1fd078b50b5b248ac0bdaff74.png';

/* ========== 类型 ========== */

interface SidebarProps {
  activePage?: Page;
  onNavigate: (page: Page) => void;
  onOpenSearch?: () => void;
  onUserMouseEnter?: () => void;
  onUserMouseLeave?: () => void;
}

/* ========== 导航项组件 ========== */

function NavItem({ label, active, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
  return (
    <div
      className={`h-[36px] relative rounded-[4px] shrink-0 w-full ${onClick ? 'cursor-pointer hover:bg-white/5 transition-colors' : ''}`}
      onClick={onClick}
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative size-full">
          <p className={`flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[13px] text-ellipsis tracking-[0.13px] whitespace-nowrap ${active ? 'text-[#49a3a6]' : 'text-white'}`}>
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-full">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[4px] relative size-full">
          <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic opacity-50 overflow-hidden relative shrink-0 text-[12px] text-ellipsis text-white tracking-[0.12px]">
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
    <div className="h-[48px] relative shrink-0 w-full z-[7]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[8px] py-[16px] relative size-full">
          {/* Alva 文字 Logo */}
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
            <div className="col-1 h-[14px] ml-0 mt-0 relative row-1 w-[39.411px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.4111 14">
                <path d={svgPaths.p3579200} fill="white" />
              </svg>
            </div>
          </div>
          {/* 侧边栏折叠图标 */}
          <div className="relative shrink-0 size-[16px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={svgPaths.p286113b2} fill="#404050" />
              <path d={svgPaths.p3c7c6d00} fill="white" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========== 主组件 ========== */

export function Sidebar({ activePage, onNavigate, onOpenSearch, onUserMouseEnter, onUserMouseLeave }: SidebarProps) {
  return (
    <div className="bg-[#2a2a38] flex flex-col h-screen fixed left-0 top-0 isolate items-start p-[8px] shrink-0 w-[228px] z-[2] overflow-y-auto">
      <Logo />

      {/* New Playbook 按钮 */}
      <div className="relative shrink-0 w-full z-[6]">
        <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
          <div className="bg-[#49a3a6] h-[32px] relative rounded-[4px] shrink-0 w-full">
            <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex gap-[8px] items-center justify-center p-[8px] relative size-full">
                <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[12px] text-ellipsis text-white tracking-[0.12px]">New Playbook</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 主导航 */}
      <div className="content-stretch flex flex-col items-start py-[4px] relative shrink-0 w-full z-[5]">
        <NavItem label="Home" active={activePage === 'home'} onClick={() => onNavigate('home')} />
        <NavItem label="Explore" active={activePage === 'explore'} onClick={() => onNavigate('explore')} />
        <NavItem label="Library" active={activePage === 'library'} onClick={() => onNavigate('library')} />
        <NavItem label="Search" onClick={onOpenSearch} />
        <NavItem label="About" onClick={() => window.open('https://alva.ai/landing', '_blank')} />
      </div>

      {/* Playbooks */}
      <div className="content-stretch flex flex-col items-start py-[4px] relative shrink-0 w-full z-[4]">
        <SectionHeader label="Playbooks" />
        <NavItem label="Dashboard Playbook" active={activePage === 'dashboard'} onClick={() => onNavigate('dashboard')} />
        <NavItem label="Dashboard Workspace" active={activePage === 'workspace'} onClick={() => onNavigate('workspace')} />
        <NavItem label="Custom Layout" active={activePage === 'test'} onClick={() => onNavigate('test')} />
        <NavItem label="Popular Stock Playbook" active={activePage === 'popular-stock'} onClick={() => onNavigate('popular-stock')} />
        <NavItem label="NVDA Panoramic" active={activePage === 'nvda'} onClick={() => onNavigate('nvda')} />
      </div>

      {/* 用户 — mt-auto 撑到底部 */}
      <div
        className="relative rounded-[4px] shrink-0 w-full z-[1] mt-auto"
        onMouseEnter={onUserMouseEnter}
        onMouseLeave={onUserMouseLeave}
      >
        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative w-full">
          <div className="relative rounded-[100px] shrink-0 size-[24px]">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={imgAvatar} />
          </div>
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[13px] text-white tracking-[0.13px] whitespace-pre-wrap">YGGYLL</p>
        </div>
      </div>
    </div>
  );
}
