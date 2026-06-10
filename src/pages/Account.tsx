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
  SETTINGS_FONT,
  SettingsSection,
} from '@/app/components/shell/settings-ui';

const USER = {
  name: 'Sheer',
  handle: '@sheer',
  uid: '12345678901234',
  joined: '12/23/2025',
};

export default function Account({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [nickname, setNickname] = useState('Sheer');
  const [bio, setBio] = useState('');
  const [saved, setSaved] = useState({ nickname: 'Sheer', bio: '' });
  const dirty = nickname !== saved.nickname || bio !== saved.bio;

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

        {/* Save — 无改动时置灰禁用 */}
        <button
          type="button"
          disabled={!dirty}
          onClick={() => setSaved({ nickname, bio })}
          className="w-[126px] h-[48px] flex items-center justify-center rounded-[6px] text-[16px] leading-[26px] tracking-[0.16px]"
          style={{
            background: 'var(--b0-container, #fff)',
            border: `0.5px solid ${dirty ? 'var(--line-l3, rgba(0,0,0,0.3))' : 'var(--line-l2, rgba(0,0,0,0.2))'}`,
            color: dirty ? 'var(--text-n9, rgba(0,0,0,0.9))' : 'var(--text-n3, rgba(0,0,0,0.3))',
            cursor: dirty ? 'pointer' : 'default',
            fontFamily: SETTINGS_FONT,
          }}
        >
          Save
        </button>
      </SettingsSection>
    </SettingsLayout>
  );
}
