/**
 * [INPUT]: open / anchorRect / selected / onToggle / onClose / skills?
 * [OUTPUT]: 多选 skill popover — list 行（More dropdown 同款样式）+ hover 行右侧浮 SkillInfoCard
 * [POS]: 方案 A (toolbar 图标触发) 与 方案 B (chip 行 + Skill 按钮触发) 共享
 */

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Avatar } from './Avatar';
import { CdnIcon } from './CdnIcon';
import {
  SKILL_LIBRARY,
  groupSkills,
  CATEGORY_LABELS,
  type SkillEntry,
  type SkillCategory,
} from '@/data/skill-library';

/* ============================ helpers ============================ */

function fnv1a(seed: string): number {
  let x = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    x ^= seed.charCodeAt(i);
    x = Math.imul(x, 0x01000193);
  }
  return x >>> 0;
}

function relativeTimeForSkill(skill: SkillEntry): string {
  if (skill.updatedAt) return skill.updatedAt;
  const h = fnv1a(skill.id);
  const minutes = h % 7200;
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (minutes < 24 * 60) return `${Math.floor(minutes / 60)}h ago`;
  return `${Math.floor(minutes / (24 * 60))}d ago`;
}

const TAG_POOL = [
  'Filings', 'Insider Cluster', 'Event Drift', 'Earnings Drift', 'Whisper Numbers',
  'Macro Flow', 'FX Cross', 'Rates Curve', 'Credit Spread', 'Sentiment',
  'Theme Tracker', 'Catalyst', 'Risk Off', 'Backtest', 'Yield Curve',
  'Dividend', 'On-Chain', 'ETF Flow', 'MAG7', 'AI Capex',
];

function tagsForSkill(skill: SkillEntry): string[] {
  if (skill.tags && skill.tags.length) return skill.tags;
  const h = fnv1a(skill.id);
  const count = ((h >>> 12) % 2) + 2;
  const used = new Set<number>();
  const picks: string[] = [];
  for (let i = 0; picks.length < count && i < 32; i++) {
    const stretch = fnv1a(`${skill.id}|tag|${i}`);
    const idx = stretch % TAG_POOL.length;
    if (used.has(idx)) continue;
    used.add(idx);
    picks.push(TAG_POOL[idx]);
  }
  return picks;
}

const SOCIAL_DEFS = {
  discord: { label: 'Discord', src: `${import.meta.env.BASE_URL}logo-social-discord.svg` },
  telegram: { label: 'Telegram', src: `${import.meta.env.BASE_URL}logo-social-telegram.svg` },
  x: { label: 'X', src: null },
  instagram: { label: 'Instagram', src: null },
} as const;
type SocialKey = keyof typeof SOCIAL_DEFS;

const ALVA_SOCIALS: SocialKey[] = ['discord', 'telegram', 'x'];
const NON_ALVA_POOL: SocialKey[] = ['x', 'telegram', 'discord', 'instagram'];

function socialsForCreator(creator: string): SocialKey[] {
  if (creator === 'Alva') return ALVA_SOCIALS;
  let h = fnv1a(creator);
  const seedScore = (k: string) => {
    let s = h;
    for (let i = 0; i < k.length; i++) {
      s ^= k.charCodeAt(i);
      s = Math.imul(s, 0x01000193) >>> 0;
    }
    return s;
  };
  const count = (h % 2) + 1;
  return [...NON_ALVA_POOL].sort((a, b) => seedScore(a) - seedScore(b)).slice(0, count);
}

