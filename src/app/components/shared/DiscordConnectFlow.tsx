import { useEffect, useRef, useState } from 'react';

const FONT = "'Delight', sans-serif";
const DISCORD_INVITE_URL = 'https://discord.com/oauth2/authorize?client_id=1498643730150985829&scope=bot&permissions=68672';
const DISCORD_PAIRING_CODE = 'ALVATOTHEMOON';

interface DiscordConnectFlowProps {
  onPaired: () => void;
  tone?: 'settings' | 'empty';
  className?: string;
}

function StepNumber({ value }: { value: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center text-[12px] leading-[20px] tracking-[0.12px]"
      style={{
        width: 22,
        height: 22,
        borderRadius: 999,
        background: 'var(--main-m1-10, rgba(73,163,166,0.1))',
        color: 'var(--main-m1, #49A3A6)',
        fontFamily: FONT,
        fontWeight: 500,
      }}
    >
      {value}
    </span>
  );
}

export function DiscordConnectFlow({ onPaired, tone = 'settings', className = '' }: DiscordConnectFlowProps) {
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimer.current != null) window.clearTimeout(copyTimer.current);
    };
  }, []);

  const handleCopy = () => {
    void navigator.clipboard?.writeText(DISCORD_PAIRING_CODE);
    setCopied(true);
    if (copyTimer.current != null) window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      className={`flex flex-col gap-[var(--spacing-m)] ${className}`}
      style={{
        width: '100%',
        maxWidth: tone === 'empty' ? 620 : undefined,
        padding: 'var(--spacing-m)',
        borderRadius: 'var(--radius-ct-l)',
        border: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))',
        background: 'var(--b0-container, #ffffff)',
        boxShadow: tone === 'empty' ? '0 18px 48px rgba(24, 28, 36, 0.08)' : 'none',
      }}
    >
      <div className="flex flex-col gap-[var(--spacing-xxs)]">
        <p
          className="text-[14px] leading-[22px] tracking-[0.14px]"
          style={{ color: 'var(--text-n9)', fontFamily: FONT, fontWeight: 500 }}
        >
          Connect Discord
        </p>
        <p
          className="text-[12px] leading-[20px] tracking-[0.12px]"
          style={{ color: 'var(--text-n5)', fontFamily: FONT }}
        >
          Requires Discord server admin permission.
        </p>
      </div>

      <div className="flex flex-col gap-[var(--spacing-s)]">
        <div className="flex gap-[var(--spacing-s)]">
          <StepNumber value={1} />
          <div className="flex flex-col gap-[var(--spacing-xxs)] min-w-0">
            <p className="text-[13px] leading-[20px] tracking-[0.13px]" style={{ color: 'var(--text-n9)', fontFamily: FONT }}>
              Invite Alva Agent to your Server.
            </p>
            <a
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] leading-[20px] tracking-[0.13px] underline underline-offset-[3px]"
              style={{ color: 'var(--main-m1)', fontFamily: FONT }}
            >
              Open Discord invite link
            </a>
          </div>
        </div>

        <div className="flex gap-[var(--spacing-s)]">
          <StepNumber value={2} />
          <p className="text-[13px] leading-[20px] tracking-[0.13px] min-w-0" style={{ color: 'var(--text-n9)', fontFamily: FONT }}>
            In your server, mention <span style={{ fontWeight: 500 }}>@Alva Agent</span> to start pairing.
          </p>
        </div>

        <div className="flex gap-[var(--spacing-s)]">
          <StepNumber value={3} />
          <div className="flex flex-col gap-[var(--spacing-xs)] min-w-0 flex-1">
            <p className="text-[13px] leading-[20px] tracking-[0.13px]" style={{ color: 'var(--text-n9)', fontFamily: FONT }}>
              Use this pairing code:
            </p>
            <div
              className="flex items-center gap-[var(--spacing-xs)] rounded-[var(--radius-ct-m)] px-[var(--spacing-s)] py-[var(--spacing-xs)]"
              style={{ background: 'var(--b-r03, rgba(0,0,0,0.03))', border: '0.5px solid var(--line-l07, rgba(0,0,0,0.07))' }}
            >
              <code
                className="flex-1 min-w-0 text-[13px] leading-[20px] tracking-[0.13px]"
                style={{ color: 'var(--text-n9)', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
              >
                {DISCORD_PAIRING_CODE}
              </code>
              <button
                type="button"
                onClick={handleCopy}
                className="text-[12px] leading-[20px] tracking-[0.12px] cursor-pointer"
                style={{ color: 'var(--main-m1)', background: 'none', border: 'none', padding: 0, fontFamily: FONT, fontWeight: 500 }}
              >
                {copied ? 'Copied' : 'Copy code'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-[var(--spacing-s)]">
        <button type="button" onClick={onPaired} className="btn btn-medium btn-primary">
          I've paired
        </button>
      </div>
    </div>
  );
}
