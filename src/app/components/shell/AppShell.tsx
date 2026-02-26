/**
 * [INPUT]: Page type, Sidebar
 * [OUTPUT]: 统一页面外壳（Sidebar + 内容区）
 * [POS]: Shell 层 — 所有页面的布局容器
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { Sidebar } from './Sidebar';
import SearchModal from '../SearchModal';

interface AppShellProps {
  activePage?: Page;
  onNavigate: (page: Page) => void;
  onOpenSearch?: () => void;
  onUserMouseEnter?: () => void;
  onUserMouseLeave?: () => void;
  children: React.ReactNode;
}

export function AppShell({ activePage, onNavigate, onUserMouseEnter, onUserMouseLeave, children }: AppShellProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="bg-[#2a2a38] flex h-screen overflow-hidden relative w-full">
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onUserMouseEnter={onUserMouseEnter}
        onUserMouseLeave={onUserMouseLeave}
      />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <div className="bg-white flex-[1_0_0] h-screen ml-[228px] overflow-y-auto relative rounded-bl-[8px] rounded-tl-[8px]">
        {children}
      </div>
    </div>
  );
}
