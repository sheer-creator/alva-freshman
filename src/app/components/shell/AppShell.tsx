/**
 * [INPUT]: Page type, Sidebar, UserInfo, Chat (方案C)
 * [OUTPUT]: 统一页面外壳（Sidebar + 内容区 + Chat FAB + ChatPanel）
 * [POS]: Shell 层 — 所有页面的布局容器
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import type { Page } from '@/app/App';
import { Sidebar, SIDEBAR_W_COLLAPSED, SIDEBAR_W_EXPANDED } from './Sidebar';
import { CdnIcon } from '../shared/CdnIcon';
import { ThreadSwitcherDropdown } from '../shared/ThreadSwitcherDropdown';

const NARROW_THRESHOLD = 1024;
const MOBILE_THRESHOLD = 640;
const MOBILE_TOPBAR_H = 48;
const PAGE_TITLES: Record<string, string> = {
  'new-chat': 'New chat',
  'explore-2': 'Explore',
  portfolio: 'Portfolio',
  agent: 'Agent',
  'alva-skills': 'Alva Skill',
  account: 'Account',
  'user-profile': 'Profile',
  pricing: 'Pricing',
  'api-keys': 'API Keys',
  notifications: 'Notifications',
  automations: 'Automations',
  billing: 'Billing',
  'alva-agent': 'Alva Agent',
  'portfolio-settings': 'Portfolio',
  'screener': 'Feed Test',
  'trade-notification-test': 'Trade Notification Test',
  'template-screener': 'Template-Screener',
  'template-thesis': 'Template-Thesis',
  'template-whatif': 'Template-Whatif',
  'template-notification': 'Template-Notification',
};
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

  // 侧边栏折叠：窗口窄时自动折叠，按钮可手动切换；< MOBILE_THRESHOLD 时整体隐藏
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < NARROW_THRESHOLD : false,
  );
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_THRESHOLD : false,
  );
  useEffect(() => {
    let lastWasNarrow = window.innerWidth < NARROW_THRESHOLD;
    const handler = () => {
      const w = window.innerWidth;
      const isNarrow = w < NARROW_THRESHOLD;
      if (isNarrow !== lastWasNarrow) {
        setSidebarCollapsed(isNarrow);
        lastWasNarrow = isNarrow;
      }
      setIsMobile(w < MOBILE_THRESHOLD);
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  const sidebarWidth = sidebarCollapsed ? SIDEBAR_W_COLLAPSED : SIDEBAR_W_EXPANDED;
  const effectiveSidebarWidth = isMobile ? 0 : sidebarWidth;
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
      {!isMobile && (
        <Sidebar
          activePage={activePage}
          onNavigate={onNavigate}
          onOpenSearch={() => setIsSearchOpen(true)}
          onUserMouseEnter={handleUserEnter}
          onOpenReferral={() => setIsReferralOpen(true)}
          collapsed={sidebarCollapsed}
          onToggleCollapsed={() => setSidebarCollapsed((c) => !c)}
        />
      )}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <ReferralModal isOpen={isReferralOpen} onClose={() => setIsReferralOpen(false)} onNavigate={onNavigate} />
      {/* Mobile top bar：返回 + 当前页标题（带 thread 切换） */}
      {isMobile && (
        <div
          className="fixed top-0 left-0 right-0 z-[60] flex items-center"
          style={{
            height: MOBILE_TOPBAR_H,
            padding: '0 12px',
            background: '#fafafa',
            gap: 8,
          }}
        >
          <button
            type="button"
            aria-label="Back"
            onClick={() => {
              if (window.history.length > 1) window.history.back();
              else onNavigate('explore-2');
            }}
            className="shrink-0 flex items-center justify-center rounded-[8px] cursor-pointer hover:bg-black/5 transition-colors"
            style={{ width: 32, height: 32 }}
          >
            <CdnIcon name="arrow-left-l2" size={16} color="rgba(0,0,0,0.85)" />
          </button>
          <div className="flex-1 min-w-0 flex justify-center">
            <ThreadSwitcherDropdown
              activeId={activePage === 'agent' ? '__agent__' : 'new'}
              onSelect={(id) => {
                if (id === '__agent__') onNavigate('agent');
                else if (id) onNavigate(`thread/${id}` as Page);
              }}
              align="left"
              trigger={
                <div className="flex items-center gap-[4px] cursor-pointer max-w-full">
                  <p
                    className="font-['Delight',sans-serif] truncate"
                    style={{
                      fontSize: 15,
                      lineHeight: '20px',
                      fontWeight: 500,
                      color: 'rgba(0,0,0,0.9)',
                      letterSpacing: 0.15,
                    }}
                  >
                    {PAGE_TITLES[activePage ?? ''] ?? 'Alva'}
                  </p>
                  <CdnIcon name="arrow-down-f2" size={14} color="rgba(0,0,0,0.45)" />
                </div>
              }
            />
          </div>
          {/* 占位让标题真正居中 */}
          <div className="shrink-0" style={{ width: 32, height: 32 }} />
        </div>
      )}
      <main
        className="relative flex min-w-0 flex-1 overflow-hidden bg-white"
        style={{
          marginLeft: effectiveSidebarWidth,
          marginTop: isMobile ? MOBILE_TOPBAR_H : 0,
          borderTopLeftRadius: isMobile ? 0 : 8,
          borderBottomLeftRadius: isMobile ? 0 : 8,
          transition: 'margin-left 200ms ease',
        }}
      >
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
          className="fixed bottom-[56px] left-[8px] z-[9999] w-[360px]"
        >
          <UserInfo />
        </div>
      )}
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
