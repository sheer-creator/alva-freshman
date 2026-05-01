/**
 * [INPUT]: SettingsLayout
 * [OUTPUT]: Alva Agent 设置页 — Connected App (per-platform Connect/Disconnect) + receiver dropdown + Customize prompt
 * [POS]: 页面层
 */

import { useEffect, useRef, useState } from 'react';
import type { Page } from '@/app/App';
import { SettingsLayout } from '@/app/components/shell/SettingsLayout';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { useAgentPlatforms, type AgentPlatform } from '@/lib/agent-connected';

const FONT = "'Delight', sans-serif";

function TelegramMark({ size = 52 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 240 240" fill="none" style={{ display: 'block' }}>
      <circle cx="120" cy="120" r="120" fill="#26A5E4" />
      <path d="M100 144.4l48.4 35.7c5.5 3 9.5 1.5 10.9-5.1l19.7-93c2-8.1-3.1-11.7-8.4-9.3L55.6 113c-7.9 3.2-7.8 7.6-1.4 9.5l36.3 11.4 84.2-53c4-2.4 7.6-1.1 4.6 1.5L100 144.4z" fill="#FFFFFF" />
    </svg>
  );
}

function DiscordMark({ size = 52 }: { size?: number }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}logo-social-discord.svg`}
      alt="Discord"
      style={{ width: size, height: size, borderRadius: '50%', display: 'block' }}
    />
  );
}

type PlatformMeta = { id: AgentPlatform; name: string; handle: string; render: (size: number) => React.ReactNode };

const PLATFORMS: PlatformMeta[] = [
  { id: 'telegram', name: 'Telegram', handle: 'Sheerruan', render: (s) => <TelegramMark size={s} /> },
  { id: 'discord', name: 'Discord', handle: 'sheerruan', render: (s) => <DiscordMark size={s} /> },
];

/* ── Receiver dropdown: only bound platforms are selectable ── */
function ReceiverDropdown({
  platforms,
  active,
  onSelect,
}: {
  platforms: AgentPlatform[];
  active: AgentPlatform | null;
  onSelect: (p: AgentPlatform) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasBound = platforms.length > 0;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const activeMeta = active ? PLATFORMS.find(p => p.id === active) : null;
  const boundItems = PLATFORMS.filter(p => platforms.includes(p.id));

  const [hover, setHover] = useState(false);

  return (
    <div ref={ref} className="relative shrink-0">
      {/* Trigger — Select (Medium) */}
      <button
        type="button"
        disabled={!hasBound}
        onClick={() => hasBound && setOpen(v => !v)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`relative flex items-center ${hasBound ? 'cursor-pointer' : 'cursor-not-allowed'}`}
        style={{
          height: 40,
          padding: '8px 12px',
          gap: 8,
          borderRadius: 'var(--radius-ct-l)',
          background: 'var(--b0-container)',
          fontFamily: FONT,
          fontWeight: 400,
          fontSize: 14,
          lineHeight: '22px',
          letterSpacing: '0.14px',
          minWidth: 160,
          opacity: hasBound ? 1 : 0.5,
        }}
      >
        {/* Border overlay per Select spec */}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'var(--radius-ct-l)',
            border: `0.5px solid ${(hover || open) && hasBound ? 'var(--text-n9)' : 'var(--line-l3)'}`,
            pointerEvents: 'none',
            transition: 'border-color 0.12s ease',
          }}
        />
        {activeMeta ? (
          <>
            {activeMeta.render(20)}
            <span className="flex-1 text-left" style={{ color: 'var(--text-n9)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{activeMeta.name}</span>
          </>
        ) : (
          <span className="flex-1 text-left" style={{ color: 'var(--text-n3)' }}>
            {hasBound ? 'Select receiver' : 'No messenger connected'}
          </span>
        )}
        {/* Arrow — does not rotate (per Select spec) */}
        <span style={{ display: 'inline-flex', opacity: (open || hover) && hasBound ? 1 : 0.22, transition: 'opacity 0.12s ease' }}>
          <CdnIcon name="arrow-down-f2" size={14} color="var(--text-n9)" />
        </span>
      </button>

      {open && hasBound && (
        <div
          className="absolute top-full right-0 mt-[4px] z-50 flex flex-col"
          style={{
            minWidth: 220,
            background: 'var(--b0-container)',
            borderRadius: 'var(--radius-ct-m)',
            padding: '8px 0',
            boxShadow: 'var(--shadow-s)',
          }}
        >
          {/* Dropdown border overlay per Dropdown spec */}
          <span
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              border: '0.5px solid var(--line-l2)',
              borderRadius: 'var(--radius-ct-m)',
              pointerEvents: 'none',
            }}
          />
          {boundItems.map(p => {
            const isActive = active === p.id;
            return (
              <div
                key={p.id}
                className="relative cursor-pointer"
                style={{
                  transition: 'background-color 0.12s ease',
                  backgroundColor: isActive ? 'var(--b-r03)' : 'transparent',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = 'var(--b-r03)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = isActive ? 'var(--b-r03)' : 'transparent'; }}
                onClick={() => { onSelect(p.id); setOpen(false); }}
              >
                <div className="flex items-center" style={{ padding: '7px 16px', gap: 8 }}>
                  {p.render(20)}
                  <span
                    className="flex-1 min-w-0"
                    style={{ fontFamily: FONT, fontSize: 14, lineHeight: '22px', letterSpacing: '0.14px', color: 'var(--text-n9)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  >
                    {p.name}
                  </span>
                  {isActive && <CdnIcon name="check-l1" size={16} color="var(--main-m1)" />}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ── Section with switch toggle + textarea ── */
function ToggleSection({
  title,
  description,
  enabled,
  onToggle,
  value,
  onChange,
  placeholder,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  const taRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = 'auto';
    const next = Math.min(320, Math.max(160, el.scrollHeight));
    el.style.height = `${next}px`;
  }, [value, enabled]);
  return (
    <div className="flex flex-col gap-[var(--spacing-m)]">
      <div className="flex items-center gap-[var(--spacing-m)]">
        <div className="flex-1 min-w-0">
          <p className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'var(--text-n9)', fontFamily: FONT }}>{title}</p>
          <p className="text-[12px] leading-[20px] tracking-[0.12px] mt-[var(--spacing-xxxs)]" style={{ color: 'var(--text-n5)', fontFamily: FONT }}>{description}</p>
        </div>
        <div
          className={`switch${enabled ? ' on' : ''}`}
          role="switch"
          aria-checked={enabled}
          onClick={onToggle}
        >
          <div className="switch-thumb" />
        </div>
      </div>
      {enabled && (
        <textarea
          ref={taRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="p-[var(--spacing-m)] text-[16px] leading-[26px] tracking-[0.16px] outline-none resize-none"
          style={{
            color: 'var(--text-n9)',
            fontFamily: FONT,
            border: '0.5px solid var(--line-l3)',
            background: 'var(--b0-container)',
            borderRadius: 'var(--radius-ct-l)',
            minHeight: 160,
            maxHeight: 320,
            overflowY: 'auto',
          }}
        />
      )}
    </div>
  );
}

export default function AlvaAgentSettings({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const { platforms, active, has, connect, disconnect, setActive } = useAgentPlatforms();
  const INITIAL_PROMPT = '';
  const INITIAL_CUSTOMIZE_ON = true;
  const INITIAL_MEMORY_ON = true;
  const [prompt, setPrompt] = useState(INITIAL_PROMPT);
  const [customizeOn, setCustomizeOn] = useState(INITIAL_CUSTOMIZE_ON);
  const [memoryOn, setMemoryOn] = useState(INITIAL_MEMORY_ON);
  const INITIAL_MEMORY = `Read .claude/skills/frontend-monorepo-conventions/SKILL.md and AGENTS.md for project-level conventions (token system, coding rules, architecture). The alva-design skill is for playbook/widget generation, not for frontend-monorepo coding standards.

