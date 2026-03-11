/**
 * [INPUT]: author / description / builtOn 数据
 * [OUTPUT]: Playbook 头部卡片 — Creator + Description + Built on
 * [POS]: 社区组件 — PlaybookTopbar 左侧 hover 下拉内容
 */

import { AVATAR_COLOR_PALETTE } from '@/lib/chart-theme';
import { PulseIndicator } from './PulseIndicator';

/* ========== 头像 ========== */

function UserAvatar({ name, size = 24 }: { name: string; size?: number }) {
  const initial = name.trim().charAt(0).toUpperCase();
  const color = AVATAR_COLOR_PALETTE[[...name].reduce((s, c) => s + c.charCodeAt(0), 0) % AVATAR_COLOR_PALETTE.length];
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: size * 0.44, color: '#fff', lineHeight: 1, fontFamily: "'Delight', sans-serif" }}>{initial}</span>
    </div>
  );
}

/* ========== Props ========== */

export interface PlaybookHeaderProps {
  author: { name: string; bio: string; totalStars: number; publishedBy?: string };
  pulse: 'active' | 'idle';
  description: string;
  builtOn: { name: string; author: string }[];
  onAuthorClick?: () => void;
}

/* ========== 组件 ========== */

export function PlaybookHeader({ author, pulse, description, builtOn, onAuthorClick }: PlaybookHeaderProps) {
  return (
    <div style={{ background: 'var(--grey-g01)', borderRadius: 6, padding: 20 }}>
      {/* Creator */}
      <div className="flex items-center gap-[12px]">
        <UserAvatar name={author.name} size={32} />
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-[6px]">
            <span
              className="text-[14px] font-medium"
              style={{ color: 'var(--text-n9)', cursor: onAuthorClick ? 'pointer' : undefined }}
              onClick={onAuthorClick}
            >{author.name}</span>
            <PulseIndicator status={pulse} />
            <span className="text-[12px]" style={{ color: 'var(--text-n5)', fontFamily: "'Delight', sans-serif" }}>&#9733; {author.totalStars}</span>
            {author.publishedBy && (
              <>
                <span className="text-[12px]" style={{ color: 'var(--text-n3)' }}>&middot;</span>
                <span className="text-[12px]" style={{ color: 'var(--text-n5)' }}>via {author.publishedBy}</span>
              </>
            )}
          </div>
          <span className="text-[12px]" style={{ color: 'var(--text-n5)' }}>{author.bio}</span>
        </div>
      </div>

      {/* Description */}
      <p className="mt-[12px] text-[14px] leading-[22px]" style={{ color: 'var(--text-n7)' }}>{description}</p>

      {/* Built on */}
      <div className="flex flex-wrap items-center gap-[8px] mt-[12px]">
        <span className="text-[12px]" style={{ color: 'var(--text-n5)' }}>Built on:</span>
        {builtOn.map(dep => (
          <span
            key={dep.name}
            className="flex items-center gap-[4px]"
            style={{ padding: '2px 8px', borderRadius: 4, border: '1px dashed var(--line-l12)', fontSize: 12, color: 'var(--text-n7)' }}
          >
            <UserAvatar name={dep.author} size={14} />
            @{dep.author}/{dep.name}
          </span>
        ))}
      </div>
    </div>
  );
}
