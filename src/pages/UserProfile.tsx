/**
 * [INPUT]: AppShell, profile-mock 数据, shared/PlaybookCard
 * [OUTPUT]: User Profile 页面（Owner 态）
 * [POS]: 页面层 — Figma Draft DJ9Acp13FruTilsTdrE0id node 6127:39847
 *        "Page/Profile/Playbooks · Owner"
 *
 * 布局（稿内坐标，容器 1156 宽）:
 *   y40  Profile Header — 80 头像 + 身份/社交行 + bio + stats，自带 pb12
 *   y230 Tab — Playbooks/Starred/Purchased 下划线页签 + 右侧 All/Public/Private/Paid
 *   y306 Playbook/Card List — 3 列 gap16，复用 Explore/NewChat 的 PlaybookCard
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { Avatar } from '@/app/components/shared/Avatar';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { PlaybookCard } from '@/app/components/shared/PlaybookCard';
import { MOCK_USER, MOCK_PLAYBOOKS, MOCK_STARRED, MOCK_PURCHASED } from '@/data/profile-mock';
import type { ProfilePlaybook } from '@/data/profile-mock';

const DELIGHT = "'Delight', sans-serif";
const socialLogo = (name: string) => `${import.meta.env.BASE_URL}${name}`;

/* ========== 稿里 HandleRow 的 0.5×12 竖分隔（stroke black 0.12） ========== */

function HandleDivider() {
  return (
    <span
      aria-hidden
      className="shrink-0"
      style={{ width: 0.5, height: 12, background: 'var(--line-l12, rgba(0,0,0,0.12))' }}
    />
  );
}

/* ========== Pro 标 —— m1 底 + 0.5 lr3 边 + 全圆角 ========== */

function ProTag() {
  return (
    <span
      className="shrink-0 flex items-center justify-center px-[8px] rounded-[96px]"
      style={{
        background: 'var(--main-m1, #49A3A6)',
        border: '0.5px solid rgba(255, 255, 255, 0.3)',
        fontFamily: DELIGHT,
        fontSize: 11,
        lineHeight: '18px',
        letterSpacing: 0.11,
        color: '#fff',
      }}
    >
      Pro
    </span>
  );
}

/* ========== 社交入口 —— 16 图标 + 8 gap + #737d8c 文字 ========== */

function SocialItem({ file, label }: { file: string; label: string }) {
  return (
    <span className="shrink-0 flex items-center gap-[8px]">
      <img src={socialLogo(file)} width={16} height={16} alt="" className="block size-[16px]" />
      <span style={{ fontFamily: DELIGHT, fontSize: 14, lineHeight: '22px', letterSpacing: 0.14, color: '#737d8c' }}>
        {label}
      </span>
    </span>
  );
}

/* ========== Actions 按钮 —— h32 / 0.5 l3 边 / radius-btn-s ========== */