**Why:** User corrected that the authoritative token/convention source for this repo is the in-repo skill, not the external alva-design skill.

**How to apply:** When looking up design tokens, component specs, or coding conventions for homepage-ssr, always check .claude/skills/frontend-monorepo-conventions/ first.

Read .claude/skills/frontend-monorepo-conventions/SKILL.md and AGENTS.md for project-level conventions (token system, coding rules, architecture). The alva-design skill is for playbook/widget generation, not for frontend-monorepo coding standards.

**Why:** User corrected that the authoritative token/convention source for this repo is the in-repo skill, not the external alva-design skill.

**How to apply:** When looking up design tokens, component specs, or coding conventions for homepage-ssr, always check .claude/skills/frontend-monorepo-conventions/ first.`;
  const [memory, setMemory] = useState(INITIAL_MEMORY);
  const dirty =
    prompt !== INITIAL_PROMPT ||
    memory !== INITIAL_MEMORY ||
    customizeOn !== INITIAL_CUSTOMIZE_ON ||
    memoryOn !== INITIAL_MEMORY_ON;

  return (
    <SettingsLayout active="alva-agent" onNavigate={onNavigate} mapTo={{ 'alva-agent': 'agent' }}>

      <h1 className="text-[28px] leading-[38px] tracking-[0.28px]" style={{ color: 'var(--text-n9)', fontFamily: FONT, fontWeight: 400 }}>Alva Agent</h1>

      {/* Connected App */}
      <div className="flex flex-col gap-[var(--spacing-m)]">
        <div className="flex items-center justify-between gap-[var(--spacing-m)]">
          <div className="min-w-0 flex-1">
            <p className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'var(--text-n9)', fontFamily: FONT }}>Connected App</p>
            <p className="text-[12px] leading-[20px] tracking-[0.12px] mt-[var(--spacing-xxxs)]" style={{ color: 'var(--text-n5)', fontFamily: FONT }}>
              Choose the messaging app for your Alva Agent (single platform).
            </p>
          </div>
          <ReceiverDropdown platforms={platforms} active={active} onSelect={setActive} />
        </div>

        <div className="flex flex-col gap-[var(--spacing-m)]">
          {PLATFORMS.map(p => {
            const isBound = has(p.id);
            return (
              <div
                key={p.id}
                className="flex items-center gap-[var(--spacing-s)] p-[var(--spacing-l)] rounded-[var(--radius-ct-l)]"
                style={{ background: 'var(--grey-g01)' }}
              >
                {p.render(40)}
                <div className="flex-1 min-w-0">
                  <p className="text-[16px] leading-[26px]" style={{ color: 'var(--text-n9)', fontFamily: FONT }}>{p.name}</p>
                  {isBound && (
                    <p className="text-[14px] leading-[22px] mt-[var(--spacing-xxxs)]" style={{ color: 'var(--text-n5)', fontFamily: FONT }}>{p.handle}</p>
                  )}
                </div>
                <button
                  onClick={() => (isBound ? disconnect(p.id) : connect(p.id))}
                  className="text-[14px] leading-[22px] cursor-pointer"
                  style={{ color: isBound ? 'var(--text-n5)' : 'var(--main-m1)', background: 'none', border: 'none', fontFamily: FONT, fontWeight: 400 }}
                >
                  {isBound ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Customize */}
      <ToggleSection
        title="Customize Your Assistant"
        description="Define the personality, tone, and response style."
        enabled={customizeOn}
        onToggle={() => setCustomizeOn(v => !v)}
        value={prompt}
        onChange={setPrompt}
        placeholder="Define your assistant's identity: name, tone, and response style"
      />

      {/* Generate Memory from Chat History */}
      <ToggleSection
        title="Generate Memory from Chat History"
        description="Allow Alva to remember relevant context from your chats."
        enabled={memoryOn}
        onToggle={() => setMemoryOn(v => !v)}
        value={memory}
        onChange={setMemory}
        placeholder="Your accumulated memory will appear here."
      />

      <button
        disabled={!dirty}
        className={`btn btn-large w-[120px] ${dirty ? 'btn-primary' : 'btn-primary btn-disabled'}`}
      >
        Save
      </button>
    </SettingsLayout>
  );
}
