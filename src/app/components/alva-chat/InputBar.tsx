/**
 * [INPUT]: onSend, streaming, waitingBlockType, onAcceptPlan
 * [OUTPUT]: 底部输入栏 — plan 暂停时变为 Accept + 反馈输入框
 * [POS]: alva-chat — 用户消息输入 + plan 审批
 */

import { useState, useRef, useCallback } from 'react';
import type { PlanCardData, QuestionCardData } from '@/data/alva-chat-mock';
import type { MentionItem } from '@/app/components/mention/mention-data';
import { MentionPopover, MentionChip } from '@/app/components/mention/MentionPopover';

interface InputBarProps {
  onSend: (text: string) => void;
  streaming?: boolean;
  placeholder?: string;
  waitingBlockType?: 'plan' | 'question' | null;
  onAcceptPlan?: () => void;
  onAnswerQuestion?: () => void;
  planData?: PlanCardData | null;
  questionData?: QuestionCardData | null;
}

export function InputBar({ onSend, streaming, placeholder = 'Ask anything...', waitingBlockType, onAcceptPlan, onAnswerQuestion, planData, questionData }: InputBarProps) {
  const [text, setText] = useState('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  /* @ mention 状态 */
  const [mentions, setMentions] = useState<MentionItem[]>([]);
  const [mentionOpen, setMentionOpen] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [mentionAnchor, setMentionAnchor] = useState(-1);

  const canSend = text.trim().length > 0 || mentions.length > 0;

  const handleSend = useCallback(() => {
    if (!canSend) return;
    onSend(text.trim());
    setText('');
    setMentions([]);
    if (ref.current) ref.current.style.height = 'auto';
  }, [canSend, onSend, text]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (mentionOpen) return;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';

    /* 打字 @ 触发 */
    const cursor = el.selectionStart ?? value.length;
    const before = value.slice(0, cursor);
    const atMatch = before.match(/(^|[\s])@([\w\s]*)$/);
    if (atMatch) {
      setMentionOpen(true);
      setMentionQuery(atMatch[2]);
      setMentionAnchor(cursor - atMatch[2].length - 1);
    } else if (mentionAnchor >= 0) {
      setMentionOpen(false);
      setMentionAnchor(-1);
    }
  };

  /* 按钮触发 */
  const handleAtClick = useCallback(() => {
    setMentionOpen(o => !o);
    setMentionQuery('');
    setMentionAnchor(-1);
  }, []);

  const handleMentionSelect = useCallback((item: MentionItem) => {
    if (mentionAnchor >= 0) {
      const before = text.slice(0, mentionAnchor);
      const afterAtQuery = text.slice(mentionAnchor).replace(/@[\w\s]*/, '');
      setText(before + afterAtQuery);
    }
    setMentions(prev => prev.some(m => m.id === item.id) ? prev : [...prev, item]);
    setMentionOpen(false);
    setMentionAnchor(-1);
    ref.current?.focus();
  }, [text, mentionAnchor]);

  const handleMentionClose = useCallback(() => { setMentionOpen(false); setMentionAnchor(-1); }, []);

  /* ===== Plan 等待态：Plan 内容 + Accept + 输入框 ===== */
  if (waitingBlockType === 'plan') {
    return (
      <div style={{
        flexShrink: 0, padding: '8px 24px 12px',
        animation: 'inputSlideUp 0.3s ease-out',
      }}>
       <div style={{
         maxWidth: 720, margin: '0 auto', width: '100%',
         borderRadius: 16, overflow: 'hidden',
         border: '1px solid rgba(0,0,0,0.08)', background: '#fff',
         boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
       }}>
        {/* Plan 内容区（可滚动） */}
        {planData && (
          <div style={{
            padding: '14px 20px 10px', overflowY: 'auto', maxHeight: '40vh',
          }}>
            {/* Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zM6 20V4h5v7h7v9H6z" fill="var(--text-n5)" />
              </svg>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-n5)', fontFamily: "'Delight', sans-serif" }}>
                Review Alva's plan
              </span>
            </div>

            <p style={{
              margin: '0 0 10px', fontSize: 15, fontWeight: 600,
              color: 'var(--text-n9)', fontFamily: "'Delight', sans-serif",
            }}>
              {planData.title}
            </p>

            {/* Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {planData.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <span style={{
                    fontSize: 12, color: 'var(--text-n5)', fontFamily: "'JetBrains Mono', monospace",
                    width: 18, flexShrink: 0, textAlign: 'right',
                  }}>
                    {i + 1}.
                  </span>
                  <span style={{
                    fontSize: 13, lineHeight: '20px', color: 'var(--text-n9)',
                    fontFamily: "'Delight', sans-serif",
                  }}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 分隔线 */}
        <div style={{ height: 1, background: 'rgba(0,0,0,0.05)', margin: '0 20px' }} />

        {/* Accept 行 */}
        <div
          onClick={onAcceptPlan}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 20px', cursor: 'pointer',
            transition: 'background 0.1s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(73,163,166,0.04)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <svg width="18" height="18" viewBox="0 0 20 20" style={{ flexShrink: 0 }}>
            <circle cx="10" cy="10" r="9" fill="var(--main-m1)" />
            <path d="M6 10l3 3 5-5" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{
            flex: 1, fontSize: 13, color: 'var(--text-n9)',
            fontFamily: "'Delight', sans-serif",
          }}>
            Approve Alva's plan and start coding
          </span>
          <span style={{
            fontSize: 10, color: 'var(--text-n3)', background: 'rgba(0,0,0,0.04)',
            padding: '1px 5px', borderRadius: 3, fontFamily: "'JetBrains Mono', monospace",
            flexShrink: 0,
          }}>
            ⏎
          </span>
        </div>

        {/* 替代输入行 */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '8px 20px 10px',
        }}>
          <svg width="16" height="16" viewBox="0 0 20 20" style={{ flexShrink: 0, opacity: 0.25 }}>
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
              background: 'transparent', fontSize: 13, lineHeight: '20px',
              fontFamily: "'Delight', sans-serif", color: 'var(--text-n9)',
              minWidth: 0,
            }}
          />
          {canSend && (
            <div onClick={handleSend} style={{
              width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
              background: '#3a3a48', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}>
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>
       </div>
      </div>
    );
  }

  /* ===== Question 等待态 ===== */
  if (waitingBlockType === 'question' && questionData) {
    return (
      <div style={{
        flexShrink: 0, padding: '8px 24px 12px',
        animation: 'inputSlideUp 0.3s ease-out',
      }}>
       <div style={{
         maxWidth: 720, margin: '0 auto', width: '100%',
         borderRadius: 16, overflow: 'hidden',
         border: '1px solid rgba(0,0,0,0.08)', background: '#fff',
         boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
       }}>
        {/* Question 内容 */}
        <div style={{ padding: '14px 20px 10px' }}>
          <span style={{
            display: 'inline-block', padding: '2px 8px', borderRadius: 4,
            background: 'rgba(73,163,166,0.1)', color: 'var(--main-m1)',
            fontSize: 11, fontWeight: 600, fontFamily: "'Delight', sans-serif",
            marginBottom: 8,
          }}>
            {questionData.header}
          </span>
          <p style={{
            margin: '0 0 10px', fontSize: 13, lineHeight: '20px',
            color: 'var(--text-n9)', fontFamily: "'Delight', sans-serif",
          }}>
            {questionData.question}
          </p>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {questionData.options.map((opt, idx) => {
              const sel = selectedOption === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedOption(idx)}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                    padding: '7px 10px', borderRadius: 6, cursor: 'pointer',
                    border: `1px solid ${sel ? 'var(--main-m1)' : 'rgba(0,0,0,0.08)'}`,
                    background: sel ? 'rgba(73,163,166,0.06)' : 'transparent',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{
                    width: 15, height: 15, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                    border: `1.5px solid ${sel ? 'var(--main-m1)' : 'rgba(0,0,0,0.2)'}`,
                    background: sel ? 'var(--main-m1)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.15s',
                  }}>
                    {sel && (
                      <svg width="9" height="9" viewBox="0 0 10 10">
                        <path d="M2 5L4 7L8 3" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-n9)', fontFamily: "'Delight', sans-serif" }}>
                      {opt.label}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-n5)', fontFamily: "'Delight', sans-serif", marginTop: 1 }}>
                      {opt.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 分隔线 */}
        <div style={{ height: 1, background: 'rgba(0,0,0,0.05)', margin: '0 20px' }} />

        {/* Submit 行 */}
        <div
          onClick={() => { if (selectedOption != null) { setSelectedOption(null); onAnswerQuestion?.(); } }}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 20px', cursor: selectedOption != null ? 'pointer' : 'default',
            transition: 'background 0.1s',
          }}
          onMouseEnter={e => { if (selectedOption != null) e.currentTarget.style.background = 'rgba(73,163,166,0.04)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          <svg width="18" height="18" viewBox="0 0 20 20" style={{ flexShrink: 0, opacity: selectedOption != null ? 1 : 0.3 }}>
            <circle cx="10" cy="10" r="9" fill={selectedOption != null ? 'var(--main-m1)' : 'rgba(0,0,0,0.15)'} />
            <path d="M6 10l3 3 5-5" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{
            flex: 1, fontSize: 13, fontFamily: "'Delight', sans-serif",
            color: selectedOption != null ? 'var(--text-n9)' : 'var(--text-n5)',
          }}>
            Submit answer and continue
          </span>
          {selectedOption != null && (
            <span style={{
              fontSize: 10, color: 'var(--text-n3)', background: 'rgba(0,0,0,0.04)',
              padding: '1px 5px', borderRadius: 3, fontFamily: "'JetBrains Mono', monospace",
              flexShrink: 0,
            }}>
              ⏎
            </span>
          )}
        </div>

        {/* 替代输入 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 20px 10px' }}>
          <svg width="16" height="16" viewBox="0 0 20 20" style={{ flexShrink: 0, opacity: 0.25 }}>
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-8.793 8.793L4 16l.793-3.621 8.793-8.793z" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <input
            type="text"
            placeholder="Tell Alva what to do instead"
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleSend(); } }}
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontSize: 13, lineHeight: '20px', fontFamily: "'Delight', sans-serif",
              color: 'var(--text-n9)', minWidth: 0,
            }}
          />
          {canSend && (
            <div onClick={handleSend} style={{
              width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
              background: '#3a3a48', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}>
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>
       </div>
      </div>
    );
  }

  /* ===== 正常态 / 流式态 ===== */
  const hintText = streaming ? 'Send a message to steer the conversation...' : placeholder;

  return (
    <div style={{
      padding: '8px 24px 12px', flexShrink: 0,
    }}>
      <div style={{ maxWidth: 720, margin: '0 auto', width: '100%' }}>
      <div style={{
        borderRadius: 16, overflow: 'visible', position: 'relative',
        border: focused ? '1px solid var(--main-m1)' : '1px solid rgba(0,0,0,0.08)',
        background: '#fff',
        boxShadow: focused ? '0 0 0 2px rgba(73,163,166,0.1)' : '0 1px 3px rgba(0,0,0,0.04)',
        transition: 'border-color 0.15s, box-shadow 0.15s',
      }}>
        {/* @ Mention Popover */}
        {mentionOpen && (
          <div style={{ position: 'absolute', bottom: '100%', left: 16, marginBottom: 6, zIndex: 50 }}>
            <MentionPopover
              query={mentionQuery}
              onSelect={handleMentionSelect}
              onClose={handleMentionClose}
              selectedIds={new Set(mentions.map(m => m.id))}
            />
          </div>
        )}

        {/* Mention chips */}
        {mentions.length > 0 && (
          <div style={{ padding: '12px 16px 0', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {mentions.map(m => (
              <MentionChip key={m.id} item={m} onRemove={() => setMentions(prev => prev.filter(x => x.id !== m.id))} />
            ))}
          </div>
        )}

        {/* Textarea */}
        <textarea
          ref={ref}
          value={text}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={hintText}
          rows={1}
          style={{
            width: '100%', border: 'none', outline: 'none', resize: 'none',
            background: 'transparent', fontSize: 14, lineHeight: '22px',
            fontFamily: "'Delight', sans-serif", color: 'var(--text-n9)',
            padding: '14px 20px 6px', margin: 0, minHeight: 22, maxHeight: 160,
            boxSizing: 'border-box',
          }}
        />

        {/* Button row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 16px 10px',
        }}>
          {/* @ button */}
          <button
            onClick={handleAtClick}
            style={{
              background: 'none', border: 'none', padding: '4px 2px',
              cursor: 'pointer', transition: 'color 0.15s',
              fontFamily: "'Delight', sans-serif", fontSize: 16, fontWeight: 600,
              color: mentionOpen ? 'var(--main-m1, #49a3a6)' : 'rgba(0,0,0,0.25)',
            }}
          >
            @
          </button>

          {/* Send */}
          <div
            onClick={handleSend}
            style={{
              width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
              background: canSend ? 'var(--main-m1)' : 'rgba(0,0,0,0.08)',
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
      </div>
      </div>
      <style>{`
        @keyframes inputSlideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    </div>
  );
}
