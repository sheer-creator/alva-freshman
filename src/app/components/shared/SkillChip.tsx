/**
 * [INPUT]: Figma 7887:112461(Skills Tag)
 * [OUTPUT]: 通用 skill pill — h38 / px16 py8 / gap8 / 全圆角;active = 黑 0.7 底 + 白字白 icon
 * [POS]: NewChat 首页 hero 与 AgentNewSession 共用(demo 为自包含保留本地副本)
 */

import { forwardRef } from 'react';
import { CdnIcon } from './CdnIcon';

export interface SkillChipProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** CDN icon 名(平台 skill),active 时自动转白;与 avatar 二选一 */
  icon?: string;
  /** 22px 头像节点(KOL skill) */
  avatar?: React.ReactNode;
  label: string;
  active?: boolean;
  trailing?: React.ReactNode;
}

export const SkillChip = forwardRef<HTMLButtonElement, SkillChipProps>(function SkillChip(
  { icon, avatar, label, active, trailing, className, style, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={`flex h-[38px] cursor-pointer items-center gap-[8px] rounded-full px-[16px] py-[8px] ${className ?? ''}`}
      style={{
        fontFamily: "'Delight', sans-serif",
        fontSize: 14,
        fontWeight: 400,
        lineHeight: '22px',
        letterSpacing: 0.14,
        whiteSpace: 'nowrap',
        userSelect: 'none',
        border: active ? '0.5px solid rgba(0,0,0,0.7)' : '0.5px solid var(--line-l2, rgba(0,0,0,0.2))',
        background: active ? 'rgba(0,0,0,0.7)' : '#fff',
        color: active ? 'rgba(255,255,255,0.9)' : 'var(--text-n9, rgba(0,0,0,0.9))',
        transition: 'box-shadow 160ms ease, transform 160ms ease, background-color 120ms ease, color 120ms ease, border-color 120ms ease',
        ...style,
      }}
      {...rest}
    >
      {icon && <CdnIcon name={icon} size={18} color={active ? '#fff' : 'var(--text-n9, rgba(0,0,0,0.9))'} />}
      {avatar}
      <span>{label}</span>
      {trailing}
    </button>
  );
});
