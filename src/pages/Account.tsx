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
import { completeSetupTask, useSetupChecklistState } from '@/app/state/setup-checklist';

const USER = {
  name: 'Sheer',
  handle: '@sheer',
  uid: '12345678901234',
  joined: '12/23/2025',
};

const PROFILE_AVATARS = [
  'portrait.png',
  'avatars/sheer.png',
  'avatars/nina-reyes.png',
  'avatars/vega-zhou.png',
];

export default function Account({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const setup = useSetupChecklistState();
  const initialProfile = setup.profile ?? { displayName: 'Sheer', username: 'sheer', avatar: 'portrait.png' };
  const [nickname, setNickname] = useState(initialProfile.displayName);
  const [username, setUsername] = useState(initialProfile.username);
  const [avatar, setAvatar] = useState(initialProfile.avatar);
  const [bio, setBio] = useState('');
  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);
  const [saved, setSaved] = useState({ nickname: initialProfile.displayName, username: initialProfile.username, avatar: initialProfile.avatar, bio: '' });
  const dirty = nickname !== saved.nickname || username !== saved.username || avatar !== saved.avatar || bio !== saved.bio;
  const onboardingProfile = setup.activeTask === 'profile';
  const usernameValid = /^[a-z0-9_]{3,24}$/i.test(username);
  const canSave = dirty && nickname.trim().length > 0 && usernameValid;

  const saveProfile = () => {
    if (!canSave) return;
    const profile = { displayName: nickname.trim(), username: username.trim(), avatar };
    setNickname(profile.displayName);
    setUsername(profile.username);
    setSaved({ nickname: profile.displayName, username: profile.username, avatar, bio });
    setSavedNotice(true);
    if (onboardingProfile) completeSetupTask('profile', { profile });
  };

  return (
    <SettingsLayout active="account" onNavigate={onNavigate} mapTo={{ account: 'user-profile' }}>
      <SettingsSection title="Profile" gap={16}>
        {onboardingProfile && (
          <div
            className="flex min-h-[38px] items-center gap-[8px] rounded-[6px] px-[12px] py-[8px] text-[12px] leading-[20px] tracking-[0.12px]"
            style={{ background: 'rgba(73, 163, 166, 0.08)', border: '0.5px solid rgba(73, 163, 166, 0.22)', color: 'var(--text-n7, rgba(0,0,0,0.7))', fontFamily: SETTINGS_FONT }}
          >
            <CdnIcon name="user-profile-l" size={16} color="var(--main-m1, #49a3a6)" />
            Update any profile detail, then save to finish this task.
          </div>
        )}
        <div className="w-full h-[80px] flex items-center gap-[24px]">
          <div className="relative shrink-0 size-[80px]">
            <img src={`${import.meta.env.BASE_URL}${avatar}`} alt={nickname || 'Profile photo'} className="size-[80px] rounded-full object-cover" />
            <button
              type="button"
              aria-label="Edit avatar"
              onClick={() => setAvatarPickerOpen(true)}
              className="absolute bottom-0 right-[-8px] size-[32px] rounded-full flex items-center justify-center cursor-pointer"
              style={{ background: 'var(--b0, #f6f6f6)', boxShadow: '0 0 0 2px var(--b0-container, #fff)' }}
            >
              <CdnIcon name="edit-l1" size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
            </button>
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center gap-[8px]">
            <div className="flex items-center gap-[8px] min-w-0">
              <p className="text-[24px] leading-[34px] tracking-[0.24px] truncate" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: SETTINGS_FONT, fontWeight: 400 }}>
                {nickname || 'Add your name'}
              </p>
              <div className="shrink-0 flex flex-col pt-[8px]">
                <p className="text-[14px] leading-[22px] tracking-[0.14px] whitespace-nowrap" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: SETTINGS_FONT }}>
                  @{username || 'username'}
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

        <FieldShell label="Display name" height={86}>
          <input
            value={nickname}
            placeholder="Your display name"
            onChange={(event) => { setNickname(event.target.value); setSavedNotice(false); }}
            className="w-full h-[48px] px-[16px] rounded-[6px] outline-none text-[16px] leading-[26px] tracking-[0.16px]"
            style={{ border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))', color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: SETTINGS_FONT }}
          />
        </FieldShell>

        <FieldShell label="Username" height={86}>
          <div
            className="flex h-[48px] w-full items-center rounded-[6px] px-[16px]"
            style={{ border: `0.5px solid ${username.length > 0 && !usernameValid ? 'var(--main-m4, #e05357)' : 'var(--line-l3, rgba(0,0,0,0.3))'}` }}
          >
            <span className="text-[16px] leading-[26px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: SETTINGS_FONT }}>@</span>
            <input
              value={username}
              placeholder="username"
              aria-invalid={username.length > 0 && !usernameValid}
              onChange={(event) => {
                setUsername(event.target.value.replace(/^@/, '').replace(/\s/g, ''));
                setSavedNotice(false);
              }}
              className="h-full min-w-0 flex-1 border-0 bg-transparent px-[2px] text-[16px] leading-[26px] tracking-[0.16px] outline-none"
              style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: SETTINGS_FONT }}
            />
          </div>
        </FieldShell>

        <FieldShell label="User Info" height={148}>
          <div className="relative flex-1 min-h-0">
            <textarea
              value={bio}
              onChange={(event) => { setBio(event.target.value.slice(0, 500)); setSavedNotice(false); }}
              placeholder="Introduce about yourself..."
              className="w-full h-full p-[16px] pb-[36px] rounded-[6px] outline-none resize-none text-[16px] leading-[26px] tracking-[0.16px] placeholder:text-[color:var(--text-n3,rgba(0,0,0,0.3))]"
              style={{ border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))', color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: SETTINGS_FONT }}
            />
            <span className="absolute right-[15.5px] bottom-[15.5px] text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: SETTINGS_FONT }}>
              {bio.length}/500
            </span>
          </div>
        </FieldShell>

        <div className="flex items-center gap-[12px]">
          <button
            type="button"
            disabled={!canSave}
            onClick={saveProfile}
            className="w-[126px] h-[48px] flex items-center justify-center rounded-[6px] text-[16px] leading-[26px] tracking-[0.16px]"
            style={{
              background: canSave ? 'var(--main-m1, #49a3a6)' : 'var(--b0-container, #fff)',
              border: `0.5px solid ${canSave ? 'var(--main-m1, #49a3a6)' : 'var(--line-l2, rgba(0,0,0,0.2))'}`,
              color: canSave ? '#fff' : 'var(--text-n3, rgba(0,0,0,0.3))',
              cursor: canSave ? 'pointer' : 'default',
              fontFamily: SETTINGS_FONT,
            }}
          >
            Save profile
          </button>
          {savedNotice && (
            <span className="flex items-center gap-[5px] text-[12px] leading-[20px]" style={{ color: 'var(--main-m1, #49a3a6)', fontFamily: SETTINGS_FONT }}>
              <CdnIcon name="check-l1" size={14} color="var(--main-m1, #49a3a6)" />
              Profile saved
            </span>
          )}
        </div>
      </SettingsSection>

      {avatarPickerOpen && (
        <div
          className="fixed inset-0 z-[140] flex items-center justify-center bg-black/35 px-[20px]"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setAvatarPickerOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="avatar-picker-title"
            className="w-full max-w-[360px] rounded-[8px] bg-white p-[20px]"
            style={{ boxShadow: '0 20px 56px rgba(0,0,0,0.18)', fontFamily: SETTINGS_FONT }}
          >
            <div className="flex items-center justify-between">
              <h2 id="avatar-picker-title" className="m-0 text-[18px] font-medium leading-[28px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>Choose a profile photo</h2>
              <button type="button" aria-label="Close avatar picker" className="flex size-[28px] items-center justify-center rounded-[4px] border-0 bg-transparent" onClick={() => setAvatarPickerOpen(false)}>
                <CdnIcon name="close-l1" size={16} color="var(--text-n7, rgba(0,0,0,0.7))" />
              </button>
            </div>
            <p className="mb-[16px] mt-[4px] text-[12px] leading-[20px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>Pick one for this prototype.</p>
            <div className="grid grid-cols-4 gap-[12px]">
              {PROFILE_AVATARS.map((option, index) => (
                <button
                  key={option}
                  type="button"
                  aria-label={`Use profile photo ${index + 1}`}
                  aria-pressed={avatar === option}
                  onClick={() => { setAvatar(option); setSavedNotice(false); setAvatarPickerOpen(false); }}
                  className="rounded-full border-0 bg-transparent p-[2px]"
                  style={{ boxShadow: avatar === option ? '0 0 0 2px var(--main-m1, #49a3a6)' : 'none' }}
                >
                  <img src={`${import.meta.env.BASE_URL}${option}`} alt="" className="aspect-square w-full rounded-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </SettingsLayout>
  );
}
