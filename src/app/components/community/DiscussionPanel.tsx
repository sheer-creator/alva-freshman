/**
 * [INPUT]: Comment[] + AgentTakeData, open/onClose 控制
 * [OUTPUT]: 右侧滑出评论面板（Reddit 风格），可拖拽宽度，支持 Markdown + 回复
 * [POS]: 社区组件 — PlaybookTopbar 的 Discussion 详情面板
 */

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Markdown from 'react-markdown';
import { AVATAR_COLOR_PALETTE } from '@/lib/chart-theme';
import type { Comment, AgentTakeData, PlaybookRef } from '@/data/community-mock';
import { PulseIndicator } from './PulseIndicator';

/* ========== 头像 ========== */

const AGENT_COLOR = 'var(--main-m1, #49A3A6)';

function CommentAvatar({ name, isAgent, size = 28 }: { name: string; isAgent: boolean; size?: number }) {
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

const MD_COMPONENTS: Record<string, React.ComponentType<Record<string, unknown>>> = {
  p: (props) => <p {...props} style={{ margin: 0, lineHeight: '22px' }} />,
  strong: (props) => <strong {...props} style={{ fontWeight: 600, color: 'var(--text-n9)' }} />,
  em: (props) => <em {...props} />,
  code: (props) => (
    <code {...props} style={{
      background: 'rgba(0,0,0,0.05)', padding: '1px 5px', borderRadius: 3,
      fontSize: '0.9em', fontFamily: "'SF Mono', 'Fira Code', monospace",
    }} />
  ),
  ul: (props) => <ul {...props} style={{ margin: '4px 0', paddingLeft: 18 }} />,
  li: (props) => <li {...props} style={{ lineHeight: '22px' }} />,
};

/* ========== Agent's Take → Markdown ========== */

function agentTakeToMarkdown(data: AgentTakeData): string {
  return [
    `**MARKET THESIS**\n${data.marketThesis}`,
    `**KEY ASSUMPTIONS**\n${data.keyAssumptions.map(a => `- ${a}`).join('\n')}`,
    `**RISK FACTORS**\n${data.riskFactors.map(r => `- ${r}`).join('\n')}`,
    `**BUILD LOG**\n${data.buildLog}`,
    `**USAGE GUIDE**\n${data.usageGuide}`,
  ].join('\n\n');
}

/* ========== Timeline ========== */

function Timeline({ entries }: { entries: AgentTakeData['timeline'] }) {
  return (
    <div className="mt-[8px]">
      <p className="text-[11px] tracking-[1px]" style={{ color: 'var(--text-n5)', fontWeight: 600 }}>TIMELINE</p>
      <div className="flex flex-col mt-[4px]">
        {entries.map((entry, i) => (
          <div key={i} className="flex gap-[8px]" style={{ paddingBottom: i < entries.length - 1 ? 8 : 0 }}>
            <div className="flex flex-col items-center" style={{ width: 8, flexShrink: 0, paddingTop: 6 }}>
              <div style={{
                width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                background: entry.active ? AGENT_COLOR : 'var(--grey-g03, #ddd)',
              }} />
              {i < entries.length - 1 && (
                <div style={{ width: 1.5, flex: 1, background: AGENT_COLOR, opacity: 0.25, marginTop: 2 }} />
              )}
            </div>
            <div>
              <p className="text-[11px]" style={{ color: 'var(--text-n5)' }}>{entry.date}</p>
              <p className="text-[13px] leading-[18px] mt-[1px]" style={{ color: 'var(--text-n9)' }}>{entry.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
      {/* Fork 标签 */}
      {r.isFork && (
        <span style={{
          display: 'inline-block', fontSize: 11, lineHeight: '18px', fontWeight: 600,
          color: '#fff', background: '#49A3A6', borderRadius: 9, padding: '0 7px',
          marginBottom: 6, fontFamily: "'Delight', sans-serif",
        }}>⑂ FORK</span>
      )}
      {/* 第一行：作者 + Playbook 名 + Pulse */}
      <div className="flex items-center gap-[6px]">
        <CommentAvatar name={r.author} isAgent={false} size={14} />
        <span style={{ fontSize: 12, color: 'var(--text-n5)', fontFamily: "'Delight', sans-serif" }}>{r.author}</span>
        <span style={{ fontSize: 12, color: 'var(--text-n5)' }}>·</span>
        <span style={{ fontSize: 13, color: '#49A3A6', fontWeight: 500, fontFamily: "'Delight', sans-serif" }}>{r.name}</span>
        {r.pulse && <PulseIndicator status={r.pulse} />}
      </div>
      {/* 第二行：描述 + KPI */}
      <div className="flex items-center gap-[8px] mt-[4px]">
        <span style={{
          flex: 1, fontSize: 12, color: 'var(--text-n5)', overflow: 'hidden',
          textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{r.description}</span>
        {r.kpi && (
          <span style={{ fontSize: 12, color: '#49A3A6', fontWeight: 600, flexShrink: 0 }}>{r.kpi}</span>
        )}
      </div>
    </div>
  );
}

/* ========== 单条评论 ========== */

function CommentItem({ comment, onReply }: { comment: Comment; onReply: (id: string) => void }) {
  return (
    <div className="flex gap-[10px]" style={{ padding: '10px 0' }}>
      <CommentAvatar name={comment.author} isAgent={comment.isAgent} size={26} />
      <div className="flex-1 min-w-0">
        {/* 作者 + 时间 */}
        <div className="flex items-center gap-[6px]">
          <span className="text-[13px]" style={{ color: 'var(--text-n9)', fontWeight: 500, fontFamily: "'Delight', sans-serif" }}>
            {comment.author}
          </span>
          {comment.isAgent && (
            <span className="text-[10px]" style={{
              color: AGENT_COLOR, background: 'rgba(73,163,166,0.1)',
              padding: '0 5px', borderRadius: 3, lineHeight: '16px',
            }}>agent</span>
          )}
          <span className="text-[12px]" style={{ color: 'var(--text-n5)' }}>{comment.timestamp}</span>
        </div>
        {/* 内容 */}
        <div className="mt-[4px] text-[14px]" style={{ color: 'var(--text-n7)' }}>
          <Markdown components={MD_COMPONENTS}>{comment.text}</Markdown>
        </div>
        {/* Sticker */}
        {comment.sticker && (
          <img
            src={new URL(`../../../assets/stickers/${comment.sticker}`, import.meta.url).href}
            alt="sticker"
            style={{ width: 48, height: 48, marginTop: 4, objectFit: 'contain' }}
          />
        )}
        {/* Playbook 引用 */}
        {comment.playbookRefs && comment.playbookRefs.length > 0 && (
          <div className="flex flex-col gap-[8px] mt-[6px]">
            {comment.playbookRefs.map((r, i) => <PlaybookRefCard key={i} item={r} />)}
          </div>
        )}
        {/* 操作栏 */}
        <div className="flex items-center gap-[12px] mt-[4px]">
          <button
            onClick={() => onReply(comment.id)}
            className="text-[12px]"
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              color: 'var(--text-n5)', fontFamily: "'Delight', sans-serif",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--main-m1, #49A3A6)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-n5)')}
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}

/* ========== 评论线程（递归） ========== */

function CommentThread({ comment, depth, onReply }: { comment: Comment; depth: number; onReply: (id: string) => void }) {
  return (
    <div>
      <CommentItem comment={comment} onReply={onReply} />
      {comment.replies && comment.replies.length > 0 && (
        <div style={{ marginLeft: 13, borderLeft: '2px solid rgba(0,0,0,0.06)', paddingLeft: 14 }}>
          {comment.replies.map(reply => (
            <CommentThread key={reply.id} comment={reply} depth={depth + 1} onReply={onReply} />
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
  const [width, setWidth] = useState(420);
  const [replyTarget, setReplyTarget] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const widthRef = useRef(width);
  widthRef.current = width;

  /* Agent's Take → 一楼 */
  const agentTakeComment = useMemo<Comment>(() => ({
    id: 'agent-take',
    author: 'Alva Agent',
    isAgent: true,
    text: agentTakeToMarkdown(agentTake),
    timestamp: 'Mar 2026',
  }), [agentTake]);

  /* 点击面板外部关闭 */
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) onClose();
    };
    const timer = setTimeout(() => document.addEventListener('mousedown', handler), 0);
    return () => { clearTimeout(timer); document.removeEventListener('mousedown', handler); };
  }, [open, onClose]);

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

  const totalCount = comments.reduce((sum, c) => sum + 1 + (c.replies?.length ?? 0), 0) + 1;

  return (
    <div
      ref={panelRef}
      className="fixed right-0 top-0 h-screen flex flex-col bg-white z-20"
      style={{
        width,
        boxShadow: open ? '-4px 0 24px rgba(0,0,0,0.08)' : 'none',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 200ms ease-in-out',
        pointerEvents: open ? 'auto' : 'none',
      }}
    >
      {/* 拖拽手柄 */}
      <div
        onMouseDown={handleDragStart}
        style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
          cursor: 'col-resize', zIndex: 1,
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--main-m1, #49A3A6)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      />

      {/* 标题行 */}
      <div className="flex items-center justify-between px-[20px] h-[48px] shrink-0" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="flex items-center gap-[8px]">
          <p className="text-[14px] font-medium" style={{ color: 'var(--text-n9)', fontFamily: "'Delight', sans-serif" }}>Discussion</p>
          <span className="text-[12px]" style={{ color: 'var(--text-n5)' }}>{totalCount}</span>
        </div>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'var(--text-n5)', fontSize: 18, lineHeight: 1 }}
        >&times;</button>
      </div>

      {/* 评论列表 */}
      <div className="flex-1 overflow-y-auto px-[20px] py-[4px]">
        {/* 一楼: Agent's Take */}
        <div style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="flex gap-[10px]" style={{ padding: '12px 0' }}>
            <CommentAvatar name="Alva Agent" isAgent size={26} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-[6px]">
                <span className="text-[13px]" style={{ color: 'var(--text-n9)', fontWeight: 500, fontFamily: "'Delight', sans-serif" }}>Alva Agent</span>
                <span className="text-[10px]" style={{
                  color: AGENT_COLOR, background: 'rgba(73,163,166,0.1)',
                  padding: '0 5px', borderRadius: 3, lineHeight: '16px',
                }}>agent</span>
                <span className="text-[12px]" style={{ color: 'var(--text-n5)' }}>Mar 2026</span>
              </div>
              <div className="mt-[4px] text-[14px]" style={{ color: 'var(--text-n7)' }}>
                <Markdown components={MD_COMPONENTS}>{agentTakeComment.text}</Markdown>
              </div>
              <Timeline entries={agentTake.timeline} />
            </div>
          </div>
        </div>

        {/* 后续评论 */}
        {comments.map((c, i) => (
          <div key={c.id} style={{ borderBottom: i < comments.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
            <CommentThread comment={c} depth={0} onReply={id => setReplyTarget(id)} />
            {replyTarget && findComment(c, replyTarget) && (
              <div style={{ marginLeft: 36 }}>
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
      <div className="shrink-0 px-[20px] pb-[16px] pt-[8px]" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div
          className="flex items-center"
          style={{ background: 'var(--grey-g02, #f5f5f5)', borderRadius: 6, height: 40, paddingLeft: 12 }}
        >
          <span className="text-[13px]" style={{ color: 'var(--text-n3, rgba(0,0,0,0.3))', fontFamily: "'Delight', sans-serif" }}>Add a comment...</span>
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
