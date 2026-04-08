/**
 * [INPUT]: Page type from App.tsx
 * [OUTPUT]: 共享侧边栏组件
 * [POS]: Shell 层 — 所有页面的左侧导航
 */

import type { Page } from '@/app/App';
import { AVATAR_COLOR_PALETTE } from '@/lib/chart-theme';
import btnUpgradeBg from '@/assets/btn-upgrade.png';
import upgradeIcon from '@/assets/upgrade-l.svg';

/* ========== 用户头像 ========== */

function UserAvatar({ name, size = 24 }: { name: string; size?: number }) {
  const initial = name.trim().charAt(0).toUpperCase();
  const color = AVATAR_COLOR_PALETTE[[...name].reduce((s, c) => s + c.charCodeAt(0), 0) % AVATAR_COLOR_PALETTE.length];
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: size * 0.44, color: '#fff', lineHeight: 1, letterSpacing: 0, fontFamily: "'Delight', sans-serif" }}>
        {initial}
      </span>
    </div>
  );
}

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
        <NavItem label="ETH/BTC Mean Reversion" />
      </div>

      {/* Playbooks */}
      <div className="content-stretch flex flex-col items-start py-[4px] relative shrink-0 w-full z-[3]">
        <SectionHeader label="Playbooks" />
        <NavItem label="Workspace" active={activePage === 'workspace'} onClick={() => onNavigate('workspace')} />
      </div>


      {/* Upgrade + 用户 — mt-auto 撑到底部 */}
      <div className="shrink-0 w-full z-[1] mt-auto flex flex-col gap-[6px]">
        {/* Upgrade 按钮 — 双行 */}
        <div
          className="group relative mx-[8px] rounded-[6px] overflow-hidden cursor-pointer transition-all"
          style={{ border: '0.5px solid rgba(255,255,255,0.12)' }}
          onClick={() => onNavigate('pricing')}
        >
          <img src={btnUpgradeBg} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-x-[-1]" />
          <div className="relative flex flex-col items-center py-[10px] gap-[2px]">
            <div className="flex items-center gap-[6px]">
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 group-hover:opacity-100 transition-opacity">
                <rect x="1.5" y="5" width="9" height="2" rx="0.5" stroke="#3EE4D4" strokeLinejoin="round"/>
                <rect x="2.5" y="7" width="7" height="3.5" rx="0.5" stroke="#3EE4D4" strokeLinejoin="round"/>
                <line x1="6" y1="5" x2="6" y2="10.5" stroke="#3EE4D4"/>
                <path d="M6 5C6 5 6 3 4.5 2C3.5 1.3 2.5 2 3 3C3.5 4 6 5 6 5Z" stroke="#3EE4D4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 5C6 5 6 3 7.5 2C8.5 1.3 9.5 2 9 3C8.5 4 6 5 6 5Z" stroke="#3EE4D4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span
                className="text-[12px] leading-[18px] tracking-[0.12px] font-['Delight',sans-serif] font-normal"
                style={{ background: 'linear-gradient(90deg, #3EE4D4, #FFFFFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                Upgrade to Pro
              </span>
            </div>
            <span className="text-[10px] leading-[14px] font-['Delight',sans-serif] text-white/25 tracking-[0.3px]">
              Unlock unlimited playbooks
            </span>
          </div>
        </div>

        {/* Referral banner */}
        <div
          className="group mx-[8px] rounded-[6px] cursor-pointer transition-all px-[8px] py-[8px] flex items-center gap-[6px]"
          style={{ background: 'rgba(73,163,166,0.08)', border: '0.5px solid rgba(73,163,166,0.15)' }}
          onClick={onOpenReferral}
        >
          <svg width="14" height="14" viewBox="0 0 48 48" fill="none" className="shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
            <rect x="8" y="20" width="32" height="22" rx="3" stroke="#49A3A6" strokeWidth="3" strokeLinejoin="round" />
            <line x1="24" y1="20" x2="24" y2="42" stroke="#49A3A6" strokeWidth="3" />
            <line x1="8" y1="28" x2="40" y2="28" stroke="#49A3A6" strokeWidth="3" />
            <path d="M24 20C24 20 24 12 19 8C16 5.6 13 7 14 10C15 13 24 20 24 20Z" stroke="#49A3A6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M24 20C24 20 24 12 29 8C32 5.6 35 7 34 10C33 13 24 20 24 20Z" stroke="#49A3A6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[11px] leading-[16px] tracking-[0.11px] font-['Delight',sans-serif] text-white/50 group-hover:text-white/70 transition-colors">
            Invite friends, earn 500 credits
            <span className="ml-[2px] text-white/30">›</span>
          </span>
        </div>

        {/* 用户行 */}
        <div
          className="relative shrink-0 w-full rounded-[4px] cursor-pointer hover:bg-white/5 transition-colors"
          onMouseEnter={onUserMouseEnter}
          onMouseLeave={onUserMouseLeave}
          onClick={() => onNavigate('user-profile')}
        >
          <div className="flex gap-[8px] items-center p-[8px]">
            <UserAvatar name="YGGYLL" size={24} />
            <p className="flex-1 font-['Delight',sans-serif] font-normal leading-[22px] min-w-0 not-italic relative text-[13px] text-white tracking-[0.13px] truncate">YGGYLL</p>
          </div>
        </div>
      </div>
    </div>
  );
}
