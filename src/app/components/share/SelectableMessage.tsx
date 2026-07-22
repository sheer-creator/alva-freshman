import type { ReactNode, SyntheticEvent } from 'react';
import { CdnIcon } from '@/app/components/shared/CdnIcon';

interface SelectableMessageProps {
  active: boolean;
  selected: boolean;
  label: string;
  onToggle: () => void;
  onQuickCopy?: () => void;
  onQuickShare?: () => void;
  actionAlign?: 'left' | 'right';
  actionInset?: boolean;
  children: ReactNode;
}

export function SelectableMessage({
  active,
  selected,
  label,
  onToggle,
  onQuickCopy,
  onQuickShare,
  actionAlign = 'left',
  actionInset = false,
  children,
}: SelectableMessageProps) {
  if (!active) {
    return (
      <div className="group/message flex w-full flex-col">
        {children}
        {(onQuickCopy || onQuickShare) && (
          <div className={`mt-[4px] flex items-center gap-[2px] transition-opacity [@media(hover:hover)]:pointer-events-none [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/message:pointer-events-auto [@media(hover:hover)]:group-hover/message:opacity-100 group-focus-within/message:pointer-events-auto group-focus-within/message:opacity-100 ${actionAlign === 'right' ? 'justify-end' : 'justify-start'} ${actionInset ? 'pl-[30px]' : ''}`}>
            {onQuickCopy && (
              <button
                type="button"
                aria-label="Copy message"
                title="Copy message"
                onClick={onQuickCopy}
                className="flex size-[24px] cursor-pointer items-center justify-center rounded-[4px] border-none bg-transparent opacity-55 transition-[background,opacity] hover:bg-[var(--b-r03,rgba(0,0,0,0.03))] hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--main-m1,#49A3A6)]"
              >
                <CdnIcon name="copy-l" size={13} color="var(--text-n7, rgba(0,0,0,0.7))" />
              </button>
            )}
            {onQuickShare && (
              <button
                type="button"
                aria-label="Share message"
                title="Share message"
                onClick={onQuickShare}
                className="flex size-[24px] cursor-pointer items-center justify-center rounded-[4px] border-none bg-transparent opacity-55 transition-[background,opacity] hover:bg-[var(--b-r03,rgba(0,0,0,0.03))] hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--main-m1,#49A3A6)]"
              >
                <CdnIcon name="share-l" size={13} color="var(--text-n7, rgba(0,0,0,0.7))" />
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  const toggle = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onToggle();
  };

  return (
    <div
      role="checkbox"
      aria-checked={selected}
      aria-label={label}
      tabIndex={0}
      onClickCapture={toggle}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') toggle(event);
      }}
      className="-mx-[12px] flex cursor-pointer items-start gap-[10px] rounded-[8px] px-[12px] py-[10px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--main-m3,#2a9b7d)]"
      style={{
        background: selected ? 'var(--main-m3-10, rgba(42,155,125,0.1))' : 'transparent',
        border: selected ? '0.5px solid rgba(42,155,125,0.38)' : '0.5px solid transparent',
      }}
    >
      <span
        aria-hidden
        className="mt-[2px] flex size-[18px] shrink-0 items-center justify-center rounded-full transition-colors"
        style={{
          background: selected ? 'var(--main-m3, #2a9b7d)' : '#fff',
          border: selected ? '1px solid var(--main-m3, #2a9b7d)' : '1px solid var(--line-l3, rgba(0,0,0,0.3))',
        }}
      >
        {selected && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5.2 4.1 7.2 8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