function SocialIcon({ k }: { k: SocialKey }) {
  if (k === 'x') {
    return (
      <svg width={12} height={12} viewBox="0 0 24 24" fill="rgba(0,0,0,0.85)" style={{ display: 'block' }}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  if (k === 'instagram') {
    return (
      <svg width={13} height={13} viewBox="0 0 24 24" fill="rgba(0,0,0,0.85)" style={{ display: 'block' }}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    );
  }
  const src = SOCIAL_DEFS[k].src;
  if (!src) return null;
  return <img src={src} alt="" width={14} height={14} style={{ display: 'block' }} />;
}

/* ============================ Side info card ============================ */

const SIDE_CARD_WIDTH = 340;

function SkillInfoCardSide({
  skill,
  rowRect,
  popoverRect,
}: {
  skill: SkillEntry;
  rowRect: DOMRect;
  popoverRect: DOMRect;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [measuredHeight, setMeasuredHeight] = useState(280);

  useLayoutEffect(() => {
    if (cardRef.current) setMeasuredHeight(cardRef.current.offsetHeight);
  }, [skill.id]);

  // Default: card right of popover
  let left = popoverRect.right + 8;
  if (left + SIDE_CARD_WIDTH > window.innerWidth - 8) {
    left = Math.max(8, popoverRect.left - SIDE_CARD_WIDTH - 8);
  }
  let top = rowRect.top + rowRect.height / 2 - measuredHeight / 2;
  top = Math.max(8, Math.min(top, window.innerHeight - measuredHeight - 8));

  const socials = socialsForCreator(skill.creator);
  const tags = tagsForSkill(skill);

  return (
    <div
      ref={cardRef}
      style={{
        position: 'fixed',
        top,
        left,
        width: SIDE_CARD_WIDTH,
        zIndex: 1001,
        background: '#fff',
        borderRadius: 8,
        border: '0.5px solid var(--line-l2)',
        boxShadow: 'var(--shadow-s)',
        padding: 20,
        pointerEvents: 'none',
        fontFamily: "'Delight', sans-serif",
        animation: 'skill-pick-fadein 160ms ease-out',
      }}
    >
      <style>{`@keyframes skill-pick-fadein { from { opacity: 0; transform: translateX(-4px); } to { opacity: 1; transform: translateX(0); } }`}</style>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <h2 style={{ fontSize: 18, lineHeight: '24px', fontWeight: 400, color: 'var(--text-n9)', letterSpacing: 0.18, margin: 0 }}>
          {skill.name}
        </h2>
        <span style={{ fontSize: 11, lineHeight: '16px', color: 'rgba(0,0,0,0.4)', letterSpacing: 0.11 }}>
          {relativeTimeForSkill(skill)}
        </span>
      </div>
      <p style={{ fontSize: 13, lineHeight: '20px', color: 'var(--text-n7)', letterSpacing: 0.13, margin: '10px 0 0' }}>
        {skill.description}
      </p>
      {tags.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap', marginTop: 10 }}>
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{
                height: 20,
                padding: '0 6px',
                borderRadius: 5,
                background: 'var(--b-r05)',
                color: 'var(--text-n5)',
                fontSize: 11,
                lineHeight: '20px',
                letterSpacing: 0.11,
                whiteSpace: 'nowrap',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <div style={{ height: 1, background: 'var(--line-l07)', margin: '20px 0' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
          <Avatar name={skill.creator} size={36} />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 11, lineHeight: '14px', color: 'rgba(0,0,0,0.4)', letterSpacing: 0.11 }}>Created by</div>
            <div
              style={{
                fontSize: 14,
                lineHeight: '20px',
                color: 'var(--text-n9)',
                letterSpacing: 0.14,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {skill.creator}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
          {socials.map((k) => (
            <span
              key={k}
              aria-label={SOCIAL_DEFS[k].label}
              style={{
                width: 24,
                height: 24,
                borderRadius: '9999px',
                background: 'var(--b-r05)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <SocialIcon k={k} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================ Picker popover ============================ */

interface SkillPickerPopoverProps {
  open: boolean;
  anchorRect: DOMRect | null;
  placement?: 'top' | 'bottom';
  selected: Set<string>;
  onToggle: (skillId: string) => void;
  onClose: () => void;
  skills?: SkillEntry[];
}

const POPOVER_WIDTH = 340;
const POPOVER_MAX_HEIGHT = 460;
const SOFT_LIMIT = 5;

export function SkillPickerPopover({
  open,
  anchorRect,
  placement = 'top',
  selected,
  onToggle,
  onClose,
  skills = SKILL_LIBRARY,
}: SkillPickerPopoverProps) {
  const [query, setQuery] = useState('');
  const [hoverSkill, setHoverSkill] = useState<{ skill: SkillEntry; rect: DOMRect } | null>(null);
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (!popRef.current) return;
      if (popRef.current.contains(e.target as Node)) return;
      if (anchorRect) {
        const { clientX: x, clientY: y } = e;
        if (
          x >= anchorRect.left && x <= anchorRect.right &&
          y >= anchorRect.top && y <= anchorRect.bottom
        ) return;
      }
      onClose();
    }
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open, anchorRect, onClose]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setHoverSkill(null);
    }
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return skills;
    return skills.filter((s) =>
      s.name.toLowerCase().includes(q) ||
      s.creator.toLowerCase().includes(q) ||
      (s.description?.toLowerCase().includes(q) ?? false)
    );
  }, [skills, query]);

  const groups = useMemo(() => groupSkills(filtered), [filtered]);
  const selectedSkills = useMemo(
    () => skills.filter((s) => selected.has(s.id)),
    [skills, selected]
  );

  if (!open || !anchorRect) return null;

  const left = Math.max(8, Math.min(window.innerWidth - POPOVER_WIDTH - 8, anchorRect.left));
  let top: number;
  if (placement === 'top') {
    top = anchorRect.top - 8 - POPOVER_MAX_HEIGHT;
    if (top < 8) top = anchorRect.bottom + 8;
  } else {
    top = anchorRect.bottom + 8;
    if (top + POPOVER_MAX_HEIGHT > window.innerHeight - 8) {
      top = Math.max(8, anchorRect.top - 8 - POPOVER_MAX_HEIGHT);
    }
  }

  const popoverRect: DOMRect = new DOMRect(left, top, POPOVER_WIDTH, POPOVER_MAX_HEIGHT);
  const CATS: SkillCategory[] = ['alva', 'kol'];

  return (
    <>
      <div
        ref={popRef}
        style={{
          position: 'fixed',
          left,
          top,
          width: POPOVER_WIDTH,
          maxHeight: POPOVER_MAX_HEIGHT,
          background: '#fff',
          border: '0.5px solid var(--line-l2)',
          borderRadius: 8,
          boxShadow: 'var(--shadow-s)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          fontFamily: "'Delight', sans-serif",
        }}
        onMouseLeave={() => setHoverSkill(null)}
      >
        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 6 }}>
          {CATS.map((cat) => {
            const items = groups[cat];
            if (!items.length) return null;
            return (
              <Group
                key={cat}
                label={`${CATEGORY_LABELS[cat]} (${items.length})`}
                items={items}
                selected={selected}
                onToggle={onToggle}
                onHover={(s, r) => setHoverSkill({ skill: s, rect: r })}
                onLeaveRow={() => setHoverSkill(null)}
              />
            );
          })}
          {filtered.length === 0 && (
            <div
              style={{
                padding: '24px 16px',
                textAlign: 'center',
                fontSize: 13,
                color: 'var(--text-n5)',
              }}
            >
              No skills match “{query}”
            </div>
          )}
        </div>

        {/* Footer hint */}
        {selectedSkills.length >= SOFT_LIMIT && (
          <div
            style={{
              padding: '8px 12px',
              borderTop: '1px solid var(--line-l07)',
              fontSize: 11,
              lineHeight: '16px',
              color: 'var(--text-n5)',
              background: 'var(--b-r02)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <CdnIcon name="info-l1" size={12} color="var(--text-n5)" />
            Selecting more than {SOFT_LIMIT} skills may dilute focus.
          </div>
        )}
      </div>

      {hoverSkill && (
        <SkillInfoCardSide skill={hoverSkill.skill} rowRect={hoverSkill.rect} popoverRect={popoverRect} />
      )}
    </>
  );
}

interface GroupProps {
  label: string;
  items: SkillEntry[];
  selected: Set<string>;
  onToggle: (id: string) => void;
  onHover: (s: SkillEntry, rect: DOMRect) => void;
  onLeaveRow: () => void;
  sticky?: boolean;
}

function Group({ label, items, selected, onToggle, onHover, onLeaveRow, sticky }: GroupProps) {
  return (
    <div>
      <div
        style={{
          padding: '8px 8px 4px',
          fontSize: 11,
          lineHeight: '16px',
          letterSpacing: 0.55,
          textTransform: 'uppercase',
          color: 'var(--text-n5)',
          position: sticky ? 'sticky' : undefined,
          top: sticky ? -6 : undefined,
          background: sticky ? '#fff' : undefined,
          zIndex: sticky ? 1 : undefined,
          borderBottom: sticky ? '1px solid var(--line-l07)' : undefined,
          marginBottom: sticky ? 4 : 0,
        }}
      >
        {label}
      </div>
      {items.map((s) => (
        <Row
          key={s.id}
          skill={s}
          checked={selected.has(s.id)}
          onToggle={() => onToggle(s.id)}
          onHover={(rect) => onHover(s, rect)}
          onLeave={onLeaveRow}
        />
      ))}
    </div>
  );
}

function Row({
  skill,
  checked,
  onToggle,
  onHover,
  onLeave,
}: {
  skill: SkillEntry;
  checked: boolean;
  onToggle: () => void;
  onHover: (rect: DOMRect) => void;
  onLeave: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <button
      ref={ref}
      type="button"
      onClick={onToggle}
      onMouseEnter={() => {
        if (ref.current) onHover(ref.current.getBoundingClientRect());
      }}
      onMouseLeave={onLeave}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        padding: '8px 10px',
        border: 'none',
        background: checked ? 'var(--main-m1-10)' : 'transparent',
        cursor: 'pointer',
        textAlign: 'left',
        borderRadius: 6,
        transition: 'background 120ms',
      }}
      onMouseOver={(e) => {
        if (!checked) (e.currentTarget as HTMLElement).style.background = 'var(--b-r03)';
      }}
      onMouseOut={(e) => {
        if (!checked) (e.currentTarget as HTMLElement).style.background = 'transparent';
      }}
    >
      <Avatar name={skill.creator} size={32} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div
          style={{
            fontSize: 14,
            lineHeight: '20px',
            color: 'var(--text-n9)',
            letterSpacing: 0.14,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {skill.name}
        </div>
        <div
          style={{
            fontSize: 12,
            lineHeight: '16px',
            color: 'var(--text-n5)',
            letterSpacing: 0.12,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {skill.creator}
        </div>
      </div>
      {checked && (
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: 'var(--main-m1)',
            flexShrink: 0,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6.5l2.5 2.5 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </button>
  );
}
