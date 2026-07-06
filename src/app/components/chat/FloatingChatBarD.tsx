import { useState, useRef, useCallback, useEffect } from 'react';
import { CdnIcon } from '../shared/CdnIcon';
import { AlvaLoading } from '../shared/AlvaLoading';
import { useChatContext } from './ChatContext';
import { TodoListCard, ReviewPlanCard, AnswerQuestionCard } from './StreamingMessages';
import symbolLogo from './symbol-green-white.svg';

import logoGreenBlack from './logo-green-black.svg';
import type { ContextTagData } from '@/lib/chat-config';

const CDN = 'https://alva-ai-static.b-cdn.net/icons';

function buildTagHTML(tag: ContextTagData): string {
  const iconUrl = `${CDN}/${tag.icon || 'sidebar-discover-normal'}.svg`;
  return `<span data-context-tag="" contenteditable="false" style="display:inline-flex;align-items:center;gap:6px;height:24px;padding:2px 6px 2px 3px;max-width:216px;border-radius:2px;background:rgba(73,163,166,0.05);vertical-align:middle;margin-right:6px;user-select:none;cursor:default"><span style="display:flex;align-items:center;justify-content:center;flex-shrink:0;width:18px;height:18px;border-radius:2px;background:var(--main-m1)"><span style="display:block;width:14px;height:14px;background-color:#fff;-webkit-mask-image:url(${iconUrl});-webkit-mask-size:contain;-webkit-mask-repeat:no-repeat;-webkit-mask-position:center;mask-image:url(${iconUrl});mask-size:contain;mask-repeat:no-repeat;mask-position:center"></span></span><span style="font-family:'Delight',sans-serif;font-size:12px;line-height:20px;letter-spacing:0.12px;color:var(--main-m1);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">@${tag.label}</span></span>`;
}

const ANIM_CSS = `
@keyframes slideBottom {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}
@keyframes barGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(73,163,166,0.5), 0 4px 16px rgba(0,0,0,0.15); }
  50% { box-shadow: 0 0 12px 4px rgba(73,163,166,0.35), 0 4px 16px rgba(0,0,0,0.15); }
}
`;

/* Full composer width */
const FULL_W = 560;

