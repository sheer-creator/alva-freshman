import { useState, useRef, useEffect, useCallback } from 'react';
import { CdnIcon } from './CdnIcon';

export interface DropdownItem {
  id: string;
  label: string;
  icon?: string;
  iconColor?: string;
  badge?: number;
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
}

export function Dropdown({ items, sections, activeId, onSelect, trigger, width, maxHeight, align = 'left' }: DropdownProps) {
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
        className="relative w-full cursor-pointer"
        style={{
          backgroundColor: selected ? 'rgba(0,0,0,0.03)' : 'transparent',
          transition: 'background-color 0.12s ease',
        }}
        onClick={() => {
          onSelect(item.id);
          setOpen(false);
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(0,0,0,0.03)';
        }}
        onMouseLeave={(e) => {
          if (!selected) (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent';
        }}
      >
        <div className="flex items-center gap-[8px]" style={{ padding: '7px 16px' }}>
          {item.icon && (
            <CdnIcon name={item.icon} size={20} color={item.iconColor ?? 'rgba(0,0,0,0.9)'} />
          )}
          <span className="flex-1 min-w-0 flex items-center gap-[8px]">
            <span
              className="min-w-0 font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[rgba(0,0,0,0.9)] truncate"
            >
              {item.label}
            </span>
            {item.badge != null && item.badge > 0 && (
              <span
                className="shrink-0 font-['Delight',sans-serif] text-[10px] leading-[16px] font-medium text-white"
                style={{ background: '#49A3A6', borderRadius: 999, padding: '0 6px' }}
              >
                {item.badge}
              </span>
            )}
          </span>
          {selected && (
            <CdnIcon name="check-l1" size={16} color="#49A3A6" />
          )}
        </div>
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
          className="absolute top-full mt-[4px] z-50 flex flex-col"
          style={{
            backgroundColor: '#fff',
            padding: '8px 0',
            borderRadius: 8,
            boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
            width: width ?? 'auto',
            minWidth: width ?? 220,
            maxHeight: maxHeight,
            overflowY: maxHeight ? 'auto' : undefined,
            border: '0.5px solid rgba(0,0,0,0.2)',
            ...(align === 'right' ? { right: 0 } : { left: 0 }),
          }}
        >
          {allSections.map((section, si) => (
            <div key={si}>
              {section.title && (
                <div className="flex items-center" style={{ padding: '8px 16px 4px 16px' }}>
                  <span className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-[rgba(0,0,0,0.5)]">
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
