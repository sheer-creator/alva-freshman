/**
 * [INPUT]: artifacts.ts 的 EntityPack、ava 工具、ChannelIcon
 * [OUTPUT]: EntityPicker — 共享实体选择器（精选包 + 单选卡 + 自由输入），onboard 与 automation modal 共用
 * [POS]: agent-channel/kol — 模板实体选择（源自 demo planc 2856-2924 行）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import { useState } from 'react';
import type { EntityPack } from '@/data/agent-channel/artifacts';
import type { PickableEntity } from '@/data/agent-channel/types';
import { ChannelIcon } from '../ChannelIcon';
import { avaColor, initials } from '../ava';

export type { PickableEntity };

export type PickedMap = Record<string, boolean>;

/* 包读作 Added 当且仅当全部成员被选中 — 派生值，无第二事实源 */
export const packOn = (pk: EntityPack, picked: PickedMap) => pk.handles.every((h) => !!picked[h]);

export function applyPack(
  pk: EntityPack,
  picked: PickedMap,
  setRecs: (fn: (r: PickableEntity[]) => PickableEntity[]) => void,
  setPicked: (fn: (p: PickedMap) => PickedMap) => void,
) {
  const on = packOn(pk, picked);
  if (!on) setRecs((r) => [...r, ...pk.handles.filter((h) => !r.some((k) => k.handle === h)).map((h) => ({ name: h.replace(/^@/, ''), handle: h, focus: `From ${pk.name}` }))]);
  setPicked((p) => {
    const n = { ...p };
    pk.handles.forEach((h) => { n[h] = !on; });
    return n;
  });
}

interface EntityPickerProps {
  recs: PickableEntity[];
  picked: PickedMap;
  onToggle: (handle: string) => void;
  onAdd: (handle: string) => void;
  packs?: EntityPack[];
  onPack?: (pk: EntityPack) => void;
  placeholder?: string;
  onLabel?: string;
  offLabel?: string;
  compact?: boolean;
}

export function EntityPicker({ recs, picked, onToggle, onAdd, packs, onPack, placeholder, onLabel = 'Following', offLabel = 'Follow', compact }: EntityPickerProps) {
  const [entry, setEntry] = useState('');
  const add = () => { const v = entry.trim(); if (v) onAdd(v); setEntry(''); };
  const member = (h: string) => recs.find((k) => k.handle === h) || { name: h.replace(/^@/, '') };
  return (
    <>
      {packs && (
        <>
          <div className="pk-label">Curated packs</div>
          {packs.map((pk) => {
            const on = packOn(pk, picked);
            return (
              <div className="pack" key={pk.name}>
                <div className="pk-info">
                  <div className="pk-row">
                    <span className="pk-avas">
                      {pk.handles.slice(0, 3).map((h) => <span className="pkav" style={{ background: avaColor(member(h).name) }} key={h}>{initials(member(h).name)}</span>)}
                      {pk.handles.length > 3 && <span className="pkav more">+{pk.handles.length - 3}</span>}
                    </span>
                    <span className="pk-n">{pk.name}</span>
                  </div>
                  <div className="pk-s">{pk.sub}</div>
                </div>
                <button className={`pk-add${on ? ' on' : ''}`} onClick={() => onPack?.(pk)}>{on ? <><ChannelIcon name="check" size={13} />Added</> : '+ Add'}</button>
              </div>
            );
          })}
          <div className="pk-label" style={{ marginTop: 14 }}>Or pick individually</div>
        </>
      )}
      <div className={`ko-grid${compact ? ' compact' : ''}`}>
        {recs.map((k) => {
          const on = !!picked[k.handle];
          return (
            <div className={`ko-card${on ? ' on' : ''}`} key={k.handle}>
              <span className="ko-ava" style={{ background: avaColor(k.name) }}>{initials(k.name)}</span>
              <div className="ko-info">
                <div className="ko-name">{k.name} <span className="ko-handle">{k.handle}</span></div>
                <div className="ko-focus">{k.focus}</div>
                {k.stat && <div className="ko-stat">{k.stat}</div>}
              </div>
              <button className={`ko-follow${on ? ' on' : ''}`} onClick={() => onToggle(k.handle)}>
                {on ? <><ChannelIcon name="check" size={14} /> {onLabel}</> : `+ ${offLabel}`}
              </button>
            </div>
          );
        })}
      </div>
      <div className="ko-custom">
        <span className="ko-at"><ChannelIcon name="at" size={16} /></span>
        <input
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
        />
        <button className="ko-add" disabled={!entry.trim()} onClick={add}>Add</button>
      </div>
    </>
  );
}
