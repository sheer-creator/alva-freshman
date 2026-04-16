/**
 * [INPUT]: mock data types, community components
 * [OUTPUT]: Playbook 专用 Topbar — Infant 风格 + Freshman 交互
 * [POS]: 社区组件 — 整合所有社区交互入口
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { Avatar } from '@/app/components/shared/Avatar';
import { PlaybookShareModal } from './PlaybookShareModal';
import { PlaybookInfoPopup } from './PlaybookInfoPopup';
import type { PlaybookHeaderProps } from './PlaybookHeader';
import type { LineageNode, Comment } from '@/data/community-mock';

/* ========== Props ========== */

interface PlaybookTopbarProps extends PlaybookHeaderProps {
  title: string;
  stats: { stars: number; forks: number; shares: number };
  lineage: LineageNode;
  comments: Comment[];
  discussionOpen: boolean;
  onToggleDiscussion: () => void;
  onAuthorClick?: () => void;
  onNavigate?: (page: import('@/app/App').Page) => void;
}

/* ========== 点击外部关闭 ========== */

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

/* ========== StatusDot ========== */

function StatusDot({ size = 12 }: { size?: number }) {
  return (
    <div className="flex items-center shrink-0" style={{ width: size, height: size }}>
      <div className="flex-1 h-full min-h-px min-w-px overflow-clip relative">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
          <svg className="block size-full" fill="none" viewBox="0 0 12 12">
            <circle cx="6" cy="6" fill="#DBEDED" r="6" />
          </svg>
        </div>
        <div className="absolute bottom-[28.6%] left-1/2 top-[28.6%] -translate-x-1/2">
          <svg className="block size-full" fill="none" viewBox="0 0 5.136 5.136">
            <circle cx="2.568" cy="2.568" fill="#49A3A6" r="2.568" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ========== StatusPill (dot + 运行时长) ========== */

function StatusPill({ text = '15m' }: { text?: string }) {
  return (
    <div
      className="flex items-center justify-center gap-[2px] px-[6px] py-px rounded-full shrink-0"
      style={{ border: '1px solid rgba(0,0,0,0.07)' }}
    >
      <StatusDot size={12} />
      <p className="font-['Delight',sans-serif] leading-[20px] text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] whitespace-nowrap">
        {text}
      </p>
    </div>
  );
}

/* ========== IconButton ========== */

function IconButton({
  children,
  label,
  active,
  onClick,
}: {
  children: React.ReactNode;
  label?: string | number;
  active?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <div
      className={`flex gap-[4px] h-[32px] items-center justify-center overflow-clip px-[8px] py-[6px] rounded-[6px] shrink-0 cursor-pointer transition-colors ${
        active ? 'bg-[rgba(73,163,166,0.1)]' : 'hover:bg-black/[0.04]'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center overflow-clip shrink-0">
        <div className="shrink-0 size-[16px]">{children}</div>
      </div>
      {label !== undefined && (
        <p
          className={`font-['Delight',sans-serif] leading-[20px] text-[12px] tracking-[0.12px] whitespace-nowrap ${
            active ? 'text-[#49A3A6]' : 'text-[rgba(0,0,0,0.9)]'
          }`}
        >
          {label}
        </p>
      )}
    </div>
  );
}

/* ========== Remix prompt body ========== */

const PLAYBOOK_REF = '@ivan/geopolitical-risk';

function buildRemixPrompt() {
  return `Remix Playbook(${PLAYBOOK_REF}):

If you have the Alva skill → use it to build my own version.
If not → install it first: npx skills add https://github.com/alva-ai/skills

Then:
1. Customize it based on my preferences
2. Deploy as a new playbook under my account
3. If I don't specify what to change, ask me what I'd like to customize.`;
}

function RemixPromptBody() {
  return (
    <div className="w-full font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[rgba(0,0,0,0.7)]">
      <p className="mb-0">Remix Playbook({PLAYBOOK_REF}):</p>
      <p className="mb-0">&nbsp;</p>
      <p className="mb-0">If you have the Alva skill → use it to build my own version.</p>
      <p className="mb-0">If not → install it first: npx skills add https://github.com/alva-ai/skills</p>
      <p className="mb-0">&nbsp;</p>
      <p className="mb-0">Then:</p>
      <p className="mb-0">1. Customize it based on my preferences</p>
      <p className="mb-0">2. Deploy as a new playbook under my account</p>
      <p className="mb-0">{`3. If I don't specify what to change, ask me what I'd like to customize.`}</p>
    </div>
  );
}

const COPY_FEEDBACK_MS = 2000;

/* ========== 组件 ========== */

export function PlaybookTopbar({
  title, stats, comments,
  discussionOpen, onToggleDiscussion,
  author, description, onAuthorClick, onNavigate,
}: PlaybookTopbarProps) {
  const [headerOpen, setHeaderOpen] = useState(false);
  const [remixOpen, setRemixOpen] = useState(false);
  const [ownAgentOpen, setOwnAgentOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const remixRef = useRef<HTMLDivElement>(null);
  const headerTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const openHeader = useCallback(() => {
    if (headerTimer.current) clearTimeout(headerTimer.current);
    setHeaderOpen(true);
  }, []);
  const closeHeader = useCallback(() => {
    headerTimer.current = setTimeout(() => setHeaderOpen(false), 150);
  }, []);
  useEffect(() => () => { if (headerTimer.current) clearTimeout(headerTimer.current); }, []);

  const closeRemix = useCallback(() => {
    setRemixOpen(false);
    setOwnAgentOpen(false);
    setCopied(false);
  }, []);

  useClickOutside(remixRef, remixOpen, closeRemix);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(buildRemixPrompt());
      setCopied(true);
      window.setTimeout(() => setCopied(false), COPY_FEEDBACK_MS);
    } catch { /* noop */ }
  };

  const authorName = author?.name ?? 'Alva Intern';

  return (
    <>
      <div className="flex gap-[12px] h-[56px] items-center py-[10px] sticky top-0 shrink-0 w-full z-10 bg-white relative">
        {/* Left: avatar + author (click → profile) + title (hover → popup) + status */}
        <div className="flex flex-1 gap-[4px] items-center min-h-px min-w-px">
          {/* Author unit — click navigates to profile */}
          <div
            className="flex gap-[4px] items-center shrink-0 cursor-pointer"
            onClick={onAuthorClick}
            role={onAuthorClick ? 'button' : undefined}
            tabIndex={onAuthorClick ? 0 : undefined}
            onKeyDown={e => { if (onAuthorClick && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onAuthorClick(); } }}
          >
            <div className="shrink-0 size-[20px]">
              <Avatar name={authorName} size={20} />
            </div>
            <p className="font-['Delight',sans-serif] leading-[22px] text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-nowrap shrink-0">
              {authorName}
            </p>
          </div>
          <p className="font-['Delight',sans-serif] leading-[22px] text-[14px] text-[rgba(0,0,0,0.5)] tracking-[0.14px] shrink-0">
            &bull;
          </p>
          {/* Title + status — 整块作为 hover 触发区(icon + title + pill) */}
          <div
            className="group relative flex gap-[4px] items-center min-w-0 overflow-visible cursor-pointer"
            onMouseEnter={openHeader}
            onMouseLeave={closeHeader}
          >
            <div className="shrink-0 size-[18px] flex items-center justify-center">
              <CdnIcon name="sidebar-dashboard-normal" size={18} color="rgba(0,0,0,0.9)" />
            </div>
            <p
              className="font-['Delight',sans-serif] leading-[22px] text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-nowrap overflow-hidden text-ellipsis shrink-0 group-hover:underline group-hover:decoration-dotted group-hover:decoration-[rgba(0,0,0,0.5)] group-hover:underline-offset-[3px]"
            >
              {title}
            </p>
            <StatusPill text="15m" />
            {/* Hover 浮层：Playbook Info (Figma 6080:112803) — 标题左对齐,下方 8px,带淡入上浮动画 */}
            <div
              className={`absolute left-0 top-full mt-[8px] z-30 w-[520px] origin-top transition-all duration-200 ease-out ${
                headerOpen
                  ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                  : 'opacity-0 -translate-y-1 scale-[0.98] pointer-events-none'
              }`}
            >
              <PlaybookInfoPopup
                title={title}
                intervalLabel="15m"
                description={description}
                authorName={authorName}
                onNavigate={onNavigate}
              />
            </div>
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex items-center shrink-0">
          {/* History */}
          <IconButton>
            <CdnIcon name="history-l" />
          </IconButton>

          {/* Settings */}
          <IconButton>
            <CdnIcon name="settings-l" />
          </IconButton>

          {/* Share */}
          <IconButton onClick={() => setShareOpen(true)}>
            <CdnIcon name="share-l" />
          </IconButton>

          {/* Star — display only */}
          <IconButton label={stats.stars}>
            <CdnIcon name="star-l" />
          </IconButton>

          {/* Remix — Infant 风格多阶段下拉 */}
          <div ref={remixRef} className="relative shrink-0">
            <div
              role="button"
              tabIndex={0}
              onClick={() => setRemixOpen(o => !o)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setRemixOpen(o => !o); } }}
              aria-expanded={remixOpen}
              aria-haspopup="dialog"
            >
              <IconButton label={stats.forks} active={remixOpen}>
                <CdnIcon name="remix-l" color={remixOpen ? '#49A3A6' : undefined} />
              </IconButton>
            </div>
            {remixOpen && (
              <div
                className="absolute right-0 top-full mt-[6px] z-50 flex w-[480px] flex-col gap-[16px] overflow-hidden rounded-[12px] p-[20px]"
                style={{ backgroundColor: '#fff', border: '0.5px solid rgba(0,0,0,0.2)', boxShadow: '0 6px 20px rgba(0,0,0,0.04)' }}
                role="dialog"
                aria-label="Remix this Playbook"
              >
                <h2 className="font-['Delight',sans-serif] font-medium text-[16px] leading-[26px] tracking-[0.16px] text-[rgba(0,0,0,0.9)]">
                  Remix this Playbook
                </h2>
                <p className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[rgba(0,0,0,0.9)]">
                  Create your own version — customize the data, layout, and style to fit your needs. Your remix will be published under your account.
                </p>
                <a
                  href="https://app.alva.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-[40px] w-full items-center justify-center gap-[8px] rounded-[8px] px-[20px] py-[9px] font-['Delight',sans-serif] font-medium text-[14px] leading-[22px] tracking-[0.14px] text-white no-underline transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#49A3A6' }}
                  onClick={() => setRemixOpen(false)}
                >
                  <CdnIcon name="remix-l" size={18} color="#ffffff" />
                  Remix
                </a>
                <div className="flex flex-col w-full">
                  <div className="flex items-center gap-[8px] w-full">
                    <div className="h-px min-w-0 flex-1 bg-[rgba(0,0,0,0.05)]" />
                    <button
                      type="button"
                      className="flex items-center gap-[4px] bg-transparent cursor-pointer font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-[rgba(0,0,0,0.5)] border-none outline-none hover:opacity-80"
                      onClick={() => setOwnAgentOpen(o => !o)}
                      aria-expanded={ownAgentOpen}
                    >
                      <span className="whitespace-nowrap">Or use your own agent</span>
                      <span
                        className="flex size-[12px] items-center justify-center transition-transform duration-300 ease-out"
                        style={{ transform: ownAgentOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}
                      >
                        <CdnIcon name="arrow-down-l2" size={12} color="rgba(0,0,0,0.5)" />
                      </span>
                    </button>
                    <div className="h-px min-w-0 flex-1 bg-[rgba(0,0,0,0.05)]" />
                  </div>
                  <div className={`grid w-full transition-[grid-template-rows,margin-top] duration-300 ease-out ${ownAgentOpen ? 'grid-rows-[1fr] mt-[16px]' : 'grid-rows-[0fr] mt-0'}`}>
                    <div className="min-h-0 overflow-hidden">
                      <div
                        className={`flex flex-col gap-[16px] rounded-[6px] px-[20px] py-[16px] transition-opacity duration-300 ease-out ${ownAgentOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                        style={{ backgroundColor: 'rgba(0,0,0,0.03)' }}
                      >
                        <div className="max-h-[240px] overflow-y-auto">
                          <RemixPromptBody />
                        </div>
                        <button
                          type="button"
                          className="flex h-[40px] w-full cursor-pointer items-center justify-center gap-[8px] rounded-[8px] bg-transparent px-[20px] py-[9px] font-['Delight',sans-serif] text-[14px] font-medium leading-[22px] tracking-[0.14px] text-[rgba(0,0,0,0.9)] transition-all hover:border-[rgba(0,0,0,0.9)]"
                          style={{ border: '0.5px solid rgba(0,0,0,0.2)' }}
                          onClick={copyPrompt}
                        >
                          {copied ? (
                            <CdnIcon name="check-l1" size={18} color="#49A3A6" />
                          ) : (
                            <CdnIcon name="copy-l" size={18} color="rgba(0,0,0,0.9)" />
                          )}
                          {copied ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Discuss — 保留 Freshman 交互 */}
          <IconButton
            label={comments.length}
            active={discussionOpen}
            onClick={onToggleDiscussion}
          >
            <CdnIcon name="chat-l1" color={discussionOpen ? '#49A3A6' : undefined} />
          </IconButton>
        </div>

        {/* Share modal */}
        <PlaybookShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} playbookName={title} onNavigate={onNavigate} />
      </div>

    </>
  );
}
