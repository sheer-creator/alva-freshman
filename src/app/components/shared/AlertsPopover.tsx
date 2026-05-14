import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CdnIcon } from '@/app/components/shared/CdnIcon';

const FONT = "font-['Delight',sans-serif]";

/* ========== Switch Toggle ========== */

function Switch({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
      className="shrink-0 cursor-pointer border-none outline-none p-0 overflow-hidden transition-colors"
      style={{
        width: 32,
        height: 16,
        borderRadius: 1000,
        background: on ? 'var(--main-m1, #49A3A6)' : 'rgba(0,0,0,0.15)',
      }}
    >
      <div
        className="transition-all"
        style={{
          width: 10.667,
          height: 10.667,
          borderRadius: 133.333,
          background: '#fff',
          marginTop: 2.667,
          marginLeft: on ? 'auto' : 2.667,
          marginRight: on ? 2.667 : 'auto',
        }}
      />
    </button>
  );
}

/* ========== Types ========== */

interface AlertsPopoverProps {
  open: boolean;
  onClose: () => void;
  onTelegram: () => void;
  onDiscord: () => void;
  onManage?: () => void;
  /** Anchor side: where the popover opens relative to the trigger. */
  align?: 'right' | 'left';
  /** Whether the agent is connected */
  connected?: boolean;
}

/* ========== Mock data for connected state ========== */

const MOCK_AUTOMATIONS = [
  { id: 'ai-chip', name: 'ai-chip-supply-chain', enabled: true },
  { id: 'space', name: 'space-rotation-prices', enabled: true },
];

const MOCK_SIGNAL = {
  date: 'May 8, 12:00 PM',
  source: 'ai-chip-supply-chain',
  title: 'AMD to Entrust 2nm Production to Samsung Foundry Samsung Electronics has entered into substantive discussions with AMD',
  bullets: [
    'Top of basket: ALL (Allstate) holds #1 at Score 95 — ROE 39.5%, P/E 5.64; leadership in Insurance — Property & Casualty continues.',
    'New entries: BBVA (+7), PDD (+6), PBR (+3) rejoin the Top 20 on improved P/E and ROE reads.',
    'Dropouts: TFC, SFNC fall out of Top 40 after D/E flags near 2.0 threshold.',
  ],
};

/* ========== Telegram Icon ========== */

const TELEGRAM_ICON = (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.8693 2.23048C17.8693 2.23048 19.6246 1.54575 19.4783 3.20864C19.4295 3.89337 18.9907 6.28986 18.6494 8.88202L17.4793 16.5606C17.4793 16.5606 17.3818 17.6855 16.5042 17.8812C15.6266 18.0768 14.3102 17.1964 14.0664 17.0008C13.8713 16.8541 10.4097 14.6532 9.19079 13.5772C8.84948 13.2838 8.45944 12.6968 9.23954 12.0121L14.3589 7.12132C14.944 6.53442 15.5291 5.16499 13.0913 6.82788L6.26545 11.4742C6.26545 11.4742 5.48535 11.9632 4.02269 11.5231L0.85355 10.5449C0.85355 10.5449 -0.316596 9.81129 1.68238 9.07762C6.558 6.77892 12.5549 4.43132 17.8693 2.23048Z" fill="#ffffff"/>
  </svg>
);

/* ========== Unconnected Content ========== */

function UnconnectedContent({ onTelegram, onDiscord }: { onTelegram: () => void; onDiscord: () => void }) {
  return (
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
            borderRadius: 'var(--radius-btn-m,8px)',
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
            borderRadius: 'var(--radius-btn-m,8px)',
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
    </div>
  );
}

/* ========== Connected Content ========== */

