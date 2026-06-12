/**
 * [INPUT]: 无
 * [OUTPUT]: ChannelIcon 组件 — demo 自带的 Alva 线性图标集（~1.6 描边 / 18px）
 * [POS]: agent-channel 组件层的图标根（源自 demo planc 1056-1110 行；CdnIcon 名称体系对不上，故独立）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import type { ReactNode } from 'react';

/* ========== 图标路径表 ========== */

const ICONS: Record<string, ReactNode> = {
  compass: <><circle cx="12" cy="12" r="9" /><path d="m15.2 8.8-2.1 5.1-5.1 2.1 2.1-5.1 5.1-2.1Z" /></>,
  agent: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 9h.01M12 9h.01M16 9h.01M8 14h8" /></>,
  portfolio: <><rect x="4" y="6" width="16" height="15" rx="2" /><path d="M8 6V4h8v2M8 11h.01M17 11h.01" /></>,
  skill: <><path d="M6 5h13v13H6z" /><path d="M9 15 15 9M16 5h3v3" /></>,
  coin: <><circle cx="12" cy="11" r="8" /><path d="M12 6v10M15 8.5c-.6-.7-1.5-1-2.8-1-1.4 0-2.4.7-2.4 1.8 0 1.2 1 1.7 2.8 2 1.8.3 2.7.8 2.7 2 0 1.1-1 1.8-2.7 1.8-1.4 0-2.5-.4-3.2-1.2" /></>,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /></>,
  chat: <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6A2.5 2.5 0 0 1 16.5 15H10l-5 4v-5.5A2.5 2.5 0 0 1 5 12.8V6.5Z" />,
  more: <path d="M6 12h.01M12 12h.01M18 12h.01" />,
  layout: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 4v16M4 9h5" /></>,
  bulb: <><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.5 10.9c.5.4.5.9.5 1.6h6c0-.7 0-1.2.5-1.6A6 6 0 0 0 12 3Z" /></>,
  screener: <><circle cx="11" cy="11" r="6" /><path d="m20 20-3.5-3.5M9 11h4M11 9v4" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4-4" /></>,
  remix: <><path d="M4 7h11l-2.5-2.5M20 17H9l2.5 2.5" /></>,
  history: <><path d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4" /><path d="M12 8v4l3 2" /></>,
  credit: <><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18M7 14h4" /></>,
  enter: <><path d="M9 10l-4 4 4 4" /><path d="M5 14h10a4 4 0 0 0 4-4V6" /></>,
  at: <><circle cx="12" cy="12" r="4" /><path d="M16 12v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-3.5 7.1" /></>,
  paperclip: <path d="M21 11.5 12.5 20a5 5 0 0 1-7-7l8-8a3.3 3.3 0 0 1 4.7 4.7l-8 8a1.7 1.7 0 0 1-2.4-2.4l7.3-7.3" />,
  arrowup: <path d="M12 19V5M6 11l6-6 6 6" />,
  chevdown: <path d="m6 9 6 6 6-6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  whatsapp: <><path d="M12 4a8 8 0 0 0-6.9 12L4 20l4.2-1.1A8 8 0 1 0 12 4Z" /><path d="M9.5 9c.2 3 2.5 5.3 5.5 5.5" /></>,
  slack: <><path d="M9.2 4.8v5.4M14.8 19.2v-5.4M4.8 14.8h5.4M19.2 9.2h-5.4" /><path d="M9.2 4.8a1.8 1.8 0 1 0-1.8 1.8M14.8 19.2a1.8 1.8 0 1 0 1.8-1.8M4.8 14.8a1.8 1.8 0 1 0 1.8 1.8M19.2 9.2a1.8 1.8 0 1 0-1.8-1.8" /></>,
  link: <><path d="M10 14a4 4 0 0 0 6 .4l3-3a4 4 0 0 0-5.7-5.7l-1.6 1.6" /><path d="M14 10a4 4 0 0 0-6-.4l-3 3a4 4 0 0 0 5.7 5.7l1.6-1.6" /></>,
  sliders: <><path d="M5 8h14M5 16h14" /><circle cx="10" cy="8" r="2.2" /><circle cx="15" cy="16" r="2.2" /></>,
  star: <path d="m12 3 2.5 5.6L20 9.3l-4 4 1 5.7-5-2.8-5 2.8 1-5.7-4-4 5.5-.7L12 3Z" />,
  flame: <path d="M12 3c1 3-1.5 4-1.5 6.5A2.5 2.5 0 0 0 13 12c0-1 .8-1.8 1-2 1.5 1.5 2.5 3 2.5 5a4.5 4.5 0 0 1-9 0c0-3 3-4.5 4.5-12Z" />,
  trend: <><path d="M4 16l5-5 3 3 7-7" /><path d="M16 7h4v4" /></>,
  pulse: <path d="M3 12h4l2-6 4 12 2-6h6" />,
  spark: <path d="M12 4v4M12 16v4M4 12h4M16 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8" />,
  layers: <><path d="M12 3 3 8l9 5 9-5-9-5Z" /><path d="m3 12.5 9 5 9-5M3 16.5l9 5 9-5" /></>,
  file: <><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4" /></>,
  folder: <path d="M4 7a2 2 0 0 1 2-2h3l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z" />,
  play: <path d="M8 5.5v13l11-6.5-11-6.5Z" />,
  pause: <path d="M8 5v14M16 5v14" />,
  check: <path d="M5 12.5 10 17l9-10" />,
  clock: <><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></>,
  edit: <><path d="M5 19h4L19 9l-4-4L5 15v4Z" /><path d="m14 6 4 4" /></>,
  alert: <><circle cx="12" cy="12" r="8" /><path d="M12 8v4M12 16h.01" /></>,
  tasks: <><path d="M5 7h14M5 12h14M5 17h9" /><circle cx="18.5" cy="17" r="1.6" /></>,
  automation: <><path d="M12 3v3M12 18v3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M3 12h3M18 12h3M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /><circle cx="12" cy="12" r="3.2" /></>,
  send2: <><path d="M5 12h13M13 6l6 6-6 6" /></>,
  hash: <><path d="M9 4 7 20M17 4l-2 16M5 9h15M4 15h15" /></>,
  telegram: <><path d="M20 5 4 11.5l6 2.1L12.2 19l3.2-4.4 4.6-9.6Z" /><path d="m10 13.6 5.6-5.1" /></>,
  discord: <><path d="M8.2 8.2c1.2-.5 2.5-.7 3.8-.7s2.6.2 3.8.7l1.4 2.4c.7 1.3 1 2.8.9 4.3-1.5 1.1-3 1.8-4.6 2l-.8-1.5" /><path d="M6.8 10.6c-.7 1.3-1 2.8-.9 4.3 1.5 1.1 3 1.8 4.6 2l.8-1.5" /><path d="M9.5 13h.01M14.5 13h.01" /></>,
};

/* ========== 组件 ========== */

export function ChannelIcon({ name, size = 18 }: { name: string; size?: number }) {
  const p = ICONS[name];
  if (!p) return null;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {p}
    </svg>
  );
}
