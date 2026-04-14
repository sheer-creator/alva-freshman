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
  { id: 'k1', name: 'Open Claw Key',      value: 'eyJhbGciOi' },
  { id: 'k2', name: 'Claude Key',         value: 'eyJhbGciOi' },
  { id: 'k3', name: 'Gemini Private Key', value: 'eyJhbGciOi' },
];

const INITIAL_VAULT: KeyItem[] = [
  { id: 'v1', name: 'Sheer Test', value: 'eyJhbGciOi' },
];

function maskKey(value: string) {
  return `${value}${'*'.repeat(24)}`;
}

/* ========== Key Row ========== */

function KeyRow({ item, index, onRename, onDelete }: { item: KeyItem; index: number; onRename: (id: string) => void; onDelete: (id: string) => void }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard?.writeText(item.value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const hasBg = index % 2 === 0;

  return (
    <div
      className="flex items-center gap-[var(--spacing-m)] p-[var(--spacing-m)] rounded-[var(--radius-ct-m)]"
      style={{ background: hasBg ? 'var(--b-r02)' : 'transparent' }}
    >
      <div className="flex-1 min-w-0 flex flex-col gap-[var(--spacing-xxs)]">
        <p className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'var(--text-n9)', fontFamily: FONT, fontWeight: 400 }}>
          {item.name}
        </p>
        <div className="flex items-center gap-[var(--spacing-xs)]">
          <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5)', fontFamily: FONT, fontWeight: 400 }}>
            {maskKey(item.value)}
          </span>
          <button onClick={handleCopy} className="cursor-pointer shrink-0" style={{ background: 'none', border: 'none', padding: 0 }} title="Copy">
            <CdnIcon name="copy-l" size={16} color={copied ? 'var(--main-m1)' : 'var(--text-n5)'} />
          </button>
        </div>
      </div>
      <button onClick={() => onRename(item.id)} className="shrink-0 cursor-pointer" style={{ background: 'none', border: 'none', padding: 0 }} title="Rename">
        <CdnIcon name="edit-l1" size={16} color="var(--text-n9)" />
      </button>
      <button onClick={() => onDelete(item.id)} className="shrink-0 cursor-pointer" style={{ background: 'none', border: 'none', padding: 0 }} title="Delete">
        <CdnIcon name="delete-l" size={16} color="var(--text-n9)" />
      </button>
    </div>
  );
}

/* ========== Section Header ========== */

function SectionHeader({ title, subtitle, right }: { title: string; subtitle?: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-[var(--spacing-xxxl)] max-w-[960px] w-full">
      <div className="flex-1 min-w-0 flex flex-col gap-[var(--spacing-xxs)]">
        <p className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'var(--text-n9)', fontFamily: FONT, fontWeight: 400 }}>{title}</p>
        {subtitle && <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5)', fontFamily: FONT, fontWeight: 400 }}>{subtitle}</p>}
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
    setKeys(prev => [{ id: `k${Date.now()}`, name: `New Key ${n}`, value: 'eyJhbGciOi' }, ...prev]);
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

      <h1 className="text-[28px] leading-[38px] tracking-[0.28px]" style={{ color: 'var(--text-n9)', fontFamily: FONT, fontWeight: 400 }}>API Key</h1>

      {/* Alva API Keys */}
      <SectionHeader
        title="Alva API Keys"
        subtitle="Let your agents use Alva Skill to build Playbooks."
        right={
          <button onClick={createKey} className="btn btn-primary btn-small" style={{ paddingLeft: 'var(--spacing-m)', paddingRight: 'var(--spacing-m)' }}>
            <CdnIcon name="add-l2" size={14} color="#fff" />
            <span style={{ fontFamily: FONT }}>Create</span>
          </button>
        }
      />
      <div className="flex flex-col gap-[var(--spacing-min)] max-w-[960px] w-full pb-[var(--spacing-xs)]">
        {keys.map((k, i) => (
          <KeyRow key={k.id} item={k} index={i} onRename={renameKey(setKeys)} onDelete={deleteKey(setKeys)} />
        ))}
      </div>

      {/* Secrets Vault */}
      <SectionHeader
        title="Secrets Vault"
        subtitle="Store third-party API keys for use in your Playbooks — no hardcoding needed."
        right={
          <button className="btn btn-primary btn-small" style={{ paddingLeft: 'var(--spacing-m)', paddingRight: 'var(--spacing-m)' }} onClick={() => setVault(prev => [...prev, { id: `v${Date.now()}`, name: 'New Secret', value: 'eyJhbGciOi' }])}>
            <CdnIcon name="upload-l" size={14} color="#fff" />
            <span style={{ fontFamily: FONT }}>Upload</span>
          </button>
        }
      />
      <div className="flex flex-col gap-[var(--spacing-min)] max-w-[960px] w-full pb-[var(--spacing-xs)]">
        {vault.map((k, i) => (
          <KeyRow key={k.id} item={k} index={i} onRename={renameKey(setVault)} onDelete={deleteKey(setVault)} />
        ))}
      </div>

      {/* Quick Start */}
      <div className="max-w-[960px] w-full rounded-[var(--radius-ct-l)] overflow-hidden p-[var(--spacing-xl)] flex flex-col gap-[var(--spacing-l)]" style={{ background: 'rgba(73,163,166,0.08)', border: '1px solid var(--line-l07)' }}>
        <div className="flex flex-col gap-[var(--spacing-xs)]">
          <div className="flex items-center gap-[var(--spacing-xs)] h-[30px]">
            <CdnIcon name="researcher-l1" size={24} color="var(--main-m1)" />
            <span className="text-[20px] leading-[30px] tracking-[0.2px]" style={{ color: 'var(--text-n10)', fontFamily: FONT, fontWeight: 400 }}>Quick Start</span>
          </div>
          <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n9)', fontFamily: FONT, fontWeight: 400 }}>
            For full setup instructions, configuration details, and examples, see the{' '}
            <a href="https://github.com/alva-ai" target="_blank" rel="noopener noreferrer" style={{ color: '#2196f3' }}>GitHub repo</a>.
          </p>
        </div>
        <div className="flex gap-[var(--spacing-m)] items-stretch flex-wrap">
          {[
            { title: 'Install Alva Skill',       desc: 'Add Alva Skill to your agent from GitHub.' },
            { title: 'Build and Ship Playbooks', desc: 'Use natural language to build dashboards, backtest strategies, and publish live investing playbooks' },
            { title: 'Configure Your API Key',   desc: 'Set your Alva API key to enable platform access.' },
          ].map((q) => (
            <div key={q.title} className="flex-1 min-w-[200px] px-[var(--spacing-l)] py-[var(--spacing-m)] rounded-[var(--radius-ct-l)] flex flex-col gap-[var(--spacing-xs)]" style={{ background: 'rgba(255,255,255,0.8)' }}>
              <p className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'var(--text-n10)', fontFamily: FONT, fontWeight: 500 }}>{q.title}</p>
              <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n9)', fontFamily: FONT, fontWeight: 400 }}>{q.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </SettingsLayout>
  );
}
