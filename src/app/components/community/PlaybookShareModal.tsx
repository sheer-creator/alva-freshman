/**
 * [INPUT]: playbook name, referral link
 * [OUTPUT]: Playbook 分享弹窗 — 社交分享 + referral 链接
 * [POS]: 社区组件 — PlaybookTopbar 触发
 */

import { useState } from 'react';
import { REFERRAL_DATA } from '@/data/referral-mock';

/* ========== 分享渠道 ========== */

function buildShareUrl(playbookName: string) {
  return `${REFERRAL_DATA.referralLink}?playbook=${encodeURIComponent(playbookName)}`;
}

function buildShareText(playbookName: string) {
  return `Check out "${playbookName}" on Alva — a live investing playbook you can remix and make your own. Join with my link and we both get 3,000 credits:`;
}

const CHANNELS = [
  {
    label: 'Twitter',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    open: (name: string) => {
      const text = encodeURIComponent(buildShareText(name));
      const url = encodeURIComponent(buildShareUrl(name));
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    },
  },
  {
    label: 'Reddit',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
      </svg>
    ),
    open: (name: string) => {
      const url = encodeURIComponent(buildShareUrl(name));
      const title = encodeURIComponent(`"${name}" — a live investing playbook on Alva`);
      window.open(`https://reddit.com/submit?url=${url}&title=${title}`, '_blank');
    },
  },
  {
    label: 'Telegram',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12.056 0h-.112zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
    open: (name: string) => {
      const url = encodeURIComponent(buildShareUrl(name));
      const text = encodeURIComponent(buildShareText(name));
      window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
    },
  },
];

/* ========== PlaybookShareModal ========== */

export function PlaybookShareModal({ isOpen, onClose, playbookName, onNavigate }: {
  isOpen: boolean;
  onClose: () => void;
  playbookName: string;
  onNavigate?: (page: import('@/app/App').Page) => void;
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = buildShareUrl(playbookName);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div
        className="w-[400px] rounded-[12px] flex flex-col"
        style={{ background: '#fff', boxShadow: 'var(--shadow-l, 0 10px 20px rgba(0,0,0,0.08))' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-[20px] pt-[20px] pb-[14px] flex items-center justify-between">
          <span className="text-[16px] leading-[24px] tracking-[0.16px] font-medium" style={{ color: 'var(--text-n9)' }}>Share Playbook</span>
          <button className="w-[28px] h-[28px] flex items-center justify-center rounded-[4px] cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.05)]" style={{ background: 'none', border: 'none' }} onClick={onClose}>
            <span className="text-[18px] leading-none" style={{ color: 'var(--text-n5)' }}>&times;</span>
          </button>
        </div>

        <div className="px-[20px] pb-[20px]">
          {/* Playbook 名称预览 */}
          <div className="flex items-center gap-[8px] px-[12px] py-[10px] rounded-[8px]" style={{ background: 'rgba(73,163,166,0.05)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#49A3A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <span className="text-[13px] leading-[20px] truncate" style={{ color: 'var(--text-n9)' }}>{playbookName}</span>
          </div>

          {/* Referral 链接 */}
          <div className="mt-[14px]">
            <div
              className="h-[40px] rounded-[8px] flex items-center overflow-hidden"
              style={{ border: '1px solid rgba(0,0,0,0.10)' }}
            >
              <span className="flex-1 min-w-0 px-[10px] text-[12px] leading-[18px] truncate select-all" style={{ color: 'var(--text-n7)' }}>
                {shareUrl}
              </span>
              <button
                className="shrink-0 h-full px-[14px] text-[12px] font-medium cursor-pointer transition-all flex items-center gap-[5px]"
                style={{
                  color: copied ? '#fff' : 'var(--main-m1, #49A3A6)',
                  background: copied ? 'var(--main-m1, #49A3A6)' : 'rgba(73,163,166,0.06)',
                  borderLeft: '1px solid rgba(0,0,0,0.06)',
                  border: 'none',
                }}
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 社交分享 */}
          <div className="mt-[14px] flex gap-[8px]">
            {CHANNELS.map((ch) => (
              <button
                key={ch.label}
                className="flex-1 h-[36px] rounded-[7px] flex items-center justify-center gap-[5px] cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.04)]"
                style={{ border: '1px solid rgba(0,0,0,0.08)', color: 'var(--text-n7)', background: 'transparent', fontSize: 12 }}
                onClick={() => ch.open(playbookName)}
              >
                {ch.icon}
                <span className="text-[12px] leading-[18px]">{ch.label}</span>
              </button>
            ))}
          </div>

          {/* Referral 提示 + 预览 */}
          <div className="mt-[14px] flex items-center justify-between">
            <p className="text-[11px] leading-[16px]" style={{ color: 'var(--text-n3)' }}>
              Friends who join earn 3,000 credits — and so do you.
            </p>
            {onNavigate && (
              <button
                className="text-[11px] leading-[16px] cursor-pointer flex items-center gap-[3px] shrink-0 transition-colors hover:opacity-70"
                style={{ color: 'var(--main-m1, #49A3A6)', background: 'none', border: 'none' }}
                onClick={() => { onClose(); onNavigate('playbook-referral'); }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Preview
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
