/**
 * [INPUT]: NewChatTemplate / CommunitySkillTemplate(@/data/new-chat-mock)
 * [OUTPUT]: SkillsLibraryPanel — More 触发的全量 skills 浮层(分列瀑布流卡片,hover 展开 creator 行);附 tagsForSkill / socialsForCreator / fnv1aSkill 派生辅助
 * [POS]: NewChat 首页与 Agent 空态(AgentNewSession / demo)共用;像素结构原样自 NewChat 抽出
 */

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { Avatar } from '@/app/components/shared/Avatar';
import type { CommunitySkillTemplate, NewChatTemplate } from '@/data/new-chat-mock';

/* ========== 派生辅助(哈希稳定,与 NewChat hover 卡共用) ========== */

export function fnv1aSkill(seed: string): number {
  let x = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    x ^= seed.charCodeAt(i);
    x = Math.imul(x, 0x01000193);
  }
  return x >>> 0;
}

/* 派生 skill 信息卡的 tags(CommunitySkill 直接用自带字段,其它走哈希派生) */
const TAG_POOL = [
  'Filings', 'Insider Cluster', 'Event Drift', 'Earnings Drift', 'Whisper Numbers',
  'Macro Flow', 'FX Cross', 'Rates Curve', 'Credit Spread', 'Sentiment',
  'Theme Tracker', 'Catalyst', 'Risk Off', 'Backtest', 'Yield Curve',
  'Dividend', 'On-Chain', 'ETF Flow', 'MAG7', 'AI Capex',
  'Hyperscaler', 'Volatility', 'Carry', 'Drawdown', 'Sharpe',
  'Quintile', 'Read-Across', 'Sector Rotation', 'Pair Trade', 'Theme',
];

export function tagsForSkill(skillId: string): string[] {
  const h = fnv1aSkill(skillId);
  const count = ((h >>> 12) % 2) + 2; // 2 或 3 个
  const used = new Set<number>();
  const picks: string[] = [];
  for (let i = 0; picks.length < count && i < 32; i++) {
    const stretch = fnv1aSkill(`${skillId}|tag|${i}`);
    const idx = stretch % TAG_POOL.length;
    if (used.has(idx)) continue;
    used.add(idx);
    picks.push(TAG_POOL[idx]);
  }
  return picks;
}

/* by-line 的相对时间(哈希稳定派生,同 NewChat hover 卡口径) */
export function relativeTimeForSkill(skillId: string): string {
  const h = fnv1aSkill(skillId);
  const minutes = h % 7200;
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (minutes < 24 * 60) return `${Math.floor(minutes / 60)}h ago`;
  return `${Math.floor(minutes / (24 * 60))}d ago`;
}

/* ========== Social media icons ========== */

export interface SocialDef {
  key: string;
  label: string;
  href: string;
  render: () => React.ReactNode;
}

const renderImg = (src: string) => () =>
  (
    <img
      src={`${import.meta.env.BASE_URL}${src}`}
      alt=""
      width={14}
      height={14}
      style={{ width: 14, height: 14, display: 'block' }}
    />
  );

const renderXLogo = () => () =>
  (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="rgba(0,0,0,0.85)" aria-hidden style={{ display: 'block' }}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );

const renderInstagramLogo = () => () =>
  (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="rgba(0,0,0,0.85)" aria-hidden style={{ display: 'block' }}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );

const SOCIAL_DEFS: Record<string, SocialDef> = {
  discord: { key: 'discord', label: 'Discord', href: 'https://discord.com', render: renderImg('logo-social-discord.svg') },
  telegram: { key: 'telegram', label: 'Telegram', href: 'https://telegram.org', render: renderImg('logo-social-telegram.svg') },
  x: { key: 'x', label: 'X', href: 'https://x.com', render: renderXLogo() },
  instagram: { key: 'instagram', label: 'Instagram', href: 'https://instagram.com', render: renderInstagramLogo() },
};

const ALVA_SOCIALS = ['discord', 'telegram', 'x'] as const;
const NON_ALVA_POOL = ['x', 'telegram', 'discord', 'instagram'] as const;

