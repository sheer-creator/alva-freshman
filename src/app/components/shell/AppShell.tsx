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

import { PAGE_TITLES, isPlaybookOwnerPage } from '@/lib/chat-config';

const NARROW_THRESHOLD = 1024;
const MOBILE_THRESHOLD = 640;
const MOBILE_TOPBAR_H = 48;
import SearchModal from '../SearchModal';
import ReferralModal from '../ReferralModal';
import UserInfo from '../UserInfo';
import { useChatContext } from '../chat/ChatContext';
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
const MIN_PANEL_W = 436;
const getMaxPanelW = () =>
  typeof window !== 'undefined' ? Math.max(MIN_PANEL_W, window.innerWidth * 0.6) : DEFAULT_PANEL_W;

function AppShellInner({ activePage, onNavigate, onUserMouseEnter, onUserMouseLeave, children }: AppShellProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isReferralOpen, setIsReferralOpen] = useState(false);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const { chatOpen, closeChat, openChatWithPrefill, contextTag, inspectorActive, addElementQuote } = useChatContext();
  const showChat = chatOpen && contextTag !== null;
  const inspectorActiveRef = useRef(inspectorActive);
  inspectorActiveRef.current = inspectorActive;

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
      setPanelWidth((prev) => Math.min(getMaxPanelW(), Math.max(MIN_PANEL_W, prev)));
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  const sidebarWidth = sidebarCollapsed ? SIDEBAR_W_COLLAPSED : SIDEBAR_W_EXPANDED;
  const effectiveSidebarWidth = isMobile ? 0 : sidebarWidth;
  const [panelWidth, setPanelWidth] = useState(() => Math.min(getMaxPanelW(), DEFAULT_PANEL_W));
  const dragging = useRef(false);
  const startX = useRef(0);
  const startW = useRef(DEFAULT_PANEL_W);
  const panelWrapperRef = useRef<HTMLDivElement>(null);

  /* ── postMessage bridge: inspector quotes, remix, drawer ── */
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const data = e.data;
      if (!data || typeof data !== 'object') return;
      if (data.type === 'alva:drawer-open' && data.drawer !== 'chat') closeChat();
      if (data.type === 'alva:remix' && typeof data.prompt === 'string') {
        openChatWithPrefill(data.prompt);
      }
      if (data.type === 'alva:navigate' && typeof data.page === 'string') {
        onNavigate(data.page as Page);
      }
      /* inspector → quote */
      if (data.type === 'alva:inspector-quote') {
        addElementQuote({
          index: data.index ?? 0,
          selector: data.selector,
          tagName: data.tagName,
          newText: data.newText ?? null,
          originalText: data.originalText ?? null,
          instruction: data.instruction ?? null,
        });
      }
      /* iframe (re)loaded — re-send current inspector state */
      if (data.type === 'alva:inspector-ready') {
        const src = e.source as Window | null;
        if (src && inspectorActiveRef.current) {
          try { src.postMessage({ type: 'alva:inspector-activate', viewerMode: !isPlaybookOwnerPage(activePage || '') }, '*'); } catch (_) {}
        }
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [closeChat, openChatWithPrefill, onNavigate, addElementQuote]);

  /* notify iframes when chat panel opens */
  useEffect(() => {
    if (!chatOpen) return;
    document.querySelectorAll('iframe').forEach((f) => {
      try { f.contentWindow?.postMessage({ type: 'alva:drawer-open', drawer: 'chat' }, '*'); } catch (_) {}
    });
  }, [chatOpen]);

  /* notify iframes when inspector mode toggles or chat panel opens/closes */
  useEffect(() => {
    const msg = inspectorActive
      ? { type: 'alva:inspector-activate', viewerMode: !isPlaybookOwnerPage(activePage || '') }
      : { type: 'alva:inspector-deactivate' };
    document.querySelectorAll('iframe').forEach((f) => {
      try { f.contentWindow?.postMessage(msg, '*'); } catch (_) {}
    });
  }, [inspectorActive, chatOpen, activePage]);

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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const onDragStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      dragging.current = true;
      startX.current = e.clientX;
      startW.current = panelWidth;
      const node = panelWrapperRef.current;
      if (node) node.style.transition = 'none';
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';

      /* iframe 会偷 mousemove —— 拖拽期间屏蔽 pointer-events，事件回到 document */
      const iframes = Array.from(document.querySelectorAll('iframe'));
      const prevIframePE: string[] = iframes.map((f) => f.style.pointerEvents);
      iframes.forEach((f) => { f.style.pointerEvents = 'none'; });

      let latest = panelWidth;
      const maxW = getMaxPanelW();
      const onMove = (ev: MouseEvent) => {
        if (!dragging.current) return;
        const delta = startX.current - ev.clientX;
        latest = Math.min(maxW, Math.max(MIN_PANEL_W, startW.current + delta));
        if (node) {
          node.style.width = `${latest}px`;
          node.style.minWidth = `${latest}px`;
        }
      };
      const onUp = () => {
        dragging.current = false;
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        iframes.forEach((f, i) => { f.style.pointerEvents = prevIframePE[i]; });
        if (node) node.style.transition = '';
        setPanelWidth(latest);
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    },
    [panelWidth],
  );

  return (
    <div className="bg-[var(--b0-sidebar)] flex h-screen overflow-hidden relative w-full">
      {/* Desktop sidebar — hidden below lg */}
      <div className="hidden lg:block">
        <Sidebar
          activePage={activePage}
          onNavigate={onNavigate}
          onOpenSearch={() => setIsSearchOpen(true)}
          onUserMouseEnter={handleUserEnter}
          onOpenReferral={() => setIsReferralOpen(true)}
        />
      </div>

      {/* Mobile sidebar overlay — shown below lg when open */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.4)' }}
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 h-full" style={{ width: 264 }}>
            <Sidebar
              activePage={activePage}
              onNavigate={(page) => { setMobileMenuOpen(false); onNavigate(page); }}
              onOpenSearch={() => { setMobileMenuOpen(false); setIsSearchOpen(true); }}
              onUserMouseEnter={handleUserEnter}
              onOpenReferral={() => { setMobileMenuOpen(false); setIsReferralOpen(true); }}
            />
          </div>
        </div>
      )}

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <ReferralModal isOpen={isReferralOpen} onClose={() => setIsReferralOpen(false)} onNavigate={onNavigate} />
      <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden bg-white lg:ml-[228px]">
        {/* Mobile topbar — shown below lg */}
        <div
          className="flex lg:hidden items-center shrink-0"
          style={{
            height: 56,
            padding: '18px 16px',
            gap: 12,
            background: '#fff',
          }}
        >
          <button
            type="button"
            className="cursor-pointer bg-transparent border-none p-0 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <CdnIcon name="menu-l" size={20} color="var(--text-n7, rgba(0,0,0,0.7))" />
          </button>
          <img
            src={`${import.meta.env.BASE_URL}logo-alva-beta-green-black.svg`}
            alt="Alva"
            style={{ height: 14 }}
          />
        </div>

        <div className="min-w-0 flex-1 overflow-hidden lg:flex lg:flex-row">
          <div className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
            {children}
          </div>
          {contextTag !== null && (
            <div
              ref={panelWrapperRef}
              className="relative shrink-0"
              style={{
                width: showChat ? panelWidth : 0,
                minWidth: showChat ? panelWidth : 0,
                transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1), min-width 0.3s cubic-bezier(0.4,0,0.2,1)',
                overflow: 'hidden',
              }}
            >
              <div
                className="absolute bottom-0 left-0 top-0 z-10"
                style={{ width: 12, cursor: 'col-resize' }}
                onMouseDown={onDragStart}
              />
              <ChatPanel onClose={closeChat} contextTag={contextTag} />
            </div>
          )}
        </div>
      </main>

      {/* 方案C: FAB trigger */}
      {contextTag !== null && <FloatingChatFAB />}

      {isUserInfoOpen && (
        <div
          ref={popupRef}
          className="fixed bottom-[56px] left-[8px] z-[9999] w-[360px]"
        >
          <UserInfo
            onNavigate={(page) => {
              if (page === 'creator-earnings' && activePage && activePage !== 'creator-earnings') {
                sessionStorage.setItem('creatorEarningsReturnPage', activePage);
              }
              setIsUserInfoOpen(false);
              onNavigate(page);
            }}
          />
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
        className="flex items-center justify-center w-[36px] h-[36px] rounded-[8px] hover:bg-[var(--b-r05)] cursor-pointer transition-colors"
        aria-label="Open navigation"
      >
        <CdnIcon name="menu-l" size={20} color="var(--text-n9)" />
      </button>
    </div>
  );
}

export function AppShell({ activePage, onNavigate, onOpenSearch, onUserMouseEnter, onUserMouseLeave, children }: AppShellProps) {
  return (
    <AppShellInner
      activePage={activePage}
      onNavigate={onNavigate}
      onOpenSearch={onOpenSearch}
      onUserMouseEnter={onUserMouseEnter}
      onUserMouseLeave={onUserMouseLeave}
    >
      {children}
    </AppShellInner>
  );
}
