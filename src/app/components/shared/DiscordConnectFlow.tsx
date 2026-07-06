import { useEffect, useRef, useState } from 'react';
import { CdnIcon } from './CdnIcon';

const FONT = "'Delight', sans-serif";
const DISCORD_INVITE_URL = 'https://discord.com/oauth2/authorize?client_id=1498643730150985829&scope=bot&permissions=68672';
const DISCORD_PAIRING_CODE = '/start 9e77d61620bf5935';

interface DiscordConnectFlowProps {
  onPaired: () => void;
  onClose?: () => void;
  className?: string;
}

function StepNumber({ value }: { value: number }) {
  return (
    <div
      className="shrink-0 flex items-center justify-center text-[14px] leading-[22px] tracking-[0.14px]"
      style={{
        width: 26,
        height: 26,
        borderRadius: 9999,
        background: 'var(--b-r05)',
        color: 'var(--text-n5, rgba(0,0,0,0.5))',
        fontFamily: FONT,
      }}
    >
      {value}
    </div>
  );
}

export function DiscordConnectFlow({ onPaired, onClose, className = '' }: DiscordConnectFlowProps) {
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (copyTimer.current != null) window.clearTimeout(copyTimer.current);
  }, []);

  const handleCopy = () => {
    void navigator.clipboard?.writeText(DISCORD_PAIRING_CODE);
    setCopied(true);
    if (copyTimer.current != null) window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      className={`flex flex-col ${className}`}
      style={{
        width: 600,
        maxWidth: '100%',
        background: 'var(--b0-container, #ffffff)',
        border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))',
        borderRadius: 'var(--radius-pop-dialog, 12px)',
        padding: 'var(--spacing-xxl, 28px)',
        gap: 'var(--spacing-l, 20px)',
        boxShadow: 'var(--shadow-l)',
        fontFamily: FONT,
      }}
    >
      {/* Modal Title */}
      <div className="flex items-start w-full" style={{ gap: 'var(--spacing-s, 12px)' }}>
        <div className="flex flex-1 min-w-0 flex-col" style={{ gap: 2 }}>
          <p
            className="text-[18px] leading-[28px] tracking-[0.18px]"
            style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT, fontWeight: 500 }}
          >
            Connect Discord
          </p>
          <p
            className="text-[12px] leading-[20px] tracking-[0.12px]"
            style={{ color: 'var(--text-n7, rgba(0,0,0,0.7))', fontFamily: FONT }}
          >
            Requires Discord server admin permission.
          </p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 cursor-pointer hover:opacity-60 transition-opacity bg-transparent border-none p-0 mt-[5px]"
          >
            <CdnIcon name="close-l1" size={18} color="var(--text-n9, rgba(0,0,0,0.9))" />
          </button>
        )}
      </div>

      {/* Step 1 — invite + inline link */}
      <div className="flex items-center flex-wrap w-full" style={{ gap: 'var(--spacing-xs, 8px)' }}>
        <StepNumber value={1} />
        <p
          className="text-[16px] leading-[26px] tracking-[0.16px]"
          style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT }}
        >
          Invite Alva to your Server.
        </p>
        <a
          href={DISCORD_INVITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-[16px] leading-[26px] tracking-[0.16px] hover:opacity-70 transition-opacity"
          style={{
            gap: 2,
            color: 'var(--text-n7, rgba(0,0,0,0.7))',
            fontFamily: FONT,
            textDecoration: 'underline dotted',
            textDecorationColor: 'var(--text-n5)',
            textUnderlineOffset: 3,
          }}
        >
          Open Discord Invite Link
          <CdnIcon name="go-l" size={16} color="var(--text-n7, rgba(0,0,0,0.7))" />
        </a>
      </div>

      {/* Step 2 */}
      <div className="flex items-center w-full" style={{ gap: 'var(--spacing-xs, 8px)' }}>
        <StepNumber value={2} />
        <p
          className="flex-1 min-w-0 text-[16px] leading-[26px] tracking-[0.16px]"
          style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT }}
        >
          In your server, mention <span style={{ fontWeight: 500 }}>@Alva</span> to start pairing.
        </p>
      </div>

      {/* Step 3 */}
      <div className="flex items-center w-full" style={{ gap: 'var(--spacing-xs, 8px)' }}>
        <StepNumber value={3} />
        <p
          className="flex-1 min-w-0 text-[16px] leading-[26px] tracking-[0.16px]"
          style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT }}
        >
          Use this pairing code:
        </p>
      </div>

      {/* Code box */}
      <div
        className="flex items-center justify-center w-full"
        style={{
          gap: 'var(--spacing-xs, 8px)',
          padding: 'var(--spacing-m, 16px)',
          borderRadius: 'var(--radius-ct-l, 8px)',
          background: 'var(--main-m1-10, rgba(73,163,166,0.1))',
        }}
      >
        <p
          className="flex-1 min-w-0 truncate text-[16px] leading-[26px] tracking-[0.16px]"
          style={{ color: 'var(--main-m1, #49a3a6)', fontFamily: FONT, fontWeight: 500 }}
        >
          {DISCORD_PAIRING_CODE}
        </p>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center cursor-pointer bg-transparent border-none p-0 hover:opacity-70 transition-opacity"
          style={{ gap: 6 }}
        >
          <span
            className="text-[14px] leading-[22px] tracking-[0.14px]"
            style={{ color: 'var(--text-n7, rgba(0,0,0,0.7))', fontFamily: FONT }}
          >
            {copied ? 'Copied' : 'Copy Code'}
          </span>
          <CdnIcon name="refresh-l" size={16} color="var(--text-n7, rgba(0,0,0,0.7))" />
        </button>
      </div>

      {/* I've paired button */}
      <div className="flex items-center justify-end w-full" style={{ gap: 'var(--spacing-s, 12px)' }}>
        <button
          type="button"
          onClick={onPaired}
          className="flex items-center justify-center cursor-pointer transition-opacity hover:opacity-90"
          style={{
            flex: '1 0 0',
            minWidth: 128,
            gap: 'var(--spacing-xs, 8px)',
            padding: '11px var(--spacing-l, 20px)',
            borderRadius: 'var(--radius-btn-m, 6px)',
            background: 'var(--main-m1, #49a3a6)',
            border: 'none',
          }}
        >
          <span
            className="text-[16px] leading-[26px] tracking-[0.16px]"
            style={{ color: '#ffffff', fontFamily: FONT, fontWeight: 500 }}
          >
            I've paired
          </span>
        </button>
      </div>
    </div>
  );
}
