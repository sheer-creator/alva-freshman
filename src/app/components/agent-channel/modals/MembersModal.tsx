/**
 * [INPUT]: channel-meta 的 CHANNEL/ROSTER、ava 工具、ChannelIcon
 * [OUTPUT]: MembersModal — 频道参与者列表（leo + Alva bot）
 * [POS]: agent-channel/modals — 顶栏 Members 按钮的目标（源自 demo planc 3686-3716 行的非 group 分支）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import { CHANNEL, ROSTER } from '@/data/agent-channel/channel-meta';
import { ChannelIcon } from '../ChannelIcon';
import { avaColor, initials } from '../ava';

export function MembersModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-h">
          <div>
            <div className="modal-t">Participants</div>
            <div className="modal-s">{CHANNEL.label}</div>
          </div>
          <button className="modal-x" onClick={onClose} aria-label="Close"><ChannelIcon name="plus" size={16} /></button>
        </div>
        <div className="modal-body">
          {ROSTER.map((m) => (
            <div className="member" key={m.name}>
              {m.bot
                ? <span className="m-ava agent"><img src={`${import.meta.env.BASE_URL}logo-portrait.svg`} alt="" /></span>
                : <span className="m-ava" style={{ background: avaColor(m.name) }}>{initials(m.name)}</span>}
              <div style={{ minWidth: 0 }}>
                <div className="m-name">{m.name}{m.bot && <span className="gbot">BOT</span>}</div>
                <div className="m-role">{m.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