function ConnectedContent({ onManage }: { onManage?: () => void }) {
  const [receiveAlerts, setReceiveAlerts] = useState(true);
  const [automations, setAutomations] = useState(MOCK_AUTOMATIONS);

  const toggleAutomation = (id: string) => {
    setAutomations(prev => prev.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));
  };

  return (
    <>
      {/* Automations section */}
      <div className="flex flex-col gap-[var(--spacing-s,12px)] items-start overflow-hidden w-full">
        {/* Header: Automations + Receive Alerts toggle */}
        <div className="flex gap-[var(--spacing-xs,8px)] items-center w-full">
          <p className={`${FONT} flex-1 min-w-0 text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n7)] m-0`}>
            Automations
          </p>
          <p className={`${FONT} shrink-0 text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)] text-right whitespace-nowrap m-0`}>
            Receive Alerts
          </p>
          <Switch on={receiveAlerts} onToggle={() => setReceiveAlerts(!receiveAlerts)} />
        </div>

        {/* Automation list */}
        <div
          className="flex flex-col gap-[var(--spacing-xs,8px)] items-start justify-center w-full"
          style={{
            padding: 'var(--spacing-m,16px)',
            background: 'rgba(73,163,166,0.08)',
            borderRadius: 'var(--radius-ct-l,8px)',
          }}
        >
          {automations.map(a => (
            <div key={a.id} className="flex items-center justify-between w-full">
              <p className={`${FONT} flex-1 min-w-0 text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] m-0`}>
                {a.name}
              </p>
              <Switch on={a.enabled} onToggle={() => toggleAutomation(a.id)} />
            </div>
          ))}
        </div>

        {/* Connected account */}
        <div className="flex gap-[var(--spacing-xs,8px)] items-center w-full" style={{ borderRadius: 'var(--radius-ct-l,8px)' }}>
          <div className="flex flex-1 min-w-0 gap-[var(--spacing-xxs,4px)] items-center">
            <img src="https://alva-ai-static.b-cdn.net/icons/logo-social-telegram.svg" alt="" style={{ width: 16, height: 16, flexShrink: 0 }} />
            <p className={`${FONT} shrink-0 text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)] whitespace-nowrap m-0`}>
              Connected:
            </p>
            <p className={`${FONT} shrink-0 text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)] whitespace-nowrap m-0`}>
              Sheer Ruan
            </p>
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onManage?.(); }}
            className={`${FONT} inline-flex gap-[var(--spacing-xxs,4px)] items-center justify-end shrink-0 cursor-pointer bg-transparent border-none outline-none p-0 transition-opacity hover:opacity-70`}
          >
            <span
              className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-right whitespace-nowrap`}
              style={{ color: 'var(--text-n5)' }}
            >
              Manage
            </span>
            <CdnIcon name="arrow-right-l2" size={12} color="var(--text-n5)" />
          </button>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="flex flex-col gap-[var(--spacing-s,12px)] items-start w-full">
        <p className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n7)] w-full m-0`}>
          Recent Alerts
        </p>
        <div
          className="flex flex-col gap-[var(--spacing-xs,8px)] items-start overflow-hidden w-full"
          style={{
            padding: 'var(--spacing-m,16px)',
            background: 'var(--grey-g01, #fafafa)',
            borderRadius: 'var(--radius-ct-l,8px)',
          }}
        >
          <p className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)] m-0`}>
            {MOCK_SIGNAL.date} &middot; {MOCK_SIGNAL.source}
          </p>
          <p className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] font-medium m-0`}>
            {MOCK_SIGNAL.title}
          </p>
          <div className="flex flex-col gap-[var(--spacing-xxs,4px)] w-full">
            {MOCK_SIGNAL.bullets.map((b, i) => (
              <div key={i} className="flex items-start w-full">
                <span
                  className="shrink-0 flex items-center justify-center"
                  style={{ width: 20, height: 22, color: 'var(--text-n9)', fontSize: 14 }}
                >
                  &bull;
                </span>
                <p className={`${FONT} flex-1 min-w-0 text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] m-0`}>
                  {b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ========== Main Popover ========== */

export function AlertsPopover({ open, onClose, onTelegram, onDiscord, onManage, align = 'right', connected = false }: AlertsPopoverProps) {
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
        boxShadow: 'var(--shadow-s)',
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

      {connected
        ? <ConnectedContent onManage={onManage} />
        : <UnconnectedContent onTelegram={onTelegram} onDiscord={onDiscord} />
      }
    </div>
  );
}
