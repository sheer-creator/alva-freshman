/**
 * [INPUT]: Page type, Sidebar
 * [OUTPUT]: 统一页面外壳（Sidebar + 内容区）
 * [POS]: Shell 层 — 所有页面的布局容器
 */

import type { Page } from '@/app/App';
import { Sidebar } from './Sidebar';

interface AppShellProps {
  activePage?: Page;
  onNavigate: (page: Page) => void;
  onOpenSearch?: () => void;
  onUserMouseEnter?: () => void;
  onUserMouseLeave?: () => void;
  children: React.ReactNode;
}

export function AppShell({ activePage, onNavigate, onOpenSearch, onUserMouseEnter, onUserMouseLeave, children }: AppShellProps) {
  return (
    <div className="bg-[#2a2a38] flex h-screen overflow-hidden relative w-full">
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        onOpenSearch={onOpenSearch}
        onUserMouseEnter={onUserMouseEnter}
        onUserMouseLeave={onUserMouseLeave}
      />
      <div className="bg-white flex-[1_0_0] h-screen ml-[228px] overflow-y-auto relative rounded-bl-[8px] rounded-tl-[8px]">
        {children}
      </div>
    </div>
  );
}
