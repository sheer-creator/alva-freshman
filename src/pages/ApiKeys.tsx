/**
 * [INPUT]: SettingsLayout
 * [OUTPUT]: API Key 页 — Alva API Keys / Secrets Vault / Quick Start
 * [POS]: 页面层
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { SettingsLayout } from '@/app/components/shell/SettingsLayout';
import { CdnIcon } from '@/app/components/shared/CdnIcon';

const FONT = "'Delight', sans-serif";

type KeyItem = { id: string; name: string; value: string };

const INITIAL_KEYS: KeyItem[] = [
  { id: 'k1', name: 'Open Claw Key',     value: 'lh_sk_69abcdef012345678901abcdef2df9' },
  { id: 'k2', name: 'Claude Key',        value: 'lh_sk_69zzzzzzzzzzzzzzzzzzzzzzzz2df9' },
  { id: 'k3', name: 'Gemini Private Key', value: 'lh_sk_69yyyyyyyyyyyyyyyyyyyyyyyy2df9' },
];

const INITIAL_VAULT: KeyItem[] = [
  { id: 'v1', name: 'Sheer Test', value: 'lh_sk_69xxxxxxxxxxxxxxxxxxxxxxxx2df9' },
];

function maskKey(value: string) {
  if (value.length <= 10) return value;
  return `${value.slice(0, 6)}${'*'.repeat(Math.max(0, value.length - 10))}${value.slice(-4)}`;
}

/* ========== Key Row ========== */

function KeyRow({ item, onRename, onDelete }: { item: KeyItem; onRename: (id: string) => void; onDelete: (id: string) => void }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard?.writeText(item.value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex items-center gap-[16px] px-[20px] py-[16px] rounded-[8px]" style={{ background: 'rgba(0,0,0,0.02)' }}>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] leading-[22px] font-medium" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>{item.name}</p>
        <div className="flex items-center gap-[8px] mt-[2px]">
          <code className="text-[12px] leading-[20px] font-mono" style={{ color: 'rgba(0,0,0,0.5)' }}>{maskKey(item.value)}</code>
          <button onClick={handleCopy} className="cursor-pointer" style={{ background: 'none', border: 'none', padding: 0 }} title="Copy">
            <CdnIcon name="copy-l" size={14} color={copied ? '#49a3a6' : 'rgba(0,0,0,0.5)'} />
          </button>
        </div>
      </div>
      <button onClick={() => onRename(item.id)} className="w-[32px] h-[32px] flex items-center justify-center rounded-[6px] cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.04)]" style={{ background: 'none', border: 'none' }} title="Rename">
        <CdnIcon name="edit-l1" size={16} color="rgba(0,0,0,0.7)" />
      </button>
      <button onClick={() => onDelete(item.id)} className="w-[32px] h-[32px] flex items-center justify-center rounded-[6px] cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.04)]" style={{ background: 'none', border: 'none' }} title="Delete">
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
          <path d="M3.75 5.25H14.25" stroke="rgba(0,0,0,0.7)" strokeLinecap="round" strokeWidth="1.4" />
          <path d="M6.75 2.99988H11.25" stroke="rgba(0,0,0,0.7)" strokeLinecap="round" strokeWidth="1.4" />
          <path d="M5.25 5.25V13.125C5.25 13.9534 5.92157 14.625 6.75 14.625H11.25C12.0784 14.625 12.75 13.9534 12.75 13.125V5.25" stroke="rgba(0,0,0,0.7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
        </svg>
      </button>
    </div>
  );
}

/* ========== Section Header ========== */

