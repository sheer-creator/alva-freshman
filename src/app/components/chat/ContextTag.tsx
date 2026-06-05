import { CdnIcon } from '../shared/CdnIcon';
import type { ContextTagData } from '@/lib/chat-config';

interface ContextTagProps {
  tag: ContextTagData;
  onRemove?: () => void;
}

export function ContextTag({ tag, onRemove }: ContextTagProps) {
  return (
    <span
      className="inline-flex items-center gap-[6px] h-[24px] pl-[3px] pr-[6px] py-[2px] max-w-[216px] rounded-[2px] shrink-0"
      style={{ background: 'rgba(73,163,166,0.05)' }}
    >
      <span
        className="flex items-center justify-center shrink-0 rounded-[2px] size-[18px]"
        style={{ background: 'var(--main-m1)' }}
      >
        <CdnIcon name={tag.icon || 'sidebar-discover-normal'} size={14} color="#fff" />
      </span>
      <span
        className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] truncate"
        style={{ color: 'var(--main-m1)' }}
      >
        @{tag.label}
      </span>
      {onRemove && (
        <button
          className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity ml-[2px]"
          onClick={onRemove}
        >
          <CdnIcon name="close-l1" size={10} color="var(--main-m1)" />
        </button>
      )}
    </span>
  );
}
