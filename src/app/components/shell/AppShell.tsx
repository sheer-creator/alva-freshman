/**
 * [INPUT]: Page type, Sidebar, UserInfo
 * [OUTPUT]: 统一页面外壳（Sidebar + 内容区 + UserInfo hover 浮层）
 * [POS]: Shell 层 — 所有页面的布局容器
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import type { Page } from '@/app/App';
import { Sidebar } from './Sidebar';
import SearchModal from '../SearchModal';
import ReferralModal from '../ReferralModal';
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
  const [isReferralOpen, setIsReferralOpen] = useState(false);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleUserEnter = useCallback(() => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    setIsUserInfoOpen(true);
    onUserMouseEnter?.();
  }, [onUserMouseEnter]);

  useEffect(() => {
    if (!isUserInfoOpen) return;

    const onMouseMove = (e: MouseEvent) => {
      const popup = popupRef.current;
      if (!popup) return;

      const rect = popup.getBoundingClientRect();
      const inSafeZone =
        e.clientX >= rect.left - 20 &&
        e.clientX <= rect.right + 20 &&
        e.clientY >= rect.top - 10 &&
        e.clientY <= window.innerHeight;

      if (inSafeZone) {
        if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
      } else if (!closeTimer.current) {
        closeTimer.current = setTimeout(() => {
          setIsUserInfoOpen(false);
          onUserMouseLeave?.();
        }, 150);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    };
  }, [isUserInfoOpen, onUserMouseLeave]);

  return (
    <div className="bg-[#2a2a38] flex h-screen overflow-hidden relative w-full">
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onUserMouseEnter={handleUserEnter}
        onOpenReferral={() => setIsReferralOpen(true)}
      />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <ReferralModal isOpen={isReferralOpen} onClose={() => setIsReferralOpen(false)} onNavigate={onNavigate} />
      <div className="bg-white flex-[1_0_0] h-screen ml-[228px] overflow-y-auto relative rounded-bl-[8px] rounded-tl-[8px]">
        {children}
      </div>
      {isUserInfoOpen && (
        <div
          ref={popupRef}
          className="fixed bottom-[56px] left-[8px] z-[9999] w-[320px]"
        >
          <UserInfo />
        </div>
      )}
    </div>
  );
}
