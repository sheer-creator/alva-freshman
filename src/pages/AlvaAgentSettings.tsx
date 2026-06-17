/**
 * [INPUT]: SettingsLayout
 * [OUTPUT]: Alva Agent settings page matching Figma Setting/Agent
 * [POS]: settings page
 */

import { useEffect, useRef, useState } from 'react';
import type { Page } from '@/app/App';
import { SettingsLayout } from '@/app/components/shell/SettingsLayout';
import { DiscordConnectModal } from '@/app/components/shared/DiscordConnectModal';
import { useAgentPlatforms, type AgentPlatform } from '@/lib/agent-connected';
import {
  RowCard,
  SETTINGS_FONT,
  SettingsSection,
  ToggleSwitch,
} from '@/app/components/shell/settings-ui';
import { CdnIcon } from '@/app/components/shared/CdnIcon';

const PLATFORMS: { id: AgentPlatform; name: string; detail: string; description: string; logo: string }[] = [
  { id: 'telegram', name: 'Telegram', detail: 'Sheerruan', description: 'Sheerruan', logo: `${import.meta.env.BASE_URL}logo-social-telegram.svg` },
  { id: 'discord', name: 'Discord', detail: 'Join the community and chat with other traders.', description: 'Join the community and chat with other traders.', logo: `${import.meta.env.BASE_URL}logo-social-discord.svg` },
  { id: 'slack', name: 'Slack', detail: '@sheerruan · alva-hq', description: 'Alva app in your workspace', logo: `${import.meta.env.BASE_URL}logo-social-slack.svg` },
  { id: 'whatsapp', name: 'WhatsApp', detail: '+1 ··· 4821', description: 'Business account DM', logo: `${import.meta.env.BASE_URL}logo-social-whatsapp.svg` },
];

function ReceiverSelect({ active }: { active: AgentPlatform | null }) {
  const meta = PLATFORMS.find((platform) => platform.id === active) ?? PLATFORMS[0];
  return (
    <button
      type="button"
      className="w-[128px] h-[32px] px-[12px] py-[6px] flex items-center gap-[4px] rounded-[4px] cursor-pointer"
      style={{ border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))', background: '#fff', fontFamily: SETTINGS_FONT }}
    >
      <img src={meta.logo} alt="" className="size-[16px] shrink-0" />
      <span className="flex-1 min-w-0 text-left text-[12px] leading-[20px] tracking-[0.12px] truncate" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{meta.name}</span>
      <CdnIcon name="arrow-down-f2" size={12} color="var(--text-n2, rgba(0,0,0,0.2))" />
    </button>
  );
}

function AppRow({
  platform,
  connected,
  onAction,
}: {
  platform: typeof PLATFORMS[number];
  connected: boolean;
  onAction: () => void;
}) {
  return (
    <RowCard style={{ gap: platform.id === 'telegram' ? 12 : 16 }}>
      <img src={platform.logo} alt="" className="size-[40px] shrink-0" />
      <div className="flex-1 min-w-0 flex flex-col gap-[4px]">
        <p className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: SETTINGS_FONT }}>{platform.name}</p>
        <p className="text-[14px] leading-[22px] tracking-[0.14px] whitespace-nowrap overflow-hidden text-ellipsis" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: SETTINGS_FONT }}>
          {connected ? platform.detail : platform.description}
        </p>
      </div>
      <button
        type="button"
        onClick={onAction}
        className="border-none bg-transparent cursor-pointer text-[14px] leading-[22px] tracking-[0.14px]"
        style={{ color: connected ? 'var(--text-n5, rgba(0,0,0,0.5))' : 'var(--main-m1, #49A3A6)', fontFamily: SETTINGS_FONT }}
      >
        {connected ? 'Disconnect' : 'Connect'}
      </button>
    </RowCard>
  );
}

export default function AlvaAgentSettings({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const { platforms, active, has, connect, disconnect } = useAgentPlatforms();
  const defaultedPlatform = useRef(false);
  const [chatNotifications, setChatNotifications] = useState(true);
  const [assistantPrompt, setAssistantPrompt] = useState('');
  const [discordFlowOpen, setDiscordFlowOpen] = useState(false);

  useEffect(() => {
    if (!defaultedPlatform.current && platforms.length === 0) {
      defaultedPlatform.current = true;
      connect('telegram');
    }
  }, [connect, platforms.length]);

  return (
    <SettingsLayout active="alva-agent" onNavigate={onNavigate} mapTo={{ 'alva-agent': 'agent' }}>
      <SettingsSection
        title="Connected App"
        subtitle="Choose the messaging app for your Alva Agent (single platform)."
        right={<ReceiverSelect active={active ?? 'telegram'} />}
      >
        <div className="w-full flex flex-col gap-[16px]">
          {PLATFORMS.map((platform) => {
            const connected = has(platform.id);
            return (
              <AppRow
                key={platform.id}
                platform={platform}
                connected={connected}
                onAction={() => {
                  if (connected) {
                    disconnect(platform.id);
                    return;
                  }
                  if (platform.id === 'discord') {
                    setDiscordFlowOpen(true);
                    return;
                  }
                  connect(platform.id);
                }}
              />
            );
          })}
        </div>
      </SettingsSection>

      <SettingsSection
        title="Enable Chat Notifications"
        subtitle="Receive real-time chat and task updates on your connected apps."
        gap={0}
        right={<ToggleSwitch on={chatNotifications} size={20} onClick={() => setChatNotifications((value) => !value)} />}
      />

      <SettingsSection title="Customize Your Assistant" subtitle="Define the personality, tone, and response style.">
        <textarea
          value={assistantPrompt}
          onChange={(event) => setAssistantPrompt(event.target.value)}
          placeholder="Define your assistant's identity: name, tone, and response style"
          className="w-full min-h-[160px] max-h-[280px] p-[16px] rounded-[6px] resize-none outline-none text-[16px] leading-[26px] tracking-[0.16px] placeholder:text-[color:var(--text-n3,rgba(0,0,0,0.3))]"
          style={{ border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))', color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: SETTINGS_FONT }}
        />
      </SettingsSection>

      <DiscordConnectModal
        isOpen={discordFlowOpen}
        onClose={() => setDiscordFlowOpen(false)}
        onPaired={() => {
          connect('discord');
          setDiscordFlowOpen(false);
        }}
      />
    </SettingsLayout>
  );
}
