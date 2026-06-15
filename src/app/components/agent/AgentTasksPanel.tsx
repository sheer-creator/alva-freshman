/**
 * [INPUT]: Figma Page/Agent/Tasks(7911:133609)— Body(7911:133614)+ Task Item(7911:134316)
 * [OUTPUT]: Agent 页 Tasks tab 基本框架 — All/Active/Done 过滤 pills + 任务列表(running / needs-input / done / paused 四态)
 * [POS]: AgentNewSession tab==='tasks' 渲染;任务数驱动页级 tab 计数
 */

import { useState } from 'react';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { AlvaLoading } from '@/app/components/shared/AlvaLoading';

const FONT = "'Delight', sans-serif";

export type AgentTaskStatus = 'running' | 'needs-input' | 'done' | 'paused';

export interface AgentTask {
  id: string;
  title: string;
  /** 状态行:running/needs-input 是当前 step,done 是结论摘要,paused 是中断原因 */
  detail: string;
  status: AgentTaskStatus;
}

export const AGENT_TASKS: AgentTask[] = [
  {
    id: 't1',
    title: 'Market Reactions: SPY, XLE, WTI to Iranian Deal Headlines and Oil Drop',
    detail: 'Read AppShell.tsx component with merge conflict markers',
    status: 'running',
  },
  {
    id: 't2',
    title: 'Market Reactions: SPY, XLE, WTI to Iranian Deal Headlines and Oil Drop',
    detail: 'Waiting for answer',
    status: 'needs-input',
  },
  {
    id: 't3',
    title: 'Market Reactions: SPY, XLE, WTI to Iranian Deal Headlines and Oil Drop',
    detail: "Bottom line: the core thesis is unchanged — HBM/advanced packaging crowding out general-purpose capacity. Today's marginal new info is the upstream materials angle (Kanto Denka tungsten-layer consumable potentially cut off from July) — worth watching for confirmation.",
    status: 'done',
  },
  {
    id: 't4',
    title: 'Market Reactions: SPY, XLE, WTI to Iranian Deal Headlines and Oil Drop',
    detail: 'An error occurred',
    status: 'paused',
  },
];

/* Tag/Task — Figma 7911:134340:px-6 py-1 rounded-4 12/20;paused 走灰降级款(px-4 rounded-2 11/18) */
const TAG_STYLE: Record<Exclude<AgentTaskStatus, 'paused'>, { label: string; color: string; bg: string }> = {
  running: { label: 'Running', color: 'var(--main-m1, #49A3A6)', bg: 'var(--main-m1-10, rgba(73,163,166,0.1))' },
  'needs-input': { label: 'Needs Input', color: 'var(--main-m5, #E6A91A)', bg: 'var(--main-m5-10, rgba(230,169,26,0.1))' },
  done: { label: 'Done', color: 'var(--main-m3, #2a9b7d)', bg: 'var(--main-m3-10, rgba(42,155,125,0.1))' },
};

function TaskTag({ status }: { status: AgentTaskStatus }) {
  if (status === 'paused') {
    return (
      <span
        className="shrink-0 rounded-[2px] px-[4px] py-px text-[11px] leading-[18px] tracking-[0.11px]"
        style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))', background: 'var(--b-r05, rgba(0,0,0,0.05))' }}
      >
        Paused
      </span>
    );
  }
  const s = TAG_STYLE[status];
  return (
    <span
      className="shrink-0 rounded-[4px] px-[6px] py-px text-[12px] leading-[20px] tracking-[0.12px]"
      style={{ fontFamily: FONT, color: s.color, background: s.bg }}
    >
      {s.label}
    </span>
  );
}

/* 进行中状态行的文字脉冲(与 StreamingMessages 的 ThinkingIndicator 同口径) */
const TASK_PULSE_CSS = '@keyframes agent-task-step { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.82; } }';

function TaskRow({ task }: { task: AgentTask }) {
  const live = task.status === 'running' || task.status === 'needs-input';
  return (
    <div className="flex w-full items-start gap-[8px] py-[16px]" style={{ borderBottom: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' }}>
      {/* Icon — Figma 7913:137596:28px 方容器 br03 圆角 2,内嵌 16px step-l */}
      <div className="flex size-[28px] shrink-0 items-center justify-center rounded-[2px]" style={{ background: 'var(--b-r03, rgba(0,0,0,0.03))' }}>
        <CdnIcon name="step-l" size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-[4px]">
        <p className="w-full text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
          {task.title}
        </p>
        {/* Generating/Steps — Figma 7913:137525:进行中带 14px loading logo + 渐隐 step 文案;终态纯 n5 单行 */}
        <div className="flex w-full items-center gap-[8px]">
          {live && <AlvaLoading size={14} />}
          <p
            className="min-w-0 flex-1 truncate text-[12px] leading-[20px] tracking-[0.12px]"
            style={{
              fontFamily: FONT,
              color: 'var(--text-n5, rgba(0,0,0,0.5))',
              animation: live ? 'agent-task-step 1.4s ease-in-out infinite' : undefined,
            }}
          >
            {task.detail}
          </p>
        </div>
      </div>
      <TaskTag status={task.status} />
    </div>
  );
}

type TaskFilter = 'all' | 'active' | 'done';

const FILTERS: { id: TaskFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'done', label: 'Done' },
];

export function AgentTasksPanel() {
  const [filter, setFilter] = useState<TaskFilter>('all');
  const tasks = AGENT_TASKS.filter((t) =>
    filter === 'all' ? true : filter === 'done' ? t.status === 'done' : t.status !== 'done',
  );

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-[28px]">
      <style>{TASK_PULSE_CSS}</style>
      <div className="mx-auto flex w-full max-w-[960px] flex-col gap-[8px]">
        {/* 过滤 pills — Figma 7911:134030:h-28 px-10 py-4 rounded-full,active 深底白字;与列表为兄弟组,继承父级 gap-8 */}
        <div className="flex flex-wrap gap-[8px]">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                className="h-[28px] shrink-0 cursor-pointer whitespace-nowrap rounded-full border-none px-[10px] py-[4px] text-[12px] leading-[20px] tracking-[0.12px] transition-colors"
                style={{
                  fontFamily: FONT,
                  background: active ? 'rgba(0,0,0,0.7)' : 'var(--b-r03, rgba(0,0,0,0.03))',
                  color: active ? 'rgba(255,255,255,0.9)' : 'var(--text-n7, rgba(0,0,0,0.7))',
                }}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            );
          })}
        </div>
        <div className="flex w-full flex-col">
          {tasks.map((t) => (
            <TaskRow key={t.id} task={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
