/**
 * [INPUT]: types.ts 的 Task/TaskThreadMsg、tasks.ts 的 TASK_TRANSCRIPT/ASK_UNIVERSE、TaskBits
 * [OUTPUT]: TasksPanel — 任务列表（筛选 + 折叠卡 + step tracker + AskCard + mini thread）与详情视图（transcript + composer）
 * [POS]: agent-channel/tabs — Tasks tab（源自 demo planc 2537-2657 行；tasks/threads 状态由页面持有）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import { useEffect, useState } from 'react';
import { ASK_UNIVERSE, TASK_TRANSCRIPT, streamFor } from '@/data/agent-channel/tasks';
import { TONE_BG, TONE_FG } from '@/data/agent-channel/types';
import type { Task, TaskStatus, TaskThreadMsg } from '@/data/agent-channel/types';
import { ChannelIcon } from '../ChannelIcon';
import { AskCard, TaskComposer, taskIcon } from './TaskBits';

const STATUS_LABEL: Record<TaskStatus, string> = { running: 'Running', 'needs-input': 'Needs input', done: 'Done', queued: 'Queued' };

/* ========== running 卡的两行流式走马灯 ==========
 * 渲染三行（首行可见、次行可见、第三行在窗口外），key 驱动重挂：
 * 上一帧动画停在 -20px 的终态 = 新一帧 0px 的起始内容 — 滚动无缝。 */

function TaskStreamTicker({ lines }: { lines: string[] }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => i + 1), 1800);
    return () => clearInterval(t);
  }, []);
  const at = (o: number) => lines[(idx + o) % lines.length];
  return (
    <div className="task-stream">
      <div className="ts-win" key={idx}>
        <div className="ts-line old">{at(0)}</div>
        <div className="ts-line">{at(1)}</div>
        <div className="ts-line">{at(2)}</div>
      </div>
    </div>
  );
}

interface TasksPanelProps {
  tasks: Task[];
  threads: Record<string, TaskThreadMsg[]>;
  onSendToTask: (task: Task, text: string) => void;
}

/* ========== 详情视图 — 完整会话 transcript ========== */

function TaskDetail({ t, thread, onBack, onSend }: { t: Task; thread: TaskThreadMsg[]; onBack: () => void; onSend: (text: string) => void }) {
  const log = TASK_TRANSCRIPT[t.id] || [];
  return (
    <div className="panel">
      <button className="back-link" onClick={onBack}><ChannelIcon name="enter" size={15} /> All tasks</button>
      <div className="task-detail-h">
        <span className="tk-ico" style={{ background: TONE_BG[t.tone], color: TONE_FG[t.tone] }}><ChannelIcon name={taskIcon(t.type)} size={17} /></span>
        <div style={{ minWidth: 0, flex: 1 }}>
          <h2 style={{ fontSize: 20 }}>{t.title}</h2>
          <div className="tk-m" style={{ marginTop: 5 }}><span className="tk-type">{t.type}</span>{t.meta}</div>
        </div>
        <span className={`status-pill ${t.status}`}><span className="sd"></span>{STATUS_LABEL[t.status]}</span>
      </div>
      <div className="transcript">
        {log.length > 0 ? (
          <>
            <div className="seclabel" style={{ marginBottom: 12 }}>Session transcript</div>
            {log.map((m, i) => (
              <div className={`tr ${m.role}`} key={i}>
                <span className="tr-tag">{m.role === 'user' ? 'You' : m.role === 'agent' ? 'Alva' : m.role === 'tool' ? 'Tool' : 'Event'}</span>
                <div className="tr-body">{m.text}</div>
              </div>
            ))}
          </>
        ) : (
          <div className="empty-note">This session hasn't produced a transcript yet.</div>
        )}
        {thread.map((m, i) => (
          <div className={`tr ${m.role}`} key={`x${i}`}>
            <span className="tr-tag">{m.role === 'user' ? 'You' : 'Alva'}</span>
            <div className="tr-body">{m.text}</div>
          </div>
        ))}
        {t.status === 'running' && (
          <div className="tr agent">
            <span className="tr-tag">Alva</span>
            <div className="tr-body"><span className="typing" style={{ padding: '6px 12px', display: 'inline-flex' }}><i></i><i></i><i></i></span></div>
          </div>
        )}
        <TaskComposer placeholder="Message this task — adjust, pause, or redirect it" onSend={onSend} />
      </div>
    </div>
  );
}

/* ========== 列表视图 ========== */

export function TasksPanel({ tasks, threads, onSendToTask }: TasksPanelProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'done'>('all');
  const [open, setOpen] = useState<string | null>(null);
  const shown = tasks.filter((t) => filter === 'all' ? true : filter === 'active' ? (t.status === 'running' || t.status === 'needs-input') : t.status === 'done');

  const opened = open ? tasks.find((x) => x.id === open) : null;
  if (opened) {
    return <TaskDetail t={opened} thread={threads[opened.id] || []} onBack={() => setOpen(null)} onSend={(txt) => onSendToTask(opened, txt)} />;
  }

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Tasks</h2>
        <p>Long-running work I'm doing for you — building playbooks and automations, deep dives, backtests. Each runs as its own session you can open, follow, or steer.</p>
      </div>
      <div className="panel-bar">
        <div className="seg">
          {([['all', 'All'], ['active', 'Active'], ['done', 'Done']] as const).map(([id, l]) => (
            <button key={id} className={filter === id ? 'active' : ''} onClick={() => setFilter(id)}>{l}</button>
          ))}
        </div>
      </div>
      <div className="task-list">
        {shown.map((t) => {
          return (
            <div className="task" key={t.id}>
              <button className="task-h" onClick={() => setOpen(t.id)}>
                <span className="tk-ico" style={{ background: TONE_BG[t.tone], color: TONE_FG[t.tone] }}><ChannelIcon name={taskIcon(t.type)} size={17} /></span>
                <div style={{ minWidth: 0 }}>
                  <div className="tk-t">{t.title}</div>
                  <div className="tk-m"><span className="tk-type">{t.type}</span>{t.meta}</div>
                </div>
                <span className={`status-pill ${t.status}`}><span className="sd"></span>{STATUS_LABEL[t.status]}</span>
                <span className="tk-chev"><ChannelIcon name="chevdown" size={16} /></span>
              </button>
              {t.status === 'running' && (
                <div className="task-body">
                  <TaskStreamTicker lines={streamFor(t)} />
                </div>
              )}
              {t.status === 'queued' && t.steps && (
                <div className="task-body">
                  <div className="step-now">
                    <span className="squeue"></span>
                    {t.steps.length} steps planned
                  </div>
                </div>
              )}
              {t.ask && (
                <div className="task-body">
                  <AskCard id={t.id} q={t.ask} options={ASK_UNIVERSE} onSubmit={(label) => onSendToTask(t, label)} />
                </div>
              )}
              {t.output && (
                <div className="task-body">
                  <div className="task-out"><ChannelIcon name="file" size={14} /> {t.output} · saved to Files</div>
                </div>
              )}
              <div className="task-chat">
                {(threads[t.id] || []).length > 0 && (
                  <div className="tthread">
                    {threads[t.id].map((m, i) => (
                      <div className={`tm ${m.role}`} key={i}><span className="who">{m.role === 'user' ? 'You' : 'Alva'}</span><span className="txt">{m.text}</span></div>
                    ))}
                  </div>
                )}
                <TaskComposer placeholder="Message this task…" onSend={(txt) => onSendToTask(t, txt)} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
