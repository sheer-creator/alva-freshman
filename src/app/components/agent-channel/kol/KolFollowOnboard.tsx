/**
 * [INPUT]: kol.ts 的 KOL_RECOMMENDED、artifacts.ts 的 ENTITY_PACKS/AUTO_CADENCES、EntityPicker、channel-meta 的 CHANNEL
 * [OUTPUT]: KolFollowOnboard — 一键 follow 的 digest 搭建器（选人 + 频率 + 投递目标 + CTA）
 * [POS]: agent-channel/kol — Concept K 的 onboarding GUI（源自 demo planc 2926-2966 行）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import { useState } from 'react';
import { AUTO_CADENCES, ENTITY_PACKS } from '@/data/agent-channel/artifacts';
import type { EntityPack } from '@/data/agent-channel/artifacts';
import { CHANNEL } from '@/data/agent-channel/channel-meta';
import { KOL_RECOMMENDED } from '@/data/agent-channel/kol';
import { ChannelIcon } from '../ChannelIcon';
import { EntityPicker, applyPack } from './EntityPicker';
import type { PickableEntity, PickedMap } from './EntityPicker';

export function KolFollowOnboard({ onDigest }: { onDigest: (count: number) => void }) {
  const [recs, setRecs] = useState<PickableEntity[]>(KOL_RECOMMENDED);
  const [picked, setPicked] = useState<PickedMap>(() => Object.fromEntries(KOL_RECOMMENDED.filter((k) => k.followed).map((k) => [k.handle, true])));
  const [every, setEvery] = useState('Daily · 07:30 ET');
  const count = Object.values(picked).filter(Boolean).length;
  const toggle = (h: string) => setPicked((p) => ({ ...p, [h]: !p[h] }));
  const addCustom = (v: string) => {
    setRecs((r) => (r.some((k) => k.handle === v) ? r : [...r, { name: v.replace(/^@/, ''), handle: v, focus: 'Added by you' }]));
    setPicked((p) => ({ ...p, [v]: true }));
  };
  const onPack = (pk: EntityPack) => applyPack(pk, picked, setRecs, setPicked);
  return (
    <div className="kol-onboard">
      <div className="ko-h">
        <div>
          <div className="ko-t">Build your digest</div>
          <div className="ko-s">Follow the voices you want Alva to read. One-click a recommendation, or add any handle.</div>
        </div>
        <span className="ko-count">{count} following</span>
      </div>
      <EntityPicker
        recs={recs}
        picked={picked}
        onToggle={toggle}
        onAdd={addCustom}
        packs={ENTITY_PACKS.kol}
        onPack={onPack}
        placeholder="Add any handle — e.g. @chamath, a Substack, or a Telegram channel"
      />
      <div className="am-base">
        <label className="am-sel">
          <span className="am-sel-k">Runs</span>
          <select value={every} onChange={(e) => setEvery(e.target.value)}>
            {AUTO_CADENCES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label className="am-sel">
          <span className="am-sel-k">Deliver to</span>
          <select defaultValue={CHANNEL.id}>
            <option value={CHANNEL.id}>{CHANNEL.label}</option>
          </select>
        </label>
      </div>
      <button className="ko-cta" onClick={() => onDigest(count)}>Start my digest — {count} {count === 1 ? 'voice' : 'voices'}<ChannelIcon name="arrowup" size={15} /></button>
    </div>
  );
}
