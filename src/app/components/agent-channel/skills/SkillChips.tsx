/**
 * [INPUT]: skills.ts 的 SKILLS/KIND_META、SkillPreview/MiniSpark、shared/Avatar、channel-meta 的 SUBSCRIBED
 * [OUTPUT]: SkillChips（可展开技能 chips）+ SkillExpand（展开面板：prompt/gallery/订阅/CTA）
 * [POS]: agent-channel/skills — 四个 concept 共用的技能入口（源自 demo planc 2064-2172 行）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import { useState } from 'react';
import { Avatar } from '@/app/components/shared/Avatar';
import { SUBSCRIBED } from '@/data/agent-channel/channel-meta';
import { KIND_META, SKILLS } from '@/data/agent-channel/skills';
import { TONE_BG, TONE_FG } from '@/data/agent-channel/types';
import type { Skill, SubpushItem } from '@/data/agent-channel/types';
import { ChannelIcon } from '../ChannelIcon';
import { MiniSpark, SkillPreview } from './SkillPreview';

/* ========== 展开面板 ========== */

interface SkillExpandProps {
  skill: Skill;
  variant?: 'preview';
  onRun: (skill: Skill, textOverride?: string) => void;
  onSubscribed: (skill: Skill, item: SubpushItem) => void;
}

export function SkillExpand({ skill, variant, onRun, onSubscribed }: SkillExpandProps) {
  const km = KIND_META[skill.kind];
  const preview = variant === 'preview' && !!skill.previews;
  const [, bump] = useState(0);
  return (
    <div className="skex">
      {variant !== 'preview' && <div className="skex-tag" style={{ color: TONE_FG[km.tone], background: TONE_BG[km.tone] }}><ChannelIcon name={km.icon} size={13} /> {km.label}</div>}

      {variant !== 'preview' && (
        <div className="skex-block">
          <div className="skex-h">{skill.subs ? 'Build your own' : 'Suggested prompt'}</div>
          <button className="skex-prompt" onClick={() => onRun(skill)}>
            <span>{skill.prompt}</span>
            <span className="skex-ent"><ChannelIcon name="enter" size={16} /></span>
          </button>
        </div>
      )}

      {preview && <SkillPreview skill={skill} ctaTone={km.tone} onRun={onRun} onSubscribed={onSubscribed} />}

      {!preview && (
        <div className="skex-block">
          <div className="skex-h">Made with this skill</div>
          {skill.kind === 'playbook' && (
            <div className="skg-grid visual">
              {skill.gallery.map((g, i) => (
                <button className="skg-card" key={i} onClick={() => onRun(skill)}>
                  <div className="skg-cover" style={{ background: g.tone ? TONE_BG[g.tone] : undefined }}><MiniSpark points={g.points ?? []} tone={g.tone} /></div>
                  <div className="skg-body">
                    <div className="skg-t">{g.t}</div>
                    <div className="skg-chips">{(g.tickers ?? []).map((t) => <span className="skg-tkr" key={t}>{t}</span>)}</div>
                    <div className="skg-stat" style={{ color: g.tone ? TONE_FG[g.tone] : undefined }}>{g.stat}</div>
                    <div className="skg-s">{g.s}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
          {skill.kind === 'automation' && (
            <div className="skg-list">
              {skill.gallery.map((g, i) => (
                <button className="skg-auto" key={i} onClick={() => onRun(skill)}>
                  <div className="sga-h"><span className="sga-bell"><ChannelIcon name="alert" size={14} /></span><span className="sga-t">{g.t}</span></div>
                  <div className="sga-rule">{g.rule}</div>
                  <div className="sga-meta"><span><ChannelIcon name="clock" size={12} /> {g.every}</span><span className="sga-sample"><span className="sga-live">SAMPLE</span>{g.sample}</span></div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {!preview && skill.subs && (
        <div className="skex-block">
          <div className="skex-h">Recommended — subscribe in one tap</div>
          <div className="subs-list">
            {skill.subs.map((g, i) => (
              <div className="sub-card" key={i}>
                {g.points
                  ? <span className="sub-spark" style={{ background: g.tone ? TONE_BG[g.tone] : undefined }}><MiniSpark points={g.points} tone={g.tone} /></span>
                  : <span className="sub-bell"><ChannelIcon name="automation" size={15} /></span>}
                <div className="sub-body">
                  <div className="sub-t">{g.t}</div>
                  <div className="sub-m">{g.meta || g.every}{g.stat && <> · <span style={{ color: TONE_FG[g.tone || km.tone] }}>{g.stat}</span></>}</div>
                  {g.desc && <div className="sub-d">{g.desc}</div>}
                  <div className="sub-by"><Avatar name={g.creator} size={16} />{g.creator} · {g.subscribers} subscribers</div>
                </div>
                {SUBSCRIBED.has(g.t)
                  ? <button className="sub-btn on"><ChannelIcon name="check" size={14} />Subscribed</button>
                  : <button className="sub-btn" onClick={() => { SUBSCRIBED.add(g.t); bump((n) => n + 1); onSubscribed(skill, g); }}><ChannelIcon name="plus" size={14} />Subscribe</button>}
              </div>
            ))}
          </div>
        </div>
      )}

      {!preview && <button className="skex-cta" style={{ background: TONE_FG[km.tone] }} onClick={() => onRun(skill)}>{skill.subs ? 'Build my own' : km.verb}<ChannelIcon name="arrowup" size={15} /></button>}
    </div>
  );
}

/* ========== 可展开 chips 行 ========== */

interface SkillChipsProps {
  skills: Skill[];
  more?: boolean;
  variant?: 'preview';
  open?: string | null;
  onOpenChange?: (id: string | null) => void;
  onStartTask: (skill: Skill, textOverride?: string) => void;
  onSubscribed: (skill: Skill, item: SubpushItem) => void;
}

export function SkillChips({ skills, more = true, variant, open: openProp, onOpenChange, onStartTask, onSubscribed }: SkillChipsProps) {
  const [internalOpen, setInternalOpen] = useState<string | null>(null);
  const open = openProp !== undefined ? openProp : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;
  const openSkill = open ? SKILLS.find((s) => s.id === open) : null;
  return (
    <>
      <div className="chips">
        {skills.map((s) => (
          <button className={`chip${open === s.id ? ' active' : ''}`} key={s.id} onClick={() => setOpen(open === s.id ? null : s.id)}>
            <span className="ci"><ChannelIcon name={s.icon} size={16} /></span>
            {s.label}
            <span className="chip-caret"><ChannelIcon name="chevdown" size={14} /></span>
          </button>
        ))}
        {more && <button className="chip more">More from SkillHub</button>}
      </div>
      {openSkill && (
        <SkillExpand
          skill={openSkill}
          variant={variant}
          onRun={(s, txt) => { setOpen(null); onStartTask(s, txt); }}
          onSubscribed={onSubscribed}
        />
      )}
    </>
  );
}
