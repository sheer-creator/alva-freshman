import { useState, useMemo } from 'react';
import { Avatar } from './Avatar';
import { CdnIcon } from './CdnIcon';
import { PlaybookCover } from '@/lib/playbook-cover/PlaybookCover';
import { PlaybookTags, buildTags } from '@/lib/playbook-cover/PlaybookTags';
import { generateCover } from '@/lib/playbook-cover/cover-gen';
import { hslToRgb, rgbToCss } from '@/lib/playbook-cover/color';
import type { CoverInput } from '@/lib/playbook-cover/types';

export interface ExplorePlaybook {
  id: string;
  creator: string;
  title: string;
  description: string;
  tickers: string[];
  pulse: 'active' | 'idle';
  stars: number;
  remixes: number;
  annualizedReturn?: string;
  cover: CoverInput;
}

export function PlaybookCard({
  p,
  staggerMs = 0,
  simple = false,
}: {
  p: ExplorePlaybook;
  staggerMs?: number;
  /**
   * Minimal variant — placeholder gradient cover, no tags row, normal-weight
   * Delight title. Used on the Agent empty state so the card list reads as
   * a quiet preview rather than competing with the hero/CTA above.
   */
  simple?: boolean;
}) {
  const tags = buildTags({
    template: p.cover.template,
    domain: p.cover.domain,
    tickers: p.tickers,
  });

  const [hovered, setHovered] = useState(false);

  const cover = useMemo(() => generateCover(p.cover), [p.cover]);
  const shadowColor = useMemo(() => {
    const { H, S } = cover.bg.hsl;
    return rgbToCss(hslToRgb(H, Math.min(S + 0.10, 0.40), 0.30), 0.14);
  }, [cover]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer"
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        background: 'var(--b0-page, #fff)',
        border: '0.5px solid rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? `0 4px 12px -2px ${shadowColor}` : '0 0 0 0 transparent',
        transition: hovered
          ? 'transform 130ms cubic-bezier(0.2, 0, 0, 1), box-shadow 130ms cubic-bezier(0.2, 0, 0, 1)'
          : 'none',
      }}
    >
      {/* Cover */}
      <div
        style={{
          margin: '4px 4px 0 4px',
          width: 'calc(100% - 8px)',
          aspectRatio: simple ? '472 / 265.5' : '320 / 140',
          borderRadius: 8,
          overflow: 'hidden',
          background: simple
            ? 'linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%)'
            : undefined,
          backgroundImage: simple
            ? 'radial-gradient(circle, rgba(0,0,0,0.06) 0.6px, transparent 0.6px)'
            : undefined,
          backgroundSize: simple ? '3px 3px' : undefined,
        }}
      >
        {!simple && <PlaybookCover input={p.cover} staggerMs={staggerMs} />}
      </div>

      {/* Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '16px 16px 12px' }}>
        {!simple && <PlaybookTags tags={tags} />}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <p
            style={{
              fontSize: 16,
              lineHeight: simple ? '26px' : '22px',
              fontWeight: simple ? 400 : 600,
              fontFamily: simple ? "'Delight', sans-serif" : 'Inter, sans-serif',
              color: 'var(--text-n9, rgba(0,0,0,0.9))',
              letterSpacing: 0.16,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              margin: 0,
            }}
          >
            {p.title}
          </p>
          <p
            style={{
              fontSize: 12,
              lineHeight: '20px',
              color: 'var(--text-n5, rgba(0,0,0,0.5))',
              letterSpacing: 0.12,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {p.description}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 6, height: 22 }}>
            <Avatar name={p.creator} size={22} />
            <span
              style={{
                fontSize: 14,
                lineHeight: '22px',
                color: 'var(--text-n9, rgba(0,0,0,0.9))',
                letterSpacing: 0.14,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {p.creator}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, lineHeight: '22px', letterSpacing: 0.14 }}>
              <CdnIcon name="star-l" size={16} />
              {p.stars}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, lineHeight: '22px', letterSpacing: 0.14 }}>
              <CdnIcon name="remix-l" size={16} />
              {p.remixes}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
