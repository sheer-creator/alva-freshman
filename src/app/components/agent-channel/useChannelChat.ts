/**
 * [INPUT]: channel-chat-store 的全局状态与 actions
 * [OUTPUT]: useChannelChat — 绑定 onActivity 的频道聊天 hook（频道页与 Ask 面板共用）
 * [POS]: agent-channel — store 之上的薄绑定层；状态本体在 channel-chat-store
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import { useCallback } from 'react';
import * as store from './channel-chat-store';
import type { PortfolioAuto, PortfolioHolding, Reply, Skill, SubpushItem } from '@/data/agent-channel/types';

export type { TaskReply } from './channel-chat-store';

interface UseChannelChatOpts {
  /** 每次用户发起新交互时回调（频道页用来切回 chat tab） */
  onActivity?: () => void;
}

export function useChannelChat({ onActivity }: UseChannelChatOpts = {}) {
  const { extra, tasks, taskThreads, autos } = store.useChannelChatStore();

  const respond = useCallback((text: string, reply: Reply) => store.respond(text, reply, onActivity), [onActivity]);
  const onPrompt = useCallback((text: string) => store.onPrompt(text, onActivity), [onActivity]);
  const onStartTask = useCallback((skill: Skill, textOverride?: string) => store.onStartTask(skill, textOverride, onActivity), [onActivity]);
  const onSubscribed = useCallback((skill: Skill, item: SubpushItem) => store.onSubscribed(skill, item, onActivity), [onActivity]);
  const onDigestAutomation = useCallback((count: number) => store.onDigestAutomation(count, onActivity), [onActivity]);
  const onPortfolioSetup = useCallback((tickers: string[], pAutos: PortfolioAuto[], hasBroker: boolean, holdings: PortfolioHolding[]) => store.onPortfolioSetup(tickers, pAutos, hasBroker, holdings, onActivity), [onActivity]);

  return {
    extra, tasks, taskThreads, autos,
    respond, onPrompt, onStartTask, onSubscribed, onDigestAutomation, onPortfolioSetup,
    connectIm: store.connectIm,
    disconnectIm: store.disconnectIm,
    clearExtra: store.clearExtra,
    sendToTask: store.sendToTask,
    saveAuto: store.saveAuto,
    toggleAuto: store.toggleAuto,
  };
}
