/**
 * [INPUT]: Conversation
 * [OUTPUT]: 可暂停/恢复的流式模拟 — 遇到 plan/question 暂停等用户操作
 * [POS]: alva-chat — 流式渲染编排器
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import type { Conversation, ConversationTurn, AgentTurnData, MessageBlock } from '@/data/alva-chat-mock';
import { getShouldStream, setShouldStream } from '@/data/alva-chat-mock';

/* ========== 常量 ========== */

const TURN_DELAY = 500;
const CHAR_DELAY = 12;
const TOOL_RUNNING_MS = 1500;
const THINKING_BEFORE_AGENT = 3500;

/* ========== 状态 ========== */

interface StreamState {
  visibleTurns: ConversationTurn[];
  isStreaming: boolean;
  showThinking: boolean;
  activeToolId: string | null;
  waitingForUser: boolean;
  waitingBlockType: 'plan' | 'question' | null;
}

/* ========== 截断 turns ========== */

function sliceTurns(
  allTurns: ConversationTurn[],
  turnCount: number,
  blockIdx: number | null,
  charLen: number,
): ConversationTurn[] {
  const result: ConversationTurn[] = [];
  for (let t = 0; t < turnCount && t < allTurns.length; t++) {
    const turn = allTurns[t];
    if (t < turnCount - 1 || blockIdx === null) { result.push(turn); continue; }
    if (turn.role === 'user') { result.push(turn); continue; }
    const agentTurn = turn as AgentTurnData;
    const blocks: MessageBlock[] = [];
    for (let b = 0; b <= blockIdx && b < agentTurn.blocks.length; b++) {
      const block = agentTurn.blocks[b];
      if (b < blockIdx) { blocks.push(block); continue; }
      if (block.type === 'text') {
        blocks.push({ type: 'text', content: block.content.slice(0, charLen) });
      } else if (block.type === 'tool_call') {
        blocks.push({
          type: 'tool_call',
          data: { ...block.data, status: charLen < 1 ? 'running' : block.data.status, result: charLen < 1 ? undefined : block.data.result },
        });
      } else if (block.type === 'plan') {
        /* 流式中 plan 先显示为 未接受 */
        blocks.push({ type: 'plan', data: { ...block.data, accepted: charLen >= 1 ? block.data.accepted : false } });
      } else if (block.type === 'question') {
        /* 流式中 question 先显示为 未选择 */
        blocks.push({ type: 'question', data: { ...block.data, selectedIndex: charLen >= 1 ? block.data.selectedIndex : undefined } });
      } else {
        blocks.push(block);
      }
    }
    result.push({ ...agentTurn, blocks });
  }
  return result;
}

/* ========== 判断 block 是否需要暂停等用户 ========== */

function isUserActionBlock(block: MessageBlock): boolean {
  return block.type === 'plan' || block.type === 'question';
}

/* ========== Hook ========== */

