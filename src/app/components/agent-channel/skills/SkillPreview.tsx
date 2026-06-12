/**
 * [INPUT]: types.ts 的 Skill/SkillPreviewItem/TONE 色板、channel-meta 的 SUBSCRIBED、ChannelIcon、shared/Avatar
 * [OUTPUT]: SkillPreview（实时预览轮播）+ MiniSpark + PreviewArea 图表
 * [POS]: agent-channel/skills — SkillHub 预览卡轮播（源自 demo planc 1950-2062 行）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import { useId, useRef, useState } from 'react';
import { Avatar } from '@/app/components/shared/Avatar';
import { SUBSCRIBED } from '@/data/agent-channel/channel-meta';
import { TONE_BG, TONE_FG } from '@/data/agent-channel/types';
import type { Skill, SkillPreviewItem, Tone } from '@/data/agent-channel/types';
import { ChannelIcon } from '../ChannelIcon';

/* ========== 迷你 spark 折线（gallery / 订阅卡封面） ========== */

export function MiniSpark({ points, tone }: { points: number[]; tone?: Tone }) {
  const stroke = tone ? TONE_FG[tone] : 'var(--main-m1)';
  const w = 88, h = 34;
  const max = Math.max(...points), min = Math.min(...points);
  const d = points.map((v, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 6) - 3;
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return (
    <svg className="skg-spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" fill="none">
      <path d={`${d} L${w},${h} L0,${h} Z`} fill={stroke} opacity="0.10" />
      <path d={d} stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ========== 预览窗口的全宽面积图 ========== */

function PreviewArea({ points, tone }: { points: number[]; tone: Tone }) {
  const stroke = TONE_FG[tone] || 'var(--main-m1)';
  const gid = useId();
  const w = 300, h = 90;
  const max = Math.max(...points), min = Math.min(...points);
  const xs = points.map((_v, i) => (i / (points.length - 1)) * w);
  const ys = points.map((v) => h - ((v - min) / (max - min || 1)) * (h - 8) - 4);
  const line = points.map((_v, i) => `${i === 0 ? 'M' : 'L'}${xs[i].toFixed(1)},${ys[i].toFixed(1)}`).join(' ');
  return (
    <svg className="pvw-area" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" fill="none">
      <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={stroke} stopOpacity="0.20" /><stop offset="1" stopColor={stroke} stopOpacity="0" /></linearGradient></defs>
      <path d={`${line} L${w},${h} L0,${h} Z`} fill={`url(#${gid})`} />
      <path d={line} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ========== 实时预览轮播（1.5 卡可见，iframe 质感） ========== */

interface SkillPreviewProps {
  skill: Skill;
  ctaTone: Tone;
  onRun: (skill: Skill, textOverride?: string) => void;
  onSubscribed: (skill: Skill, item: SkillPreviewItem) => void;
}

export function SkillPreview({ skill, ctaTone, onRun, onSubscribed }: SkillPreviewProps) {
  const previews = skill.previews ?? [];
  const [, bump] = useState(0);
  const carRef = useRef<HTMLDivElement>(null);
  const [nav, setNav] = useState({ l: false, r: previews.length > 1 });
  const isAuto = skill.kind === 'automation';
  const subscribe = (p: SkillPreviewItem) => { SUBSCRIBED.add(p.t); bump((n) => n + 1); onSubscribed(skill, p); };
  const onScroll = () => {
    const el = carRef.current;
    if (el) setNav({ l: el.scrollLeft > 8, r: el.scrollLeft < el.scrollWidth - el.clientWidth - 8 });
  };
  const slide = (dir: number) => carRef.current?.scrollBy({ left: dir * 426, behavior: 'smooth' });
  return (
    <div className="skex-block">
      <div className="pvw-wrap">
        <div className="pvw-carousel" ref={carRef} onScroll={onScroll}>
          {previews.map((p, i) => {
            const tone = p.tone;
            const isSub = SUBSCRIBED.has(p.t);
            return (
              <div className="pvw" key={i}>
                <div className="pvw-bar">
                  <span className="pvw-mark" style={{ background: TONE_BG[tone], color: TONE_FG[tone] }}><ChannelIcon name={isAuto ? 'automation' : 'target'} size={13} /></span>
                  <span className="pvw-title">{p.t}</span>
                  <span className="pvw-live"><span className="pvw-livedot"></span>LIVE · {p.cadence}</span>
                </div>
                <div className="pvw-body">
                  {isAuto ? (
                    <>
                      <div className="pvw-rulek">Alert rule</div>
                      <div className="pvw-rule">{p.rule}</div>
                      <div className="pvw-lastrun"><ChannelIcon name="clock" size={12} /> {p.lastRun}</div>
                      <div className="pvw-matches">
                        {(p.matches ?? []).map((m, j) => (
                          <div className="pvw-match" key={j}>
                            <span className="pvw-tkr">{m.t}</span>
                            <span className="pvw-note">{m.note}</span>
                            <span className={`pvw-tag${m.tag === 'New' ? ' new' : ''}`}>{m.tag}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pvw-push"><span className="pvw-bell"><ChannelIcon name="alert" size={13} /></span>{p.push}</div>
                    </>
                  ) : (
                    <>
                      <div className="pvw-chart">
                        <div className="pvw-chart-h"><span className="pvw-chart-k">{p.chart!.label}</span><span className="pvw-chart-v" style={{ color: TONE_FG[tone] }}>{p.chart!.value}</span></div>
                        <PreviewArea points={p.chart!.points} tone={tone} />
                      </div>
                      <div className="pvw-rows">
                        {(p.rows ?? []).map((r, j) => (
                          <div className="pvw-row" key={j}><span className="pvw-tkr">{r.t}</span><span className="pvw-v">{r.v}</span><span className={`pvw-c ${r.up ? 'up' : 'down'}`}>{r.c}</span></div>
                        ))}
                      </div>
                      <div className="pvw-stats">
                        {(p.stats ?? []).map(([k, v], j) => (<div className="pvw-stat" key={j}><span className="pvw-sk">{k}</span><span className="pvw-sv">{v}</span></div>))}
                      </div>
                    </>
                  )}
                </div>
                <div className="pvw-foot">
                  <span className="pvw-by"><Avatar name={p.creator} size={16} />{p.creator} · {p.subscribers} subscribers</span>
                  <button className="pvw-remix" onClick={() => onRun(skill, `Build my own version of ${p.t} — keep the idea, let me tweak the ${isAuto ? 'rule and schedule' : 'basket and rules'}`)}>Remix</button>
                  {isSub
                    ? <button className="pvw-sub on"><ChannelIcon name="check" size={14} />Subscribed</button>
                    : <button className="pvw-sub" style={{ background: TONE_FG[ctaTone] }} onClick={() => subscribe(p)}><ChannelIcon name="plus" size={14} />Subscribe</button>}
                </div>
              </div>
            );
          })}
        </div>
        {nav.l && <button className="car-nav left" onClick={() => slide(-1)} aria-label="Previous"><ChannelIcon name="chevdown" size={15} /></button>}
        {nav.r && <button className="car-nav right" onClick={() => slide(1)} aria-label="Next"><ChannelIcon name="chevdown" size={15} /></button>}
      </div>
    </div>
  );
}
