/**
 * [INPUT]: onSend, streaming, waitingBlockType, onAcceptPlan
 * [OUTPUT]: 底部输入栏 — plan 暂停时变为 Accept + 反馈输入框
 * [POS]: alva-chat — 用户消息输入 + plan 审批
 */

import { useState, useRef, useCallback } from 'react';
import type { PlanCardData } from '@/data/alva-chat-mock';

interface InputBarProps {
  onSend: (text: string) => void;
  streaming?: boolean;
  placeholder?: string;
  waitingBlockType?: 'plan' | 'question' | null;
  onAcceptPlan?: () => void;
  planData?: PlanCardData | null;
}

export function InputBar({ onSend, streaming, placeholder = 'Ask anything...', waitingBlockType, onAcceptPlan, planData }: InputBarProps) {
  const [text, setText] = useState('');
  const ref = useRef<HTMLTextAreaElement>(null);

  const canSend = text.trim().length > 0;

  const handleSend = useCallback(() => {
    if (!canSend) return;
    onSend(text.trim());
    setText('');
    if (ref.current) ref.current.style.height = 'auto';
  }, [canSend, onSend, text]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
  };

  /* ===== Plan 等待态：Plan 内容 + Accept + 输入框 ===== */
  if (waitingBlockType === 'plan') {
    return (
      <div style={{
        flexShrink: 0, borderTop: '1px solid rgba(0,0,0,0.06)',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Plan 内容区（可滚动） */}
        {planData && (
          <div style={{
            padding: '16px 24px', overflowY: 'auto', maxHeight: '40vh',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
          }}>
            {/* Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zM6 20V4h5v7h7v9H6z" fill="var(--text-n5)" />
              </svg>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-n5)', fontFamily: "'Delight', sans-serif" }}>
                Review Alva's plan
              </span>
            </div>

            <p style={{
              margin: '0 0 12px', fontSize: 16, fontWeight: 600,
              color: 'var(--text-n9)', fontFamily: "'Delight', sans-serif",
            }}>
              {planData.title}
            </p>

            {/* Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {planData.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{
                    fontSize: 13, color: 'var(--text-n5)', fontFamily: "'JetBrains Mono', monospace",
                    width: 20, flexShrink: 0, textAlign: 'right',
                  }}>
                    {i + 1}.
                  </span>
                  <span style={{
                    fontSize: 14, lineHeight: '22px', color: 'var(--text-n9)',
                    fontFamily: "'Delight', sans-serif",
                  }}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Accept 行 */}
        <div
          onClick={onAcceptPlan}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '12px 24px', cursor: 'pointer',
            borderBottom: '1px solid rgba(0,0,0,0.04)',
            transition: 'background 0.1s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(73,163,166,0.04)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" style={{ flexShrink: 0 }}>
            <circle cx="10" cy="10" r="9" fill="#49A3A6" />
            <path d="M6 10l3 3 5-5" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{
            flex: 1, fontSize: 14, color: 'var(--text-n9)',
            fontFamily: "'Delight', sans-serif",
          }}>
            Approve Alva's plan and start coding
          </span>
          <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0, opacity: 0.25 }}>
            <path d="M12 3v6H4M4 9l3-3M4 9l3 3" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* 替代输入行 */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '10px 24px',
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20" style={{ flexShrink: 0, opacity: 0.3 }}>
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-8.793 8.793L4 16l.793-3.621 8.793-8.793z" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <input
            type="text"
            placeholder="Tell Alva what to do instead"
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleSend(); } }}
            style={{
              flex: 1, border: 'none', outline: 'none',
              background: 'transparent', fontSize: 14, lineHeight: '22px',
              fontFamily: "'Delight', sans-serif", color: 'var(--text-n9)',
              minWidth: 0,
            }}
          />
          {canSend && (
            <div onClick={handleSend} style={{
              width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
              background: '#3a3a48', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ===== 正常态 / 流式态 ===== */
  const hintText = streaming ? 'Send a message to steer the conversation...' : placeholder;

  return (
    <div style={{
      padding: '12px 24px', borderTop: '1px solid rgba(0,0,0,0.06)',
      flexShrink: 0,
    }}>
      <div style={{
        display: 'flex', alignItems: 'flex-end', gap: 8,
        padding: '10px 16px', borderRadius: 12,
        border: '1px solid rgba(0,0,0,0.08)',
        background: '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}>
        {/* Attach button */}
        <button style={{
          width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
          border: '1px solid rgba(0,0,0,0.12)', background: 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', marginBottom: 1,
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8h10" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Streaming dot */}
        {streaming && (
          <span style={{
            width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
            background: 'var(--main-m1)', marginBottom: 9,
            animation: 'alvaPulse 1.4s ease-in-out infinite',
          }} />
        )}

        {/* Textarea */}
        <textarea
          ref={ref}
          value={text}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={hintText}
          rows={1}
          style={{
            flex: 1, border: 'none', outline: 'none', resize: 'none',
            background: 'transparent', fontSize: 14, lineHeight: '22px',
            fontFamily: "'Delight', sans-serif", color: 'var(--text-n9)',
            minHeight: 22, maxHeight: 160,
          }}
        />

        {/* Send */}
        <div
          onClick={handleSend}
          style={{
            width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
            background: canSend ? '#49a3a6' : 'rgba(0,0,0,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: canSend ? 'pointer' : 'default',
            transition: 'background 0.15s',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke={canSend ? '#fff' : 'rgba(0,0,0,0.25)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <style>{`@keyframes alvaPulse{0%,100%{opacity:1}50%{opacity:.35}}`}</style>
    </div>
  );
}
