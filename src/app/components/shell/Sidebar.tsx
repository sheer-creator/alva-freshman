/**
 * [INPUT]: Page type from App.tsx
 * [OUTPUT]: 共享侧边栏组件
 * [POS]: Shell 层 — 所有页面的左侧导航
 */

import type { Page } from '@/app/App';
import svgPaths from '@/data/svg-nheoeek59y';
import { AVATAR_COLOR_PALETTE } from '@/lib/chart-theme';

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
          <p className={`flex-[1_0_0] font-['Delight',sans-serif] font-normal leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[13px] text-ellipsis tracking-[0.13px] whitespace-nowrap ${active ? 'text-[#49a3a6]' : 'text-white'}`}>
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
    <div className="h-[48px] relative shrink-0 w-full z-[7]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[8px] py-[16px] relative size-full">
          {/* Alva 文字 Logo */}
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
            <div className="col-1 h-[14px] ml-0 mt-0 relative row-1 w-[56px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 14" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.45309 0.109342C10.459 -0.0358007 11.4804 -0.0357918 12.4863 0.109342C12.5668 0.120963 12.648 0.133308 12.8095 0.159147C12.8634 0.167773 12.8909 0.172321 12.915 0.177701C13.2242 0.246672 13.4653 0.488598 13.5341 0.797819C13.5395 0.821873 13.5441 0.848717 13.5527 0.902311C13.5786 1.06397 13.5919 1.14499 13.6035 1.22555C13.7487 2.23163 13.7487 3.25365 13.6035 4.25973C13.5919 4.34022 13.5785 4.42148 13.5527 4.58297C13.5441 4.63657 13.5395 4.66339 13.5341 4.68747C13.4652 4.9967 13.2242 5.23863 12.915 5.30758C12.8909 5.31296 12.8634 5.31654 12.8095 5.32516C12.648 5.35101 12.5668 5.36432 12.4863 5.37594C11.9756 5.44962 11.4609 5.48548 10.9463 5.48434C7.92804 5.49714 5.48541 7.94851 5.48532 10.9697C5.48532 11.4765 5.44851 11.9834 5.37594 12.4863C5.36432 12.5668 5.35197 12.6481 5.32614 12.8095C5.31751 12.8635 5.31296 12.8909 5.30758 12.915C5.23862 13.2242 4.99669 13.4653 4.68746 13.5341C4.66339 13.5395 4.63658 13.5441 4.58297 13.5527C4.42141 13.5786 4.34025 13.5919 4.25973 13.6035C3.25363 13.7487 2.23165 13.7487 1.22555 13.6035C1.145 13.5919 1.06395 13.5786 0.902309 13.5527C0.848711 13.5441 0.821879 13.5395 0.797816 13.5341C0.488597 13.4653 0.24667 13.2242 0.177699 12.915C0.172319 12.8909 0.167771 12.8635 0.159145 12.8095C0.133305 12.648 0.120961 12.5668 0.10934 12.4863C-0.0357934 11.4804 -0.0357978 10.459 0.10934 9.45309C0.120962 9.37256 0.1333 9.29138 0.159145 9.12985C0.167771 9.07594 0.172319 9.04853 0.177699 9.02438C0.246684 8.71521 0.488612 8.47413 0.797816 8.40524C0.821878 8.39989 0.848713 8.39526 0.902309 8.38669C1.06395 8.36082 1.145 8.34753 1.22555 8.3359C1.72846 8.26333 2.23534 8.22655 2.74215 8.22653C5.77133 8.22653 8.22745 5.77129 8.2275 2.74215C8.22752 2.23533 8.26333 1.72847 8.3359 1.22555C8.34753 1.14499 8.36082 1.06397 8.38668 0.902311C8.39526 0.848722 8.39989 0.82187 8.40524 0.797819C8.47412 0.488628 8.71523 0.246699 9.02438 0.177701C9.04853 0.172321 9.07593 0.167773 9.12985 0.159147C9.2914 0.133298 9.37255 0.120965 9.45309 0.109342Z" fill="#49A3A6" />
                <path d="M12.4873 8.33595C11.4813 8.19076 10.4592 8.19079 9.45317 8.33595C9.3726 8.34757 9.29158 8.36087 9.12992 8.38673C9.07601 8.39536 9.04861 8.3999 9.02446 8.40528C8.71549 8.47431 8.47428 8.71543 8.40532 9.02442C8.39994 9.04857 8.39539 9.07598 8.38676 9.12989C8.36091 9.29144 8.3476 9.3726 8.33598 9.45314C8.19086 10.459 8.19086 11.4805 8.33598 12.4863C8.3476 12.5669 8.36091 12.648 8.38676 12.8096C8.39539 12.8635 8.39994 12.8909 8.40532 12.915C8.47428 13.224 8.71549 13.4652 9.02446 13.5342C9.04861 13.5396 9.07601 13.5441 9.12992 13.5527C9.29158 13.5786 9.3726 13.5919 9.45317 13.6035C10.4592 13.7487 11.4813 13.7487 12.4873 13.6035C12.5677 13.5919 12.6484 13.5785 12.8096 13.5527C12.8635 13.5441 12.8909 13.5396 12.9151 13.5342C13.2242 13.4653 13.4652 13.2241 13.5342 12.915C13.5396 12.8909 13.5442 12.8635 13.5528 12.8096C13.5786 12.648 13.5919 12.5669 13.6036 12.4863C13.7487 11.4805 13.7487 10.459 13.6036 9.45314C13.5919 9.37259 13.5786 9.29147 13.5528 9.12989C13.5442 9.07598 13.5396 9.04857 13.5342 9.02442C13.4652 8.71537 13.2242 8.47422 12.9151 8.40528C12.8909 8.3999 12.8635 8.39536 12.8096 8.38673C12.6484 8.36094 12.5677 8.34755 12.4873 8.33595ZM4.25981 0.109385C3.25371 -0.0358108 2.23173 -0.0358107 1.22563 0.109385C1.14514 0.121004 1.0639 0.133348 0.902386 0.15919C0.8488 0.167764 0.821955 0.172392 0.797894 0.177745C0.488602 0.246652 0.246683 0.48857 0.177776 0.797862C0.172441 0.821897 0.167791 0.848793 0.159222 0.902354C0.133356 1.06401 0.121044 1.14503 0.109417 1.2256C-0.035776 2.23169 -0.0357781 3.25369 0.109417 4.25978C0.121032 4.34023 0.13339 4.42157 0.159222 4.58302C0.167795 4.6366 0.172418 4.66344 0.177776 4.68751C0.246683 4.9968 0.488602 5.23872 0.797894 5.30763C0.821922 5.31297 0.84892 5.31665 0.902386 5.32521C1.06393 5.35105 1.14512 5.36437 1.22563 5.37599C2.23173 5.52118 3.25371 5.52118 4.25981 5.37599C4.34034 5.36436 4.42145 5.35106 4.58305 5.32521C4.63651 5.31665 4.66352 5.31296 4.68754 5.30763C4.99683 5.23872 5.23875 4.9968 5.30766 4.68751C5.31302 4.66344 5.31764 4.6366 5.32621 4.58302C5.35204 4.42158 5.3644 4.34023 5.37602 4.25978C5.52121 3.25368 5.52121 2.23169 5.37602 1.2256C5.36439 1.14503 5.35208 1.06401 5.32621 0.902354C5.31764 0.848788 5.313 0.821899 5.30766 0.797862C5.23875 0.48857 4.99683 0.246652 4.68754 0.177745C4.66349 0.172397 4.63663 0.167763 4.58305 0.15919C4.42148 0.13334 4.34033 0.121007 4.25981 0.109385Z" fill="white" />
                <path d="M50.8804 2.85254C51.6828 2.85254 52.4001 2.9563 53.0317 3.16406C53.6665 3.37181 54.2029 3.67234 54.6411 4.06543C55.0826 4.45858 55.4198 4.93983 55.6519 5.50879C55.8838 6.07757 55.9995 6.72152 55.9995 7.44043V13.7119H53.5728V10.9414C53.4471 11.4142 53.2569 11.8405 53.0024 12.2207C52.7511 12.5978 52.4436 12.9193 52.0796 13.1846C51.7155 13.4466 51.3014 13.6484 50.8374 13.7891C50.3766 13.9297 49.8749 14 49.3335 14C48.7697 14 48.2554 13.9229 47.7915 13.7695C47.3309 13.6193 46.9365 13.4066 46.6079 13.1318C46.2793 12.857 46.0247 12.5263 45.8442 12.1396C45.667 11.7497 45.5786 11.3178 45.5786 10.8447C45.5787 10.3526 45.676 9.91136 45.8726 9.52148C46.0691 9.13153 46.3519 8.80099 46.7192 8.5293C47.0898 8.25767 47.5411 8.05006 48.0728 7.90625C48.6044 7.75928 49.2037 7.68555 49.8706 7.68555H53.5728V7.44043C53.5727 7.04114 53.5099 6.68347 53.3843 6.36719C53.2586 6.04755 53.0768 5.7755 52.8384 5.55176C52.6032 5.32805 52.3163 5.15733 51.978 5.03906C51.6397 4.92081 51.2578 4.86134 50.8325 4.86133C50.4009 4.86133 50.0255 4.91078 49.7065 5.00977C49.3907 5.10566 49.1296 5.24385 48.9233 5.42285C48.7172 5.60181 48.5633 5.81689 48.4634 6.06934C48.3635 6.32177 48.314 6.60485 48.314 6.91797H45.8921C45.8921 6.2948 46.0087 5.73222 46.2407 5.23047C46.4727 4.72876 46.8025 4.30173 47.231 3.9502C47.6627 3.59541 48.1868 3.32433 48.8022 3.13574C49.4209 2.94718 50.1136 2.85256 50.8804 2.85254ZM30.103 13.7129H27.396L26.3091 10.4854H20.3442L19.2368 13.7129H16.5884L21.5474 0H25.2114L30.103 13.7129ZM33.5015 13.7129H31.0747V0H33.5015V13.7129ZM40.0366 12.207L42.9956 3.14062H45.4751L41.772 13.7129H38.2437L34.5747 3.14062H37.1128L40.0366 12.207ZM50.0103 9.37305C49.3466 9.37309 48.844 9.48359 48.5024 9.7041C48.1643 9.92459 47.9947 10.2504 47.9946 10.6816C47.9946 11.1355 48.1807 11.4846 48.5513 11.7275C48.9251 11.9671 49.4633 12.0869 50.1655 12.0869C50.6617 12.0869 51.1181 12.0274 51.5337 11.9092C51.9522 11.7878 52.3113 11.6202 52.6108 11.4062C52.9137 11.1921 53.1493 10.9376 53.3169 10.6436C53.4876 10.3463 53.5728 10.0232 53.5728 9.6748V9.37305H50.0103ZM21.0786 8.33789H25.5835L23.3462 1.71191L21.0786 8.33789Z" fill="white" />
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
    <div className="antialiased bg-[#2a2a38] flex flex-col h-screen fixed left-0 top-0 isolate items-start p-[8px] shrink-0 w-[228px] z-[2] overflow-y-auto" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.4) 0.6px, transparent 0.6px)', backgroundSize: '3px 3px' }}>
      <Logo />

      {/* New Playbook 按钮 */}
      <div className="relative shrink-0 w-full z-[6]">
        <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
          <div className="bg-[#49a3a6] h-[32px] relative rounded-[4px] shrink-0 w-full">
            <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex gap-[8px] items-center justify-center p-[8px] relative size-full">
                <p className="font-['Delight',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[12px] text-ellipsis text-white tracking-[0.12px]">New Playbook</p>
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
        <NavItem label="Workspace" active={activePage === 'workspace'} onClick={() => onNavigate('workspace')} />
        <NavItem label="Custom Layout" active={activePage === 'test'} onClick={() => onNavigate('test')} />
        <NavItem label="Popular Stock Playbook" active={activePage === 'popular-stock'} onClick={() => onNavigate('popular-stock')} />
        <NavItem label="TSLA Overview" active={activePage === 'tsla-overview'} onClick={() => onNavigate('tsla-overview')} />
        <NavItem label="NVDA Panoramic" active={activePage === 'nvda'} onClick={() => onNavigate('nvda')} />
      </div>

      {/* 用户 — mt-auto 撑到底部 */}
      <div
        className="relative rounded-[4px] shrink-0 w-full z-[1] mt-auto"
        onMouseEnter={onUserMouseEnter}
        onMouseLeave={onUserMouseLeave}
      >
        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative w-full">
          <UserAvatar name="YGGYLL" size={24} />
          <p className="flex-[1_0_0] font-['Delight',sans-serif] font-normal leading-[22px] min-h-px min-w-px not-italic relative text-[13px] text-white tracking-[0.13px] whitespace-pre-wrap">YGGYLL</p>
        </div>
      </div>
    </div>
  );
}
