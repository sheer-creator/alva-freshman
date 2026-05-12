import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  text: string;
  title?: string;
  children: React.ReactNode;
  placement?: 'top' | 'bottom';
  delay?: number;
}

export function Tooltip({ text, title, children, placement = 'top', delay = 120 }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const calcPos = useCallback(() => {
    const trigger = triggerRef.current;
    const tip = tooltipRef.current;
    if (!trigger || !tip) return;
    const r = trigger.getBoundingClientRect();
    const tw = tip.offsetWidth;
    let top: number;
    if (placement === 'top') {
      top = r.top - tip.offsetHeight - 8;
    } else {
      top = r.bottom + 8;
    }
    let left = r.left + r.width / 2 - tw / 2;
    // clamp to viewport
    if (left < 8) left = 8;
    if (left + tw > window.innerWidth - 8) left = window.innerWidth - 8 - tw;
    setPos({ top, left });
  }, [placement]);

  useEffect(() => {
    if (open) requestAnimationFrame(calcPos);
  }, [open, calcPos]);

  const show = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(true), delay);
  };
  const hide = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(false);
    setPos(null);
  };

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  return (
    <span
      ref={triggerRef}
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {open && createPortal(
        <div
          ref={tooltipRef}
          role="tooltip"
          className="fixed z-[9999] pointer-events-none"
          style={{ top: pos?.top ?? -9999, left: pos?.left ?? -9999, opacity: pos ? 1 : 0 }}
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
        </div>,
        document.body,
      )}
    </span>
  );
}
