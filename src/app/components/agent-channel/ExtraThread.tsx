/**
 * [INPUT]: types.ts 的 ExtraMsg/Reply、ChannelMessage 原语、channel-meta 的 IM_TINT
 * [OUTPUT]: ExtraThread（交互追加消息流）+ SourceTag（推送来源标签）
 * [POS]: agent-channel — Chat tab 的动态线程（源自 demo planc 2725-2841 行；跳转目标拆为 Alerts/Files）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import { IM_TINT } from '@/data/agent-channel/channel-meta';
import { TONE_BG, TONE_FG } from '@/data/agent-channel/types';
import type { ExtraMsg, ImId, Reply } from '@/data/agent-channel/types';
import { ChannelIcon } from './ChannelIcon';
import { AgentMsg, UserMsg, rich } from './ChannelMessage';

/* ========== 推送来源标签（点击跳到 Alerts tab） ========== */

export interface PushSource {
  automation: string;
  playbook?: string;
  scope?: 'channel' | 'standalone';
}

export function SourceTag({ source, onGoAlerts }: { source?: PushSource; onGoAlerts: () => void }) {
  if (!source) return null;
  return (
    <button className="srctag" onClick={onGoAlerts}>
      <span className="src-ico"><ChannelIcon name="automation" size={13} /></span>
      <span className="src-txt">
        <span className="src-auto">{source.automation}</span>
        {source.playbook
          ? <span className="src-pb"> · from <span className="src-pb-n"><ChannelIcon name="target" size={11} /> {source.playbook}</span></span>
          : <span className="src-standalone"> · {source.scope === 'channel' ? 'channel alert' : 'standalone alert'}</span>}
      </span>
    </button>
  );
}

/* ========== 追加消息流 ========== */

interface ExtraThreadProps {
  extra: ExtraMsg[];
  /** A concept 下 agent 消息用 subtle persona（无名字行） */
  subtle?: boolean;
  onGoTasks: () => void;
  onGoAlerts: () => void;
  onGoFiles: () => void;
  onConnectIm?: (im?: ImId) => void;
}

function TaskOrBuilding({ reply, onGoTasks, onGoFiles }: { reply: Reply; onGoTasks: () => void; onGoFiles: () => void }) {
  if (reply.kind === 'task') {
    const done = reply.status === 'done';
    const live = reply.taskType === 'Automation';
    return (
      <div className="mtask">
        <div className="mtask-h">
          <span className="mtask-ico" style={{ background: TONE_BG[reply.tone], color: TONE_FG[reply.tone] }}><ChannelIcon name={reply.taskType === 'Automation' ? 'automation' : reply.taskType === 'Research' ? 'search' : 'target'} size={14} /></span>
          <span className="mtask-t">{reply.title}</span>
          {done
            ? <span className="status-pill done"><span className="sd"></span>{live ? 'Live' : 'Done'}</span>
            : <span className="status-pill running"><span className="sd"></span>Running</span>}
        </div>
        <div className="mtask-s">
          {done
            ? <>{reply.doneNote || (reply.taskType === 'Research' ? 'Brief ready — saved to Files.' : live ? 'Live — pushes will land here.' : 'Built and live.')} <button onClick={onGoFiles}>View in Files</button></>
            : <>Background task — I'll post here when it's done. <button onClick={onGoTasks}>Track it in Tasks</button></>}
        </div>
      </div>
    );
  }
  if (reply.kind === 'building') {
    return (
      <div className="building">
        <div className="bt"><span className="spin"></span>{reply.title}</div>
        <div className="bp"><span></span></div>
        <div className="bs">{reply.sub}</div>
      </div>
    );
  }
  return null;
}

