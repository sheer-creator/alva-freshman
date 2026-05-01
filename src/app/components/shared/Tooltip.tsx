import { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  text: string;
  title?: string;
  children: React.ReactNode;
  placement?: 'top' | 'bottom';
  delay?: number;
}

export function Tooltip({ text, title, children, placement = 'top', delay = 120 }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(true), delay);
  };
  const hide = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(false);
  };

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {open && (
        <div
          role="tooltip"
          className={`absolute left-1/2 -translate-x-1/2 z-[100] pointer-events-none ${placement === 'top' ? 'bottom-full mb-[8px]' : 'top-full mt-[8px]'}`}
        >
          <div
            className="relative flex flex-col w-fit max-w-[400px]"
            style={{
              backgroundColor: 'var(--b0-container)',
              borderRadius: 'var(--radius-ct-m)',
              boxShadow: 'var(--shadow-s)',
              padding: 'var(--spacing-m, 16px)',
              gap: 'var(--spacing-xxxs, 2px)',
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ border: '0.5px solid var(--line-l2)', borderRadius: 'var(--radius-ct-m)' }}
            />
            {title && (
              <div
                className="font-['Delight',-apple-system,BlinkMacSystemFont,sans-serif] text-[16px] leading-[26px] tracking-[0.16px] font-medium whitespace-nowrap"
                style={{ color: 'var(--text-n9)' }}
              >
                {title}
              </div>
            )}
            <div
              className="font-['Delight',-apple-system,BlinkMacSystemFont,sans-serif] text-[14px] leading-[22px] tracking-[0.14px] font-normal whitespace-nowrap"
              style={{ color: 'var(--text-n9)' }}
            >
              {text}
            </div>
          </div>
        </div>
      )}
    </span>
  );
}
