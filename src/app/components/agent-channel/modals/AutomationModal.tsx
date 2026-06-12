/**
 * [INPUT]: artifacts.ts 的 AUTO_TEMPLATES/AUTO_CADENCES、EntityPicker、channel-meta 的 CHANNEL
 * [OUTPUT]: AutomationModal — 新建/编辑 alert（模板态：实体 + digest prompt；指令态：自由描述）
 * [POS]: agent-channel/modals — Alerts tab 的新建/编辑（源自 demo planc 3311-3403 行）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import { useState } from 'react';
import { AUTO_CADENCES, AUTO_TEMPLATES } from '@/data/agent-channel/artifacts';
import type { EntityPack } from '@/data/agent-channel/artifacts';
import { CHANNEL } from '@/data/agent-channel/channel-meta';
import type { Automation, AutomationCustom, PickableEntity } from '@/data/agent-channel/types';
import { ChannelIcon } from '../ChannelIcon';
import { EntityPicker, applyPack } from '../kol/EntityPicker';
import type { PickedMap } from '../kol/EntityPicker';

export interface AutomationDraft {
  name: string;
  runEvery: string;
  custom: AutomationCustom;
}

interface AutomationModalProps {
  initial: Automation | null;
  onClose: () => void;
  onSave: (draft: AutomationDraft) => void;
}

export function AutomationModal({ initial, onClose, onSave }: AutomationModalProps) {
  const editing = !!initial;
  const cfg: Partial<AutomationCustom> = initial?.custom ?? {};
  const [mode, setMode] = useState<'template' | 'instruction'>(cfg.mode || 'template');
  const [tpl, setTpl] = useState(cfg.tpl || 'kol');
  const t = AUTO_TEMPLATES.find((x) => x.id === tpl) ?? AUTO_TEMPLATES[0];
  const seedRecs = (base: PickableEntity[]) => [...base, ...(cfg.entities || []).filter((h) => !base.some((k) => k.handle === h)).map((h) => ({ name: h.replace(/^@/, ''), handle: h, focus: 'Added by you' }))];
  const [recs, setRecs] = useState<PickableEntity[]>(() => seedRecs(t.recs));
  const [picked, setPicked] = useState<PickedMap>(() => Object.fromEntries((cfg.entities || []).map((h) => [h, true])));
  const entities = Object.keys(picked).filter((h) => picked[h]);
  const [prompt, setPrompt] = useState(cfg.prompt != null ? cfg.prompt : t.prompt);
  const [instruction, setInstruction] = useState(cfg.instruction || '');
  const [every, setEvery] = useState(initial ? initial.runEvery : t.every);
  const pickTpl = (id: string) => {
    const nt = AUTO_TEMPLATES.find((x) => x.id === id);
    if (!nt) return;
    setTpl(id);
    setRecs(nt.recs);
    setPicked({});
    setPrompt(nt.prompt);
    if (!editing) setEvery(nt.every);
  };
  const toggle = (h: string) => setPicked((p) => ({ ...p, [h]: !p[h] }));
  const addCustom = (v: string) => {
    setRecs((r) => (r.some((k) => k.handle === v) ? r : [...r, { name: v.replace(/^@/, ''), handle: v, focus: 'Added by you' }]));
    setPicked((p) => ({ ...p, [v]: true }));
  };
  const onPack = (pk: EntityPack) => applyPack(pk, picked, setRecs, setPicked);
  const ok = mode === 'template' ? entities.length > 0 : instruction.trim().length > 0;
  // 名字自动派生 — 模板名，或指令的前几个词
  const autoName = editing ? initial.name
    : mode === 'template' ? t.name
    : (instruction.trim().split(/\s+/).slice(0, 3).join('-').replace(/[^A-Za-z0-9-]/g, '') || 'Custom-Watch');
  const save = () => ok && onSave({ name: autoName, runEvery: every, custom: { mode, tpl, entities, prompt, instruction, deliver: CHANNEL.id } });
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ width: 480, maxHeight: '88vh' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-h">
          <div>
            <div className="modal-t">{editing ? 'Edit alert' : 'New alert'}</div>
            <div className="modal-s">{editing ? initial.name : 'A standing instruction — Alva runs it on schedule and pushes the result.'}</div>
          </div>
          <button className="modal-x" onClick={onClose} aria-label="Close"><ChannelIcon name="plus" size={16} /></button>
        </div>
        <div className="modal-body" style={{ padding: '20px 20px 18px' }}>
          <div className="seg even">
            <button className={mode === 'template' ? 'active' : ''} onClick={() => setMode('template')}>From a template</button>
            <button className={mode === 'instruction' ? 'active' : ''} onClick={() => setMode('instruction')}>From instructions</button>
          </div>

          {mode === 'template' ? (
            <>
              <div className="am-row" style={{ marginTop: 18 }}>
                {AUTO_TEMPLATES.map((x) => (
                  <button key={x.id} className={`am-tpl${tpl === x.id ? ' on' : ''}`} onClick={() => pickTpl(x.id)}>
                    <span className="am-tpl-t">{x.label}</span>
                    <span className="am-tpl-s">{x.hint}</span>
                  </button>
                ))}
              </div>
              <div className="am-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {t.entityLabel}
                <span className="ko-count">{entities.length} {t.onLabel.toLowerCase()}</span>
              </div>
              <EntityPicker compact recs={recs} picked={picked} onToggle={toggle} onAdd={addCustom} packs={t.packs} onPack={onPack}
                placeholder={t.ph} onLabel={t.onLabel} offLabel={t.offLabel} />
              <div className="am-label">Digest prompt</div>
              <textarea className="post-edit" rows={3} value={prompt} onChange={(e) => setPrompt(e.target.value)} />
            </>
          ) : (
            <textarea
              className="post-edit"
              rows={4}
              style={{ marginTop: 18 }}
              value={instruction}
              placeholder={'Describe what to watch and what to push — e.g. “Watch 8h funding; alert me the moment it crosses 0.05% with a one-line read.”'}
              onChange={(e) => setInstruction(e.target.value)}
            />
          )}

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

          <div className="nc-foot">
            <div className="post-meta">Pushes land in the channel — and mirror to its connected IMs.</div>
            <button className="post-go" disabled={!ok} onClick={save}>{editing ? 'Save' : 'Create'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