export function ExtraThread({ extra, subtle, onGoTasks, onGoAlerts, onGoFiles, onConnectIm }: ExtraThreadProps) {
  return (
    <>
      {extra.map((m) => {
        if (m.role === 'user') return <UserMsg key={m.id} text={m.text ?? ''} />;
        if (m.role === 'typing') return (
          <AgentMsg key={m.id} persona="subtle"><div className="typing"><i></i><i></i><i></i></div></AgentMsg>
        );
        if (m.role !== 'agent' || !m.reply) return null;
        const reply = m.reply;

        // 简单问题的直接回答 — 对话式，不走 loader
        if (reply.kind === 'answer') {
          return (
            <AgentMsg key={m.id} persona={m.push ? 'full' : (subtle ? 'subtle' : 'full')} push={m.push} time={m.push ? 'now' : (subtle ? null : 'now')}>
              <div className="bubble">
                {reply.paras.map((p, i) => <p key={i} style={i ? { marginTop: 8 } : undefined}>{rich(p)}</p>)}
              </div>
            </AgentMsg>
          );
        }

        // 频道做了实事但只活在 Web 上 — 推荐连接 IM
        if (reply.kind === 'imrec') {
          return (
            <AgentMsg key={m.id} persona="full" time="now">
              <div className="bubble">
                <p>One more thing — this channel only lives on the Web right now. Connect Telegram or Discord and every push lands in your DM the moment it fires, in this channel's own thread.</p>
              </div>
              {onConnectIm && (
                <div className="chips" style={{ marginTop: 8 }}>
                  <button className="chip" onClick={() => onConnectIm('telegram')}><span className="ci" style={{ color: IM_TINT.telegram }}><ChannelIcon name="telegram" size={16} /></span>Connect Telegram</button>
                  <button className="chip" onClick={() => onConnectIm()}><span className="ci"><ChannelIcon name="link" size={16} /></span>See all IMs</button>
                </div>
              )}
            </AgentMsg>
          );
        }

        // 一键订阅后的首条推送 — 把用户带出 onboarding 状态
        if (reply.kind === 'subpush') {
          const p = reply.item;
          const isAuto = reply.skillKind === 'automation';
          const unit = isAuto ? 'alert' : 'run';
          const hasContent = !p.fresh && (isAuto ? !!p.push : !!p.rows);
          return (
            <AgentMsg key={m.id} persona="full" push time="now">
              {hasContent
                ? <div className="bubble"><span style={{ fontWeight: 500 }}>{p.t}</span> is live in your workspace. Here's the latest {unit} — new ones will land right here.</div>
                : <div className="bubble"><span style={{ fontWeight: 500 }}>{p.t}</span> is live in your workspace. Nothing has been pushed yet — the first {unit} lands with the next cycle{(p.every || p.meta) ? ` (${p.every || p.meta})` : ''}. Want me to run it once now?</div>}
              {hasContent && (
                <div className="subpush-card">
                  {isAuto ? (
                    <div className="pvw-push" style={{ margin: '10px 0' }}><span className="pvw-bell"><ChannelIcon name="alert" size={13} /></span>{p.push}</div>
                  ) : (
                    <>
                      <div className="pvw-rows" style={{ borderTop: 'none' }}>
                        {(p.rows ?? []).map((r, j) => (
                          <div className="pvw-row" key={j}><span className="pvw-tkr">{r.t}</span><span className="pvw-v">{r.v}</span><span className={`pvw-c ${r.up ? 'up' : 'down'}`}>{r.c}</span></div>
                        ))}
                      </div>
                      {p.chart && <div className="subpush-stat">{p.chart.label} · <span style={{ color: p.tone ? TONE_FG[p.tone] : undefined }}>{p.chart.value}</span></div>}
                    </>
                  )}
                </div>
              )}
              <div style={{ marginTop: 4 }}>
                <SourceTag
                  source={isAuto ? { automation: p.t } : { automation: `${p.cadence || 'scheduled'}-run`, playbook: p.t }}
                  onGoAlerts={onGoAlerts}
                />
              </div>
            </AgentMsg>
          );
        }

        // task / building 卡
        return (
          <AgentMsg key={m.id} persona={subtle ? 'subtle' : 'full'} time={subtle ? null : 'now'}>
            <TaskOrBuilding reply={reply} onGoTasks={onGoTasks} onGoFiles={onGoFiles} />
          </AgentMsg>
        );
      })}
    </>
  );
}
