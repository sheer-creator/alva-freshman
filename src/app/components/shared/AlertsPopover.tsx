import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const FONT = "font-['Delight',sans-serif]";

interface AlertsPopoverProps {
  open: boolean;
  onClose: () => void;
  onTelegram: () => void;
  onDiscord: () => void;
  /** Anchor side: where the popover opens relative to the trigger. */
  align?: 'right' | 'left';
}

const TELEGRAM_ICON = (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.8693 2.23048C17.8693 2.23048 19.6246 1.54575 19.4783 3.20864C19.4295 3.89337 18.9907 6.28986 18.6494 8.88202L17.4793 16.5606C17.4793 16.5606 17.3818 17.6855 16.5042 17.8812C15.6266 18.0768 14.3102 17.1964 14.0664 17.0008C13.8713 16.8541 10.4097 14.6532 9.19079 13.5772C8.84948 13.2838 8.45944 12.6968 9.23954 12.0121L14.3589 7.12132C14.944 6.53442 15.5291 5.16499 13.0913 6.82788L6.26545 11.4742C6.26545 11.4742 5.48535 11.9632 4.02269 11.5231L0.85355 10.5449C0.85355 10.5449 -0.316596 9.81129 1.68238 9.07762C6.558 6.77892 12.5549 4.43132 17.8693 2.23048Z" fill="#ffffff"/>
  </svg>
);

export function AlertsPopover({ open, onClose, onTelegram, onDiscord, align = 'right' }: AlertsPopoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [placement, setPlacement] = useState<'bottom' | 'top'>('bottom');

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const onClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) onClose();
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open, onClose]);

  useLayoutEffect(() => {
    if (!open || !ref.current) return;
    const trigger = ref.current.parentElement;
    if (!trigger) return;
    const triggerRect = trigger.getBoundingClientRect();
    const popoverHeight = ref.current.offsetHeight;
    const gap = 6;
    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    const fitsBelow = spaceBelow >= popoverHeight + gap + 8;
    const fitsAbove = spaceAbove >= popoverHeight + gap + 8;
    if (!fitsBelow && fitsAbove) setPlacement('top');
    else if (!fitsBelow && !fitsAbove && spaceAbove > spaceBelow) setPlacement('top');
    else setPlacement('bottom');
  }, [open]);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label="Get Alerts"
      aria-hidden={!open}
      className={`${FONT} flex flex-col gap-[var(--spacing-m,16px)]`}
      style={{
        position: 'absolute',
        ...(placement === 'bottom' ? { top: 'calc(100% + 6px)' } : { bottom: 'calc(100% + 6px)' }),
        ...(align === 'right' ? { right: 0 } : { left: 0 }),
        zIndex: 50,
        width: 480,
        maxHeight: `calc(100vh - 80px)`,
        overflowY: 'auto',
        overscrollBehavior: 'contain',
        padding: 'var(--spacing-l,20px)',
        background: '#fff',
        border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))',
        borderRadius: 'var(--radius-pop-popover,8px)',
        boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
        opacity: open ? 1 : 0,
        visibility: open ? 'visible' : 'hidden',
        transform: open
          ? 'translateY(0) scale(1)'
          : `translateY(${placement === 'bottom' ? '-4px' : '4px'}) scale(0.98)`,
        transformOrigin: `${placement === 'bottom' ? 'top' : 'bottom'} ${align}`,
        pointerEvents: open ? 'auto' : 'none',
        transition: open
          ? 'opacity 160ms ease-out, transform 200ms cubic-bezier(0.16,1,0.3,1), visibility 0s'
          : 'opacity 160ms ease-out, transform 200ms cubic-bezier(0.16,1,0.3,1), visibility 0s linear 200ms',
      }}
    >
      <p className={`${FONT} text-[16px] leading-[26px] tracking-[0.16px] font-medium text-[var(--text-n9)] m-0`}>
        Get Alerts
      </p>

      <div
        className="flex flex-col items-center gap-[var(--spacing-s,12px)] w-full"
        style={{
          padding: 'var(--spacing-xl,24px) var(--spacing-l,20px)',
          background: 'var(--b-r02, rgba(0,0,0,0.02))',
          borderRadius: 'var(--radius-ct-l,8px)',
        }}
      >
        <div
          className="inline-flex items-center justify-center shrink-0 overflow-hidden"
          style={{ width: 48, height: 48, borderRadius: 960, background: 'var(--b0-sidebar, #2A2A38)' }}
        >
          <img src={`${import.meta.env.BASE_URL}logo-portrait.svg`} alt="" style={{ width: 48, height: 48, display: 'block' }} />
        </div>

        <p className={`${FONT} text-[16px] leading-[26px] tracking-[0.16px] text-[var(--text-n9)] text-center w-full m-0`}>
          Connect Agents to Get Notified
        </p>

        <div className="flex flex-col items-center gap-[var(--spacing-s,12px)] w-full">
          <button
            type="button"
            onClick={onTelegram}
            className={`${FONT} inline-flex items-center justify-center gap-[var(--spacing-xs,8px)] cursor-pointer transition-opacity hover:opacity-90`}
            style={{
              height: 40,
              width: 280,
              padding: '9px var(--spacing-m,16px)',
              borderRadius: 'var(--radius-ct-m,6px)',
              background: '#24a1de',
              color: '#fff',
              border: 'none',
              fontSize: 14,
              fontWeight: 500,
              lineHeight: '22px',
              letterSpacing: '0.14px',
              whiteSpace: 'nowrap',
            }}
          >
            {TELEGRAM_ICON}
            Connect Telegram
          </button>

          <button
            type="button"
            onClick={onDiscord}
            className={`${FONT} inline-flex items-center justify-center gap-[var(--spacing-xs,8px)] cursor-pointer transition-colors`}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--b-r03, rgba(0,0,0,0.03))'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
            style={{
              height: 40,
              width: 280,
              padding: '9px var(--spacing-m,16px)',
              borderRadius: 'var(--radius-ct-m,6px)',
              background: 'transparent',
              color: 'var(--text-n9)',
              border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))',
              fontSize: 14,
              fontWeight: 500,
              lineHeight: '22px',
              letterSpacing: '0.14px',
              whiteSpace: 'nowrap',
            }}
          >
            <img src={`${import.meta.env.BASE_URL}logo-social-discord.svg`} alt="" style={{ width: 18, height: 18 }} />
            Connect Discord
          </button>
        </div>

        <div className="flex flex-col items-center gap-[var(--spacing-xs,8px)] w-full" style={{ paddingTop: 'var(--spacing-s,12px)' }}>
          <p className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)] text-center w-full m-0`}>
            Same agent, more channels
          </p>
          <div className="flex items-center justify-center gap-[var(--spacing-xs,8px)]">
            {[
              { name: 'Slack', file: 'logo-social-slack.svg' },
              { name: 'WhatsApp', file: 'logo-social-whatsapp.svg' },
              { name: 'Line', file: 'logo-social-line.svg' },
            ].map(p => (
              <span
                key={p.name}
                className={`${FONT} inline-flex items-center gap-[6px]`}
                style={{
                  padding: '4px 12px 4px 6px',
                  background: 'var(--b-r03, rgba(0,0,0,0.03))',
                  borderRadius: 960,
                  fontSize: 12,
                  lineHeight: '20px',
                  letterSpacing: '0.12px',
                  color: 'var(--text-n3, rgba(0,0,0,0.3))',
                  whiteSpace: 'nowrap',
                }}
              >
                <img src={`${import.meta.env.BASE_URL}${p.file}`} alt="" style={{ width: 18, height: 18, borderRadius: 960, display: 'block' }} />
                {p.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
