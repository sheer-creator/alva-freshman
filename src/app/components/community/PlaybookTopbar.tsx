/**
 * [INPUT]: svgPaths, RemixPrompt, DiscussionPanel, PlaybookHeader, mock data types
 * [OUTPUT]: Playbook 专用 Topbar — 左侧 hover 展开 Header，右侧 stats + 弹层交互
 * [POS]: 社区组件 — 替代通用 Topbar，整合所有社区交互入口
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import svgPaths from '@/data/svg-nheoeek59y';
import { AVATAR_COLOR_PALETTE } from '@/lib/chart-theme';
import { RemixPrompt } from './RemixPrompt';
import { StrategyBindPanel } from '../trading/StrategyBindPanel';
import { PlaybookHeader } from './PlaybookHeader';
import type { PlaybookHeaderProps } from './PlaybookHeader';
import type { SignalReaction, LineageNode, Comment } from '@/data/community-mock';

/* ========== 头像 ========== */

function UserAvatar({ name, size = 20 }: { name: string; size?: number }) {
  const initial = name.trim().charAt(0).toUpperCase();
  const color = AVATAR_COLOR_PALETTE[[...name].reduce((s, c) => s + c.charCodeAt(0), 0) % AVATAR_COLOR_PALETTE.length];
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: size * 0.44, color: '#fff', lineHeight: 1, letterSpacing: 0, fontFamily: "'Delight', sans-serif" }}>{initial}</span>
    </div>
  );
}

/* ========== Props ========== */

interface PlaybookTopbarProps extends PlaybookHeaderProps {
  title: string;
  stats: { stars: number; forks: number; shares: number };
  signals: SignalReaction[];
  lineage: LineageNode;
  comments: Comment[];
  discussionOpen: boolean;
  onToggleDiscussion: () => void;
  onAuthorClick?: () => void;
}

/* ========== Stat 按钮样式 ========== */

const STAT_STYLE: React.CSSProperties = {
  background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px', borderRadius: 6,
  display: 'flex', alignItems: 'center', gap: 4,
  fontSize: 12, color: 'rgba(0,0,0,0.9)', fontFamily: "'Delight', sans-serif",
};

/* ========== 点击外部关闭 hook ========== */

function useClickOutside(ref: React.RefObject<HTMLElement | null>, open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [ref, open, onClose]);
}

/* ========== 组件 ========== */

