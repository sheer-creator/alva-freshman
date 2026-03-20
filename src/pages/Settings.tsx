/**
 * [INPUT]: AppShell
 * [OUTPUT]: 设置页 — Account / API Keys / Plan 三大模块
 * [POS]: 页面层 — 用户设置中心
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { AVATAR_COLOR_PALETTE } from '@/lib/chart-theme';

/* ========== Shared ========== */

type Section = 'account' | 'api-keys' | 'plan';

function BackArrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <path d="M12.5 15L7.5 10L12.5 5" stroke="rgba(0,0,0,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[8px] border border-[rgba(0,0,0,0.08)] bg-white" style={{ boxShadow: 'var(--shadow-xs)' }}>
      <div className="px-[24px] py-[16px] border-b border-[rgba(0,0,0,0.06)]">
        <p className="text-[15px] font-medium leading-[22px]" style={{ color: 'var(--text-n9)' }}>{title}</p>
      </div>
      <div className="px-[24px] py-[20px]">{children}</div>
    </div>
  );
}

/* ========== Account Section ========== */

const USER = { name: 'YGGYLL', email: 'sheer@alva.xyz', joinDate: 'Mar 2026' };

function UserAvatar({ name, size = 48 }: { name: string; size?: number }) {
  const initial = name.trim().charAt(0).toUpperCase();
  const color = AVATAR_COLOR_PALETTE[[...name].reduce((s, c) => s + c.charCodeAt(0), 0) % AVATAR_COLOR_PALETTE.length];
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: size * 0.44, color: '#fff', lineHeight: 1, fontFamily: "'Delight', sans-serif" }}>{initial}</span>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-[12px] border-b border-[rgba(0,0,0,0.05)] last:border-b-0">
      <span className="text-[13px] leading-[20px]" style={{ color: 'var(--text-n5)' }}>{label}</span>
      <span className="text-[13px] leading-[20px]" style={{ color: 'var(--text-n9)' }}>{value}</span>
    </div>
  );
}

function AccountSection() {
  return (
    <div className="flex flex-col gap-[20px]">
      <SectionCard title="Profile">
        <div className="flex items-center gap-[16px] pb-[16px] border-b border-[rgba(0,0,0,0.05)]">
          <UserAvatar name={USER.name} />
          <div className="flex flex-col gap-[2px]">
            <span className="text-[16px] font-medium leading-[24px]" style={{ color: 'var(--text-n9)' }}>{USER.name}</span>
            <span className="text-[13px] leading-[20px]" style={{ color: 'var(--text-n5)' }}>{USER.email}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <InfoRow label="Display Name" value={USER.name} />
          <InfoRow label="Email" value={USER.email} />
          <InfoRow label="Member Since" value={USER.joinDate} />
        </div>
      </SectionCard>

      <SectionCard title="Danger Zone">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-[2px]">
            <span className="text-[13px] leading-[20px]" style={{ color: 'var(--text-n9)' }}>Delete Account</span>
            <span className="text-[12px] leading-[18px]" style={{ color: 'var(--text-n5)' }}>Permanently delete your account and all associated data.</span>
          </div>
          <button
            className="shrink-0 h-[34px] px-[16px] rounded-[6px] text-[13px] font-medium cursor-pointer transition-colors border border-[rgba(224,83,87,0.3)] hover:bg-[rgba(224,83,87,0.05)]"
            style={{ color: '#e05357', background: 'transparent' }}
          >
            Delete
          </button>
        </div>
      </SectionCard>
    </div>
  );
}

/* ========== API Keys Section ========== */

type ApiKeyItem = { id: string; name: string; value: string; revealed: boolean };

const INITIAL_KEYS: ApiKeyItem[] = [
  { id: 'oa-1', name: 'oa-1', value: 'alva_2dr7qx9v4m0s8k6n1w5p3c7j9r2h4t6x779a', revealed: false },
];

function maskApiKey(value: string) {
  if (value.length <= 10) return value;
  return `${value.slice(0, 6)}${'*'.repeat(value.length - 10)}${value.slice(-4)}`;
}

