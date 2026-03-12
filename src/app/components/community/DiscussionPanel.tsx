/**
 * [INPUT]: Comment[] + AgentTakeData, open/onClose 控制
 * [OUTPUT]: 右侧滑出评论面板（Reddit 风格），可拖拽宽度，支持 Markdown + 回复
 * [POS]: 社区组件 — PlaybookTopbar 的 Discussion 详情面板
 */

import { useState, useRef, useCallback, useMemo } from 'react';
import Markdown from 'react-markdown';
import { AVATAR_COLOR_PALETTE } from '@/lib/chart-theme';
import type { Comment, AgentTakeData, PlaybookRef } from '@/data/community-mock';
import { PulseIndicator } from './PulseIndicator';

/* ========== 头像 ========== */

const AGENT_COLOR = 'var(--main-m1, #49A3A6)';
const ICON_CDN = 'https://alva-ai-static.b-cdn.net/icons';

function CommentAvatar({ name, isAgent, size = 32 }: { name: string; isAgent: boolean; size?: number }) {
  const initial = name.trim().charAt(0).toUpperCase();
  const color = isAgent
    ? AGENT_COLOR
    : AVATAR_COLOR_PALETTE[[...name].reduce((s, c) => s + c.charCodeAt(0), 0) % AVATAR_COLOR_PALETTE.length];
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: color, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{ fontSize: size * 0.44, color: '#fff', lineHeight: 1, fontFamily: "'Delight', sans-serif" }}>{initial}</span>
    </div>
  );
}

/* ========== Markdown 样式 ========== */

/* Markdown M size — Alva design-components.md */
const MD_COMPONENTS: Record<string, React.ComponentType<Record<string, unknown>>> = {
  p: (props) => <p {...props} style={{ margin: 0, fontSize: 14, lineHeight: '22px', letterSpacing: '0.14px' }} />,
  strong: (props) => <strong {...props} style={{ fontWeight: 600, color: 'var(--text-n9)' }} />,
  em: (props) => <em {...props} />,
  h1: (props) => <h1 {...props} style={{ margin: 0, fontSize: 18, lineHeight: '28px', letterSpacing: '0.18px', fontWeight: 500 }} />,
  h2: (props) => <h2 {...props} style={{ margin: 0, fontSize: 16, lineHeight: '26px', letterSpacing: '0.16px', fontWeight: 500 }} />,
  h3: (props) => <h3 {...props} style={{ margin: 0, fontSize: 14, lineHeight: '22px', letterSpacing: '0.14px', fontWeight: 500 }} />,
  code: (props) => (
    <code {...props} style={{
      background: 'rgba(0,0,0,0.05)', padding: 8, borderRadius: 3,
      fontSize: '0.9em', fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
    }} />
  ),
  ul: (props) => <ul {...props} style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 4 }} />,
  ol: (props) => <ol {...props} style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 4 }} />,
  li: (props) => <li {...props} style={{ fontSize: 14, lineHeight: '22px', letterSpacing: '0.14px' }} />,
};

/* ========== Playbook 引用卡片 ========== */