export function PlaybookTopbar({
  title, stats, signals, lineage, comments,
  discussionOpen, onToggleDiscussion,
  author, pulse, description, builtOn, onAuthorClick,
}: PlaybookTopbarProps) {
  const [headerOpen, setHeaderOpen] = useState(false);
  const [forkOpen, setForkOpen] = useState(false);
  const [tradeOpen, setTradeOpen] = useState(false);
  const [reactionsOpen, setReactionsOpen] = useState(false);
  const [activeSignals, setActiveSignals] = useState<Set<string>>(new Set());
  const [starred, setStarred] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const forkRef = useRef<HTMLDivElement>(null);
  const tradeRef = useRef<HTMLDivElement>(null);
  const reactionsRef = useRef<HTMLDivElement>(null);
  const headerTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const openHeader = useCallback(() => {
    if (headerTimer.current) clearTimeout(headerTimer.current);
    setHeaderOpen(true);
  }, []);
  const closeHeader = useCallback(() => {
    headerTimer.current = setTimeout(() => setHeaderOpen(false), 150);
  }, []);
  useEffect(() => () => { if (headerTimer.current) clearTimeout(headerTimer.current); }, []);

  useClickOutside(forkRef, forkOpen, () => setForkOpen(false));
  useClickOutside(tradeRef, tradeOpen, () => setTradeOpen(false));
  useClickOutside(reactionsRef, reactionsOpen, () => setReactionsOpen(false));

  const toggleSignal = (label: string) => {
    setActiveSignals(prev => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  };

  /* Emoji 摘要：top-2 emoji + 总数 */
  const sorted = [...signals].sort((a, b) => b.count - a.count);
  const topEmojis = sorted.slice(0, 2).map(s => s.emoji).join('');
  const totalReactions = signals.reduce((sum, s) => sum + s.count, 0);

  return (
    <>
      <div className="content-stretch flex gap-[12px] h-[56px] items-center py-[10px] sticky top-0 shrink-0 w-full z-10 bg-white relative">
        {/* Left: 头像 + 标题 + 状态 — hover 展开 PlaybookHeader */}
        <div
          className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px"
          onMouseEnter={openHeader}
          onMouseLeave={closeHeader}
        >
          <div className="relative shrink-0 size-[20px]">
            <UserAvatar name="Alva Intern" size={20} />
          </div>
          <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative">
            <p className="font-['Delight',sans-serif] leading-[22px] max-w-[136px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px]">Alva Intern</p>
            <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px] w-[6px]">
              <p className="leading-[20px] whitespace-pre-wrap">&bull;</p>
            </div>
            <div className="relative shrink-0 size-[18px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                <path d={svgPaths.p10e63780} fill="black" fillOpacity="0.9" />
              </svg>
            </div>
            <p className="font-['Delight',sans-serif] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px]">{title}</p>
            {/* 状态指示灯 */}
            <div className="content-stretch flex items-center relative shrink-0 size-[12px]">
              <div className="flex-[1_0_0] h-full min-h-px min-w-px overflow-clip relative">
                <div className="-translate-y-1/2 absolute aspect-[20/20] left-0 right-0 top-1/2">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                    <circle cx="6" cy="6" fill="#DBEDED" r="6" />
                  </svg>
                </div>
                <div className="-translate-x-1/2 absolute aspect-[8.5600004196167/8.5600004196167] bottom-[28.6%] left-1/2 top-[28.6%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.136 5.136">
                    <circle cx="2.568" cy="2.568" fill="#49A3A6" r="2.568" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Stats + Actions */}
        <div className="content-stretch flex gap-[4px] items-center justify-end relative shrink-0">
          {/* ★ Stars — toggle + toast */}
            <button
              onClick={() => {
                const next = !starred;
                setStarred(next);
                if (next) {
                  setToastVisible(true);
                  if (toastTimer.current) clearTimeout(toastTimer.current);
                  toastTimer.current = setTimeout(() => setToastVisible(false), 6000);
                } else {
                  setToastVisible(false);
                }
              }}
              style={{ ...STAT_STYLE, color: starred ? '#E6A91A' : 'rgba(0,0,0,0.9)', transition: 'color 0.15s' }}
            >
              <div className="relative shrink-0 size-[16px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <path d={svgPaths.p2b2d8380} fill={starred ? '#E6A91A' : 'black'} fillOpacity={starred ? 1 : 0.9} />
                </svg>
              </div>
              <span>{starred ? stats.stars + 1 : stats.stars}</span>
            </button>

            {/* Emoji 反应 — 点击展开 signal pills */}
            <div ref={reactionsRef} className="relative">
              <button onClick={() => setReactionsOpen(v => !v)} style={STAT_STYLE}>
                <span style={{ fontSize: 14 }}>{topEmojis}</span>
                <span>{totalReactions}</span>
              </button>
              {reactionsOpen && (
                <div
                  className="absolute top-full right-0 mt-[8px]"
                  style={{ background: '#fff', borderRadius: 8, boxShadow: 'var(--shadow-s, 0 6px 20px 0 rgba(0,0,0,0.04))', border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))', padding: 12, zIndex: 30, minWidth: 200 }}
                >
                  <div className="flex flex-wrap gap-[6px]">
                    {signals.map(s => (
                      <button
                        key={s.label}
                        onClick={() => toggleSignal(s.label)}
                        className="flex items-center gap-[3px] transition-colors"
                        style={{
                          padding: '4px 10px', borderRadius: 12,
                          background: activeSignals.has(s.label) ? 'rgba(73,163,166,0.12)' : 'rgba(0,0,0,0.04)',
                          border: 'none', fontSize: 13,
                          color: activeSignals.has(s.label) ? 'var(--main-m1, #49A3A6)' : 'var(--text-n5)',
                          cursor: 'pointer', fontFamily: "'Delight', sans-serif",
                        }}
                      >
                        <span>{s.emoji}</span>
                        <span>{s.label}</span>
                        <span style={{ marginLeft: 2 }}>{s.count}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Discuss — 原 Remix 位置，改用 chat 图标 */}
            <button
              onMouseDown={e => e.stopPropagation()}
              onClick={onToggleDiscussion}
              style={{
                ...STAT_STYLE,
                background: discussionOpen ? 'var(--main-m1-10, rgba(73,163,166,0.1))' : 'none',
                borderRadius: 6,
                padding: '4px 6px',
                color: discussionOpen ? 'var(--main-m1, #49A3A6)' : 'rgba(0,0,0,0.9)',
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              <img src="https://alva-ai-static.b-cdn.net/icons/chat-l1.svg" width={16} height={16} alt="discuss" style={{ opacity: discussionOpen ? 1 : 0.9, filter: discussionOpen ? 'invert(59%) sepia(30%) saturate(550%) hue-rotate(140deg) brightness(90%) contrast(90%)' : 'none', transition: 'filter 0.15s' }} />
              <span>{comments.length}</span>
            </button>

            {/* 📤 Share */}
            <button style={STAT_STYLE}>
              <div className="relative shrink-0 size-[16px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <path d={svgPaths.p272ac1f0} fill="black" fillOpacity="0.9" />
                </svg>
              </div>
            </button>

          {/* Trade — 点击打开 StrategyBindPanel */}
          <div ref={tradeRef} className="relative" style={{ marginLeft: 4 }}>
            <button
              onMouseDown={e => e.stopPropagation()}
              onClick={() => setTradeOpen(v => !v)}
              className="h-[36px] rounded-[6px] shrink-0 flex items-center justify-center gap-[6px] px-[12px] py-[6px] relative"
              style={{
                border: 'none', cursor: 'pointer', fontFamily: "'Delight', sans-serif",
                fontSize: 12, color: '#fff', background: '#49a3a6',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 5L7 2L12 5V9L7 12L2 9V5Z" stroke="#fff" strokeWidth="1.2" fill="none" />
                <path d="M7 2V12M2 5L12 9M12 5L2 9" stroke="#fff" strokeWidth="0.8" opacity="0.5" />
              </svg>
              <span style={{ fontWeight: 500 }}>Trade</span>
            </button>
            {tradeOpen && (
              <div
                className="absolute top-full right-0 mt-[8px]"
                style={{ background: '#fff', borderRadius: 8, boxShadow: 'var(--shadow-s, 0 6px 20px 0 rgba(0,0,0,0.04))', border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))', zIndex: 30 }}
              >
                <StrategyBindPanel />
              </div>
            )}
          </div>

          {/* Remix — 最右侧按钮，点击打开 RemixPrompt 弹层 */}
          <div ref={forkRef} className="relative" style={{ marginLeft: 4 }}>
            <button
              onMouseDown={e => e.stopPropagation()}
              onClick={() => setForkOpen(v => !v)}
              className="bg-white h-[36px] rounded-[6px] shrink-0 flex items-center justify-center gap-[6px] px-[12px] py-[6px] relative"
              style={{ border: 'none', cursor: 'pointer', fontFamily: "'Delight', sans-serif", fontSize: 12, color: 'rgba(0,0,0,0.9)' }}
            >
              <img src="https://alva-ai-static.b-cdn.net/icons/remix-l.svg" width={16} height={16} alt="remix" style={{ opacity: 0.9 }} />
              <span style={{ fontWeight: 500 }}>Remix</span>
              <span style={{ fontWeight: 400, color: 'rgba(0,0,0,0.5)' }}>{stats.forks}</span>
              <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(0,0,0,0.3)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.05)]" />
            </button>
            {forkOpen && (
              <div
                className="absolute top-full right-0 mt-[8px]"
                style={{ background: '#fff', borderRadius: 8, boxShadow: 'var(--shadow-s, 0 6px 20px 0 rgba(0,0,0,0.04))', border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))', zIndex: 30 }}
              >
                <RemixPrompt />
              </div>
            )}
          </div>
        </div>

        {/* Hover 浮层：PlaybookHeader — 挂在 topbar 根级，top-full = 56px */}
        {headerOpen && (
          <div
            className="absolute top-full left-0 pt-[4px]"
            style={{ zIndex: 30, minWidth: 480 }}
            onMouseEnter={openHeader}
            onMouseLeave={closeHeader}
          >
            <div style={{ borderRadius: 6, boxShadow: 'var(--shadow-s, 0 6px 20px 0 rgba(0,0,0,0.04))', border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}>
              <PlaybookHeader author={author} pulse={pulse} description={description} builtOn={builtOn} onAuthorClick={onAuthorClick} />
            </div>
          </div>
        )}
      </div>

      {/* Star toast — 星标成功提示 + Trade CTA */}
      <style>{`@keyframes toast-in { from { opacity: 0; transform: translateX(-50%) translateY(-8px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }`}</style>
      {toastVisible && (
        <div
          className="fixed top-[16px] left-1/2 -translate-x-1/2 flex items-center gap-[14px] px-[20px] py-[12px] rounded-[8px] z-50"
          style={{
            background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
            animation: 'toast-in 0.25s ease-out',
          }}
        >
          <span style={{ fontSize: 16 }}>⭐</span>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', fontFamily: "'Delight', sans-serif", lineHeight: '20px' }}>
            Starred! Bind it to your broker to start live trading.
          </span>
          <button
            onClick={() => { setToastVisible(false); setTradeOpen(true); }}
            className="shrink-0 transition-opacity hover:opacity-90"
            style={{
              background: '#49a3a6', color: '#fff', border: 'none',
              padding: '5px 14px', borderRadius: 5, fontSize: 12, fontWeight: 500,
              cursor: 'pointer', fontFamily: "'Delight', sans-serif",
            }}
          >Trade</button>
          <button
            onClick={() => setToastVisible(false)}
            className="shrink-0 transition-opacity hover:opacity-70"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px', color: 'rgba(255,255,255,0.4)', fontSize: 14, lineHeight: 1 }}
          >✕</button>
        </div>
      )}

    </>
  );
}
