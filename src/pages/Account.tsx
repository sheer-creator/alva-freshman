/**
 * [INPUT]: SettingsLayout
 * [OUTPUT]: Account (All Settings) 页 — User Info Card / Nickname / Bio / Save
 * [POS]: 页面层
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { SettingsLayout } from '@/app/components/shell/SettingsLayout';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { Avatar } from '@/app/components/shared/Avatar';

const FONT = "'Delight', sans-serif";
const USER = { name: 'YGGYLL', email: 'sheer@alva.xyz', joined: '12/23/2025' };

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>
      {children}
    </span>
  );
}

export default function Account({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [nickname, setNickname] = useState(USER.name);
  const [bio, setBio] = useState('');
  const dirty = nickname !== USER.name || bio !== '';

  return (
    <SettingsLayout active="account" onNavigate={onNavigate} mapTo={{ account: 'user-profile' }}>
      {/* Header */}
      <div className="flex items-center gap-[var(--spacing-m)] w-full">
        <h1 className="flex-1 text-[28px] leading-[38px] tracking-[0.28px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT, fontWeight: 400 }}>Account</h1>
      </div>

      {/* User Info Card */}
      <div className="flex items-center gap-[var(--spacing-xl)] w-full">
        {/* Avatar */}
        <div className="relative shrink-0" style={{ width: 80, height: 80 }}>
          <Avatar name={USER.name} size={80} />
          <div className="absolute bottom-0 right-[-8px] rounded-full flex items-center p-[var(--spacing-xs)] cursor-pointer" style={{ background: '#f6f6f6', border: '2px solid #fff' }}>
            <CdnIcon name="edit-l1" size={16} color="rgba(0,0,0,0.9)" />
          </div>
        </div>

        {/* Name + Email + Joined */}
        <div className="flex flex-col gap-[var(--spacing-xs)] flex-1 min-w-0 justify-center">
          <p className="text-[24px] leading-[34px] tracking-[0.24px] truncate" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>{USER.name}</p>
          <div className="flex items-center gap-[var(--spacing-xs)] flex-wrap">
            <div className="flex items-center gap-[var(--spacing-xxs)]">
              <img src="https://alva-ai-static.b-cdn.net/icons/logo-social-google.svg" alt="Google" className="w-[14px] h-[14px]" />
              <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'rgba(0,0,0,0.7)', fontFamily: FONT }}>{USER.email}</span>
            </div>
            <div className="h-[17px] w-0" style={{ borderLeft: '0.5px solid rgba(0,0,0,0.3)' }} />
            <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'rgba(0,0,0,0.7)', fontFamily: FONT }}>Joined {USER.joined}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-[var(--spacing-s)] shrink-0">
          <button
            className="btn btn-secondary btn-extra-small"
            onClick={() => onNavigate('user-profile')}
          >
            <CdnIcon name="user-profile-l" size={16} color="rgba(0,0,0,0.9)" />
            <span style={{ fontFamily: FONT }}>Profile</span>
          </button>
          <button
            className="btn btn-secondary btn-extra-small"
            style={{ color: '#e05357' }}
          >
            <CdnIcon name="logout-l" size={16} color="#e05357" />
            <span style={{ fontFamily: FONT }}>Log out</span>
          </button>
        </div>
      </div>

      {/* Nickname */}
      <div className="flex flex-col gap-[var(--spacing-s)]">
        <FieldLabel>Nickname</FieldLabel>
        <div className="input input-lg w-full">
          <div className="input-border" />
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="input-field"
          />
        </div>
      </div>

      {/* User Info */}
      <div className="flex flex-col gap-[var(--spacing-s)] h-[200px]">
        <FieldLabel>User Info</FieldLabel>
        <div className="input input-textarea w-full flex-1 relative">
          <div className="input-border" />
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value.slice(0, 500))}
            placeholder="Introduce about yourself..."
            className="input-field"
            style={{ paddingBottom: 32 }}
          />
          <span className="absolute bottom-[15.5px] right-[15.5px] text-[12px] leading-[20px] tracking-[0.12px] pointer-events-none" style={{ color: 'var(--text-n5)', fontFamily: FONT }}>
            {bio.length}/500
          </span>
        </div>
      </div>

      {/* Save */}
      <button
        disabled={!dirty}
        className={`btn btn-large w-[120px] ${dirty ? 'btn-primary' : 'btn-primary btn-disabled'}`}
      >
        Save
      </button>
    </SettingsLayout>
  );
}
