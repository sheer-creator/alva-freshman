import { useRef, useState, useCallback, useEffect } from 'react';
import { CdnIcon } from './CdnIcon';
import { Avatar } from './Avatar';
import { Tooltip } from './Tooltip';
import type { ContextTagData } from '@/lib/chat-config';
import { useChatContext } from '../chat/ChatContext';

export interface BottomChipData {
  label: string;
  icon?: string;
  /** Creator name — when set, render an Avatar instead of CdnIcon */
  avatar?: string;
  onRemove?: () => void;
}

export interface InjectTextSignal {
  text: string;
  seq: number;
}

interface ChatInputProps {
  placeholder?: string;
  contextTag?: ContextTagData | null;
  shadow?: boolean;
  onSend?: (text: string) => void;
  bottomChip?: BottomChipData | null;
  injectText?: InjectTextSignal | null;
  onInputChange?: (text: string) => void;
}

export function ChatInput({ placeholder = 'Build an investing playbook from your ideas', contextTag, shadow, onSend, bottomChip, injectText, onInputChange }: ChatInputProps) {
  const { inspectorActive, toggleInspector, elementQuotes, removeElementQuote, clearElementQuotes } = useChatContext();
  const [hasText, setHasText] = useState(false);
  const [quoteHover, setQuoteHover] = useState(false);
  const [popoverBottom, setPopoverBottom] = useState(0);
  const [chipPulse, setChipPulse] = useState(false);
  const [tagDismissed, setTagDismissed] = useState(false);
  const prevQuoteCount = useRef(0);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementQuotes.length > prevQuoteCount.current) {
      setChipPulse(true);
      const t = setTimeout(() => setChipPulse(false), 500);
      return () => clearTimeout(t);
    }
    prevQuoteCount.current = elementQuotes.length;
  }, [elementQuotes.length]);

  const keepHover = useCallback(() => {
    if (hoverTimer.current) { clearTimeout(hoverTimer.current); hoverTimer.current = null; }
  }, []);

  const scheduleHide = useCallback(() => {
    keepHover();
    hoverTimer.current = setTimeout(() => setQuoteHover(false), 150);
  }, [keepHover]);

  const handleChipEnter = useCallback(() => {
    keepHover();
    setQuoteHover(true);
    const chip = chipRef.current;
    const wrapper = wrapperRef.current;
    if (chip && wrapper) {
      const wr = wrapper.getBoundingClientRect();
      const cr = chip.getBoundingClientRect();
      setPopoverBottom(wr.bottom - cr.top + 8);
    }
  }, [keepHover]);

  const getTextContent = useCallback(() => {
    if (!editorRef.current) return '';
    return editorRef.current.textContent?.replace(/\u200B/g, '').trim() || '';
  }, []);

  const handleInput = useCallback(() => {
    const text = getTextContent();
    setHasText(!!text);
    onInputChange?.(text);
  }, [getTextContent, onInputChange]);

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

  // Reset dismissal & clear editor when contextTag changes
  useEffect(() => {
    const el = editorRef.current;
    if (el) el.textContent = '';
    setHasText(false);
    setTagDismissed(false);
  }, [contextTag]);

  // Inject text programmatically (e.g. from a clicked Suggested Prompt)
  useEffect(() => {
    if (!injectText) return;
    const el = editorRef.current;
    if (!el) return;
    el.textContent = injectText.text;
    setHasText(injectText.text.trim().length > 0);
    onInputChange?.(injectText.text);
    el.focus();
    requestAnimationFrame(() => placeCursorAtEnd());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [injectText?.seq]);

  const handleFocus = useCallback(() => {
    requestAnimationFrame(() => placeCursorAtEnd());
  }, [placeCursorAtEnd]);

  const handleSendClick = useCallback(() => {
    const text = getTextContent();
    if (text && onSend) {
      onSend(text);
      const el = editorRef.current;
      if (el) el.textContent = '';
      setHasText(false);
      onInputChange?.('');
    }
  }, [getTextContent, onSend, onInputChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  }, [handleSendClick]);

  const showContextTag = !!contextTag && !tagDismissed;
  const showPlaceholder = !hasText;

  return (
    <div
      ref={wrapperRef}
      className="relative w-full shrink-0 flex flex-col gap-[12px] p-[16px] chat-input-wrapper"
      style={{ background: 'var(--b0-container, #fff)', border: '0.5px solid var(--line-l2)', borderRadius: 'var(--radius-ct-m)', boxShadow: shadow ? 'var(--shadow-s)' : undefined }}
    >
      {/* ── Annotation hover popover ── */}
      {quoteHover && elementQuotes.length > 0 && (
        <div
          className="absolute rounded-[10px] z-[100]"
          style={{
            bottom: popoverBottom || '100%',
            left: 0,
            right: 0,
            maxHeight: 320,
            overflowY: 'auto',
            background: 'var(--b0-container, #fff)',
            border: '0.5px solid var(--line-l3)',
            boxShadow: 'var(--shadow-xs)',
          }}
          onMouseEnter={keepHover}
          onMouseLeave={scheduleHide}
        >
          {elementQuotes.map((q, i) => {
            const content = q.originalText || q.selector;
            return (
              <div key={i}>
                {i > 0 && <div style={{ height: 0, borderTop: '1px solid var(--line-l07)' }} />}
                <div className="flex items-start gap-[10px] p-[16px]">
                  <span
                    className="flex items-center justify-center shrink-0 rounded-full size-[20px] font-['Delight',sans-serif] text-[11px] font-semibold leading-[20px]"
                    style={{ background: 'var(--main-m1)', border: '0.5px solid var(--line-l2)', color: '#fff' }}
                  >
                    {q.index}
                  </span>
                  <div className="flex flex-col gap-[2px] min-w-0 flex-1">
                    <span
                      className="font-['Delight',sans-serif] text-[13px] leading-[20px] tracking-[0.13px]"
                      style={{ color: 'var(--text-n5)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                    >
                      {content}
                    </span>
                    {q.newText && (
                      <span
                        className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px]"
                        style={{ color: 'var(--text-n9)' }}
                      >
                        {q.originalText ? `${q.originalText} → ${q.newText}` : q.newText}
                      </span>
                    )}
                    {q.instruction && (
                      <span
                        className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px]"
                        style={{ color: 'var(--text-n9)' }}
                      >
                        {q.instruction}
                      </span>
                    )}
                    {!q.newText && !q.instruction && (
                      <span
                        className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px]"
                        style={{ color: 'var(--text-n9)' }}
                      >
                        Edit element
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    aria-label="Remove annotation"
                    className="flex items-center justify-center shrink-0 cursor-pointer hover:opacity-70 transition-opacity mt-[2px]"
                    onClick={() => removeElementQuote(q.index)}
                  >
                    <CdnIcon name="close-l1" size={14} color="var(--text-n9)" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {(showContextTag || elementQuotes.length > 0) && (
        <div className="flex flex-wrap gap-[8px] items-start w-full">
          {showContextTag && (
            <div
              className="inline-flex items-center gap-[6px] p-[6px] rounded-[4px] shrink-0"
              style={{ border: '0.5px solid var(--line-l2)' }}
            >
              <span
                className="flex items-center justify-center shrink-0 rounded-[2px] size-[20px]"
                style={{ background: 'var(--main-m1)' }}
              >
                <CdnIcon name={contextTag!.icon || 'sidebar-discover-normal'} size={16} color="#fff" />
              </span>
              <span
                className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] truncate"
                style={{ color: 'var(--text-n9)', maxWidth: 184 }}
              >
                {contextTag!.label}
              </span>
              <button
                type="button"
                aria-label="Remove context tag"
                className="flex items-center justify-center shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={(e) => { e.stopPropagation(); setTagDismissed(true); }}
              >
                <CdnIcon name="close-l1" size={12} color="var(--text-n5)" />
              </button>
            </div>
          )}
          {elementQuotes.length > 0 && (
            <div
              ref={chipRef}
              className="inline-flex items-center gap-[6px] p-[6px] rounded-[4px] shrink-0 cursor-pointer"
              style={{
                border: '0.5px solid var(--line-l2)',
                transition: 'box-shadow 0.3s, transform 0.3s',
                ...(chipPulse ? { boxShadow: '0 0 0 3px rgba(73,163,166,0.25)', transform: 'scale(1.04)' } : {}),
              }}
              onMouseEnter={handleChipEnter}
              onMouseLeave={scheduleHide}
            >
              <span
                className="flex items-center justify-center shrink-0 rounded-[2px] size-[20px]"
                style={{ background: 'var(--main-m1)' }}
              >
                <CdnIcon name="pointer-l" size={16} color="#fff" />
              </span>
              <span
                className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px]"
                style={{ color: 'var(--text-n9)' }}
              >
                {elementQuotes.length} annotation
              </span>
              <button
                type="button"
                aria-label="Remove annotations"
                className="flex items-center justify-center shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={(e) => { e.stopPropagation(); clearElementQuotes(); }}
              >
                <CdnIcon name="close-l1" size={12} color="var(--text-n5)" />
              </button>
            </div>
          )}
        </div>
      )}
      <div className="relative min-h-[44px]" style={{ maxHeight: 240, overflowY: 'auto' }}>
        {showPlaceholder && (
          <div className="absolute inset-0 pointer-events-none font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n3)]">
            {placeholder}
          </div>
        )}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] outline-none min-h-[22px] w-full"
          style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
          onInput={handleInput}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="flex items-center gap-[12px] h-[28px]">
        <button className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity">
          <CdnIcon name="at-l" size={16} />
        </button>
        <button className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity">
          <CdnIcon name="photo-l" size={16} />
        </button>
        <Tooltip text="Click elements on the left to annotate changes" placement="top">
          <button
            className="shrink-0 cursor-pointer transition-opacity"
            style={{ opacity: inspectorActive ? 1 : undefined }}
            onClick={toggleInspector}
          >
            <CdnIcon
              name={inspectorActive ? 'pointer-f' : 'pointer-l'}
              size={16}
              color={inspectorActive ? 'var(--main-m1)' : undefined}
            />
          </button>
        </Tooltip>
        {bottomChip && (
          <div
            className="flex min-w-0 flex-1 items-center gap-[6px] h-[24px] pl-[8px] pr-[6px] rounded-[999px]"
            style={{ background: 'var(--b-r05)', maxWidth: 'fit-content' }}
          >
            {bottomChip.avatar ? (
              <Avatar name={bottomChip.avatar} size={16} />
            ) : (
              bottomChip.icon && <CdnIcon name={bottomChip.icon} size={14} color="var(--text-n9)" />
            )}
            <span
              className="font-['Delight',sans-serif] text-[13px] leading-[20px] tracking-[0.13px] truncate"
              style={{ color: 'var(--text-n9)', minWidth: 0 }}
            >
              {bottomChip.label}
            </span>
            <button
              className="shrink-0 flex items-center justify-center size-[16px] rounded-full cursor-pointer hover:bg-black/10 transition-colors"
              onClick={(e) => { e.stopPropagation(); bottomChip.onRemove?.(); }}
              aria-label="Remove chip"
            >
              <CdnIcon name="close-l1" size={12} color="var(--text-n7)" />
            </button>
          </div>
        )}
        <div className="flex shrink-0 items-center justify-end gap-[4px] ml-auto">
          <span className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)] whitespace-nowrap">
            Sonnet 4.6
          </span>
          <CdnIcon name="arrow-down-f2" size={12} color="var(--text-n2)" />
        </div>
        <button
          className="flex items-center justify-center shrink-0 size-[28px] rounded-[6px] cursor-pointer transition-colors"
          style={{
            background: hasText ? 'var(--main-m1)' : 'var(--b-r05)',
          }}
          onClick={handleSendClick}
        >
          <CdnIcon
            name="arrow-up-l1"
            size={14}
            color={hasText ? '#ffffff' : 'var(--text-n3)'}
          />
        </button>
      </div>
    </div>
  );
}
