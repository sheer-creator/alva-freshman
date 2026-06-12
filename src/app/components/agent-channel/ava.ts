/**
 * [INPUT]: 无
 * [OUTPUT]: avaColor / initials — 确定性头像配色与双字母缩写
 * [POS]: agent-channel — digest 行、tweet、EntityPicker 等类名定制头像共用（源自 demo planc 1113-1122 行）
 *        （普通头像位请直接用 shared/Avatar；此工具只服务带 CSS 类样式的 span 头像）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

const AVA_COLORS = ['#49A3A6', '#5777c8', '#d97a3a', '#2d8f61', '#b8862f', '#9a6cc7', '#d85f6c'];

export function avaColor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AVA_COLORS[h % AVA_COLORS.length];
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
}
