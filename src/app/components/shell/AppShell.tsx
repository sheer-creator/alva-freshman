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
import { CdnIcon } from '../shared/CdnIcon';

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

/**
 * Responsive shell breakpoints — mirror NewChat's 640px mobile threshold and
 * add a 1024px "compact" breakpoint where the sidebar collapses to icons.
 *   <640      : sidebar hidden entirely (mobile)
 *   640–1023  : sidebar collapsed (56px, icons only)
 *   ≥1024     : sidebar expanded (228px)
 */
const SIDEBAR_W_FULL = 228;
const SIDEBAR_W_COMPACT = 56;
const BP_COMPACT = 1024;
const BP_MOBILE = 640;

function useShellLayout() {
  const [w, setW] = useState<number>(() => (typeof window !== 'undefined' ? window.innerWidth : 1280));
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  if (w < BP_MOBILE) return { sidebarMode: 'hidden' as const, sidebarW: 0 };
  if (w < BP_COMPACT) return { sidebarMode: 'compact' as const, sidebarW: SIDEBAR_W_COMPACT };
  return { sidebarMode: 'full' as const, sidebarW: SIDEBAR_W_FULL };
}

function AppShellInner({ activePage, onNavigate, onUserMouseEnter, onUserMouseLeave, children }: AppShellProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isReferralOpen, setIsReferralOpen] = useState(false);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const { chatOpen, closeChat, contextTag } = useChatContext();
  const showChat = chatOpen && contextTag !== null;
  const { sidebarMode, sidebarW } = useShellLayout();
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

  // On mobile (sidebar hidden) we surface a slide-in drawer reachable from
  // the hamburger button in the mobile top bar. The drawer is always
  // mounted (just translated off-screen) so the CSS transition fires in
  // both directions without rAF priming gymnastics.
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = sidebarMode === 'hidden';

  return (
    <div className={`flex h-screen overflow-hidden relative w-full ${isMobile ? 'bg-white' : 'bg-[#2a2a38]'}`}>
      {sidebarMode !== 'hidden' && (
        <Sidebar
          activePage={activePage}
          onNavigate={onNavigate}
          onOpenSearch={() => setIsSearchOpen(true)}
          onUserMouseEnter={handleUserEnter}
          onOpenReferral={() => setIsReferralOpen(true)}
          collapsed={sidebarMode === 'compact'}
        />
      )}
      {/* Mobile drawer — always mounted so the CSS transition fires in
          both open and close directions. Slides in from the left over a
          fade-in scrim (rgba(0,0,0,0) → 0.45). 280ms cubic-bezier ease. */}
      {isMobile && (
        <>
          <div
            className="fixed inset-0 z-[40]"
            onClick={() => setDrawerOpen(false)}
            style={{
              background: drawerOpen ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0)',
              pointerEvents: drawerOpen ? 'auto' : 'none',
              transition: 'background 280ms cubic-bezier(0.4,0,0.2,1)',
            }}
          />
          <div
            className="fixed left-0 top-0 z-[50] h-screen"
            style={{
              width: 228,
              transform: drawerOpen ? 'translateX(0)' : 'translateX(-228px)',
              transition: 'transform 280ms cubic-bezier(0.4,0,0.2,1)',
              willChange: 'transform',
              pointerEvents: drawerOpen ? 'auto' : 'none',
            }}
          >
            <Sidebar
              activePage={activePage}
              onNavigate={(p) => { setDrawerOpen(false); onNavigate(p); }}
              onOpenSearch={() => { setDrawerOpen(false); setIsSearchOpen(true); }}
              onUserMouseEnter={handleUserEnter}
              onOpenReferral={() => { setDrawerOpen(false); setIsReferralOpen(true); }}
              inDrawer
            />
          </div>
        </>
      )}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <ReferralModal isOpen={isReferralOpen} onClose={() => setIsReferralOpen(false)} onNavigate={onNavigate} />
      <main
        className={`relative flex min-w-0 flex-1 overflow-hidden bg-white ${isMobile ? '' : 'rounded-bl-[8px] rounded-tl-[8px]'}`}
        style={{ marginLeft: sidebarW, transition: 'margin-left 0.25s cubic-bezier(0.4,0,0.2,1)' }}
      >
        <div className="min-w-0 flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
          {isMobile && (
            <MobileTopBar onOpenDrawer={() => setDrawerOpen(true)} />
          )}
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
          className="fixed bottom-[56px] left-[8px] z-[9999] w-[360px]"
        >
          <UserInfo />
        </div>
      )}
    </div>
  );
}

/**
 * Mobile-only top nav. Per Figma `Home - Common` 1194:33015 (mobile topbar
 * pattern), but stripped per latest spec to only the left-side settings
 * button — no centered logo, no right-side action. The settings button
 * doubles as the drawer trigger so the full sidebar is still reachable.
 */
function MobileTopBar({ onOpenDrawer }: { onOpenDrawer: () => void }) {
  return (
    <div
      className="sticky top-0 z-[20] flex items-center h-[48px] px-[12px] shrink-0"
      style={{ background: '#f6f6f6' }}
    >
      <button
        onClick={onOpenDrawer}
        className="flex items-center justify-center w-[36px] h-[36px] rounded-[8px] hover:bg-[rgba(0,0,0,0.04)] cursor-pointer transition-colors"
        aria-label="Open navigation"
      >
        <CdnIcon name="menu-l" size={20} color="rgba(0,0,0,0.85)" />
      </button>
    </div>
  );
}

export function AppShell({ activePage, onNavigate, onOpenSearch, onUserMouseEnter, onUserMouseLeave, children }: AppShellProps) {
  return (
    <ChatProvider activePage={activePage ?? 'new-chat'}>
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
