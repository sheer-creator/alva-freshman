/**
 * [INPUT]: Automation source label and optional open action
 * [OUTPUT]: Official automation source attribution chip used by native messages
 * [POS]: Shared Agent conversation primitive
 */

import { CdnIcon } from '@/app/components/shared/CdnIcon';

const FONT = "'Delight', sans-serif";

function SourceChipContent({ label }: { label: string }) {
  return (
    <>
      <span className="relative flex size-[14px] shrink-0 items-center justify-center">
        <span
          className="absolute size-[14px] rounded-full"
          style={{ background: 'var(--main-m1, #49A3A6)', opacity: 0.2 }}
        />
        <span className="size-[6px] rounded-full" style={{ background: 'var(--main-m1, #49A3A6)' }} />
      </span>
      <span
        className="whitespace-nowrap text-[12px] leading-[20px] tracking-[0.12px]"
        style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}
      >
        {label}
      </span>
      <CdnIcon name="arrow-right-l2" size={12} color="var(--text-n9, rgba(0,0,0,0.9))" />
    </>
  );
}

const shellClass =
  'inline-flex items-center gap-[4px] rounded-full py-[2px] pl-[5px] pr-[8px]';

const shellStyle = {
  border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))',
  background: 'var(--b-r02, rgba(0,0,0,0.02))',
};

export function AutomationSourceChip({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  if (onClick) {
    return (
      <button
        type="button"
        className={`${shellClass} cursor-pointer transition-colors hover:bg-[var(--b-r05,rgba(0,0,0,0.05))]`}
        style={shellStyle}
        onClick={onClick}
        aria-label={`Open ${label} automation`}
      >
        <SourceChipContent label={label} />
      </button>
    );
  }

  return (
    <span className={shellClass} style={shellStyle}>
      <SourceChipContent label={label} />
    </span>
  );
}