export function useStreamSimulator(conversation: Conversation) {
  const [state, setState] = useState<StreamState>({
    visibleTurns: [],
    isStreaming: true,
    showThinking: true,
    activeToolId: null,
    waitingForUser: false, waitingBlockType: null,
  });

  const cancelRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const lastConvIdRef = useRef<string | null>(null);
  /* 恢复点：记录暂停时 streaming 到的位置 */
  const pausedAtRef = useRef<{ turnIdx: number; blockIdx: number } | null>(null);

  const cleanup = useCallback(() => {
    cancelRef.current = true;
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];
  }, []);

  /* 从指定位置开始 streaming blocks */
  const streamFrom = useCallback((startTurnIdx: number, startBlockIdx: number) => {
    cleanup();
    cancelRef.current = false;

    const turns = conversation.turns;
    let delay = 0;

    const schedule = (fn: () => void, ms: number) => {
      delay += ms;
      const t = setTimeout(() => { if (!cancelRef.current) fn(); }, delay);
      timerRef.current.push(t);
    };

    setState(s => ({ ...s, isStreaming: true, showThinking: false, waitingForUser: false }));

    for (let tIdx = startTurnIdx; tIdx < turns.length; tIdx++) {
      const turn = turns[tIdx];

      if (turn.role === 'user') {
        schedule(() => {
          setState(s => ({ ...s, visibleTurns: sliceTurns(turns, tIdx + 1, null, 0), showThinking: true }));
        }, TURN_DELAY);
        continue;
      }

      const agentTurn = turn as AgentTurnData;
      const bStart = tIdx === startTurnIdx ? startBlockIdx : 0;

      if (bStart === 0) {
        schedule(() => { setState(s => ({ ...s, showThinking: true })); }, THINKING_BEFORE_AGENT);
      }

      for (let bIdx = bStart; bIdx < agentTurn.blocks.length; bIdx++) {
        const block = agentTurn.blocks[bIdx];

        /* ===== 暂停点：plan / question ===== */
        if (isUserActionBlock(block)) {
          /* 先展示该 block（未确认态） */
          schedule(() => {
            pausedAtRef.current = { turnIdx: tIdx, blockIdx: bIdx + 1 };
            setState(s => ({
              ...s,
              visibleTurns: sliceTurns(turns, tIdx + 1, bIdx, 0),
              showThinking: false,
              activeToolId: null,
              waitingForUser: true,
              waitingBlockType: block.type as 'plan' | 'question',
              isStreaming: true,
            }));
          }, 400);
          /* 停止 scheduling 后续 blocks — 等 resume */
          return;
        }

        if (block.type === 'text') {
          /* text 流入时不需要 thinking */
          const len = block.content.length;
          for (let c = 0; c <= len; c += 3) {
            const charPos = Math.min(c, len);
            schedule(() => {
              setState(s => ({ ...s, visibleTurns: sliceTurns(turns, tIdx + 1, bIdx, charPos), showThinking: false }));
            }, c === 0 ? 80 : CHAR_DELAY);
          }
          schedule(() => {}, 150);
        } else if (block.type === 'tool_call') {
          const toolId = block.data.id;
          /* 显示 tool running 态 + thinking 伴随 */
          schedule(() => {
            setState(s => ({
              ...s,
              visibleTurns: sliceTurns(turns, tIdx + 1, bIdx, 0),
              showThinking: true,
              activeToolId: toolId,
            }));
          }, 200);
          /* tool 执行完成 — thinking 消失 */
          const runTime = block.data.durationMs
            ? Math.min(block.data.durationMs * 0.8, 4000)
            : TOOL_RUNNING_MS;
          schedule(() => {
            setState(s => ({
              ...s,
              visibleTurns: sliceTurns(turns, tIdx + 1, bIdx, 1),
              showThinking: false,
              activeToolId: toolId,
            }));
          }, runTime);
        } else if (block.type === 'todo_update') {
          schedule(() => {
            setState(s => ({ ...s, visibleTurns: sliceTurns(turns, tIdx + 1, bIdx, 1) }));
          }, 50);
        } else if (block.type === 'artifact') {
          schedule(() => {
            setState(s => ({ ...s, visibleTurns: sliceTurns(turns, tIdx + 1, bIdx, 1), showThinking: false, activeToolId: null }));
          }, 400);
        } else if (block.type === 'completion') {
          schedule(() => {
            setState(s => ({ ...s, visibleTurns: sliceTurns(turns, tIdx + 1, bIdx, 1), showThinking: false }));
          }, 500);
        } else {
          schedule(() => {
            setState(s => ({ ...s, visibleTurns: sliceTurns(turns, tIdx + 1, bIdx, 1), showThinking: false }));
          }, 300);
        }
      }
    }

    /* 全部完成 */
    schedule(() => {
      setState(s => ({ ...s, visibleTurns: turns, isStreaming: false, showThinking: false, activeToolId: null, waitingForUser: false }));
    }, 300);
  }, [conversation, cleanup]);

  /* 初始触发 */
  const triggerStream = useCallback(() => {
    pausedAtRef.current = null;
    setState({ visibleTurns: [], isStreaming: true, showThinking: true, activeToolId: null, waitingForUser: false, waitingBlockType: null });
    /* 延迟一帧让 setState 生效 */
    setTimeout(() => streamFrom(0, 0), 50);
  }, [streamFrom]);

  /* 用户操作后恢复流式 */
  const resumeStream = useCallback(() => {
    const pos = pausedAtRef.current;
    if (!pos) return;
    pausedAtRef.current = null;
    /* 先把当前暂停的 block 更新为"已确认"态 */
    const turns = conversation.turns;
    setState(s => ({
      ...s,
      visibleTurns: sliceTurns(turns, pos.turnIdx + 1, pos.blockIdx - 1, 1),
      waitingForUser: false, waitingBlockType: null,
      showThinking: true,
    }));
    setTimeout(() => streamFrom(pos.turnIdx, pos.blockIdx), 400);
  }, [conversation, streamFrom]);

  /* 自动触发 */
  useEffect(() => {
    if (lastConvIdRef.current !== conversation.id) {
      lastConvIdRef.current = conversation.id;
      if (getShouldStream()) {
        setShouldStream(false);
        triggerStream();
      } else {
        setState({
          visibleTurns: conversation.turns,
          isStreaming: false,
          showThinking: false,
          activeToolId: null,
          waitingForUser: false, waitingBlockType: null,
        });
      }
    }
    return cleanup;
  }, [conversation.id, triggerStream, cleanup]);

  return { ...state, triggerStream, resumeStream };
}
