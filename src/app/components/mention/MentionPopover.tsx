/**
 * [INPUT]: mention-data
 * [OUTPUT]: MentionPopover（@ 下拉菜单）+ MentionChip（引用实体 chip）
 * [POS]: mention 模块 — UI 组件
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import type { MentionItem } from './mention-data';
import { MENTION_ITEMS } from './mention-data';

const FONT = "'Delight', sans-serif";

/* ========== Type 图标 ========== */

function TypeIcon({ type, color }: { type: 'playbook' | 'thread'; color: string }) {
  if (type === 'playbook') {
    return (
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
        <path d="M5 3v4.5c0 .83.67 1.5 1.5 1.5h3c.83 0 1.5.67 1.5 1.5V13M5 3L3 5M5 3l2 2M11 13l-2-2M11 13l2-2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
      <path d="M2 4a1 1 0 011-1h10a1 1 0 011 1v6a1 1 0 01-1 1H6l-3 3V11H3a1 1 0 01-1-1V4z" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ========== MentionChip ========== */

export function MentionChip({ item, onRemove }: { item: MentionItem; onRemove: () => void }) {
  return (
    <div
      className="inline-flex items-center gap-[8px] pl-[4px] pr-[6px] py-[4px] rounded-[8px]"
      style={{ background: item.themeColor + '0a', border: `0.5px solid ${item.themeColor}20` }}
    >
      <div
        className="w-[24px] h-[24px] rounded-[6px] flex items-center justify-center shrink-0"
        style={{ background: item.themeColor + '18' }}
      >
        <TypeIcon type={item.type} color={item.themeColor} />
      </div>
      <span style={{ fontFamily: FONT, fontSize: 13, lineHeight: '18px', color: 'rgba(0,0,0,0.75)' }}>
        {item.title}
      </span>
      <span style={{ fontFamily: FONT, fontSize: 11, lineHeight: '16px', color: 'rgba(0,0,0,0.25)' }}>
        {item.subtitle}
      </span>
      <button
        onClick={onRemove}
        className="w-[18px] h-[18px] rounded-full flex items-center justify-center cursor-pointer hover:bg-[rgba(0,0,0,0.06)] transition-colors ml-[2px]"
        style={{ background: 'none', border: 'none' }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2.5 2.5l5 5M7.5 2.5l-5 5" stroke="rgba(0,0,0,0.3)" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

/* ========== Tag pill ========== */

function Tag({ label }: { label: string }) {
  const colorMap: Record<string, string> = {
    Browsing: 'rgba(73,163,166,0.7)',
    Created: 'rgba(123,97,255,0.7)',
    Starred: 'rgba(230,169,26,0.7)',
  };
  const color = colorMap[label] ?? 'rgba(0,0,0,0.25)';
  return (
    <span
      className="shrink-0 px-[5px] py-[0.5px] rounded-[3px]"
      style={{ fontFamily: FONT, fontSize: 10, lineHeight: '15px', color, border: `0.5px solid ${color}30`, background: `${color}08` }}
    >
      {label}
    </span>
  );
}

/* ========== MentionPopover ========== */

interface MentionPopoverProps {
  query: string;
  onSelect: (item: MentionItem) => void;
  onClose: () => void;
  selectedIds?: Set<string>;
}

export function MentionPopover({ query, onSelect, onClose, selectedIds }: MentionPopoverProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  /* 同步外部 query */
  useEffect(() => { setSearch(query); }, [query]);

  /* 自动聚焦搜索框 */
  useEffect(() => { inputRef.current?.focus(); }, []);

  /* 过滤 */
  const MAX_PLAYBOOKS = 4;
  const q = search.toLowerCase();
  const filtered = MENTION_ITEMS.filter(item =>
    !selectedIds?.has(item.id) &&
    (item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q) || (item.tag?.toLowerCase().includes(q) ?? false))
  );

  const allPlaybooks = filtered.filter(i => i.type === 'playbook');
  const threads = filtered.filter(i => i.type === 'thread');

  /* Browsing 最多显示 1 个，其余正常展示，总量不超过 MAX_PLAYBOOKS */
  const browsing = allPlaybooks.filter(i => i.tag === 'Browsing');
  const rest = allPlaybooks.filter(i => i.tag !== 'Browsing');
  const cappedBrowsing = browsing.slice(0, 1);
  const remainSlots = MAX_PLAYBOOKS - cappedBrowsing.length;
  const cappedRest = rest.slice(0, Math.max(0, remainSlots));
  const visiblePlaybooks = [...cappedBrowsing, ...cappedRest];
  const hiddenCount = allPlaybooks.length - visiblePlaybooks.length;

  const [showAll, setShowAll] = useState(false);
  const playbooks = showAll ? allPlaybooks : visiblePlaybooks;

  const sections = [
    { label: 'Playbooks', items: playbooks, hiddenCount: showAll ? 0 : hiddenCount },
    { label: 'Chats', items: threads, hiddenCount: 0 },
  ].filter(s => s.items.length > 0 || s.hiddenCount > 0);

  const flatItems = sections.flatMap(s => s.items);

  /* 搜索变化时重置 */
  useEffect(() => { setActiveIdx(0); setShowAll(false); }, [search]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx(i => Math.min(i + 1, flatItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' || e.key === 'Tab') {
      if (flatItems[activeIdx]) { e.preventDefault(); onSelect(flatItems[activeIdx]); }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  }, [flatItems, activeIdx, onSelect, onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [handleKeyDown]);

  /* 点击外部关闭 */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  let flatIdx = 0;

  return (
    <div
      ref={ref}
      className="rounded-[10px] overflow-hidden"
      style={{
        background: '#fff', border: '0.5px solid rgba(0,0,0,0.12)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)', width: 320,
      }}
    >
      {/* 搜索栏 */}
      <div style={{ padding: '8px 10px 4px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, opacity: 0.3 }}>
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <input
          ref={inputRef}
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search playbooks & chats..."
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: FONT, fontSize: 13, color: 'rgba(0,0,0,0.8)',
            padding: '4px 0', minWidth: 0,
          }}
        />
      </div>
      <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 10px' }} />

      {/* 列表 */}
      <div style={{ maxHeight: 280, overflowY: 'auto', padding: '4px 0' }}>
        {flatItems.length === 0 && (
          <div style={{ padding: '12px 14px', fontFamily: FONT, fontSize: 12, color: 'rgba(0,0,0,0.25)' }}>
            No results
          </div>
        )}
        {sections.map(({ label, items, hiddenCount }) => (
          <div key={label}>
            <div style={{ padding: '6px 14px 2px', fontFamily: FONT, fontSize: 11, fontWeight: 500, color: 'rgba(0,0,0,0.3)', letterSpacing: '0.02em' }}>
              {label}
            </div>
            {items.map(item => {
              const idx = flatIdx++;
              const active = idx === activeIdx;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelect(item)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className="flex items-center gap-[8px] px-[10px] py-[5px] mx-[4px] rounded-[6px] cursor-pointer transition-colors"
                  style={{ background: active ? 'rgba(0,0,0,0.04)' : 'transparent' }}
                >
                  <div
                    className="w-[24px] h-[24px] rounded-[5px] flex items-center justify-center shrink-0"
                    style={{ background: item.themeColor + '12' }}
                  >
                    <TypeIcon type={item.type} color={item.themeColor} />
                  </div>
                  <div className="flex-1 min-w-0 truncate" style={{ fontFamily: FONT, fontSize: 13, color: 'rgba(0,0,0,0.75)' }}>
                    {item.title}
                  </div>
                  {item.tag && <Tag label={item.tag} />}
                  {item.subtitle && !item.tag && (
                    <span className="shrink-0" style={{ fontFamily: FONT, fontSize: 11, color: 'rgba(0,0,0,0.2)' }}>
                      {item.subtitle}
                    </span>
                  )}
                </div>
              );
            })}
            {hiddenCount > 0 && (
              <div
                onClick={() => setShowAll(true)}
                className="flex items-center gap-[6px] px-[14px] py-[5px] cursor-pointer hover:bg-[rgba(0,0,0,0.02)] transition-colors"
              >
                <span style={{ fontFamily: FONT, fontSize: 12, color: 'rgba(73,163,166,0.8)' }}>
                  {hiddenCount} more playbook{hiddenCount > 1 ? 's' : ''}...
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
