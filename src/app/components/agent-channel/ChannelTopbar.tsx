/**
 * [INPUT]: channel-meta 的 CHANNEL/CONCEPTS/IMS/IM_TINT/IM_LINKS、ChannelIcon
 * [OUTPUT]: ChannelTopbar — 频道标题 + A/R/K switcher + IM connect + Members
 * [POS]: agent-channel 组件层 — 频道页顶栏（源自 demo planc 3874-3918 行的 agent 分支）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import { CHANNEL, CONCEPTS, IMS, IM_TINT, IM_LINKS, ROSTER } from '@/data/agent-channel/channel-meta';
import type { ConceptId } from '@/data/agent-channel/types';
import { ChannelIcon } from './ChannelIcon';

interface ChannelTopbarProps {
  concept: ConceptId;
  onConcept: (id: ConceptId) => void;
  onImConnect?: () => void;
  onMembers?: () => void;
}

export function ChannelTopbar({ concept, onConcept, onImConnect, onMembers }: ChannelTopbarProps) {
  const linked = IMS.filter((im) => IM_LINKS[im.id]);
  return (
    <div className="topbar">
      <div className="topbar-left">
        <span className="topbar-mark ch-me">
          <img src={`${import.meta.env.BASE_URL}logo-portrait.svg`} alt="Alva" />
        </span>
        <div className="topbar-id">
          <div className="tb-row">
            <span className="nm">{CHANNEL.label}</span>
            <span className="st">· {CHANNEL.meta}</span>
          </div>
          <div className="tb-desc">{CHANNEL.desc}</div>
        </div>
      </div>
      <div className="topbar-right">
        <div className="switcher">
          {CONCEPTS.map((c) => (
            <button key={c.id} className={concept === c.id ? 'active' : ''} onClick={() => onConcept(c.id)}>
              <span className="dot"></span>
              {c.label}
            </button>
          ))}
        </div>
        <button className={`imlink${linked.length ? '' : ' ghost'}`} onClick={onImConnect} aria-label="Connect IM">
          {linked.length ? (
            <>
              <span style={{ color: IM_TINT[linked[0].id], display: 'grid', placeItems: 'center' }}>
                <ChannelIcon name={linked[0].icon} size={14} />
              </span>
              <span>{linked.length > 1 ? `${linked[0].label} +${linked.length - 1}` : linked[0].label}</span>
              <span className="im-dot"></span>
            </>
          ) : (
            <>
              <ChannelIcon name="link" size={14} />
              <span>Connect</span>
            </>
          )}
        </button>
        <button className="members-btn" onClick={onMembers} aria-label="Members">
          <ChannelIcon name="portfolio" size={16} />
          <span className="mb-count">{ROSTER.length}</span>
        </button>
      </div>
    </div>
  );
}