function buildMockApiKey(index: number): ApiKeyItem {
  const seed = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 18)}`;
  return { id: `oa-${Date.now()}`, name: `oa-${index}`, value: `alva_2${seed.slice(0, 28)}${seed.slice(-4)}`, revealed: true };
}

function SmallActionBtn({ title, onClick, children }: { title: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" title={title} onClick={onClick}
      className="flex size-[32px] items-center justify-center rounded-[6px] text-[rgba(0,0,0,0.45)] transition-colors hover:bg-[rgba(0,0,0,0.05)] hover:text-[rgba(0,0,0,0.8)]"
    >{children}</button>
  );
}

function ApiKeysSection() {
  const [keys, setKeys] = useState<ApiKeyItem[]>(INITIAL_KEYS);

  const handleCreate = () => setKeys(cur => [buildMockApiKey(cur.length + 1), ...cur]);
  const handleRename = (id: string) => {
    const k = keys.find(k => k.id === id);
    if (!k) return;
    const next = window.prompt('Rename API key', k.name)?.trim();
    if (!next) return;
    setKeys(cur => cur.map(k => k.id === id ? { ...k, name: next } : k));
  };
  const handleToggle = (id: string) => setKeys(cur => cur.map(k => k.id === id ? { ...k, revealed: !k.revealed } : k));
  const handleDelete = (id: string) => {
    const k = keys.find(k => k.id === id);
    if (!k || !window.confirm(`Delete ${k.name}?`)) return;
    setKeys(cur => cur.filter(k => k.id !== id));
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <SectionCard title="Your API Keys">
        <div className="flex flex-col gap-[12px]">
          <div className="flex items-center justify-between pb-[12px] border-b border-[rgba(0,0,0,0.05)]">
            <p className="text-[13px] leading-[20px]" style={{ color: 'var(--text-n5)' }}>
              Authenticate third-party agents with your Alva API key.
            </p>
            <button onClick={handleCreate}
              className="shrink-0 h-[34px] px-[16px] rounded-[6px] text-[13px] font-medium cursor-pointer transition-colors text-white hover:opacity-90"
              style={{ background: '#49A3A6' }}
            >Create New Key</button>
          </div>

          {keys.map(k => (
            <div key={k.id} className="flex items-center gap-[12px] rounded-[6px] p-[12px]" style={{ background: 'var(--grey-g01)' }}>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium leading-[22px]" style={{ color: 'var(--text-n9)' }}>{k.name}</p>
                <p className="text-[13px] leading-[20px] font-mono truncate mt-[2px]" style={{ color: 'var(--text-n5)' }}>
                  {k.revealed ? k.value : maskApiKey(k.value)}
                </p>
              </div>
              <div className="flex items-center gap-[2px] shrink-0">
                <SmallActionBtn title="Rename" onClick={() => handleRename(k.id)}>
                  <svg fill="none" height="15" viewBox="0 0 18 18" width="15"><path d="M3.75 12.75L3 15L5.25 14.25L13.875 5.625L12.375 4.125L3.75 12.75Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" /><path d="M11.625 4.875L13.125 6.375" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" /></svg>
                </SmallActionBtn>
                <SmallActionBtn title={k.revealed ? 'Hide' : 'Reveal'} onClick={() => handleToggle(k.id)}>
                  <svg fill="none" height="15" viewBox="0 0 18 18" width="15"><path d="M1.5 9C2.7 6 5.4 4.125 9 4.125C12.6 4.125 15.3 6 16.5 9C15.3 12 12.6 13.875 9 13.875C5.4 13.875 2.7 12 1.5 9Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" /><circle cx="9" cy="9" r="2.25" stroke="currentColor" strokeWidth="1.4" /></svg>
                </SmallActionBtn>
                <SmallActionBtn title="Delete" onClick={() => handleDelete(k.id)}>
                  <svg fill="none" height="15" viewBox="0 0 18 18" width="15"><path d="M3.75 5.25H14.25" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" /><path d="M6.75 3H11.25" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" /><path d="M5.25 5.25V13.125C5.25 13.9534 5.92157 14.625 6.75 14.625H11.25C12.0784 14.625 12.75 13.9534 12.75 13.125V5.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" /></svg>
                </SmallActionBtn>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Agent Setup">
        <div className="flex flex-col gap-[8px]">
          <p className="text-[13px] leading-[20px]" style={{ color: 'var(--text-n7)' }}>
            Inject your key into your agent runtime environment:
          </p>
          <div className="rounded-[6px] bg-[#111214] px-[14px] py-[10px] mt-[4px]">
            <code className="block overflow-x-auto whitespace-nowrap font-mono text-[13px] leading-[20px] text-white">
              export ALVA_API_KEY="{keys[0]?.value ?? 'alva_your_key_here'}"
            </code>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

/* ========== Plan Section ========== */

const PLAN = {
  name: 'Pro', price: '$29', interval: 'month',
  renewDate: 'Apr 20, 2026', startDate: 'Mar 20, 2026',
};

const CREDITS = {
  api:     { used: 8420, total: 50000, label: 'API Calls' },
  skill:   { used: 312,  total: 1000,  label: 'Skill Executions' },
  storage: { used: 2.4,  total: 10,    label: 'Storage (GB)', unit: 'GB' },
};

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full h-[6px] rounded-full" style={{ background: 'rgba(0,0,0,0.06)' }}>
      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

function CreditRow({ used, total, label, unit, color }: { used: number; total: number; label: string; unit?: string; color: string }) {
  const fmt = (n: number) => unit ? `${n} ${unit}` : n.toLocaleString();
  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex items-center justify-between">
        <span className="text-[13px] leading-[20px]" style={{ color: 'var(--text-n7)' }}>{label}</span>
        <span className="text-[13px] leading-[20px]" style={{ color: 'var(--text-n5)' }}>{fmt(used)} / {fmt(total)}</span>
      </div>
      <ProgressBar value={used} max={total} color={color} />
    </div>
  );
}

function PlanSection({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <div className="flex flex-col gap-[20px]">
      <SectionCard title="Subscription">
        <div className="flex flex-col gap-[16px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[10px]">
              <span className="text-[16px] font-medium leading-[24px]" style={{ color: 'var(--text-n9)' }}>{PLAN.name}</span>
              <span className="text-[11px] font-medium leading-[16px] px-[8px] py-[2px] rounded-full text-white" style={{ background: '#49A3A6' }}>Active</span>
            </div>
            <div className="flex items-baseline gap-[2px]">
              <span className="text-[20px] leading-[28px]" style={{ color: 'var(--text-n9)', fontWeight: 400 }}>{PLAN.price}</span>
              <span className="text-[13px] leading-[20px]" style={{ color: 'var(--text-n5)' }}>/ {PLAN.interval}</span>
            </div>
          </div>
          <div className="flex gap-[24px]">
            <div className="flex flex-col gap-[2px]">
              <span className="text-[12px] leading-[18px]" style={{ color: 'var(--text-n5)' }}>Started</span>
              <span className="text-[13px] leading-[20px]" style={{ color: 'var(--text-n7)' }}>{PLAN.startDate}</span>
            </div>
            <div className="flex flex-col gap-[2px]">
              <span className="text-[12px] leading-[18px]" style={{ color: 'var(--text-n5)' }}>Next Billing</span>
              <span className="text-[13px] leading-[20px]" style={{ color: 'var(--text-n7)' }}>{PLAN.renewDate}</span>
            </div>
          </div>
          <div className="flex gap-[8px] pt-[4px]">
            <button className="h-[34px] px-[16px] rounded-[6px] text-[13px] font-medium cursor-pointer transition-colors text-white hover:opacity-90" style={{ background: '#49A3A6' }} onClick={() => onNavigate('pricing')}>Change Plan</button>
            <button className="h-[34px] px-[16px] rounded-[6px] text-[13px] font-medium cursor-pointer transition-colors border border-[rgba(0,0,0,0.15)] hover:bg-[rgba(0,0,0,0.03)]" style={{ color: 'var(--text-n5)', background: 'transparent' }}>Cancel Subscription</button>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Credits Usage">
        <div className="flex flex-col gap-[20px]">
          <CreditRow used={CREDITS.api.used} total={CREDITS.api.total} label={CREDITS.api.label} color="#49A3A6" />
          <CreditRow used={CREDITS.skill.used} total={CREDITS.skill.total} label={CREDITS.skill.label} color="#2196F3" />
          <CreditRow used={CREDITS.storage.used} total={CREDITS.storage.total} label={CREDITS.storage.label} unit={CREDITS.storage.unit} color="#2a9b7d" />
          <p className="text-[12px] leading-[18px]" style={{ color: 'var(--text-n3)' }}>Usage resets on {PLAN.renewDate}</p>
        </div>
      </SectionCard>
    </div>
  );
}

/* ========== Nav Items ========== */

function KeyIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ display: 'block' }}>
      <path d="M12.5005 2C15.5379 2.00018 18.0005 4.46254 18.0005 7.5C18.0005 10.5375 15.5379 12.9998 12.5005 13C11.0342 13 9.70321 12.4245 8.71725 11.4893L6.20553 14.001L7.50143 15.2979C7.89068 15.6883 7.89107 16.3207 7.50143 16.7109L6.20748 18.0059C5.8171 18.3962 5.18396 18.396 4.79342 18.0059L3.49752 16.709L2.85397 17.3535C2.65877 17.5487 2.34221 17.5486 2.14693 17.3535C1.95167 17.1583 1.95167 16.8417 2.14693 16.6465L8.05514 10.7373C7.39241 9.8289 7.00045 8.71056 7.00045 7.5C7.00045 4.46243 9.46288 2 12.5005 2ZM4.20455 16.002L5.50045 17.2988L6.79342 16.0039L5.4985 14.708L4.20455 16.002ZM12.5005 3C10.0152 3 8.00045 5.01472 8.00045 7.5C8.00045 9.98528 10.0152 12 12.5005 12C14.9856 11.9998 17.0005 9.98517 17.0005 7.5C17.0005 5.01483 14.9856 3.00018 12.5005 3Z" fill="black" fillOpacity="0.9" />
    </svg>
  );
}

function CdnIcon({ name, size = 18 }: { name: string; size?: number }) {
  if (name === 'key-l') return <KeyIcon size={size} />;
  return <img src={`https://alva-ai-static.b-cdn.net/icons/${name}.svg`} alt="" width={size} height={size} style={{ display: 'block', opacity: 'inherit' }} />;
}

