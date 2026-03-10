import { useState } from 'react';
import type { Page } from '@/app/App';
import UserInfo from '@/app/components/UserInfo';
import { AppShell } from '@/app/components/shell/AppShell';

type ApiKeyItem = {
  id: string;
  name: string;
  value: string;
  revealed: boolean;
};

const INITIAL_KEYS: ApiKeyItem[] = [
  {
    id: 'oa-1',
    name: 'oa-1',
    value: 'alva_2dr7qx9v4m0s8k6n1w5p3c7j9r2h4t6x779a',
    revealed: false,
  },
];

function maskApiKey(value: string) {
  if (value.length <= 10) {
    return value;
  }

  return `${value.slice(0, 6)}${'*'.repeat(value.length - 10)}${value.slice(-4)}`;
}

function buildMockApiKey(index: number): ApiKeyItem {
  const seed = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 18)}`;
  return {
    id: `oa-${Date.now()}`,
    name: `oa-${index}`,
    value: `alva_2${seed.slice(0, 28)}${seed.slice(-4)}`,
    revealed: true,
  };
}

function ActionButton({
  title,
  onClick,
  children,
}: {
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="flex size-[40px] items-center justify-center rounded-[12px] text-[rgba(0,0,0,0.58)] transition-colors hover:bg-white hover:text-[rgba(0,0,0,0.88)]"
    >
      {children}
    </button>
  );
}

function EditIcon() {
  return (
    <svg fill="none" height="18" viewBox="0 0 18 18" width="18">
      <path d="M3.75 12.75L3 15L5.25 14.25L13.875 5.625L12.375 4.125L3.75 12.75Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
      <path d="M11.625 4.875L13.125 6.375" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg fill="none" height="18" viewBox="0 0 18 18" width="18">
      <path d="M1.5 9C2.7 6 5.4 4.125 9 4.125C12.6 4.125 15.3 6 16.5 9C15.3 12 12.6 13.875 9 13.875C5.4 13.875 2.7 12 1.5 9Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
      <circle cx="9" cy="9" r="2.25" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg fill="none" height="18" viewBox="0 0 18 18" width="18">
      <path d="M3.75 5.25H14.25" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" />
      <path d="M6.75 2.99988H11.25" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" />
      <path d="M5.25 5.25V13.125C5.25 13.9534 5.92157 14.625 6.75 14.625H11.25C12.0784 14.625 12.75 13.9534 12.75 13.125V5.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
      <path d="M7.5 7.875V11.625" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" />
      <path d="M10.5 7.875V11.625" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" />
    </svg>
  );
}

function ApiKeyRow({
  item,
  onRename,
  onToggleReveal,
  onDelete,
}: {
  item: ApiKeyItem;
  onRename: () => void;
  onToggleReveal: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="rounded-[28px] bg-[#f6f6f2] px-[28px] py-[24px]">
      <div className="flex flex-col gap-[16px] lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <p className="font-['Delight',sans-serif] text-[18px] leading-[28px] tracking-[0.18px] text-[rgba(0,0,0,0.92)]">
            {item.name}
          </p>
          <p className="mt-[14px] overflow-x-auto font-mono text-[16px] leading-[28px] tracking-[0.16px] text-[rgba(0,0,0,0.46)]">
            {item.revealed ? item.value : maskApiKey(item.value)}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-[6px] self-end lg:self-auto">
          <ActionButton title="Rename key" onClick={onRename}>
            <EditIcon />
          </ActionButton>
          <ActionButton title={item.revealed ? 'Hide key' : 'Reveal key'} onClick={onToggleReveal}>
            <EyeIcon />
          </ActionButton>
          <ActionButton title="Delete key" onClick={onDelete}>
            <TrashIcon />
          </ActionButton>
        </div>
      </div>
    </div>
  );
}

function SetupChecklist() {
  return (
    <div className="rounded-[24px] border border-[rgba(0,0,0,0.08)] bg-white px-[20px] py-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
      <p className="font-['Delight',sans-serif] text-[12px] leading-[18px] tracking-[0.48px] text-[#49a3a6]">
        Agent setup
      </p>
      <div className="mt-[12px] flex flex-col gap-[10px]">
        <p className="font-['Delight',sans-serif] text-[15px] leading-[24px] tracking-[0.15px] text-[rgba(0,0,0,0.9)]">
          1. Install `@alva/open-alva-skill`
        </p>
        <p className="font-['Delight',sans-serif] text-[15px] leading-[24px] tracking-[0.15px] text-[rgba(0,0,0,0.9)]">
          2. Create an Alva API key here
        </p>
        <p className="font-['Delight',sans-serif] text-[15px] leading-[24px] tracking-[0.15px] text-[rgba(0,0,0,0.9)]">
          3. Inject it as `ALVA_API_KEY` in your agent runtime
        </p>
      </div>
    </div>
  );
}

export default function ApiKeys({ onNavigate, onOpenSearch }: { onNavigate: (page: Page) => void; onOpenSearch?: () => void }) {
  const [keys, setKeys] = useState<ApiKeyItem[]>(INITIAL_KEYS);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);

  const handleCreateKey = () => {
    setKeys((current) => [buildMockApiKey(current.length + 1), ...current]);
  };

  const handleRenameKey = (id: string) => {
    const currentKey = keys.find((key) => key.id === id);
    if (!currentKey) {
      return;
    }

    const nextName = window.prompt('Rename API key', currentKey.name)?.trim();
    if (!nextName) {
      return;
    }

    setKeys((current) =>
      current.map((key) => (key.id === id ? { ...key, name: nextName } : key)),
    );
  };

  const handleToggleReveal = (id: string) => {
    setKeys((current) =>
      current.map((key) =>
        key.id === id ? { ...key, revealed: !key.revealed } : key,
      ),
    );
  };

  const handleDeleteKey = (id: string) => {
    const currentKey = keys.find((key) => key.id === id);
    if (!currentKey || !window.confirm(`Delete ${currentKey.name}?`)) {
      return;
    }

    setKeys((current) => current.filter((key) => key.id !== id));
  };

  const activeKeyValue = keys[0]?.value ?? 'alva_your_key_here';

  return (
    <>
      <AppShell
        activePage="api-keys"
        onNavigate={onNavigate}
        onOpenSearch={onOpenSearch}
        onUserMouseEnter={() => setIsUserInfoOpen(true)}
        onUserMouseLeave={() => setIsUserInfoOpen(false)}
      >
        <div className="min-h-full bg-[#f6f6f2]">
          <div className="mx-auto w-full max-w-[1440px] px-[28px] py-[36px]">
            <div className="rounded-[32px] border border-[rgba(0,0,0,0.08)] bg-white px-[28px] py-[28px] shadow-[0_18px_40px_rgba(0,0,0,0.05)]">
              <div className="flex flex-col gap-[20px] lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-[780px]">
                  <p className="font-['Delight',sans-serif] text-[40px] leading-[52px] tracking-[0.4px] text-[rgba(0,0,0,0.92)]">
                    API Keys & Agent Skills
                  </p>
                  <p className="mt-[10px] font-['Delight',sans-serif] text-[17px] leading-[28px] tracking-[0.17px] text-[rgba(0,0,0,0.58)]">
                    Your Alva API key is the authentication core for third-party agents using the Open Alva skill.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCreateKey}
                  className="inline-flex h-[56px] shrink-0 items-center justify-center rounded-[14px] bg-[#49a3a6] px-[24px] font-['Delight',sans-serif] text-[16px] leading-[24px] tracking-[0.16px] text-white transition-colors hover:bg-[#3f8f92]"
                >
                  Create New Key
                </button>
              </div>

              <div className="mt-[28px] flex flex-col gap-[16px]">
                {keys.map((key) => (
                  <ApiKeyRow
                    key={key.id}
                    item={key}
                    onRename={() => handleRenameKey(key.id)}
                    onToggleReveal={() => handleToggleReveal(key.id)}
                    onDelete={() => handleDeleteKey(key.id)}
                  />
                ))}
              </div>

              <div className="mt-[20px] grid gap-[16px] xl:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)]">
                <div className="rounded-[24px] bg-[#f6f6f2] px-[20px] py-[20px]">
                  <p className="font-['Delight',sans-serif] text-[12px] leading-[18px] tracking-[0.48px] text-[#49a3a6]">
                    Skill authentication
                  </p>
                  <p className="mt-[8px] font-['Delight',sans-serif] text-[16px] leading-[28px] tracking-[0.16px] text-[rgba(0,0,0,0.9)]">
                    Inject your key into the runtime environment of Claude Code, Cursor, Windsurf, or your own agent host.
                  </p>
                  <div className="mt-[16px] rounded-[20px] bg-[#111214] px-[18px] py-[16px] shadow-[0_18px_40px_rgba(0,0,0,0.14)]">
                    <code className="block overflow-x-auto whitespace-nowrap font-mono text-[14px] leading-[22px] tracking-[0.14px] text-white">
                      export ALVA_API_KEY="{activeKeyValue}"
                    </code>
                  </div>
                </div>
                <SetupChecklist />
              </div>

              <p className="mt-[14px] font-['Delight',sans-serif] text-[13px] leading-[22px] tracking-[0.13px] text-[rgba(0,0,0,0.4)]">
                Mock UI for now. Create, rename, reveal, and delete actions are local only until the real API is wired.
              </p>
            </div>
          </div>
        </div>
      </AppShell>
      {isUserInfoOpen && (
        <div
          className="fixed bottom-[56px] left-[8px] z-[9999] w-[320px]"
          onMouseEnter={() => setIsUserInfoOpen(true)}
          onMouseLeave={() => setIsUserInfoOpen(false)}
        >
          <UserInfo />
        </div>
      )}
    </>
  );
}
