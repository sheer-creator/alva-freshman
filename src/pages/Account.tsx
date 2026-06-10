/**
 * [INPUT]: SettingsLayout
 * [OUTPUT]: Account settings page matching Figma Setting/Account
 * [POS]: settings page
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { SettingsLayout } from '@/app/components/shell/SettingsLayout';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import {
  FieldShell,
  OutlineButton,
  RowCard,
  SETTINGS_FONT,
  SettingsSection,
} from '@/app/components/shell/settings-ui';

const USER = {
  name: 'Sheer',
  handle: '@sheer',
  uid: '12345678901234',
  joined: '12/23/2025',
};

function SocialLogo({ type }: { type: 'gmail' | 'email' | 'x' | 'telegram' | 'discord' }) {
  if (type === 'discord') {
    return <img src={`${import.meta.env.BASE_URL}logo-social-discord.svg`} alt="" className="size-[40px]" />;
  }
  return <img src={`https://alva-ai-static.b-cdn.net/icons/logo-social-${type}.svg`} alt="" className="size-[40px]" />;
}

function AccountRow({
  icon,
  title,
  subtitle,
  action,
  actionTone = 'muted',
}: {
  icon: 'gmail' | 'email' | 'x' | 'telegram' | 'discord';
  title: string;
  subtitle: string;
  action: React.ReactNode;
  actionTone?: 'muted' | 'primary';
}) {
  return (
    <RowCard>
      <SocialLogo type={icon} />
      <div className="flex-1 min-w-0 flex flex-col gap-[4px] overflow-hidden">
        <p className="text-[16px] leading-[26px] tracking-[0.16px] whitespace-nowrap" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: SETTINGS_FONT }}>
          {title}
        </p>
        <p className="text-[14px] leading-[22px] tracking-[0.14px] whitespace-nowrap overflow-hidden text-ellipsis" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: SETTINGS_FONT }}>
          {subtitle}
        </p>
      </div>
      <div className="shrink-0 text-[14px] leading-[22px] tracking-[0.14px] text-right" style={{ color: actionTone === 'primary' ? 'var(--main-m1, #49A3A6)' : 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: SETTINGS_FONT }}>
        {action}
      </div>
    </RowCard>
  );
}

export default function Account({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [nickname, setNickname] = useState('Sheer');
  const [bio, setBio] = useState('');

  return (
    <SettingsLayout active="account" onNavigate={onNavigate} mapTo={{ account: 'user-profile' }}>
      <SettingsSection title="Profile" gap={16}>
        <div className="w-full h-[80px] flex items-center gap-[24px]">
          <div className="relative shrink-0 size-[80px]">
            <img src={`${import.meta.env.BASE_URL}portrait.png`} alt={USER.name} className="size-[80px] rounded-full object-cover" />
            <button
              type="button"
              aria-label="Edit avatar"
              className="absolute bottom-0 right-[-8px] size-[32px] rounded-full flex items-center justify-center cursor-pointer"
              style={{ background: 'var(--b0, #f6f6f6)', boxShadow: '0 0 0 2px var(--b0-container, #fff)' }}
            >
              <CdnIcon name="edit-l1" size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
            </button>
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center gap-[8px]">
            <div className="flex items-center gap-[8px] min-w-0">
              <p className="text-[24px] leading-[34px] tracking-[0.24px] truncate" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: SETTINGS_FONT, fontWeight: 400 }}>
                {USER.name}
              </p>
              <div className="shrink-0 flex flex-col pt-[8px]">
                <p className="text-[14px] leading-[22px] tracking-[0.14px] whitespace-nowrap" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: SETTINGS_FONT }}>
                  {USER.handle}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-[8px] flex-wrap">
              <p className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: SETTINGS_FONT }}>
                UID: {USER.uid}
              </p>
              <div className="h-[17px] w-0" style={{ borderLeft: '1px solid var(--line-l12, rgba(0,0,0,0.12))' }} />
              <p className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: SETTINGS_FONT }}>
                Joined {USER.joined}
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-[12px]">
            <OutlineButton onClick={() => onNavigate('user-profile')}>
              <CdnIcon name="user-profile-l" size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
              Profile
            </OutlineButton>
            <OutlineButton>
              <CdnIcon name="logout-l" size={16} color="var(--main-m4, #e05357)" />
              <span style={{ color: 'var(--main-m4, #e05357)' }}>Log out</span>
            </OutlineButton>
          </div>
        </div>

        <FieldShell label="Nickname" height={86}>
          <input
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            className="w-full h-[48px] px-[16px] rounded-[6px] outline-none text-[16px] leading-[26px] tracking-[0.16px]"
            style={{ border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))', color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: SETTINGS_FONT }}
          />
        </FieldShell>

        <FieldShell label="User Info" height={148}>
          <div className="relative flex-1 min-h-0">
            <textarea
              value={bio}
              onChange={(event) => setBio(event.target.value.slice(0, 500))}
              placeholder="Introduce about yourself..."
              className="w-full h-full p-[16px] pb-[36px] rounded-[6px] outline-none resize-none text-[16px] leading-[26px] tracking-[0.16px] placeholder:text-[color:var(--text-n3,rgba(0,0,0,0.3))]"
              style={{ border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))', color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: SETTINGS_FONT }}
            />
            <span className="absolute right-[15.5px] bottom-[15.5px] text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: SETTINGS_FONT }}>
              {bio.length}/500
            </span>
          </div>
        </FieldShell>
      </SettingsSection>

      <SettingsSection title="Connections" subtitle="Manage how you sign in to Alva and where we can reach you." gap={16}>
        <div className="w-full flex flex-col gap-[16px]">
          <AccountRow icon="gmail" title="Gmail" subtitle="sheer@alva.xyz" action={<span className="px-[8px] py-[2px] rounded-[4px]" style={{ background: 'var(--b-r05, rgba(0,0,0,0.05))' }}>Login Account</span>} />
          <AccountRow icon="email" title="Email" subtitle="sheer@alva.xyz" action="Disconnect" />
          <AccountRow icon="x" title="X (Twitter)" subtitle="@sheer_lee" action="Disconnect" />
          <AccountRow icon="telegram" title="Telegram" subtitle="Get instant alerts when prices break out." action="Connect" actionTone="primary" />
          <AccountRow icon="discord" title="Discord" subtitle="Join the community and chat with other traders." action="Connect" actionTone="primary" />
        </div>
      </SettingsSection>
    </SettingsLayout>
  );
}