const SECTIONS: { id: Section; label: string; iconName: string }[] = [
  { id: 'account',  label: 'Account',  iconName: 'me-f' },
  { id: 'api-keys', label: 'API Keys', iconName: 'key-l' },
  { id: 'plan',     label: 'Plan',     iconName: 'open-interest-l' },
];

/* ========== 页面 ========== */

export default function Settings({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [section, setSection] = useState<Section>('account');

  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else onNavigate('home');
  };

  return (
    <div className="fixed inset-0 z-[10] flex bg-white">
      {/* Left Nav */}
      <div className="w-[220px] shrink-0 border-r border-[rgba(0,0,0,0.06)] pt-[24px] pb-[40px] px-[16px] flex flex-col gap-[4px] bg-[#fafafa]">
        <button type="button" onClick={goBack}
          className="flex items-center gap-[4px] text-[13px] leading-[20px] w-fit rounded-[4px] px-[4px] py-[2px] mb-[16px] cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.04)]"
          style={{ color: 'var(--text-n5)' }}
        >
          <BackArrow />
          <span>Back</span>
        </button>

        <p className="text-[11px] font-medium leading-[16px] tracking-[0.5px] uppercase px-[8px] mb-[4px]" style={{ color: 'var(--text-n3)' }}>Settings</p>

        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => setSection(s.id)}
            className={`flex items-center gap-[8px] w-full rounded-[6px] px-[8px] py-[7px] text-[13px] leading-[20px] text-left cursor-pointer transition-colors ${
              section === s.id
                ? 'bg-[rgba(73,163,166,0.08)] text-[#49A3A6] font-medium'
                : 'text-[rgba(0,0,0,0.6)] hover:bg-[rgba(0,0,0,0.03)]'
            }`}
          >
            <span className={section === s.id ? 'opacity-80' : 'opacity-40'}><CdnIcon name={s.iconName} /></span>
            {s.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 overflow-y-auto pt-[24px] pb-[80px] px-[40px]">
          <h1 className="text-[24px] leading-[32px] mb-[24px]" style={{ color: 'var(--text-n9)', fontWeight: 400 }}>
            {SECTIONS.find(s => s.id === section)?.label}
          </h1>
        <div className="max-w-[600px]">
          {section === 'account' && <AccountSection />}
          {section === 'api-keys' && <ApiKeysSection />}
          {section === 'plan' && <PlanSection onNavigate={onNavigate} />}
        </div>
      </div>
    </div>
  );
}
