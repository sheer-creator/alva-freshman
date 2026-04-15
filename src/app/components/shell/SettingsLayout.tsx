/**
 * [INPUT]: AppShell, settings page
 * [OUTPUT]: Settings 通用布局 — Back + 固定侧边栏(184px) + 自适应内容，整体 max-width 1200
 * [POS]: shell 层 — Account / Billing / Portfolio / Alva Agent / API Key 共用外壳
 */

import type { Page } from '@/app/App';
import { AppShell } from './AppShell';
import { CdnIcon } from '@/app/components/shared/CdnIcon';

const FONT = "'Delight', sans-serif";

export type SettingsTab = 'account' | 'billing' | 'portfolio-settings' | 'alva-agent' | 'automations' | 'api-keys';

const TABS: { key: SettingsTab; label: string }[] = [
  { key: 'account',            label: 'Account'     },
  { key: 'billing',            label: 'Usage'       },
  { key: 'portfolio-settings', label: 'Portfolio'   },
  { key: 'alva-agent',         label: 'Alva Agent'  },
  { key: 'automations',        label: 'Automations' },
  { key: 'api-keys',           label: 'API Key'     },
];

interface SettingsLayoutProps {
  active: SettingsTab;
  onNavigate: (page: Page) => void;
  children: React.ReactNode;
  /** sidebar 实际导航到的 Page（默认等于 tab key） */
  mapTo?: Partial<Record<SettingsTab, Page>>;
}

export function SettingsLayout({ active, onNavigate, children, mapTo }: SettingsLayoutProps) {
  const activePage: Page = (mapTo?.[active] ?? active) as Page;

  return (
    <AppShell activePage={activePage} onNavigate={onNavigate}>
      <div className="min-h-full flex flex-col items-center" style={{ background: 'var(--b0-page, #fff)' }}>
        <div className="w-full flex flex-col gap-[var(--spacing-l)] px-[var(--spacing-xxl)] pt-[var(--spacing-xxl)] pb-[80px] items-center">

          {/* Back */}
          <div className="w-full max-w-[1200px]">
            <button
              onClick={() => {
                const ret = sessionStorage.getItem('settingsReturnPage') as Page | null;
                onNavigate(ret && ret.length > 0 ? ret : 'home');
              }}
              className="flex items-center gap-[var(--spacing-xxs)] cursor-pointer group"
              style={{ background: 'none', border: 'none', padding: 0 }}
            >
              <CdnIcon name="arrow-left-l2" size={12} color="rgba(0,0,0,0.5)" />
              <span className="text-[12px] leading-[20px] tracking-[0.12px] group-hover:text-[rgba(0,0,0,0.9)] transition-colors" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT, fontWeight: 400 }}>Back</span>
            </button>
          </div>

          {/* Sidebar + Content */}
          <div className="w-full max-w-[1200px] flex gap-[var(--spacing-xxl)] items-start">

            {/* Fixed sidebar 184px */}
            <nav className="flex flex-col shrink-0" style={{ width: 184 }}>
              {TABS.map(t => {
                const isActive = t.key === active;
                const target: Page = (mapTo?.[t.key] ?? t.key) as Page;
                return (
                  <button
                    key={t.key}
                    onClick={() => onNavigate(target)}
                    className="flex items-center px-[var(--spacing-m)] py-[10px] rounded-[var(--radius-btn-s)] text-left cursor-pointer transition-colors w-full"
                    style={{
                      background: isActive ? 'rgba(73,163,166,0.1)' : 'transparent',
                      border: 'none',
                    }}
                    onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'rgba(0,0,0,0.03)'; }}
                    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <span
                      className="text-[14px] leading-[22px] tracking-[0.14px]"
                      style={{
                        color: 'rgba(0,0,0,0.9)',
                        fontFamily: FONT,
                        fontWeight: isActive ? 500 : 400,
                      }}
                    >
                      {t.label}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Flexible content area */}
            <div className="flex-1 min-w-0 flex flex-col gap-[var(--spacing-xl)]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
