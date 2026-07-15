/**
 * [INPUT]: SettingsLayout
 * [OUTPUT]: Portfolio settings page matching Figma Setting/Portfolio
 * [POS]: settings page
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { SettingsLayout } from '@/app/components/shell/SettingsLayout';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { ConnectAccountModal, brokerDisplayInfo, SUCCESS_ACCOUNTS } from '@/app/components/portfolio/ConnectAccountModal';
import {
  DividedRows,
  OutlineButton,
  RowCard,
  SETTINGS_FONT,
  SettingsSection,
  ToggleSwitch,
} from '@/app/components/shell/settings-ui';

const BROKERS = [
  { name: 'Interactive Brokers', account: 'U***6789', badge: 'Live', bg: '#1c1c1c', logo: `${import.meta.env.BASE_URL}logo-broker-ibkr.svg`, logoWidth: 21.6, logoHeight: 42.2 },
  { name: 'Binance', account: 'U***6789', badge: 'Spot', bg: '#f0b90b', logo: `${import.meta.env.BASE_URL}logo-broker-binance.svg`, logoWidth: 32.6, logoHeight: 32.6 },
  { name: 'Alpaca', account: 'U***6789', badge: 'Live', bg: '#FCD72B', logo: `${import.meta.env.BASE_URL}logo-broker-alpaca.svg`, logoWidth: 48, logoHeight: 48 },
];

function BrokerRow({ broker }: { broker: typeof BROKERS[number] }) {
  return (
    <RowCard>
      <div className="size-[48px] rounded-[6px] flex items-center justify-center shrink-0 overflow-hidden" style={{ background: broker.bg }}>
        <img src={broker.logo} alt={broker.name} style={{ width: broker.logoWidth, height: broker.logoHeight }} />
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-[4px]">
        <p className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: SETTINGS_FONT }}>{broker.name}</p>
        <div className="flex items-center gap-[8px]">
          <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: SETTINGS_FONT }}>{broker.account}</p>
          <span className="px-[6px] py-px rounded-[4px] text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--main-m1, #49A3A6)', background: 'var(--main-m1-10, rgba(73,163,166,0.1))', fontFamily: SETTINGS_FONT }}>
            {broker.badge}
          </span>
        </div>
      </div>
      <button type="button" className="border-none bg-transparent cursor-pointer text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: SETTINGS_FONT }}>
        Disconnect
      </button>
    </RowCard>
  );
}

function RuleRow({ label, value, initialOn = true }: { label: string; value?: string; initialOn?: boolean }) {
  const [on, setOn] = useState(initialOn);
  return (
    <div className="flex items-center gap-[20px]">
      <p className="flex-1 text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: SETTINGS_FONT }}>{label}</p>
      {value && on && (
        <div className="flex items-center gap-[4px]">
          <p className="text-[16px] leading-[26px] tracking-[0.16px] whitespace-nowrap" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: SETTINGS_FONT }}>{value}</p>
          <CdnIcon name="edit-l1" size={18} color="var(--text-n5, rgba(0,0,0,0.5))" />
        </div>
      )}
      <ToggleSwitch on={on} onClick={() => setOn((value) => !value)} />
    </div>
  );
}

export default function PortfolioSettings({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [brokers, setBrokers] = useState(BROKERS);
  const [connectOpen, setConnectOpen] = useState(false);
  return (
    <SettingsLayout active="portfolio-settings" onNavigate={onNavigate}>
      <SettingsSection
        title="Broker Connections"
        subtitle="Connect your brokerage accounts to enable trading."
        right={
          <OutlineButton className="w-[65px]" onClick={() => setConnectOpen(true)}>
            <CdnIcon name="add-l2" size={14} color="var(--text-n9, rgba(0,0,0,0.9))" />
            Add
          </OutlineButton>
        }
      >
        <div className="w-full flex flex-col gap-[16px]">
          {brokers.map((broker, i) => <BrokerRow key={`${broker.name}-${i}`} broker={broker} />)}
        </div>
      </SettingsSection>

      {/* Add → 复用连接弹窗；成功徽章自动关闭，新账户落进列表即是收口（Settings 语境无需再引导） */}
      <ConnectAccountModal
        open={connectOpen}
        onClose={() => setConnectOpen(false)}
        onConnected={(id, _access, accountType) => {
          const info = brokerDisplayInfo(id);
          setBrokers((prev) => [...prev, {
            name: info?.name ?? id,
            account: SUCCESS_ACCOUNTS[id] ?? 'U***4415',
            badge: accountType === 'live' ? 'Live' : 'Paper',
            bg: info?.bg ?? '#fff',
            logo: info?.logo ?? '',
            logoWidth: info?.plain ? 34 : 40,
            logoHeight: info?.plain ? 34 : 40,
          }]);
          /* 弹窗关闭由徽章自动关的 onClose 链路负责——成功即落列表，与徽章同步 */
        }}
      />

      <SettingsSection title="Global Risk Rules" subtitle="Applies to all strategy bindings">
        <DividedRows>
          {[
            <RuleRow key="single" label="Max Single Order" value="$5,000" initialOn />,
            <RuleRow key="turnover" label="Max Daily Turnover" initialOn={false} />,
            <RuleRow key="orders" label="Max Daily Orders" value="100" initialOn />,
          ]}
        </DividedRows>
      </SettingsSection>

      <SettingsSection title="Notifications" subtitle="Configure alerts and daily reports">
        <DividedRows>
          {[
            <RuleRow key="filled" label="Order filled" initialOn />,
            <RuleRow key="rebalance" label="Rebalance triggered" initialOn={false} />,
            <RuleRow key="risk" label="Risk Alert" initialOn />,
            <RuleRow key="pnl" label="Daily P&L Summary" initialOn />,
          ]}
        </DividedRows>
      </SettingsSection>
    </SettingsLayout>
  );
}