function SectionHeader({ title, subtitle, right }: { title: string; subtitle?: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>{title}</p>
        {subtitle && <p className="text-[12px] leading-[20px] tracking-[0.12px] mt-[2px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}

/* ========== Page ========== */

export default function ApiKeys({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [keys, setKeys] = useState<KeyItem[]>(INITIAL_KEYS);
  const [vault, setVault] = useState<KeyItem[]>(INITIAL_VAULT);

  const createKey = () => {
    const n = keys.length + 1;
    setKeys(prev => [{ id: `k${Date.now()}`, name: `New Key ${n}`, value: `lh_sk_69${Math.random().toString(36).slice(2, 30)}2df9` }, ...prev]);
  };

  const renameKey = (setter: typeof setKeys) => (id: string) => {
    setter(prev => {
      const cur = prev.find(k => k.id === id);
      if (!cur) return prev;
      const next = window.prompt('Rename', cur.name)?.trim();
      if (!next) return prev;
      return prev.map(k => (k.id === id ? { ...k, name: next } : k));
    });
  };

  const deleteKey = (setter: typeof setKeys) => (id: string) => {
    setter(prev => {
      const cur = prev.find(k => k.id === id);
      if (!cur || !window.confirm(`Delete ${cur.name}?`)) return prev;
      return prev.filter(k => k.id !== id);
    });
  };

  return (
    <SettingsLayout active="api-keys" onNavigate={onNavigate}>

      <h1 className="text-[28px] leading-[38px] tracking-[0.28px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT, fontWeight: 400 }}>API Key</h1>

      {/* Alva API Keys */}
      <SectionHeader
        title="Alva API Keys"
        subtitle="Let your agents use Alva Skill to build Playbooks."
        right={
          <button
            onClick={createKey}
            className="flex items-center gap-[4px] h-[28px] px-[12px] rounded-[6px] text-[12px] font-medium cursor-pointer"
            style={{ color: '#fff', background: '#49a3a6', border: 'none', fontFamily: FONT }}
          >
            <span className="text-[14px] leading-none">+</span>
            Create
          </button>
        }
      />
      <div className="flex flex-col gap-[8px] -mt-[12px]">
        {keys.map(k => (
          <KeyRow key={k.id} item={k} onRename={renameKey(setKeys)} onDelete={deleteKey(setKeys)} />
        ))}
      </div>

      {/* Secrets Vault */}
      <SectionHeader
        title="Secrets Vault"
        subtitle="Store third-party API keys for use in your Playbooks — no hardcoding needed."
        right={
          <button
            className="flex items-center gap-[4px] h-[28px] px-[12px] rounded-[6px] text-[12px] font-medium cursor-pointer"
            style={{ color: '#fff', background: '#49a3a6', border: 'none', fontFamily: FONT }}
            onClick={() => setVault(prev => [...prev, { id: `v${Date.now()}`, name: 'New Secret', value: `lh_sk_69${Math.random().toString(36).slice(2, 30)}2df9` }])}
          >
            <CdnIcon name="upload-l" size={12} color="#fff" />
            Upload
          </button>
        }
      />
      <div className="flex flex-col gap-[8px] -mt-[12px]">
        {vault.map(k => (
          <KeyRow key={k.id} item={k} onRename={renameKey(setVault)} onDelete={deleteKey(setVault)} />
        ))}
      </div>

      {/* Quick Start */}
      <div className="rounded-[12px] p-[24px] flex flex-col gap-[16px]" style={{ background: 'rgba(73,163,166,0.04)', border: '0.5px solid rgba(73,163,166,0.2)' }}>
        <div className="flex items-center gap-[8px]">
          <span style={{ fontSize: 18 }}>📚</span>
          <span className="text-[18px] leading-[28px] font-medium" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>Quick Start</span>
        </div>
        <p className="text-[13px] leading-[22px]" style={{ color: 'rgba(0,0,0,0.7)', fontFamily: FONT }}>
          For full setup instructions, configuration details, and examples, see the{' '}
          <a href="https://github.com/alva-ai" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline" style={{ color: '#49a3a6' }}>GitHub repo</a>.
        </p>
        <div className="grid grid-cols-3 gap-[12px]">
          {[
            { title: 'Install Alva Skill',       desc: 'Add Alva Skill to your agent from GitHub.' },
            { title: 'Build and Ship Playbooks', desc: 'Use natural language to build dashboards, backtest strategies, and publish live investing playbooks' },
            { title: 'Configure Your API Key',   desc: 'Set your Alva API key to enable platform access.' },
          ].map((q) => (
            <div key={q.title} className="p-[16px] rounded-[8px] flex flex-col gap-[6px]" style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)' }}>
              <p className="text-[14px] leading-[22px] font-medium" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>{q.title}</p>
              <p className="text-[12px] leading-[20px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>{q.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </SettingsLayout>
  );
}
