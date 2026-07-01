import { useState, useRef, useEffect, useCallback } from 'react';
import { CdnIcon } from './CdnIcon';

const DROPDOWN_ACTIVE_BACKGROUND = 'rgba(73,163,166,0.08)';
const DROPDOWN_HOVER_BACKGROUND = 'var(--b-r03, rgba(0,0,0,0.03))';

export interface DropdownItem {
  id: string;
  label: string;
  icon?: string;
  iconColor?: string;
  badge?: number;
  /* hover 行时右侧浮现的操作(如 rename/delete);点击走 onAction、不触发选中 */
  actions?: { id: string; icon: string; label: string }[];
}

export interface DropdownSection {
  title?: string;
  items: DropdownItem[];
}

interface DropdownProps {
  items?: DropdownItem[];
  sections?: DropdownSection[];
  activeId?: string;
  onSelect: (id: string) => void;
  trigger: React.ReactNode;
  width?: number;
  maxHeight?: number;
  align?: 'left' | 'right';
  /* 向上展开（触发器贴底、容器 overflow-hidden 会裁掉向下菜单时用） */
  openUp?: boolean;
  /* 行内 hover 操作点击回调(itemId, actionId) */
  onAction?: (itemId: string, actionId: string) => void;
}

export function Dropdown({ items, sections, activeId, onSelect, trigger, width, maxHeight, align = 'left', openUp = false, onAction }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open, handleClickOutside]);

  const allSections: DropdownSection[] = sections ?? [{ items: items ?? [] }];

  const renderItem = (item: DropdownItem) => {
    const selected = item.id === activeId;
    return (
      <div
        key={item.id}
        className="group relative flex h-[38px] w-full items-center gap-[8px] rounded-[4px] px-[12px] py-[8px]"
        style={{
          backgroundColor: selected ? DROPDOWN_ACTIVE_BACKGROUND : 'transparent',
          transition: 'background-color 0.12s ease',
        }}
        role="button"
        tabIndex={0}
        onClick={() => {
          onSelect(item.id);
          setOpen(false);
        }}
        onKeyDown={(e) => {
          if (e.key !== 'Enter' && e.key !== ' ') return;
          e.preventDefault();
          onSelect(item.id);
          setOpen(false);
        }}
        onMouseEnter={(e) => {
          if (!selected) (e.currentTarget as HTMLDivElement).style.backgroundColor = DROPDOWN_HOVER_BACKGROUND;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.backgroundColor = selected ? DROPDOWN_ACTIVE_BACKGROUND : 'transparent';
        }}
      >
        {item.icon && (
          <CdnIcon
            name={item.icon}
            size={20}
            color={selected ? 'var(--main-m1, #49A3A6)' : (item.iconColor ?? 'var(--text-n9, rgba(0,0,0,0.9))')}
          />
        )}
        <span className="flex min-w-0 flex-1 items-center gap-[8px]">
          <span
            className="min-w-0 truncate font-['Delight',sans-serif] text-[14px] font-normal leading-[22px] tracking-[0.14px]"
            style={{ color: selected ? 'var(--main-m1, #49A3A6)' : 'var(--text-n9)' }}
          >
            {item.label}
          </span>
          {item.badge != null && item.badge > 0 && (
            <span
              className="shrink-0 font-['Delight',sans-serif] text-[10px] font-medium leading-[16px] text-white"
              style={{ background: 'var(--main-m1, #49A3A6)', borderRadius: 999, padding: '0 6px' }}
            >
              {item.badge}
            </span>
          )}
        </span>
        {item.actions && item.actions.length > 0 && (
          <div className="flex shrink-0 items-center gap-[12px] opacity-0 transition-opacity group-hover:opacity-100">
            {item.actions.map((a) => (
              <button
                key={a.id}
                type="button"
                aria-label={a.label}
                className="flex size-[16px] items-center justify-center text-[var(--text-n5,rgba(0,0,0,0.5))] transition-colors hover:text-[var(--text-n9,rgba(0,0,0,0.9))]"
                onClick={(e) => { e.stopPropagation(); onAction?.(item.id, a.id); }}
              >
                <CdnIcon name={a.icon} size={16} color="currentColor" />
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={ref} className="relative min-w-0">
      <div className="cursor-pointer min-w-0" onClick={() => setOpen(v => !v)}>
        {trigger}
      </div>
      {open && (
        <div
          className={`absolute z-50 flex flex-col ${openUp ? 'bottom-full mb-[4px]' : 'top-full mt-[4px]'}`}
          style={{
            backgroundColor: 'var(--b0-container, #fff)',
            padding: 4,
            borderRadius: 8,
            boxShadow: 'var(--shadow-s, 0 6px 20px rgba(0,0,0,0.04))',
            width: width ?? 'auto',
            minWidth: width ?? 220,
            maxHeight: maxHeight,
            overflowY: maxHeight ? 'auto' : undefined,
            border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))',
            ...(align === 'right' ? { right: 0 } : { left: 0 }),
          }}
        >
          {allSections.map((section, si) => (
            <div key={si}>
              {section.title && (
                <div className="flex items-center px-[12px] pb-[4px] pt-[8px]">
                  <span className="font-['Delight',sans-serif] text-[12px] font-normal leading-[20px] tracking-[0.12px] text-[var(--text-n5)]">
                    {section.title}
                  </span>
                </div>
              )}
              {section.items.map(renderItem)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
