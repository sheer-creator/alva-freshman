/**
 * [INPUT]: New Channel modal 创建的频道
 * [OUTPUT]: 跨组件共享的 channel store —— Sidebar 渲染频道列表 + AgentDesign 读当前频道
 * [POS]: 全局单例（模块级），Sidebar 在每个页面都渲染，故用 useSyncExternalStore 而非页级 state
 */

import { useSyncExternalStore } from 'react';

export interface Channel {
  id: string;
  name: string;
  description?: string;
}

/** 预置演示频道（Figma 10998:50677 alva-to-the-moon）— 聊天区/tab 计数在 AgentNewSession 按 seeded 分支渲染 */
export const SEED_CHANNEL_ID = 'ch-alva-to-the-moon';

let channels: Channel[] = [
  {
    id: SEED_CHANNEL_ID,
    name: 'alva-to-the-moon',
    description: 'Your AI investing agent. Ask me to research markets, build live Playbooks, or set up automations that watch the market for you.',
  },
];
let currentId: string | null = null; // null = 默认 Alva Agent
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export const channelsStore = {
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  getChannels: () => channels,
  getCurrentId: () => currentId,
  /** 新建频道并设为当前；description 去空白后为空则不存 */
  add(name: string, description?: string): string {
    const id = `ch-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`;
    const desc = description?.trim();
    channels = [...channels, { id, name: name.trim(), description: desc || undefined }];
    currentId = id;
    emit();
    return id;
  },
  setCurrent(id: string | null) {
    if (currentId === id) return;
    currentId = id;
    emit();
  },
  /** 更新频道描述（Edit Channel 弹窗）；去空白后为空则清掉 */
  updateDescription(id: string, description: string) {
    const desc = description.trim();
    channels = channels.map((c) => (c.id === id ? { ...c, description: desc || undefined } : c));
    emit();
  },
  /** 名称是否已存在（用于 modal 校验，忽略大小写与首尾空白） */
  nameExists(name: string): boolean {
    const n = name.trim().toLowerCase();
    return channels.some((c) => c.name.toLowerCase() === n);
  },
};

export function useChannels(): { channels: Channel[]; currentId: string | null; current: Channel | null } {
  const list = useSyncExternalStore(channelsStore.subscribe, channelsStore.getChannels);
  const id = useSyncExternalStore(channelsStore.subscribe, channelsStore.getCurrentId);
  return { channels: list, currentId: id, current: id ? list.find((c) => c.id === id) ?? null : null };
}
