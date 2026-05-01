/**
 * [INPUT]: AppShell, profile-mock 数据, chart-theme 调色板
 * [OUTPUT]: User Profile 客人态页面
 * [POS]: 页面层 — 展示用户 Profile / Playbooks / Discussion / Skills
 *
 * 布局:
 *   Row 1: Profile Header (full width)
 *   Row 2: Stats Cards (4 个)
 *   Tab: Playbooks | Discussion | Skills（水平切换）
 *   Content: 3-per-row 卡片（Playbooks / Skills）或纵向列表（Discussion）
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { PulseIndicator } from '@/app/components/community/PulseIndicator';
import { Avatar as UserAvatar } from '@/app/components/shared/Avatar';
import { MOCK_USER, MOCK_PLAYBOOKS, MOCK_COMMENTS, MOCK_SKILLS } from '@/data/profile-mock';
import type { PlaybookSummary, CommentActivity, SkillSummary } from '@/data/profile-mock';

/* ========== ProfileHeader ========== */

function ProfileHeader() {
  const u = MOCK_USER;
  return (
    <div style={{ background: 'var(--grey-g01)', borderRadius: 4, padding: 20 }}>
      <div className="flex items-center gap-[16px]">
        <UserAvatar name={u.name} size={56} />
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-[8px]">
            <span className="text-[18px] font-medium" style={{ color: 'var(--text-n9)' }}>{u.name}</span>
            <PulseIndicator status={u.pulse} />
          </div>
          <span className="text-[13px] mt-[4px]" style={{ color: 'var(--text-n7)', lineHeight: '20px' }}>{u.bio}</span>
          <div className="flex items-center gap-[6px] mt-[4px]">
            <span className="text-[12px]" style={{ color: 'var(--text-n5)' }}>Joined {u.joinDate}</span>
            {u.publishedBy && (
              <>
                <span className="text-[12px]" style={{ color: 'var(--text-n3)' }}>&middot;</span>
                <span className="text-[12px]" style={{ color: 'var(--text-n5)' }}>via {u.publishedBy}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========== StatItem ========== */

function StatItem({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex-1 min-w-0" style={{ background: 'var(--grey-g01)', borderRadius: 4, padding: '16px 20px' }}>
      <p className="text-[22px]" style={{ color: 'var(--text-n9)', fontFamily: "'Delight', sans-serif", fontWeight: 400 }}>
        {value.toLocaleString()}
      </p>
      <p className="text-[12px] mt-[4px]" style={{ color: 'var(--text-n5)' }}>{label}</p>
    </div>
  );
}

/* ========== PlaybookCard — 严格复用 HomeC ExploreCard 样式 ========== */

function PlaybookCard({ pb, onClick }: { pb: PlaybookSummary; onClick: () => void }) {
  return (
    <div className="relative flex-1 min-w-0 rounded-[6px] bg-white cursor-pointer" onClick={onClick}>
      <div className="flex flex-col gap-[16px] p-[16px]">
        <div className="flex items-center gap-[6px]">
          <UserAvatar name={MOCK_USER.name} size={20} />
          <span className="font-['Delight',sans-serif] text-[13px] leading-[20px] tracking-[0.13px] text-[rgba(0,0,0,0.7)]">{MOCK_USER.name}</span>
          <PulseIndicator status={pb.status} />
        </div>
        <div className="flex flex-col gap-[6px]">
          <p className="font-['Delight',sans-serif] text-[16px] leading-[24px] tracking-[0.16px] text-[rgba(0,0,0,0.9)] truncate">{pb.name}</p>
          <p className="font-['Delight',sans-serif] text-[13px] leading-[20px] tracking-[0.13px] text-[rgba(0,0,0,0.5)] line-clamp-2 h-[40px]">{pb.description}</p>
        </div>
        <div>
          <p className="font-['Delight',sans-serif] text-[24px] leading-[32px] tracking-[0.24px] text-[#49a3a6]">{pb.annualizedReturn}</p>
          <p className="font-['Delight',sans-serif] text-[12px] leading-[18px] tracking-[0.12px] text-[rgba(0,0,0,0.4)]">Annualized Return</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute inset-0 rounded-[6px] border border-[rgba(0,0,0,0.08)] pointer-events-none" />
    </div>
  );
}

/* ========== CommentActivityItem ========== */

function CommentActivityItem({ c }: { c: CommentActivity }) {
  return (
    <div style={{ background: 'var(--grey-g01)', borderRadius: 4, padding: '16px 20px' }}>
      <div className="flex items-start gap-[12px]">
        <UserAvatar name={MOCK_USER.name} size={26} />
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[6px] min-w-0">
              <span className="text-[13px] font-medium" style={{ color: 'var(--text-n9)' }}>{MOCK_USER.name}</span>
              {c.replyTo && (
                <>
                  <span className="text-[12px]" style={{ color: 'var(--text-n5)' }}>replied to</span>
                  <span className="text-[12px] font-medium" style={{ color: '#49A3A6' }}>@{c.replyTo}</span>
                </>
              )}
            </div>
            <span className="text-[12px] shrink-0 ml-[12px]" style={{ color: 'var(--text-n5)' }}>{c.timestamp}</span>
          </div>

          {/* Playbook 来源 */}
          <div className="flex items-center gap-[4px] mt-[4px]">
            <span className="text-[12px]" style={{ color: 'var(--text-n5)' }}>in:</span>
            <span className="text-[12px]" style={{ color: 'var(--text-n7)' }}>{c.playbookName}</span>
            <span className="text-[12px]" style={{ color: 'var(--text-n5)' }}>by @{c.playbookAuthor}</span>
          </div>

          {/* 内容 */}
          <p
            className="text-[13px] mt-[8px] leading-[22px]"
            style={{ color: 'var(--text-n7)' }}
            dangerouslySetInnerHTML={{ __html: c.text.replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--text-n9)">$1</strong>') }}
          />
        </div>
      </div>
    </div>
  );
}

/* ========== Tab 类型 ========== */

type ProfileTab = 'playbooks' | 'discussion' | 'skills';

/* ========== Playbooks Grid — 3-per-row, 与 HomeC 一致 ========== */

function PlaybooksGrid({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const rows: PlaybookSummary[][] = [];
  for (let i = 0; i < MOCK_PLAYBOOKS.length; i += 3) rows.push(MOCK_PLAYBOOKS.slice(i, i + 3));

  return (
    <div className="flex flex-col gap-[12px]">
      {rows.map((row, i) => (
        <div key={i} className="flex gap-[12px]">
          {row.map(pb => (
            <PlaybookCard key={pb.id} pb={pb} onClick={() => onNavigate('playbook-detail')} />
          ))}
          {row.length < 3 && Array.from({ length: 3 - row.length }).map((_, j) => (
            <div key={`empty-${j}`} className="flex-1 min-w-0" />
          ))}
        </div>
      ))}
    </div>
  );
}

/* ========== SkillCard — 复用 PlaybookCard 样式 ========== */

function SkillCard({ sk }: { sk: SkillSummary }) {
  return (
    <div className="relative flex-1 min-w-0 rounded-[6px] bg-white">
      <div className="flex flex-col gap-[16px] p-[16px]">
        <div className="flex items-center gap-[6px]">
          <UserAvatar name={sk.author} size={20} />
          <span className="font-['Delight',sans-serif] text-[13px] leading-[20px] tracking-[0.13px] text-[rgba(0,0,0,0.7)]">{sk.author}</span>
          <span className="text-[11px] px-[6px] py-[1px] rounded-[3px]" style={{ background: sk.category === 'alva' ? 'rgba(73,163,166,0.12)' : 'rgba(0,0,0,0.05)', color: sk.category === 'alva' ? '#49a3a6' : 'rgba(0,0,0,0.5)' }}>
            {sk.category === 'alva' ? 'Alva' : 'Custom'}
          </span>
        </div>
        <div className="flex flex-col gap-[6px]">
          <p className="font-['Delight',sans-serif] text-[16px] leading-[24px] tracking-[0.16px] text-[rgba(0,0,0,0.9)] truncate">{sk.name}</p>
          <p className="font-['Delight',sans-serif] text-[13px] leading-[20px] tracking-[0.13px] text-[rgba(0,0,0,0.5)] line-clamp-2 h-[40px]">{sk.description}</p>
        </div>
        <div>
          <p className="font-['Delight',sans-serif] text-[24px] leading-[32px] tracking-[0.24px] text-[#49a3a6]">{sk.weeklyInstalls}</p>
          <p className="font-['Delight',sans-serif] text-[12px] leading-[18px] tracking-[0.12px] text-[rgba(0,0,0,0.4)]">Weekly Installs</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute inset-0 rounded-[6px] border border-[rgba(0,0,0,0.08)] pointer-events-none" />
    </div>
  );
}

/* ========== Skills Grid — 3-per-row ========== */

function SkillsGrid() {
  const rows: SkillSummary[][] = [];
  for (let i = 0; i < MOCK_SKILLS.length; i += 3) rows.push(MOCK_SKILLS.slice(i, i + 3));

  return (
    <div className="flex flex-col gap-[12px]">
      {rows.map((row, i) => (
        <div key={i} className="flex gap-[12px]">
          {row.map(sk => (
            <SkillCard key={sk.id} sk={sk} />
          ))}
          {row.length < 3 && Array.from({ length: 3 - row.length }).map((_, j) => (
            <div key={`empty-${j}`} className="flex-1 min-w-0" />
          ))}
        </div>
      ))}
    </div>
  );
}

/* ========== Discussion 列表 ========== */

function DiscussionList() {
  return (
    <div className="flex flex-col gap-[12px]">
      {MOCK_COMMENTS.map(c => (
        <CommentActivityItem key={c.id} c={c} />
      ))}
    </div>
  );
}

/* ========== 页面 ========== */

export default function UserProfile({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const u = MOCK_USER;
  const [tab, setTab] = useState<ProfileTab>('playbooks');
  return (
    <AppShell activePage="user-profile" onNavigate={onNavigate}>
      <div className="flex flex-col items-center min-h-full pb-[80px] rounded-[inherit]">
        <div className="content-stretch flex flex-col gap-[24px] px-[28px] pt-[24px] relative w-full">

          {/* Profile Header */}
          <ProfileHeader />

          {/* Stats Cards */}
          <div className="flex gap-[12px]">
            <StatItem value={u.totalPlaybooks} label="Playbooks" />
            <StatItem value={u.totalStars} label="Stars" />
            <StatItem value={u.totalForks} label="Forks" />
            <StatItem value={u.totalComments} label="Discussion" />
          </div>

          {/* Tab 切换 */}
          {(() => {
            const tabMeta: Record<ProfileTab, { label: string; count: number }> = {
              playbooks:  { label: 'Playbooks',  count: u.totalPlaybooks },
              discussion: { label: 'Discussion', count: u.totalComments },
              skills:     { label: 'Skills',     count: u.totalSkills },
            };
            return (
              <div className="flex items-center gap-[8px]">
                {(Object.keys(tabMeta) as ProfileTab[]).map(t => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`rounded-[4px] px-[14px] py-[6px] font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] transition-colors cursor-pointer ${
                      tab === t
                        ? 'bg-[rgba(73,163,166,0.15)] text-[rgba(0,0,0,0.9)] font-medium'
                        : 'bg-[rgba(0,0,0,0.03)] text-[rgba(0,0,0,0.5)] hover:text-[rgba(0,0,0,0.7)]'
                    }`}
                  >
                    {tabMeta[t].label} ({tabMeta[t].count})
                  </button>
                ))}
              </div>
            );
          })()}

          {/* Tab 内容 */}
          {tab === 'playbooks' && <PlaybooksGrid onNavigate={onNavigate} />}
          {tab === 'discussion' && <DiscussionList />}
          {tab === 'skills' && <SkillsGrid />}

        </div>
      </div>
    </AppShell>
  );
}
