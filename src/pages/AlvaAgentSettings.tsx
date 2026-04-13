/**
 * [INPUT]: SettingsLayout
 * [OUTPUT]: Alva Agent 设置页 — Connected App + Customize prompt
 * [POS]: 页面层
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { SettingsLayout } from '@/app/components/shell/SettingsLayout';

const FONT = "'Delight', sans-serif";

function TelegramMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 240 240" fill="none" style={{ display: 'block' }}>
      <circle cx="120" cy="120" r="120" fill="#26A5E4" />
      <path d="M100 144.4l48.4 35.7c5.5 3 9.5 1.5 10.9-5.1l19.7-93c2-8.1-3.1-11.7-8.4-9.3L55.6 113c-7.9 3.2-7.8 7.6-1.4 9.5l36.3 11.4 84.2-53c4-2.4 7.6-1.1 4.6 1.5L100 144.4z" fill="#FFFFFF" />
    </svg>
  );
}

export default function AlvaAgentSettings({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [connected, setConnected] = useState(true);
  const [prompt, setPrompt] = useState('');
  const dirty = prompt.trim().length > 0;

  return (
    <SettingsLayout active="alva-agent" onNavigate={onNavigate} mapTo={{ 'alva-agent': 'agent' }}>

      <h1 className="text-[28px] leading-[38px] tracking-[0.28px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT, fontWeight: 400 }}>Alva Agent</h1>

      {/* Connected App */}
      <div className="flex flex-col gap-[12px]">
        <div>
          <p className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>Connected App</p>
          <p className="text-[12px] leading-[20px] tracking-[0.12px] mt-[2px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>Choose the messaging app for your Alva Agent (single platform).</p>
        </div>
        <div className="flex items-center gap-[16px] px-[20px] py-[16px] rounded-[8px]" style={{ background: 'rgba(0,0,0,0.02)' }}>
          <TelegramMark size={40} />
          <div className="flex-1 min-w-0">
            <p className="text-[14px] leading-[22px] font-medium" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>Telegram</p>
            <p className="text-[12px] leading-[20px] mt-[2px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>Sheerruan</p>
          </div>
          <button
            onClick={() => setConnected(v => !v)}
            className="text-[13px] leading-[22px] cursor-pointer"
            style={{ color: connected ? 'rgba(0,0,0,0.5)' : '#49a3a6', background: 'none', border: 'none', fontFamily: FONT }}
          >
            {connected ? 'Disconnect' : 'Connect'}
          </button>
        </div>
      </div>

      {/* Customize */}
      <div className="flex flex-col gap-[12px]">
        <div>
          <p className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>Customize Your Assistant</p>
          <p className="text-[12px] leading-[20px] tracking-[0.12px] mt-[2px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>Define the personality, tone, and response style.</p>
        </div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Define your assistant's identity: name, tone, and response style"
          className="h-[160px] p-[16px] rounded-[8px] text-[16px] leading-[26px] tracking-[0.16px] outline-none resize-none"
          style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT, border: '0.5px solid rgba(0,0,0,0.3)', background: '#fff' }}
        />
      </div>

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
