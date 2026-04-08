/**
 * [INPUT]: Page type, Sidebar, UserInfo, Chat (方案C)
 * [OUTPUT]: 统一页面外壳（Sidebar + 内容区 + Chat FAB + ChatPanel）
 * [POS]: Shell 层 — 所有页面的布局容器
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import type { Page } from '@/app/App';
import { Sidebar } from './Sidebar';
import SearchModal from '../SearchModal';
import ReferralModal from '../ReferralModal';
import UserInfo from '../UserInfo';
import { ChatProvider, useChatContext } from '../chat/ChatContext';
import { ChatPanel } from '../chat/ChatPanel';
import { FloatingChatFAB } from '../chat/FloatingChatFAB';

interface AppShellProps {
  activePage?: Page;
  onNavigate: (page: Page) => void;
  onOpenSearch?: () => void;
  onUserMouseEnter?: () => void;
  onUserMouseLeave?: () => void;
  children: React.ReactNode;
}

const DEFAULT_PANEL_W = 496;
const MIN_PANEL_W = 380;
const MAX_PANEL_W = 720;

function AppShellInner({ activePage, onNavigate, onUserMouseEnter, onUserMouseLeave, children }: AppShellProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isReferralOpen, setIsReferralOpen] = useState(false);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const { chatOpen, closeChat, contextTag } = useChatContext();
  const showChat = chatOpen && contextTag !== null;
  const [panelWidth, setPanelWidth] = useState(DEFAULT_PANEL_W);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startW = useRef(DEFAULT_PANEL_W);

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

  const onDragStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      dragging.current = true;
      startX.current = e.clientX;
      startW.current = panelWidth;
      const onMove = (ev: MouseEvent) => {
        if (!dragging.current) return;
        const delta = startX.current - ev.clientX;
        const next = Math.min(MAX_PANEL_W, Math.max(MIN_PANEL_W, startW.current + delta));
        setPanelWidth(next);
      };
      const onUp = () => {
        dragging.current = false;
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    },
    [panelWidth],
  );

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
      <main className="relative flex min-w-0 flex-1 overflow-hidden rounded-bl-[8px] rounded-tl-[8px] bg-white ml-[228px]">
        <div className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </div>
        {contextTag !== null && (
          <div
            className="relative shrink-0"
            style={{
              width: showChat ? panelWidth : 0,
              minWidth: showChat ? panelWidth : 0,
              transition: dragging.current
                ? 'none'
                : 'width 0.3s cubic-bezier(0.4,0,0.2,1), min-width 0.3s cubic-bezier(0.4,0,0.2,1)',
              overflow: 'hidden',
            }}
          >
            <div
              className="absolute bottom-0 left-0 top-0 z-10"
              style={{ width: 6, cursor: 'col-resize' }}
              onMouseDown={onDragStart}
            />
            <ChatPanel onClose={closeChat} contextTag={contextTag} />
          </div>
        )}
      </main>

      {/* 方案C: FAB trigger */}
      {contextTag !== null && <FloatingChatFAB />}

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

export function AppShell({ activePage, onNavigate, onOpenSearch, onUserMouseEnter, onUserMouseLeave, children }: AppShellProps) {
  return (
    <ChatProvider activePage={activePage ?? 'home'}>
      <AppShellInner
        activePage={activePage}
        onNavigate={onNavigate}
        onOpenSearch={onOpenSearch}
        onUserMouseEnter={onUserMouseEnter}
        onUserMouseLeave={onUserMouseLeave}
      >
        {children}
      </AppShellInner>
    </ChatProvider>
  );
}