export function FloatingChatBarD() {
  const { openChat, reopenChat, contextTag, sendPrompt, streamingState, chatOpen, overlay, dismissOverlay } = useChatContext();
  const [expanded, setExpanded] = useState(false);
  // animating tracks the brief window after expand/collapse click so CSS transitions play
  const [animating, setAnimating] = useState(false);
  const [hasText, setHasText] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  if (!contextTag) return null;

  const statusText = streamingState?.statusText;
  const hasActiveStream = streamingState !== null && !!statusText;
  const showCollapsedStatus = !chatOpen && hasActiveStream;

  // ── Expand / Collapse with animation ──
  const doExpand = useCallback(() => {
    setAnimating(true);
    setExpanded(true);
  }, []);

  const doCollapse = useCallback(() => {
    setAnimating(true);
    setExpanded(false);
  }, []);

  // Clear animating flag after transition ends
  useEffect(() => {
    if (!animating) return;
    const t = setTimeout(() => setAnimating(false), 350);
    return () => clearTimeout(t);
  }, [animating]);

  // ── Text helpers ──
  const getTextContent = useCallback(() => {
    if (!editorRef.current) return '';
    const clone = editorRef.current.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('[data-context-tag]').forEach(t => t.remove());
    return clone.textContent?.replace(/\u200B/g, '').trim() || '';
  }, []);

  const placeCursorAtEnd = useCallback(() => {
    const el = editorRef.current;
    if (!el) return;
    const sel = window.getSelection();
    if (!sel) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  }, []);

  const handleInput = useCallback(() => {
    setHasText(!!getTextContent());
  }, [getTextContent]);

  const handleSend = useCallback(() => {
    const text = getTextContent();
    if (text) {
      sendPrompt(text);
      setExpanded(false);
      setHasText(false);
      if (editorRef.current) {
        if (contextTag) {
          editorRef.current.innerHTML = buildTagHTML(contextTag) + '\u200B';
        } else {
          editorRef.current.innerHTML = '';
        }
      }
    }
  }, [getTextContent, sendPrompt, contextTag]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); return; }
    if (e.key === 'Escape') { doCollapse(); return; }
    if (e.key === 'Backspace') {
      const el = editorRef.current;
      if (!el) return;
      const sel = window.getSelection();
      if (!sel || !sel.rangeCount) return;
      const range = sel.getRangeAt(0);
      if (range.collapsed && range.startOffset === 0) {
        const prev = range.startContainer.previousSibling || range.startContainer.parentElement?.previousSibling;
        if (prev && (prev as Element).hasAttribute?.('data-context-tag')) e.preventDefault();
      }
    }
  }, [handleSend, doCollapse]);

  // Init editor content when expanding
  useEffect(() => {
    if (expanded && editorRef.current) {
      if (contextTag) {
        editorRef.current.innerHTML = buildTagHTML(contextTag) + '\u200B';
      } else {
        editorRef.current.innerHTML = '';
      }
      setHasText(false);
      requestAnimationFrame(() => placeCursorAtEnd());
    }
  }, [expanded, contextTag, placeCursorAtEnd]);

  // Click outside to collapse
  useEffect(() => {
    if (!expanded) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) doCollapse();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [expanded, doCollapse]);

  // ── Streaming collapsed status bar ──
  if (showCollapsedStatus) {
    if (overlay && overlay.type === 'plan' && overlay.plan) {
      return (
        <div className="fixed z-30" style={{ bottom: 24, left: '50%', marginLeft: 114, transform: 'translateX(-50%)', width: FULL_W, maxWidth: 'calc(100vw - 228px - 48px)' }}>
          <ReviewPlanCard data={overlay.plan} onApprove={dismissOverlay} />
        </div>
      );
    }

    return (
      <div className="fixed z-30 flex flex-col gap-[8px]" style={{ bottom: 24, left: '50%', marginLeft: 114, transform: 'translateX(-50%)', width: FULL_W, maxWidth: 'calc(100vw - 228px - 48px)' }}>
        <style>{ANIM_CSS}</style>
        {overlay && overlay.type === 'todos' && overlay.todos && (
          <div className="w-full" style={{ maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
            <TodoListCard data={overlay.todos} />
          </div>
        )}
        {overlay && overlay.type === 'answer' && overlay.answer && (
          <div className="w-full" style={{ maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
            <AnswerQuestionCard data={overlay.answer} onSelect={() => dismissOverlay()} onSkip={dismissOverlay} />
          </div>
        )}
        <div
          className="relative flex gap-[12px] items-center p-[16px] w-full rounded-[12px] overflow-hidden cursor-pointer transition-all hover:shadow-lg"
          style={{ background: 'white', border: '0.5px solid rgba(73,163,166,0.3)', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
          onClick={reopenChat}
        >
          <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
            <div className="h-full w-[40%]" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(73,163,166,0.4) 30%, #49A3A6 100%)', animation: 'slideBottom 2s ease-in-out infinite' }} />
          </div>
          <AlvaLoading size={12} />
          <span className="font-['Delight',sans-serif] text-[13px] leading-[20px] tracking-[0.13px] text-[var(--text-n7)] flex-1 truncate">{statusText}</span>
          <button className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity" onClick={(e) => { e.stopPropagation(); reopenChat(); }}>
            <CdnIcon name="unfoldd-l" size={16} color="var(--text-n5)" />
          </button>
        </div>
      </div>
    );
  }

  if (chatOpen) return null;

  // ── Pill: collapsed dark bar ──
  // ── Composer: expanded white card ──
  // Both are always mounted; we crossfade and transform between them.

  const ease = 'cubic-bezier(0.32, 0.72, 0, 1)';
  const dur = '0.4s';

  return (
    <div
      ref={wrapperRef}
      className="fixed z-30"
      style={{ bottom: 24, left: '50%', marginLeft: 114, transform: 'translateX(-50%)' }}
    >
      <style>{ANIM_CSS}</style>

      {/* ─── Collapsed pill ─── */}
      <div
        className="absolute bottom-0 left-1/2 cursor-pointer group"
        style={{
          transform: `translateX(-50%) scale(${expanded ? 0.95 : 1})`,
          opacity: expanded ? 0 : 1,
          pointerEvents: expanded ? 'none' : 'auto',
          transition: `opacity ${dur} ${ease}, transform ${dur} ${ease}`,
          willChange: 'opacity, transform',
        }}
        onClick={doExpand}
      >
        <div
          className="relative flex items-center gap-[8px] overflow-hidden"
          style={{
            height: 40,
            padding: '0 12px 0 6px',
            borderRadius: 8,
            background: 'var(--main-m1)',
            border: '0.5px solid rgba(0,0,0,0.7)',
            animation: 'barGlow 3s ease-in-out infinite',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(rgba(0,0,0,0.05),rgba(0,0,0,0.05)),var(--main-m1)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--main-m1)'}
        >
          {/* Logo badge */}
          <div
            className="shrink-0 flex items-center justify-center size-[28px] rounded-[6px]"
            style={{ background: '#2a2a38' }}
          >
            <img src={symbolLogo} width={14} height={14} alt="Alva" />
          </div>
          <span className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] font-medium text-white whitespace-nowrap select-none">
            Alva
          </span>
        </div>
      </div>

      {/* ─── Expanded composer ─── */}
      <div
        style={{
          width: FULL_W,
          maxWidth: 'calc(100vw - 228px - 48px)',
          transform: `translateY(${expanded ? 0 : 8}px) scale(${expanded ? 1 : 0.96})`,
          opacity: expanded ? 1 : 0,
          pointerEvents: expanded ? 'auto' : 'none',
          transformOrigin: 'bottom center',
          transition: `opacity ${dur} ${ease}, transform ${dur} ${ease}`,
          willChange: 'opacity, transform',
        }}
      >
        <div className="relative w-full overflow-hidden" style={{ background: '#ffffff', border: '0.5px solid var(--line-l2)', borderRadius: 12, boxShadow: 'var(--shadow-s)' }}>
          {/* Header bar */}
          <div className="flex items-center px-[16px] py-[8px]">
            <div className="flex items-center flex-1">
              <img src={logoGreenBlack} height={12} alt="Alva" style={{ height: 12, width: 'auto' }} />
            </div>
            <div className="flex items-center gap-[2px]">
              <button
                className="flex items-center justify-center size-[28px] rounded-[6px] cursor-pointer hover:bg-black/[0.04] transition-colors"
                title="Expand to chat panel"
                onClick={() => { doCollapse(); openChat(false); }}
              >
                <CdnIcon name="unfoldd-l" size={16} color="var(--text-n3)" />
              </button>
              <button
                className="flex items-center justify-center size-[28px] rounded-[6px] cursor-pointer hover:bg-black/[0.04] transition-colors"
                title="Collapse"
                onClick={doCollapse}
              >
                <CdnIcon name="minus-l2" size={16} color="var(--text-n3)" />
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="mx-[16px]" style={{ height: '0.5px', background: 'rgba(0,0,0,0.1)' }} />

          {/* Input area */}
          <div className="flex flex-col gap-[12px] p-[16px]">
            {/* Editor area */}
            <div className="relative min-h-[44px]" style={{ maxHeight: 240, overflowY: 'auto' }}>
              {!hasText && !contextTag && (
                <div className="absolute inset-0 pointer-events-none font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n3)]">
                  Build an investing playbook from your ideas
                </div>
              )}
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] outline-none min-h-[22px] w-full"
                style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
              />
            </div>
            {/* Toolbar — matches ChatInput */}
            <div className="flex items-center gap-[12px] h-[28px]">
              <button className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity">
                <CdnIcon name="at-l" size={16} />
              </button>
              <button className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity">
                <CdnIcon name="photo-l" size={16} />
              </button>
              <div className="flex-1 flex items-center justify-end gap-[4px]">
                <span className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]">
                  Sonnet 4.6
                </span>
                <CdnIcon name="arrow-down-f2" size={12} color="var(--text-n2)" />
              </div>
              <button
                className="flex items-center justify-center shrink-0 size-[28px] rounded-[6px] cursor-pointer transition-colors"
                style={{ background: hasText ? 'var(--main-m1)' : 'var(--b-r05)' }}
                onClick={handleSend}
              >
                <CdnIcon name="arrow-up-l1" size={14} color={hasText ? '#ffffff' : 'var(--text-n3)'} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
