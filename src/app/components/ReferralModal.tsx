/**
 * [INPUT]: isOpen, onClose
 * [OUTPUT]: Referral 弹窗 — 链接复制、社交分享、统计（点击展开历史）
 * [POS]: Shell 层 — 全局 overlay 弹窗
 */

import { useState } from 'react';
import { REFERRAL_DATA } from '@/data/referral-mock';
import { AVATAR_COLOR_PALETTE } from '@/lib/chart-theme';

/* ========== 头像 ========== */

function Avatar({ name, size = 24 }: { name: string; size?: number }) {
  const initial = name.trim().charAt(0).toUpperCase();
  const color = AVATAR_COLOR_PALETTE[[...name].reduce((s, c) => s + c.charCodeAt(0), 0) % AVATAR_COLOR_PALETTE.length];
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: size * 0.44, color: '#fff', lineHeight: 1, fontFamily: "'Delight', sans-serif" }}>{initial}</span>
    </div>
  );
}

/* ========== 社交分享 ========== */

const SHARE_TEXT = 'I use Alva to build and share investing playbooks — financial modeling, quant strategies, live dashboards, all no-code. Join with my link and we both get 3,000 credits:';

const SHARE_CHANNELS = [
  {
    label: 'Twitter',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    open: () => {
      const text = encodeURIComponent(SHARE_TEXT);
      const url = encodeURIComponent(REFERRAL_DATA.referralLink);
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    },
  },
  {
    label: 'Reddit',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
      </svg>
    ),
    open: () => {
      const url = encodeURIComponent(REFERRAL_DATA.referralLink);
      const title = encodeURIComponent('Alva — build, share, and remix investing playbooks together. No code required.');
      window.open(`https://reddit.com/submit?url=${url}&title=${title}`, '_blank');
    },
  },
  {
    label: 'Telegram',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12.056 0h-.112zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
    open: () => {
      const url = encodeURIComponent(REFERRAL_DATA.referralLink);
      const text = encodeURIComponent(SHARE_TEXT);
      window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
    },
  },
];

/* ========== ReferralModal ========== */

