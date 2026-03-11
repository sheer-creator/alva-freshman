/**
 * [INPUT]: Page type, Sidebar, UserInfo
 * [OUTPUT]: 统一页面外壳（Sidebar + 内容区 + UserInfo hover 浮层）
 * [POS]: Shell 层 — 所有页面的布局容器
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { Sidebar } from './Sidebar';
import SearchModal from '../SearchModal';
import UserInfo from '../UserInfo';

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
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);

  const handleUserEnter = () => {
    setIsUserInfoOpen(true);
    onUserMouseEnter?.();
  };
  const handleUserLeave = () => {
    setIsUserInfoOpen(false);
    onUserMouseLeave?.();
  };

  return (
    <div className="bg-[#2a2a38] flex h-screen overflow-hidden relative w-full">
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onUserMouseEnter={handleUserEnter}
        onUserMouseLeave={handleUserLeave}
      />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <div className="bg-white flex-[1_0_0] h-screen ml-[228px] overflow-y-auto relative rounded-bl-[8px] rounded-tl-[8px]">
        {children}
      </div>
      {isUserInfoOpen && (
        <div
          className="fixed bottom-[56px] left-[8px] z-[9999] w-[320px]"
          onMouseEnter={handleUserEnter}
          onMouseLeave={handleUserLeave}
        >
          <UserInfo />
        </div>
      )}
    </div>
  );
}
