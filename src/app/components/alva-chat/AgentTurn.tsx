/**
 * [INPUT]: AgentTurnData + activeToolId
 * [OUTPUT]: Agent 回合 — blocks 平铺 + 连续 tool_call 语义折叠 + reaction bar
 * [POS]: alva-chat — Agent 回合渲染
 */

import { useState } from 'react';
import type { AgentTurnData, MessageBlock, ToolCallData } from '@/data/alva-chat-mock';
import { TextBlock } from './TextBlock';
import { ToolCallBlock } from './ToolCallBlock';
import { AgentStepGroup } from './AgentStepGroup';
import { ArtifactPreview } from './ArtifactPreview';
import { Collapse } from './Collapse';

/* ========== Inline Result (plan/question 提交后的轻量折叠行) ========== */

function InlineResult({ summary, action, object, detail }: { summary: string; action: string; object: string; detail: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ margin: '2px 0' }}>
      {/* 外层：纯自然语言摘要 */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '4px 0', cursor: 'pointer', userSelect: 'none',
        }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" style={{
          flexShrink: 0, transition: 'transform 0.15s',
          transform: expanded ? 'rotate(90deg)' : 'rotate(0)',
        }}>
          <path d="M3 1.5L7 5L3 8.5" stroke="var(--text-n5)" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        </svg>
        <span style={{
          flex: 1, fontSize: 12, color: 'var(--text-n9)',
          fontFamily: "'Delight', sans-serif",
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {summary}
        </span>
      </div>
      {/* 展开：树线 + action 加粗 + 对象 pill + detail */}
      <Collapse open={expanded}>
        <div style={{ marginLeft: 5, paddingLeft: 11, borderLeft: '1.5px solid rgba(0,0,0,0.08)' }}>
          <div style={{ padding: '6px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{
                fontSize: 13, fontWeight: 600, color: 'var(--text-n9)',
                fontFamily: "'Delight', sans-serif", flexShrink: 0,
              }}>
                {action}
              </span>
              <span style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '2px 8px', borderRadius: 4,
                background: 'rgba(0,0,0,0.06)',
                fontSize: 11, fontFamily: "'Delight', sans-serif", color: 'var(--text-n7, rgba(0,0,0,0.7))',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                maxWidth: '70%',
              }}>
                {object}
              </span>
            </div>
            <div style={{
              fontSize: 11, lineHeight: '17px',
              color: 'rgba(0,0,0,0.4)', whiteSpace: 'pre-wrap',
              fontFamily: "'Delight', sans-serif",
            }}>
              {detail}
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
}

/* ========== Finished — 和 ThinkingIndicator 统一布局 ========== */

function FinishedIndicator({ durationSec, tokenCount }: { durationSec: number; tokenCount: number }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '8px 0',
    }}>
      <svg width="14" height="14" viewBox="0 0 14 14" style={{ flexShrink: 0 }}>
        <circle cx="7" cy="7" r="5.5" fill="none" stroke="var(--main-m1)" strokeWidth="1.2" />
        <path d="M4.5 7l2 2L9.5 5.5" stroke="var(--main-m1)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{
        fontSize: 12, fontFamily: "'Delight', sans-serif",
        color: 'var(--main-m1)', fontWeight: 500,
      }}>
        Finished
      </span>
      <span style={{
        fontSize: 11, color: 'rgba(0,0,0,0.25)',
        fontFamily: "'JetBrains Mono', monospace",
      }}>
        {durationSec.toFixed(1)}s &middot; {tokenCount.toLocaleString()} tokens
      </span>
    </div>
  );
}

/* ========== Reaction Bar ========== */

const REACTION_ICONS: { d: string; title: string }[] = [
  { d: 'M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z', title: 'Like' },
  { d: 'M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z', title: 'Dislike' },
  { d: 'M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z', title: 'Copy' },
];

function ReactionBar() {
  return (
    <div style={{ display: 'flex', gap: 4, padding: '8px 0 4px' }}>
      {REACTION_ICONS.map(({ d, title }, i) => (
        <button key={i} title={title} style={{
          width: 28, height: 28, borderRadius: 6, border: 'none',
          background: 'transparent', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.15s',
        }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--grey-g01)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24"><path d={d} fill="var(--text-n5)" /></svg>
        </button>
      ))}
    </div>
  );
}

/* ========== 语义化 Tool Group ========== */

function generateGroupSummary(tools: ToolCallData[]): string {
  const names = [...new Set(tools.map(t => t.tool))];
  const count = tools.length;
  if (names.length === 1) {
    const name = names[0];
    if (name === 'Bash') return `Ran ${count} command${count > 1 ? 's' : ''}`;
    if (name === 'Edit') return `Edited ${count} file${count > 1 ? 's' : ''}`;
    if (name === 'Write') return `Wrote ${count} file${count > 1 ? 's' : ''}`;
    if (name === 'Read') return `Read ${count} file${count > 1 ? 's' : ''}`;
    return `Used ${name} ${count} time${count > 1 ? 's' : ''}`;
  }
  return `${count} tool calls (${names.join(', ')})`;
}

const GROUP_PREVIEW_COUNT = 3;