export default function ReferralModal({ isOpen, onClose, onNavigate }: { isOpen: boolean; onClose: () => void; onNavigate?: (page: import('@/app/App').Page) => void }) {
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(REFERRAL_DATA.referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const { stats, referrals } = REFERRAL_DATA;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div
        className="w-[480px] max-h-[90vh] rounded-[12px] flex flex-col overflow-hidden"
        style={{ background: '#fff', boxShadow: 'var(--shadow-l, 0 10px 20px rgba(0,0,0,0.08))' }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* 装饰区 */}
        <div className="relative shrink-0 flex items-center justify-center py-[28px]" style={{ background: 'linear-gradient(135deg, rgba(73,163,166,0.10) 0%, rgba(73,163,166,0.03) 100%)' }}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="8" y="20" width="32" height="22" rx="3" stroke="#49A3A6" strokeWidth="2" strokeLinejoin="round" />
            <line x1="24" y1="20" x2="24" y2="42" stroke="#49A3A6" strokeWidth="2" />
            <line x1="8" y1="28" x2="40" y2="28" stroke="#49A3A6" strokeWidth="2" />
            <path d="M24 20C24 20 24 12 19 8C16 5.6 13 7 14 10C15 13 24 20 24 20Z" stroke="#49A3A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M24 20C24 20 24 12 29 8C32 5.6 35 7 34 10C33 13 24 20 24 20Z" stroke="#49A3A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="10" cy="12" r="1.5" fill="#49A3A6" opacity="0.4" />
            <circle cx="38" cy="14" r="1" fill="#49A3A6" opacity="0.3" />
            <circle cx="6" cy="24" r="1" fill="#49A3A6" opacity="0.25" />
            <circle cx="42" cy="26" r="1.2" fill="#49A3A6" opacity="0.35" />
          </svg>
          <button
            className="absolute top-[12px] right-[12px] w-[28px] h-[28px] flex items-center justify-center rounded-[4px] cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.05)]"
            onClick={onClose}
          >
            <span className="text-[18px] leading-none" style={{ color: 'var(--text-n5)' }}>&times;</span>
          </button>
        </div>

        {/* 可滚动内容 */}
        <div className="flex-1 overflow-y-auto px-[24px] pb-[24px]">

          {/* 标题 */}
          <div className="pt-[20px]">
            <h2 className="text-[18px] leading-[28px] tracking-[0.18px] font-medium" style={{ color: 'var(--text-n9)' }}>
              Invite Friends, Earn Credits
            </h2>
            <p className="mt-[4px] text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5)' }}>
              Share Alva with fellow investors. You both earn 3,000 credits when they publish their first Playbook.
            </p>
          </div>

          {/* 链接区 */}
          <div className="mt-[20px]">
            <span className="text-[12px] leading-[18px] tracking-[0.12px] font-medium" style={{ color: 'var(--text-n5)' }}>Your referral link</span>
            <div
              className="mt-[6px] h-[44px] rounded-[8px] flex items-center overflow-hidden"
              style={{ border: '1px solid rgba(0,0,0,0.12)' }}
            >
              <span
                className="flex-1 min-w-0 px-[12px] text-[14px] leading-[22px] tracking-[0.14px] truncate select-all"
                style={{ color: 'var(--text-n9)' }}
              >
                {REFERRAL_DATA.referralLink}
              </span>
              <button
                className="shrink-0 h-full px-[16px] text-[13px] font-medium cursor-pointer transition-all flex items-center gap-[6px]"
                style={{
                  color: copied ? '#fff' : 'var(--main-m1, #49A3A6)',
                  background: copied ? 'var(--main-m1, #49A3A6)' : 'rgba(73,163,166,0.06)',
                  borderLeft: '1px solid rgba(0,0,0,0.08)',
                }}
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 社交分享 */}
          <div className="mt-[20px]">
            <span className="text-[12px] leading-[18px] tracking-[0.12px] font-medium" style={{ color: 'var(--text-n5)' }}>Share via</span>
            <div className="mt-[6px] flex gap-[8px]">
              {SHARE_CHANNELS.map((ch) => (
                <button
                  key={ch.label}
                  className="flex-1 h-[40px] rounded-[8px] flex items-center justify-center gap-[6px] cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.04)]"
                  style={{ border: '1px solid rgba(0,0,0,0.10)', color: 'var(--text-n7)', background: 'transparent' }}
                  onClick={ch.open}
                >
                  {ch.icon}
                  <span className="text-[13px] leading-[20px] tracking-[0.13px]">{ch.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 统计卡片 — 点击展开历史 */}
          <div
            className="mt-[20px] rounded-[8px] overflow-hidden cursor-pointer transition-colors hover:bg-[rgba(73,163,166,0.08)]"
            style={{ background: 'rgba(73,163,166,0.05)', border: '1px solid rgba(73,163,166,0.10)' }}
            onClick={() => setShowHistory(!showHistory)}
          >
            {/* 统计行 */}
            <div className="flex items-center px-[16px] py-[14px]">
              <div className="flex-1">
                <div className="flex items-baseline gap-[4px]">
                  <span className="text-[22px] leading-[28px] font-medium" style={{ color: 'var(--main-m1, #49A3A6)' }}>{stats.totalActivated}</span>
                  <span className="text-[13px] leading-[20px]" style={{ color: 'var(--text-n3)' }}>/ {stats.totalInvited} referrals</span>
                </div>
                <span className="text-[12px] leading-[18px] tracking-[0.12px]" style={{ color: 'var(--text-n5)' }}>{stats.totalCreditsEarned.toLocaleString()} credits earned</span>
              </div>
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="transition-transform shrink-0"
                style={{ color: 'var(--text-n3)', transform: showHistory ? 'rotate(90deg)' : 'rotate(0deg)' }}
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>

            {/* 展开的历史列表 */}
            {showHistory && (
              <div style={{ borderTop: '1px solid rgba(73,163,166,0.10)' }}>
                {referrals.map((r, i) => (
                  <div
                    key={r.name}
                    className="flex items-center gap-[10px] px-[16px] py-[10px]"
                    style={i > 0 ? { borderTop: '1px solid rgba(73,163,166,0.06)' } : undefined}
                  >
                    <Avatar name={r.name} size={26} />
                    <span className="flex-1 min-w-0 text-[13px] leading-[20px] tracking-[0.13px] truncate" style={{ color: 'var(--text-n7)' }}>{r.name}</span>
                    <span className="shrink-0 text-[11px] leading-[16px] tracking-[0.11px]" style={{ color: 'var(--text-n3)' }}>{r.date}</span>
                    <span
                      className="shrink-0 text-[11px] leading-[16px] tracking-[0.11px] px-[6px] py-[1px] rounded-[3px]"
                      style={r.status === 'activated'
                        ? { color: '#2a9b7d', background: 'rgba(42,155,125,0.08)' }
                        : { color: 'var(--text-n3)', background: 'rgba(0,0,0,0.04)' }
                      }
                    >
                      {r.status === 'activated' ? 'Activated' : 'Pending'}
                    </span>
                    {r.credits > 0 && (
                      <span className="shrink-0 text-[12px] leading-[18px] font-medium" style={{ color: 'var(--main-m1, #49A3A6)' }}>
                        +{r.credits.toLocaleString()}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Demo 预览入口 */}
          {onNavigate && (
            <div className="mt-[16px] pt-[14px] flex items-center justify-center" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
              <button
                className="text-[12px] leading-[18px] cursor-pointer flex items-center gap-[4px] transition-colors hover:opacity-70"
                style={{ color: 'var(--main-m1, #49A3A6)', background: 'none', border: 'none' }}
                onClick={() => { onClose(); onNavigate('referral-landing'); }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Preview invite page
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
