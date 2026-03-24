/**
 * [INPUT]: open/onClose + onNavigate
 * [OUTPUT]: 右侧滑出 Chat 面板 — 复用 alva-chat MessageList 或空态
 * [POS]: 社区组件 — PlaybookTopbar 的 Chat 入口面板
 */

import { useState, useRef, useCallback } from 'react';
import type { Page } from '@/app/App';
import { getActiveConversation } from '@/data/alva-chat-mock';
import { MessageList } from '@/app/components/alva-chat/MessageList';
import { InputBar } from '@/app/components/alva-chat/InputBar';

const ICON_CDN = 'https://alva-ai-static.b-cdn.net/icons';

/* ========== Props ========== */

interface ChatPanelProps {
  open: boolean;
  onClose: () => void;
  onNavigate?: (page: Page) => void;
}

/* ========== 组件 ========== */

export function ChatPanel({ open, onClose, onNavigate }: ChatPanelProps) {
  const [width, setWidth] = useState(480);
  const widthRef = useRef(width);
  widthRef.current = width;

  const conversation = getActiveConversation();

  /* 拖拽调整宽度 */
  const handleDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startW = widthRef.current;
    const onMove = (ev: MouseEvent) => setWidth(Math.min(640, Math.max(320, startW + (startX - ev.clientX))));
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, []);

  const expandToFull = () => {
    onNavigate?.('alva-chat-detail');
  };

  return (
    <div
      className="flex flex-col shrink-0 h-full relative"
      style={{
        width: open ? width : 0,
        opacity: open ? 1 : 0,
        paddingTop: open ? 8 : 0,
        paddingRight: open ? 8 : 0,
        paddingBottom: open ? 8 : 0,
        paddingLeft: 0,
        overflow: 'visible',
        pointerEvents: open ? 'auto' : 'none',
        transition: 'width 200ms ease-in-out, padding 200ms ease-in-out, opacity 150ms ease-in-out',
      }}
    >
      <div
        className="flex flex-col flex-1 min-h-0 bg-white"
        style={{
          border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))',
          borderRadius: 12,
          boxShadow: 'var(--shadow-xs, 0 4px 15px 0 rgba(0,0,0,0.05))',
          overflow: 'hidden',
        }}
      >
        {/* 拖拽手柄 */}
        <div
          onMouseDown={handleDragStart}
          style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
            cursor: 'col-resize', zIndex: 1,
          }}
        />

        {/* 标题行 */}
        <div className="flex items-center justify-between px-[16px] h-[48px] shrink-0">
          <p className="text-[14px]" style={{ color: 'var(--text-n9)', fontWeight: 500, fontFamily: "'Delight', sans-serif" }}>Chat</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {/* Expand 图标 */}
            {conversation && (
              <button
                onClick={expandToFull}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', opacity: 0.5 }}
                title="Open full view"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 5V1h4M9 1h4v4M13 9v4H9M5 13H1V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
            {/* Close */}
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16 }}
            >
              <img src={`${ICON_CDN}/close-l1.svg`} alt="Close" width={16} height={16} />
            </button>
          </div>
        </div>

        {/* 内容区 */}
        {conversation ? (
          /* 有 activeConversation：复用 MessageList 渲染 */
          <>
            <MessageList turns={conversation.turns} />
            <InputBar onSend={() => {}} placeholder="Ask anything about this playbook..." />
          </>
        ) : (
          /* 空态 */
          <>
            <div style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: 24,
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" style={{ opacity: 0.15 }}>
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="currentColor" />
              </svg>
              <span style={{ fontSize: 13, color: 'var(--text-n5)', fontFamily: "'Delight', sans-serif", textAlign: 'center' }}>
                Start a conversation about this playbook
              </span>
            </div>
            <InputBar onSend={() => {}} placeholder="Ask anything about this playbook..." />
          </>
        )}
      </div>
    </div>
  );
}
