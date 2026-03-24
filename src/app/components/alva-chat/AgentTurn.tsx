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
import { QuestionCard } from './QuestionCard';
import { PlanCard } from './PlanCard';
import { ArtifactPreview } from './ArtifactPreview';

/* ========== Finished ========== */

function FinishedIndicator({ durationSec, tokenCount }: { durationSec: number; tokenCount: number }) {
  return (
    <div style={{ padding: '8px 0 4px', display: 'flex', alignItems: 'center', gap: 6 }}>
      <svg width="16" height="16" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="#49A3A6" />
      </svg>
      <span style={{ fontSize: 14, fontWeight: 600, color: '#49A3A6', fontFamily: "'Delight', sans-serif" }}>
        Finished
      </span>
      <span style={{ fontSize: 12, color: 'var(--text-n5)', marginLeft: 8, fontFamily: "'JetBrains Mono', monospace" }}>
        {durationSec.toFixed(1)}s &middot; {tokenCount.toLocaleString()} tok
      </span>
    </div>
  );
}

/* ========== Reaction Bar ========== */

function ReactionBar() {
  return (
    <div style={{ display: 'flex', gap: 4, padding: '8px 0 4px' }}>
      {[
        'M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z',
        'M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z',
        'M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z',
        'M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z',
      ].map((d, i) => (
        <button key={i} style={{
          width: 28, height: 28, borderRadius: 6, border: 'none',
          background: 'transparent', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.15s',
        }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.05)')}
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

function ToolCallGroup({ tools, activeToolId }: { tools: ToolCallData[]; activeToolId?: string | null }) {
  const hasActive = tools.some(t => t.id === activeToolId);
  const [expanded, setExpanded] = useState(hasActive);

  /* auto-expand when active tool enters the group */
  if (hasActive && !expanded) setExpanded(true);

  const summary = tools.find(t => t.groupLabel)?.groupLabel ?? generateGroupSummary(tools);

  return (
    <div style={{ margin: '4px 0' }}>
      {/* Group header */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '5px 0', cursor: 'pointer', userSelect: 'none',
        }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" style={{
          flexShrink: 0, transition: 'transform 0.15s',
          transform: expanded ? 'rotate(90deg)' : 'rotate(0)',
        }}>
          <path d="M3 1.5L7 5L3 8.5" stroke="var(--text-n5)" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        </svg>
        <span style={{
          fontSize: 13, color: 'var(--text-n9)',
          fontFamily: "'Delight', sans-serif",
        }}>
          {summary}
        </span>
      </div>

      {/* Child tools with tree line */}
      {expanded && (
        <div style={{ marginLeft: 5, paddingLeft: 14, borderLeft: '1.5px solid rgba(0,0,0,0.08)' }}>
          {tools.map(t => (
            <ToolCallBlock key={t.id} data={t} isActive={t.id === activeToolId} />
          ))}
        </div>
      )}
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
            return <QuestionCard key={block.data.id} data={block.data} onAnswer={onUserAction ? () => onUserAction() : undefined} />;
          case 'completion':
            return <FinishedIndicator key={idx} durationSec={block.data.durationSec} tokenCount={block.data.tokenCount} />;
          case 'plan':
            if (!block.data.accepted) return null;
            return <PlanCard key={block.data.id} data={block.data} />;
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
