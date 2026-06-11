/**
 * [INPUT]: SettingsLayout
 * [OUTPUT]: API Key settings page matching Figma Setting/API Keys
 * [POS]: settings page
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { SettingsLayout } from '@/app/components/shell/SettingsLayout';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import {
  IconButton,
  PrimaryButton,
  SETTINGS_FONT,
  SettingsSection,
} from '@/app/components/shell/settings-ui';

type KeyItem = { id: string; name: string; value: string; icon: 'openclaw' | 'claude' | 'gemini' | 'plain' };

const INITIAL_KEYS: KeyItem[] = [
  { id: 'k1', name: 'Open Claw Key', value: 'eyJhbGciOi', icon: 'openclaw' },
  { id: 'k2', name: 'Claude Key', value: 'eyJhbGciOi', icon: 'claude' },
  { id: 'k3', name: 'Gemini Private Key', value: 'eyJhbGciOi', icon: 'gemini' },
];

const INITIAL_VAULT: KeyItem[] = [
  { id: 'v1', name: 'Sheer Test', value: 'eyJhbGciOi', icon: 'plain' },
];

function maskKey(value: string) {
  return `${value}${'*'.repeat(24)}`;
}

function KeyLogo({ icon }: { icon: KeyItem['icon'] }) {
  if (icon === 'plain') return null;
  const src = {
    openclaw: 'logo-social-open-claw',
    claude: 'logo-social-claude',
    gemini: `${import.meta.env.BASE_URL}logo-social-gemini.png`,
  }[icon];
  return (
    <span className="size-[24px] flex items-center justify-center shrink-0">
      <CdnIcon name={src} size={24} />
    </span>
  );
}

function KeyRow({
  item,
  copyable = true,
  onRename,
  onDelete,
}: {
  item: KeyItem;
  copyable?: boolean;
  onRename: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard?.writeText(item.value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="w-full min-h-[84px] px-[20px] py-[16px] rounded-[8px] flex items-center gap-[16px]" style={{ border: '0.5px solid var(--line-l2)', background: '#fff' }}>
      <div className="flex-1 min-w-0 flex flex-col gap-[4px]">
        <div className="flex items-center gap-[8px]">
          <KeyLogo icon={item.icon} />
          <p className="flex-1 min-w-0 text-[16px] leading-[26px] tracking-[0.16px] truncate" style={{ color: 'var(--text-n9)', fontFamily: SETTINGS_FONT }}>
            {item.name}
          </p>
        </div>
        <div className="flex items-center gap-[8px]">
          <p className="text-[14px] leading-[22px] tracking-[0.14px] truncate" style={{ color: 'var(--text-n5)', fontFamily: SETTINGS_FONT }}>
            {maskKey(item.value)}
          </p>
          {copyable && (
            <button type="button" onClick={handleCopy} className="border-none bg-transparent cursor-pointer p-0 shrink-0" title="Copy">
              <CdnIcon name="copy-l" size={16} color={copied ? 'var(--main-m1)' : 'var(--text-n5)'} />
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center gap-[8px] shrink-0">
        <IconButton icon="edit-l1" label="Rename" onClick={() => onRename(item.id)} />
        <IconButton icon="delete-l" label="Delete" onClick={() => onDelete(item.id)} />
      </div>
    </div>
  );
}

export default function ApiKeys({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [keys, setKeys] = useState<KeyItem[]>(INITIAL_KEYS);
  const [vault, setVault] = useState<KeyItem[]>(INITIAL_VAULT);

  const createKey = () => {
    setKeys((current) => [
      { id: `k${Date.now()}`, name: `New Key ${current.length + 1}`, value: 'eyJhbGciOi', icon: 'openclaw' },
      ...current,
    ]);
  };

  const renameItem = (setter: typeof setKeys) => (id: string) => {
    setter((current) => {
      const item = current.find((entry) => entry.id === id);
      if (!item) return current;
      const next = window.prompt('Rename', item.name)?.trim();
      if (!next) return current;
      return current.map((entry) => (entry.id === id ? { ...entry, name: next } : entry));
    });
  };

  const deleteItem = (setter: typeof setKeys) => (id: string) => {
    setter((current) => {
      const item = current.find((entry) => entry.id === id);
      if (!item || !window.confirm(`Delete ${item.name}?`)) return current;
      return current.filter((entry) => entry.id !== id);
    });
  };

  return (
    <SettingsLayout active="api-keys" onNavigate={onNavigate}>
      <SettingsSection
        title="Alva API Keys"
        subtitle="Let your agents use Alva Skill to build Playbooks."
        right={
          <PrimaryButton onClick={createKey}>
            <CdnIcon name="add-l2" size={14} color="#fff" />
            Create
          </PrimaryButton>
        }
      >
        <div className="w-full flex flex-col gap-[16px]">
          {keys.map((item) => (
            <KeyRow key={item.id} item={item} onRename={renameItem(setKeys)} onDelete={deleteItem(setKeys)} />
          ))}
        </div>
      </SettingsSection>

      <SettingsSection
        title="Secrets Vault"
        subtitle="Store third-party API keys for use in your Playbooks — no hardcoding needed."
        right={
          <PrimaryButton onClick={() => setVault((current) => [...current, { id: `v${Date.now()}`, name: 'New Secret', value: 'eyJhbGciOi', icon: 'plain' }])}>
            <CdnIcon name="upload-l" size={14} color="#fff" />
            Upload
          </PrimaryButton>
        }
      >
        <div className="w-full flex flex-col gap-[16px]">
          {vault.map((item) => (
            <KeyRow key={item.id} item={item} copyable={false} onRename={renameItem(setVault)} onDelete={deleteItem(setVault)} />
          ))}
        </div>
      </SettingsSection>

      <div className="w-full max-w-[960px] min-h-[250px] p-[24px] rounded-[8px] flex flex-col gap-[20px]" style={{ background: 'var(--main-m1-10)', border: '0.5px solid var(--main-m1-20)' }}>
        <div className="w-full min-h-[56px] flex flex-col gap-[4px]">
          <div className="h-[30px] flex items-center gap-[8px]">
            <CdnIcon name="researcher-l1" size={24} color="var(--main-m1, #49A3A6)" />
            <p className="flex-1 text-[18px] leading-[28px] tracking-[0.18px]" style={{ color: 'var(--text-n10)', fontFamily: SETTINGS_FONT }}>Quick Start</p>
          </div>
          <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n9)', fontFamily: SETTINGS_FONT }}>
            For full setup instructions, configuration details, and examples, see the{' '}
            <a href="https://github.com/alva-ai" target="_blank" rel="noopener noreferrer" style={{ color: '#2196f3' }}>GitHub repo</a>.
          </p>
        </div>

        <div className="w-full flex items-stretch gap-[16px]">
          {[
            { title: 'Install Alva Skill', desc: 'Add Alva Skill to your agent from GitHub.' },
            { title: 'Build and Ship Playbooks', desc: 'Use natural language to build dashboards, backtest strategies, and publish live investing playbooks' },
            { title: 'Configure Your API Key', desc: 'Set your Alva API key to enable platform access.' },
          ].map((item) => (
            <div key={item.title} className="flex-1 min-h-[126px] px-[20px] py-[16px] rounded-[4px] flex flex-col gap-[8px]" style={{ background: 'rgba(255,255,255,0.8)' }}>
              <p className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'var(--text-n10)', fontFamily: SETTINGS_FONT }}>{item.title}</p>
              <p className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n7)', fontFamily: SETTINGS_FONT }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </SettingsLayout>
  );
}