function HeaderButton({ icon, label, onClick }: { icon: string; label: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 flex h-[32px] items-center justify-center gap-[6px] px-[12px] py-[6px] rounded-[4px] cursor-pointer"
      style={{ border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))' }}
    >
      <CdnIcon name={icon} size={14} color="var(--text-n9, rgba(0,0,0,0.9))" />
      <span
        style={{
          fontFamily: DELIGHT,
          fontSize: 12,
          fontWeight: 500,
          lineHeight: '20px',
          letterSpacing: 0.12,
          color: 'var(--text-n9, rgba(0,0,0,0.9))',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </button>
  );
}

/* ========== Stats 单项 —— 数字 16/26 n9 + 标签 14/22 n5，底对齐 ========== */

function Stat({ value, label, onClick }: { value: string; label: string; onClick?: () => void }) {
  return (
    <div
      className={`shrink-0 flex items-end gap-[8px] ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <span style={{ fontFamily: DELIGHT, fontSize: 16, lineHeight: '26px', letterSpacing: 0.16, color: 'var(--text-n9, rgba(0,0,0,0.9))', whiteSpace: 'nowrap' }}>
        {value}
      </span>
      <span className="flex items-center gap-[4px] pb-px">
        <span style={{ fontFamily: DELIGHT, fontSize: 14, lineHeight: '22px', letterSpacing: 0.14, color: 'var(--text-n5, rgba(0,0,0,0.5))', whiteSpace: 'nowrap' }}>
          {label}
        </span>
        {onClick && <CdnIcon name="arrow-right-l2" size={12} color="var(--text-n5, rgba(0,0,0,0.5))" />}
      </span>
    </div>
  );
}

/* ========== Bio —— 收起 2 行 + 右下 Show more（白底压字 + 左侧 20px 渐变） ========== */

function Bio({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const base = { fontFamily: DELIGHT, fontSize: 14, lineHeight: '22px', letterSpacing: 0.14, color: 'var(--text-n9, rgba(0,0,0,0.9))' };

  return (
    <div className="relative w-full max-w-[720px]">
      <p
        style={
          expanded
            ? base
            : { ...base, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }
        }
      >
        {text}
      </p>
      {expanded ? (
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="flex items-center gap-[4px] cursor-pointer"
          style={{ ...base, color: 'var(--main-m1, #49A3A6)' }}
        >
          Show less
          <CdnIcon name="arrow-up-l2" size={12} color="var(--main-m1, #49A3A6)" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="absolute bottom-0 right-0 flex items-center gap-[4px] cursor-pointer"
          style={{ ...base, color: 'var(--main-m1, #49A3A6)', background: 'var(--b0-container, #fff)' }}
        >
          <span
            aria-hidden
            className="absolute top-0 left-[-20px] size-[20px]"
            style={{ background: 'linear-gradient(to left, var(--b0-container, #fff), rgba(255,255,255,0))' }}
          />
          Show more
          <CdnIcon name="arrow-down-l2" size={12} color="var(--main-m1, #49A3A6)" />
        </button>
      )}
    </div>
  );
}

/* ========== Profile Header ========== */

function ProfileHeader({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const u = MOCK_USER;
  return (
    <div className="flex w-full items-start gap-[20px] pb-[12px]">
      <Avatar name={u.name} size={80} />

      <div className="flex min-w-px flex-[1_0_0] flex-col gap-[12px]">
        {/* HeaderRow —— 身份块 + 右侧动作 */}
        <div className="flex w-full items-start gap-[24px]">
          <div className="flex min-w-px flex-[1_0_0] flex-col gap-[4px]">
            {/* Identity */}
            <div className="flex items-center gap-[8px]">
              <span style={{ fontFamily: DELIGHT, fontSize: 24, lineHeight: '34px', letterSpacing: 0.24, color: 'var(--text-n9, rgba(0,0,0,0.9))', whiteSpace: 'nowrap' }}>
                {u.name}
              </span>
              {u.isPro && <ProTag />}
            </div>

            {/* HandleRow —— 换行时 row-gap 8 / column-gap 12 */}
            <div className="flex w-full flex-wrap items-center gap-x-[12px] gap-y-[8px]">
              <span className="shrink-0" style={{ fontFamily: DELIGHT, fontSize: 14, lineHeight: '22px', letterSpacing: 0.14, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
                {u.handle}
              </span>
              <HandleDivider />
              <span className="shrink-0" style={{ fontFamily: DELIGHT, fontSize: 14, lineHeight: '22px', letterSpacing: 0.14, color: 'var(--text-n5, rgba(0,0,0,0.5))', whiteSpace: 'nowrap' }}>
                Joined {u.joinDate}
              </span>
              {u.socials.x && (
                <>
                  <HandleDivider />
                  <SocialItem file="logo-social-x.svg" label={u.socials.x} />
                </>
              )}
              {u.socials.telegram && (
                <>
                  <HandleDivider />
                  <SocialItem file="logo-social-telegram.svg" label={u.socials.telegram} />
                </>
              )}
              {u.socials.discord && (
                <>
                  <HandleDivider />
                  <SocialItem file="logo-social-discord.svg" label={u.socials.discord} />
                </>
              )}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-[12px]">
            <HeaderButton icon="share-l" label="Share Profile" />
            <HeaderButton icon="edit-l1" label="Edit Profile" onClick={() => onNavigate('account')} />
          </div>
        </div>

        <Bio text={u.bio} />

        <div className="flex items-center gap-[28px]">
          <Stat value={String(u.totalPlaybooks)} label="Playbooks" />
          <Stat value={String(u.totalStars)} label="Stars" />
          <Stat value={String(u.totalRemix)} label="Remix" />
          <Stat value={u.earned} label="earned" onClick={() => onNavigate('creator-earnings')} />
        </div>
      </div>
    </div>
  );
}

/* ========== Tab ========== */

type ProfileTab = 'playbooks' | 'starred' | 'purchased';
type VisibilityFilter = 'All' | 'Public' | 'Private' | 'Paid';

const TABS: { key: ProfileTab; label: string }[] = [
  { key: 'playbooks', label: 'Playbooks' },
  { key: 'starred', label: 'Starred' },
  { key: 'purchased', label: 'Purchased' },
];

const FILTERS: VisibilityFilter[] = ['All', 'Public', 'Private', 'Paid'];

function ProfileTabs({
  tab,
  onTabChange,
  filter,
  onFilterChange,
}: {
  tab: ProfileTab;
  onTabChange: (t: ProfileTab) => void;
  filter: VisibilityFilter;
  onFilterChange: (f: VisibilityFilter) => void;
}) {
  return (
    <div
      className="flex w-full items-start gap-[12px]"
      style={{ borderBottom: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' }}
    >
      {/* 左侧下划线页签 —— 选中态 pt12/pb10 + 2px m1 底边，与未选中同高 52 */}
      <div className="flex min-w-px flex-[1_0_0] items-center gap-[20px]">
        {TABS.map(t => {
          const active = t.key === tab;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => onTabChange(t.key)}
              className={`box-border flex shrink-0 items-start cursor-pointer ${active ? 'pt-[12px] pb-[10px]' : 'py-[12px]'}`}
              style={active ? { borderBottom: '2px solid var(--main-m1, #49A3A6)' } : undefined}
            >
              <span
                style={{
                  fontFamily: DELIGHT,
                  fontSize: 18,
                  fontWeight: active ? 500 : 400,
                  lineHeight: '28px',
                  letterSpacing: 0.18,
                  color: active ? 'var(--text-n9, rgba(0,0,0,0.9))' : 'var(--text-n7, rgba(0,0,0,0.7))',
                  whiteSpace: 'nowrap',
                }}
              >
                {t.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* 右侧 segmented —— br05 底 + 2 内边距，选中项白底 */}
      <div className="flex shrink-0 self-stretch items-center justify-center">
        <div
          className="flex items-start p-[2px] rounded-[4px]"
          style={{ background: 'var(--b-r05, rgba(0,0,0,0.05))' }}
        >
          {FILTERS.map(f => {
            const active = f === filter;
            return (
              <button
                key={f}
                type="button"
                onClick={() => onFilterChange(f)}
                className="flex h-[28px] shrink-0 items-center gap-[4px] px-[10px] py-[4px] rounded-[2px] cursor-pointer"
                style={active ? { background: 'var(--b0-container, #fff)' } : undefined}
              >
                <span
                  style={{
                    fontFamily: DELIGHT,
                    fontSize: 12,
                    fontWeight: active ? 500 : 400,
                    lineHeight: '20px',
                    letterSpacing: 0.12,
                    color: active ? 'var(--text-n9, rgba(0,0,0,0.9))' : 'var(--text-n7, rgba(0,0,0,0.7))',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {f}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ========== 卡片网格 —— 与 Explore 同一套列宽规则 N = ⌊(W+16)/340⌋ ========== */

function useContainerWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(entries => {
      for (const e of entries) setW(e.contentRect.width);
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

function CardGrid({ items, onOpen }: { items: ProfilePlaybook[]; onOpen: () => void }) {
  const [gridRef, width] = useContainerWidth();
  const columns = Math.max(1, Math.floor((Math.max(0, width) + 16) / 340));

  return (
    <div
      ref={gridRef}
      style={
        width === 0
          ? { display: 'grid', gap: 16, width: '100%' }
          : { display: 'grid', gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gap: 16, width: '100%' }
      }
    >
      {items.map((pb, i) => (
        <div key={pb.id} className="w-full" onClick={onOpen}>
          <PlaybookCard p={pb} staggerMs={(i % 10) * 1000} />
        </div>
      ))}
    </div>
  );
}

/* ========== 页面 ========== */

export default function UserProfile({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [tab, setTab] = useState<ProfileTab>('playbooks');
  const [filter, setFilter] = useState<VisibilityFilter>('All');

  const items = useMemo(() => {
    const source =
      tab === 'playbooks' ? MOCK_PLAYBOOKS : tab === 'starred' ? MOCK_STARRED : MOCK_PURCHASED;
    if (filter === 'All') return source;
    return source.filter(p => p.visibility === filter.toLowerCase());
  }, [tab, filter]);

  return (
    <AppShell activePage="user-profile" onNavigate={onNavigate}>
      <div className="min-h-full rounded-[inherit] pb-[80px]">
        <div className="flex w-full flex-col gap-[24px] px-[28px] pt-[40px]">
          <ProfileHeader onNavigate={onNavigate} />
          <ProfileTabs tab={tab} onTabChange={setTab} filter={filter} onFilterChange={setFilter} />
          <CardGrid items={items} onOpen={() => onNavigate('explore')} />
        </div>
      </div>
    </AppShell>
  );
}
