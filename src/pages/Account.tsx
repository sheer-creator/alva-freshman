/**
 * [INPUT]: SettingsLayout
 * [OUTPUT]: Account (All Settings) 页 — Avatar / Nickname / User Info / Save
 * [POS]: 页面层
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { SettingsLayout } from '@/app/components/shell/SettingsLayout';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { AVATAR_COLOR_PALETTE } from '@/lib/chart-theme';

const FONT = "'Delight', sans-serif";
const USER = { name: 'Sheer' };

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
  const avatarColor = AVATAR_COLOR_PALETTE[[...USER.name].reduce((s, c) => s + c.charCodeAt(0), 0) % AVATAR_COLOR_PALETTE.length];

  return (
    <SettingsLayout active="account" onNavigate={onNavigate} mapTo={{ account: 'user-profile' }}>
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <h1 className="text-[28px] leading-[38px] tracking-[0.28px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT, fontWeight: 400 }}>Account</h1>
        <button
          className="flex items-center gap-[4px] cursor-pointer"
          style={{ background: 'none', border: 'none', padding: 0, height: 22 }}
        >
          <CdnIcon name="logout-l" size={18} color="rgba(0,0,0,0.5)" />
          <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>Log Out</span>
        </button>
      </div>

      {/* Avatar */}
      <div className="flex flex-col gap-[12px]">
        <FieldLabel>Avatar</FieldLabel>
        <div className="flex items-center gap-[24px]">
          <div className="relative w-[96px] h-[96px] rounded-full flex items-center justify-center shrink-0" style={{ background: avatarColor }}>
            <span className="text-[40px] text-white leading-none" style={{ fontFamily: FONT }}>{USER.name.charAt(0)}</span>
            <div className="absolute bottom-0 right-[-8px] rounded-full flex items-center p-[8px]" style={{ background: '#f6f6f6', border: '2px solid #fff' }}>
              <CdnIcon name="edit-l1" size={16} color="rgba(0,0,0,0.9)" />
            </div>
          </div>
        </div>
      </div>

      {/* Nickname */}
      <div className="flex flex-col gap-[12px]">
        <FieldLabel>Nickname</FieldLabel>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="h-[48px] px-[16px] rounded-[8px] text-[16px] leading-[26px] tracking-[0.16px] outline-none"
          style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT, border: '0.5px solid rgba(0,0,0,0.3)', background: '#fff' }}
        />
      </div>

      {/* User Info */}
      <div className="flex flex-col gap-[12px] h-[200px]">
        <FieldLabel>User Info</FieldLabel>
        <div className="relative flex-1 rounded-[8px]" style={{ border: '0.5px solid rgba(0,0,0,0.3)', background: '#fff' }}>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value.slice(0, 500))}
            placeholder="Introduce about yourself..."
            className="absolute inset-0 resize-none p-[16px] pb-[32px] rounded-[8px] text-[16px] leading-[26px] tracking-[0.16px] outline-none bg-transparent"
            style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT, border: 'none' }}
          />
          <span className="absolute bottom-[15.5px] right-[15.5px] text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>
            {bio.length}/500
          </span>
        </div>
      </div>

      {/* Save */}
      <button
        disabled={!dirty}
        className="h-[48px] w-[120px] px-[16px] rounded-[8px] flex items-center justify-center text-[16px] font-medium leading-[26px] tracking-[0.16px]"
        style={{
          background: 'none',
          border: '0.5px solid rgba(0,0,0,0.3)',
          color: dirty ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.2)',
          fontFamily: FONT,
          cursor: dirty ? 'pointer' : 'not-allowed',
        }}
      >
        Save
      </button>
    </SettingsLayout>
  );
}