function ToolCallGroup({ tools, activeToolId }: { tools: ToolCallData[]; activeToolId?: string | null }) {
  const hasActive = tools.some(t => t.id === activeToolId);
  const [expanded, setExpanded] = useState(hasActive);
  const [showAll, setShowAll] = useState(false);

  if (hasActive && !expanded) setExpanded(true);

  const summary = tools.find(t => t.groupLabel)?.groupLabel ?? generateGroupSummary(tools);
  const visible = showAll ? tools : tools.slice(0, GROUP_PREVIEW_COUNT);
  const hiddenCount = tools.length - GROUP_PREVIEW_COUNT;

  return (
    <div style={{ margin: '2px 0' }}>
      {/* Group header */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '4px 0', cursor: 'pointer', userSelect: 'none',
        }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" style={{
          flexShrink: 0, transition: 'transform 0.15s',
          transform: expanded ? 'rotate(90deg)' : 'rotate(0)',
        }}>
          <path d="M3 1.5L7 5L3 8.5" stroke="var(--text-n5)" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        </svg>
        <span style={{
          fontSize: 12, color: 'var(--text-n9)',
          fontFamily: "'Delight', sans-serif",
        }}>
          {summary}
        </span>
      </div>

      {/* Child tools with tree line */}
      <Collapse open={expanded}>
        <div style={{ marginLeft: 5, paddingLeft: 11, borderLeft: '1.5px solid rgba(0,0,0,0.08)' }}>
          {visible.map(t => (
            <ToolCallBlock key={t.id} data={t} isActive={t.id === activeToolId} nested />
          ))}
          {hiddenCount > 0 && !showAll && (
            <div
              onClick={() => setShowAll(true)}
              style={{
                padding: '6px 0', fontSize: 12, fontWeight: 500,
                color: 'var(--text-n5)', cursor: 'pointer', userSelect: 'none',
                fontFamily: "'Delight', sans-serif",
              }}
            >
              Show {hiddenCount} more
            </div>
          )}
        </div>
      </Collapse>
    </div>
  );
}

/* ========== 将 blocks 分组：连续 2+ tool_call 合并 ========== */

type RenderItem =
  | { kind: 'block'; block: MessageBlock; idx: number }
  | { kind: 'tool_group'; tools: ToolCallData[] };

function groupBlocks(blocks: MessageBlock[]): RenderItem[] {
  const result: RenderItem[] = [];
  let toolBuf: ToolCallData[] = [];

  const flushTools = () => {
    if (toolBuf.length >= 2) {
      result.push({ kind: 'tool_group', tools: [...toolBuf] });
    } else if (toolBuf.length === 1) {
      result.push({ kind: 'block', block: { type: 'tool_call', data: toolBuf[0] }, idx: -1 });
    }
    toolBuf = [];
  };

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.type === 'tool_call') {
      toolBuf.push(b.data);
    } else if (b.type === 'todo_update') {
      continue;
    } else {
      flushTools();
      result.push({ kind: 'block', block: b, idx: i });
    }
  }
  flushTools();
  return result;
}

/* ========== 主组件 ========== */

interface AgentTurnProps {
  turn: AgentTurnData;
  activeToolId?: string | null;
  onUserAction?: () => void;
  onRelease?: () => void;
}

export function AgentTurn({ turn, activeToolId, onUserAction, onRelease }: AgentTurnProps) {
  const hasCompletion = turn.blocks.some(b => b.type === 'completion');
  const items = groupBlocks(turn.blocks);

  return (
    <div style={{ padding: '12px 0' }}>
      {items.map((item, i) => {
        if (item.kind === 'tool_group') {
          return <ToolCallGroup key={`tg-${i}`} tools={item.tools} activeToolId={activeToolId} />;
        }
        const { block, idx } = item;
        switch (block.type) {
          case 'text':
            return <TextBlock key={idx} content={block.content} />;
          case 'tool_call':
            return <ToolCallBlock key={block.data.id} data={block.data} isActive={block.data.id === activeToolId} />;
          case 'agent_step':
            return <AgentStepGroup key={block.data.id} data={block.data} />;
          case 'question':
            if (block.data.selectedIndex == null) return null;
            return <InlineResult key={block.data.id} summary={`Chose ${block.data.options[block.data.selectedIndex!]?.label ?? ''}`} action="Answered" object={block.data.question} detail={block.data.options.map((o, j) => `${j === block.data.selectedIndex ? '● ' : '○ '}${o.label} — ${o.description}`).join('\n')} />;
          case 'completion':
            return <FinishedIndicator key={idx} durationSec={block.data.durationSec} tokenCount={block.data.tokenCount} />;
          case 'plan':
            if (!block.data.accepted) return null;
            return <InlineResult key={block.data.id} summary={`Approved plan: ${block.data.title}`} action="Plan" object={block.data.title} detail={block.data.steps.map((s, j) => `${j + 1}. ${s}`).join('\n')} />;
          case 'artifact':
            return <ArtifactPreview key={block.data.id} data={block.data} onRelease={onRelease} />;
          default:
            return null;
        }
      })}
      {hasCompletion && <ReactionBar />}
    </div>
  );
}