export function socialsForCreator(creator: string): SocialDef[] {
  if (creator === 'Alva') return ALVA_SOCIALS.map((k) => SOCIAL_DEFS[k]);
  // 用 creator 名稳定派生 1-2 个 socials(仅 X / Telegram / Discord / Instagram)
  let h = 0x811c9dc5;
  for (let i = 0; i < creator.length; i++) {
    h ^= creator.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  const seedScore = (k: string) => {
    let s = h;
    for (let i = 0; i < k.length; i++) {
      s ^= k.charCodeAt(i);
      s = Math.imul(s, 0x01000193) >>> 0;
    }
    return s;
  };
  const count = (h % 2) + 1; // 1 或 2
  const sorted = [...NON_ALVA_POOL].sort((a, b) => seedScore(a) - seedScore(b));
  return sorted.slice(0, count).map((k) => SOCIAL_DEFS[k]);
}

/* ========== 样式(原样移自 NewChat 的 skills-panel 段) ========== */

const PANEL_CSS = `
@keyframes skills-panel-fade{from{opacity:0}to{opacity:1}}
.skills-panel-backdrop{
  position:fixed;
  inset:0;
  background:rgba(0,0,0,0.45);
  z-index:9998;
  animation:skills-panel-fade 200ms ease-out;
}
@keyframes skills-panel-modal-in{
  from{ opacity:0; transform:translate(-50%, -50%) scale(0.96); }
  to{ opacity:1; transform:translate(-50%, -50%) scale(1); }
}
.skills-panel{
  position:fixed;
  left:50%;
  top:50%;
  transform:translate(-50%, -50%);
  width:calc(100% - 48px);
  max-width:1200px;
  max-height:min(800px, calc(100vh - 64px));
  background:#fff;
  border-radius:var(--radius-pop-dialog, 8px);
  box-shadow:0 24px 64px rgba(0,0,0,0.16), 0 8px 24px rgba(0,0,0,0.08);
  z-index:9999;
  display:flex;
  flex-direction:column;
  animation:skills-panel-modal-in 220ms cubic-bezier(0.2,0.8,0.2,1);
  overflow:hidden;
}
.skills-panel-header{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:20px 24px 12px;
  flex-shrink:0;
}
.skills-panel-title{
  font-family:'Delight',sans-serif;
  font-size:18px;
  line-height:28px;
  font-weight:500;
  color:var(--text-n9);
  letter-spacing:0.18px;
}
.skills-panel-close{
  width:28px;
  height:28px;
  border:none;
  background:transparent;
  border-radius:6px;
  cursor:pointer;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  transition:background 140ms ease;
}
@media (hover: hover){
  .skills-panel-close:hover{ background:var(--b-r05); }
}
.skills-panel-scroll{
  flex:1;
  overflow-y:auto;
  padding:4px 24px 24px;
}
/* 手动分列瀑布流:JS 把卡片 round-robin 分到 N 个独立列容器(flex column)
   每列独立堆叠 → 第一行顶部对齐;某列内 hover 撑高,只影响同列下方卡片,
   其它列不会跟着重排。 */
.skills-panel-grid{
  display:flex;
  gap:12px;
  align-items:flex-start;
}
.skills-panel-col{
  flex:1 1 0;
  min-width:0;
  display:flex;
  flex-direction:column;
  gap:12px;
}
@media (max-width: 639px){
  .skills-panel{
    max-height:85vh;
  }
  .skills-panel-scroll{ padding:4px 16px 24px; }
  .skills-panel-header{ padding:16px 16px 8px; }
}
.skills-panel-card{
  position:relative;
  display:flex;
  flex-direction:column;
  gap:12px;
  padding:20px;
  text-align:left;
  background:var(--b-r02);
  border:1px solid var(--line-l07);
  border-radius:8px;
  cursor:pointer;
  /* Same easing + duration for hover-in and hover-out across every prop */
  transition:background 240ms cubic-bezier(0.4, 0, 0.2, 1),
             border-color 240ms cubic-bezier(0.4, 0, 0.2, 1),
             box-shadow 240ms cubic-bezier(0.4, 0, 0.2, 1),
             padding-bottom 240ms cubic-bezier(0.4, 0, 0.2, 1);
}
@media (hover: hover){
  .skills-panel-card:hover{
    background:rgba(255,255,255,0.9);
    border-color:var(--line-l9, rgba(0,0,0,0.9));
    box-shadow:0 6px 20px rgba(0,0,0,0.04);
    /* 用户行下方边距 = 用户行到分割线的距离(16px)*/
    padding-bottom:16px;
  }
}
.skills-panel-card.is-selected{
  background:var(--b-r02);
  border-color:var(--line-l9, rgba(0,0,0,0.9));
}
@media (hover: hover){
  .skills-panel-card.is-selected:hover{
    background:rgba(255,255,255,0.9);
    border-color:var(--line-l9, rgba(0,0,0,0.9));
    box-shadow:0 6px 20px rgba(0,0,0,0.04);
  }
}
/* Hover 展开底部 creator + socials 行。
   所有过渡使用统一的 240ms cubic-bezier(0.4,0,0.2,1),确保
   hover-in 和 hover-out 节奏一致。 */
.skills-panel-card-hoverblock{
  display:grid;
  grid-template-rows:0fr;
  opacity:0;
  /* margin-top:-12 抵消 card-level gap:12,使收起态不留间距;
     展开时 grid-template-rows 撑开,gap 通过 row-gap 自然出现。 */
  margin-top:-12px;
  transition:grid-template-rows 240ms cubic-bezier(0.4, 0, 0.2, 1),
             opacity 240ms cubic-bezier(0.4, 0, 0.2, 1),
             margin-top 240ms cubic-bezier(0.4, 0, 0.2, 1);
}
.skills-panel-card-hoverblock-inner{
  overflow:hidden;
  min-height:0;
}
@media (hover: hover){
  .skills-panel-card:hover .skills-panel-card-hoverblock{
    grid-template-rows:1fr;
    opacity:1;
    margin-top:0;
  }
}
@media (hover: none){
  .skills-panel-card-hoverblock{
    grid-template-rows:1fr;
    opacity:1;
    margin-top:0;
  }
}
/* KOL 卡片(顶部用 Avatar):hover 时头像隐藏,标题块滑到左侧。
   Alva 卡片(顶部用 icon-wrap)不参与此动画 —— 图标保留。
   偏移 = 头像 48 + gap 12。 */
@media (hover: hover){
  .skills-panel-card:hover .skills-panel-card-creator-thumb{
    visibility:hidden;
  }
  .skills-panel-card:hover .skills-panel-card-creator-thumb + .skills-panel-card-titleblock{
    transform:translateX(-60px);
  }
}
.skills-panel-card-divider{
  height:1px;
  background:var(--line-l07);
  margin:0 0 16px;
}
.skills-panel-card-creator-row{
  display:flex;
  align-items:center;
  gap:10px;
}
.skills-panel-card-creator-text{
  flex:1;
  min-width:0;
  display:flex;
  flex-direction:column;
}
.skills-panel-card-creator-caps{
  font-family:'Delight',sans-serif;
  font-size:11px;
  line-height:14px;
  color:rgba(0,0,0,0.4);
  letter-spacing:0.11px;
}
.skills-panel-card-creator-name{
  align-self:flex-start;
  max-width:100%;
  padding:0;
  margin:0;
  background:transparent;
  border:none;
  cursor:pointer;
  text-align:left;
  color:var(--text-n9);
  font:inherit;
}
.skills-panel-card-creator-name-text{
  display:inline-block;
  max-width:100%;
  font-family:'Delight',sans-serif;
  font-size:13px;
  line-height:18px;
  font-weight:500;
  color:var(--text-n9);
  letter-spacing:0.13px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  text-decoration:underline dashed transparent;
  text-decoration-thickness:1px;
  text-underline-offset:3px;
  transition:text-decoration-color 160ms ease;
}
@media (hover: hover){
  .skills-panel-card-creator-name:hover .skills-panel-card-creator-name-text{
    text-decoration-color:var(--text-n9);
  }
}
.skills-panel-card-socials{
  display:flex;
  align-items:center;
  gap:6px;
  flex-shrink:0;
}
.skills-panel-card-social{
  width:24px;
  height:24px;
  border-radius:9999px;
  background:var(--b-r05);
  display:inline-flex;
  align-items:center;
  justify-content:center;
  transition:background 120ms ease;
}
.skills-panel-card-social:hover{ background:rgba(0,0,0,0.1); }
/* 卡片头(参考 Skills Hub 截图):大圆图标 / 头像 + 标题 + by-line */
.skills-panel-card-header{
  display:flex;
  align-items:center;
  gap:12px;
}
.skills-panel-card-icon-wrap{
  width:48px;
  height:48px;
  flex-shrink:0;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  border-radius:9999px;
  background:#fff;
  border:1px solid var(--line-l07);
  transition:background 240ms cubic-bezier(0.4, 0, 0.2, 1);
}
@media (hover: hover){
  .skills-panel-card:hover .skills-panel-card-icon-wrap{
    background:var(--b-r02);
  }
}
.skills-panel-card-creator-thumb{
  flex-shrink:0;
  display:inline-flex;
  align-items:center;
}
.skills-panel-card-titleblock{
  flex:1;
  min-width:0;
  display:flex;
  flex-direction:column;
  gap:2px;
  transition:transform 240ms cubic-bezier(0.4, 0, 0.2, 1);
}
.skills-panel-card-name{
  font-family:'Delight',sans-serif;
  font-size:16px;
  line-height:24px;
  font-weight:400;
  color:var(--text-n9);
  letter-spacing:0.16px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.skills-panel-card-author{
  font-family:'Delight',sans-serif;
  font-size:12px;
  line-height:18px;
  color:var(--text-n5);
  letter-spacing:0.12px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.skills-panel-card-desc{
  font-family:'Delight',sans-serif;
  font-size:13px;
  line-height:22px;
  color:var(--text-n7);
  letter-spacing:0.13px;
  margin:0;
}
.skills-panel-card-tags{
  display:flex;
  flex-wrap:wrap;
  gap:6px;
}
.skills-panel-card-tag{
  height:24px;
  padding:0 8px;
  border-radius:6px;
  background:var(--b-r05);
  color:var(--text-n5);
  font-family:'Delight',sans-serif;
  font-size:12px;
  line-height:20px;
  letter-spacing:0.12px;
  white-space:nowrap;
  display:inline-flex;
  align-items:center;
}
`;

/* ========== Skills 浮层(由下到上的全量 skill grid 面板) ========== */

export function SkillsLibraryPanel({
  skills,
  selectedId,
  onSelect,
  onClose,
}: {
  skills: NewChatTemplate[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onClose: () => void;
}) {
  // 弹窗最大宽度 1200,按视口宽度选 1/2/3 列
  const pickCols = (w: number) => (w < 640 ? 1 : w < 960 ? 2 : 3);
  const [colCount, setColCount] = useState<number>(() =>
    typeof window === 'undefined' ? 3 : pickCols(window.innerWidth),
  );
  useEffect(() => {
    const h = () => setColCount(pickCols(window.innerWidth));
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  if (typeof document === 'undefined') return null;
  // Round-robin 分列:高优 skill 落在每一列的顶部,列内独立堆叠
  const columns: NewChatTemplate[][] = Array.from({ length: colCount }, () => []);
  skills.forEach((s, i) => columns[i % colCount].push(s));
  return createPortal(
    <>
      <style>{PANEL_CSS}</style>
      <div className="skills-panel-backdrop" onClick={onClose} />
      <div className="skills-panel" role="dialog" aria-label="Skills Hub">
        <div className="skills-panel-header">
          <span className="skills-panel-title">Skills Hub</span>
          <button
            type="button"
            aria-label="Close"
            className="skills-panel-close"
            onClick={onClose}
          >
            <CdnIcon name="close-l1" size={16} color="var(--text-n7)" />
          </button>
        </div>
        <div className="skills-panel-scroll">
          <div className="skills-panel-grid">
            {columns.map((col, ci) => (
            <div className="skills-panel-col" key={ci}>
            {col.map((s) => {
              const tags = (s as CommunitySkillTemplate).tags ?? tagsForSkill(s.id);
              const isSelected = selectedId === s.id;
              const socials = socialsForCreator(s.creator);
              return (
                <button
                  key={s.id}
                  type="button"
                  className={`skills-panel-card${isSelected ? ' is-selected' : ''}`}
                  onClick={() => onSelect(s.id)}
                >
                  <div className="skills-panel-card-header">
                    {s.creator === 'Alva' && s.icon ? (
                      <span className="skills-panel-card-icon-wrap">
                        <CdnIcon name={s.icon} size={22} color="var(--text-n7)" />
                      </span>
                    ) : (
                      <span className="skills-panel-card-creator-thumb">
                        <Avatar name={s.creator} size={48} />
                      </span>
                    )}
                    <div className="skills-panel-card-titleblock">
                      <span className="skills-panel-card-name">{s.label}</span>
                      <span className="skills-panel-card-author">by {s.creator} · {relativeTimeForSkill(s.id)}</span>
                    </div>
                  </div>
                  <p className="skills-panel-card-desc">{s.description}</p>
                  {tags.length > 0 && (
                    <div className="skills-panel-card-tags">
                      {tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="skills-panel-card-tag">{tag}</span>
                      ))}
                    </div>
                  )}
                  <div className="skills-panel-card-hoverblock">
                    <div className="skills-panel-card-hoverblock-inner">
                      <div className="skills-panel-card-divider" />
                      <div className="skills-panel-card-creator-row">
                        <Avatar name={s.creator} size={36} />
                        <div className="skills-panel-card-creator-text">
                          <span className="skills-panel-card-creator-caps">Created by</span>
                          <button
                            type="button"
                            className="skills-panel-card-creator-name"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="skills-panel-card-creator-name-text">{s.creator}</span>
                          </button>
                        </div>
                        <div className="skills-panel-card-socials">
                          {socials.map((soc) => (
                            <a
                              key={soc.key}
                              href={soc.href}
                              target="_blank"
                              rel="noreferrer noopener"
                              aria-label={soc.label}
                              onClick={(e) => e.stopPropagation()}
                              className="skills-panel-card-social"
                            >
                              {soc.render()}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
            </div>
            ))}
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}