function PlaybookRefCard({ item }: { item: PlaybookRef }) {
  const r = item;
  const navigate = () => { window.location.hash = '#' + r.page; };
  const borderDefault = r.isFork ? 'rgba(73,163,166,0.2)' : 'rgba(0,0,0,0.08)';
  return (
    <div
      onClick={navigate}
      style={{
        background: 'var(--grey-g01, #fafafa)', border: `1px solid ${borderDefault}`,
        borderRadius: 8, padding: '10px 12px', cursor: 'pointer',
        transition: 'border-color 150ms',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = '#49A3A6')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = borderDefault)}
    >
      {/* 第一行：作者 + Playbook 图标 + 名称 + Pulse */}
      <div className="flex items-center gap-[6px]">
        <CommentAvatar name={r.author} isAgent={false} size={18} />
        <span style={{ fontSize: 12, color: 'var(--text-n5)', fontFamily: "'Delight', sans-serif" }}>{r.author}</span>
        <span style={{ fontSize: 12, color: 'var(--text-n5)' }}>·</span>
        <img src={`${ICON_CDN}/remix-l.svg`} width={14} height={14} alt="" style={{ opacity: 0.5 }} />
        <span style={{
          fontSize: 13, color: '#49A3A6', fontWeight: 500, fontFamily: "'Delight', sans-serif",
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, minWidth: 0,
        }}>{r.name}</span>
        {r.pulse && <PulseIndicator status={r.pulse} />}
      </div>
      {/* 第二行：描述 */}
      <div className="flex items-center gap-[8px] mt-[4px]">
        <span style={{
          flex: 1, fontSize: 12, color: 'var(--text-n5)', overflow: 'hidden',
          textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{r.description}</span>
      </div>
    </div>
  );
}

/* ========== 单条评论 ========== */

function CommentItem({ comment, onReply }: { comment: Comment; onReply: (id: string) => void }) {
  return (
    <div className="flex gap-[10px]" style={{ padding: '12px 0' }}>
      <CommentAvatar name={comment.author} isAgent={comment.isAgent} size={22} />
      <div className="flex-1 min-w-0">
        {/* 作者 + 时间（右对齐） */}
        <div className="flex items-center">
          <span style={{ fontSize: 14, color: 'var(--text-n9)', fontWeight: 500, fontFamily: "'Delight', sans-serif", lineHeight: '22px' }}>
            {comment.author}
          </span>
          {comment.isAgent && (
            <span className="ml-[6px]" style={{
              fontSize: 10, color: AGENT_COLOR, background: 'rgba(73,163,166,0.1)',
              padding: '1px 6px', borderRadius: 3, lineHeight: '16px',
              fontFamily: "'Delight', sans-serif", fontWeight: 500,
            }}>Agent</span>
          )}
          <span className="ml-auto" style={{ fontSize: 12, color: 'var(--text-n5)', flexShrink: 0 }}>{comment.timestamp}</span>
        </div>
        {/* 内容 — Markdown M */}
        <div className="mt-[6px]" style={{ color: 'var(--text-n9)', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Markdown components={MD_COMPONENTS}>{comment.text}</Markdown>
        </div>
        {/* Sticker */}
        {comment.sticker && (
          <img
            src={new URL(`../../../assets/stickers/${comment.sticker}`, import.meta.url).href}
            alt="sticker"
            style={{ width: 200, marginTop: 8, borderRadius: 8, objectFit: 'contain' }}
          />
        )}
        {/* Playbook 引用 */}
        {comment.playbookRefs && comment.playbookRefs.length > 0 && (
          <div className="flex flex-col gap-[8px] mt-[8px]">
            {comment.playbookRefs.map((r, i) => <PlaybookRefCard key={i} item={r} />)}
          </div>
        )}
        {/* Reply 按钮 */}
        <div className="flex items-center mt-[8px]">
          <button
            onClick={() => onReply(comment.id)}
            className="flex items-center gap-[4px]"
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              fontSize: 14, color: 'var(--text-n5)', fontFamily: "'Delight', sans-serif",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--main-m1, #49A3A6)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-n5)')}
          >
            <img src={`${ICON_CDN}/chat-l1.svg`} width={16} height={16} alt="" style={{ opacity: 0.5 }} />
            <span>Reply</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ========== 评论线程（递归） ========== */

function CommentThread({ comment, depth, onReply }: { comment: Comment; depth: number; onReply: (id: string) => void }) {
  const hasReplies = comment.replies && comment.replies.length > 0;
  return (
    <div className="relative">
      {/* 从头像中心向下延伸到子评论的竖线 */}
      {hasReplies && (
        <div style={{
          position: 'absolute',
          left: 10, /* 头像中心: 22/2 = 11, 取整 10 */
          top: 34,  /* 头像底部: padding 12 + avatar 22 = 34 */
          bottom: 0,
          width: 1,
          background: 'var(--grey-g05, #eaeaea)',
        }} />
      )}
      <CommentItem comment={comment} onReply={onReply} />
      {hasReplies && (
        <div style={{ marginLeft: 10, paddingLeft: 21 }}>
          {comment.replies!.map((reply, i) => (
            <div key={reply.id} className="relative">
              {/* 从竖线到子评论头像的横线 */}
              <div style={{
                position: 'absolute',
                left: -21,
                top: 23, /* padding 12 + avatar center 11 = 23 */
                width: 21,
                height: 1,
                background: 'var(--grey-g05, #eaeaea)',
              }} />
              {/* 子评论之间的竖线延续 */}
              {i < comment.replies!.length - 1 && (
                <div style={{
                  position: 'absolute',
                  left: -21,
                  top: 23,
                  bottom: 0,
                  width: 1,
                  background: 'var(--grey-g05, #eaeaea)',
                }} />
              )}
              <CommentThread comment={reply} depth={depth + 1} onReply={onReply} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ========== 回复输入框 ========== */

function ReplyInput({ replyTo, onCancel }: { replyTo: string; onCancel: () => void }) {
  return (
    <div className="flex items-start gap-[8px] py-[8px]" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
      <div className="flex-1 min-w-0">
        <p className="text-[12px] mb-[4px]" style={{ color: 'var(--text-n5)' }}>Replying to {replyTo}</p>
        <textarea
          autoFocus
          placeholder="Write a reply..."
          className="text-[13px] w-full"
          style={{
            resize: 'vertical', minHeight: 56, padding: '8px 10px',
            border: '1px solid rgba(0,0,0,0.12)', borderRadius: 6,
            fontFamily: "'Delight', sans-serif", outline: 'none',
            color: 'var(--text-n9)',
          }}
          onFocus={e => (e.currentTarget.style.borderColor = 'var(--main-m1, #49A3A6)')}
          onBlur={e => (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)')}
        />
        <div className="flex items-center gap-[8px] mt-[4px]">
          <button
            className="text-[12px]"
            style={{
              background: AGENT_COLOR, color: '#fff', border: 'none',
              borderRadius: 4, padding: '4px 12px', cursor: 'pointer',
              fontFamily: "'Delight', sans-serif",
            }}
          >Reply</button>
          <button
            onClick={onCancel}
            className="text-[12px]"
            style={{
              background: 'none', color: 'var(--text-n5)', border: 'none',
              cursor: 'pointer', padding: '4px 8px', fontFamily: "'Delight', sans-serif",
            }}
          >Cancel</button>
        </div>
      </div>
    </div>
  );
}

/* ========== Props ========== */

interface DiscussionPanelProps {
  open: boolean;
  onClose: () => void;
  comments: Comment[];
  agentTake: AgentTakeData;
}

/* ========== 组件 ========== */

export function DiscussionPanel({ open, onClose, comments, agentTake }: DiscussionPanelProps) {
  const [width, setWidth] = useState(480);
  const [replyTarget, setReplyTarget] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const widthRef = useRef(width);
  widthRef.current = width;

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

  const totalCount = comments.reduce((sum, c) => sum + 1 + (c.replies?.length ?? 0), 0);

  return (
    <div
      ref={panelRef}
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
        <div className="flex items-center justify-between px-[24px] h-[48px] shrink-0">
          <div className="flex items-center gap-[8px]">
            <p className="text-[14px]" style={{ color: 'var(--text-n9)', fontWeight: 400, fontFamily: "'Delight', sans-serif" }}>Discussion</p>
            <span className="text-[12px]" style={{ color: 'var(--text-n5)' }}>{totalCount}</span>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16 }}
          >
            <img src={`${ICON_CDN}/close-l1.svg`} alt="Close" width={16} height={16} />
          </button>
        </div>

        {/* 评论列表 */}
        <div className="flex-1 overflow-y-auto px-[24px]">
          {comments.map((c, i) => (
            <div key={c.id}>
              <CommentThread comment={c} depth={0} onReply={id => setReplyTarget(id)} />
              {replyTarget && findComment(c, replyTarget) && (
                <div style={{ marginLeft: 42 }}>
                  <ReplyInput
                    replyTo={findComment(c, replyTarget)!.author}
                    onCancel={() => setReplyTarget(null)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 底部输入 */}
        <div className="shrink-0 px-[24px] pb-[16px] pt-[8px]">
          <div
            className="flex items-center"
            style={{
              border: '1px solid var(--line-l12, rgba(0,0,0,0.12))',
              borderRadius: 20,
              height: 44,
              paddingLeft: 16,
              paddingRight: 4,
            }}
          >
            <span className="flex-1 text-[13px]" style={{ color: 'var(--text-n3, rgba(0,0,0,0.3))', fontFamily: "'Delight', sans-serif" }}>Write a reply</span>
            <button
              style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'var(--grey-g01, #fafafa)',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3L8 13M8 3L4 7M8 3L12 7" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========== 工具函数 ========== */

function findComment(comment: Comment, id: string): Comment | null {
  if (comment.id === id) return comment;
  for (const reply of comment.replies ?? []) {
    const found = findComment(reply, id);
    if (found) return found;
  }
  return null;
}
