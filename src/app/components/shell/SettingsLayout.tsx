/**
 * [INPUT]: AppShell, settings page
 * [OUTPUT]: Settings 通用布局 — Back + 固定侧边栏(184px) + 944px 内容区，整体 max-width 1156
 * [POS]: shell 层 — Account / Billing / Portfolio / Alva Agent / API Key 共用外壳
 */

import type { Page } from '@/app/App';
import { AppShell } from './AppShell';
import { CdnIcon } from '@/app/components/shared/CdnIcon';

const FONT = "'Delight', sans-serif";

export type SettingsTab = 'account' | 'billing' | 'portfolio-settings' | 'alva-agent' | 'notifications' | 'api-keys';

const TABS: { key: SettingsTab; label: string }[] = [
  { key: 'account',            label: 'Account'       },
  { key: 'billing',            label: 'Usage'         },
  { key: 'portfolio-settings', label: 'Portfolio'     },
  { key: 'alva-agent',         label: 'Alva Agent'    },
  { key: 'notifications',      label: 'Alerts'        },
  { key: 'api-keys',           label: 'API Key'       },
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
        <div className="w-full max-w-[1156px] px-[16px] lg:px-0 pb-[80px]">

          {/* Back */}
          <div className="w-full h-[52px] flex items-center">
            <button
              onClick={() => {
                const ret = sessionStorage.getItem('settingsReturnPage') as Page | null;
                onNavigate(ret && ret.length > 0 ? ret : 'new-chat');
              }}
              className="flex items-center gap-[var(--spacing-xxs)] cursor-pointer group"
              style={{ background: 'none', border: 'none', padding: 0 }}
            >
              <CdnIcon name="arrow-left-l2" size={12} color="var(--text-n5)" />
              <span className="text-[12px] leading-[20px] tracking-[0.12px] group-hover:text-[rgba(0,0,0,0.9)] transition-colors" style={{ color: 'var(--text-n5)', fontFamily: FONT, fontWeight: 400 }}>Back</span>
            </button>
          </div>

          {/* Sidebar + Content */}
          <div className="w-full mt-[4px] flex gap-[28px] items-start">

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
                      background: isActive ? 'var(--b0, #f6f6f6)' : 'transparent',
                      border: 'none',
                    }}
                    onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'var(--b-r03)'; }}
                    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <span
                      className="text-[14px] leading-[22px] tracking-[0.14px]"
                      style={{
                        color: 'var(--text-n9)',
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
            <div className="flex-1 min-w-0 max-w-[944px] flex flex-col gap-[48px]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
