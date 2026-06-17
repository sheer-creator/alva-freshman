/**
 * [INPUT]: Figma Page/Agent/Tasks 详情(7951:188873)— 单条 task 二级页
 * [OUTPUT]: 返回头(箭头+标题+状态 tag)+ Alva logo + 工具步骤时间线(可折叠)+ 答案(md + bullets + Playbook 卡 + copy/time)+ 底部 composer
 * [POS]: AgentTasksPanel 选中某 task 时渲染;onBack 回列表
 */

import { useState } from 'react';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { ChatInput } from '@/app/components/shared/ChatInput';
import type { AgentTask, AgentTaskStatus } from '@/app/components/agent/AgentTasksPanel';

const FONT = "'Delight', sans-serif";

/* 状态 tag — 与列表口径一致(running/needs-input/done 彩色;queued/paused 灰降级) */
const TAG_STYLE: Record<'running' | 'needs-input' | 'done', { label: string; color: string; bg: string }> = {
  running: { label: 'Running', color: 'var(--main-m1, #49A3A6)', bg: 'var(--main-m1-10, rgba(73,163,166,0.1))' },
  'needs-input': { label: 'Needs Input', color: 'var(--main-m5, #E6A91A)', bg: 'var(--main-m5-10, rgba(230,169,26,0.1))' },
  done: { label: 'Done', color: 'var(--main-m3, #2a9b7d)', bg: 'var(--main-m3-10, rgba(42,155,125,0.1))' },
};
const GRAY_TAG_LABEL: Record<'queued' | 'paused', string> = { queued: 'Queued', paused: 'Paused' };

function StatusTag({ status }: { status: AgentTaskStatus }) {
  if (status === 'paused' || status === 'queued') {
    return (
      <span className="shrink-0 rounded-[2px] px-[4px] py-px text-[11px] leading-[18px] tracking-[0.11px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))', background: 'var(--b-r05, rgba(0,0,0,0.05))' }}>
        {GRAY_TAG_LABEL[status]}
      </span>
    );
  }
  const s = TAG_STYLE[status];
  return (
    <span className="shrink-0 rounded-[4px] px-[6px] py-px text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: s.color, background: s.bg }}>
      {s.label}
    </span>
  );
}

/* ========== mock:工具调用步骤 ========== */
const STEPS: { text: string; dur: string }[] = [
  { text: 'Run Alva skill version check', dur: '2.3s' },
  { text: 'Read .alva.json', dur: '2.3s' },
  { text: 'Get user info', dur: '2.3s' },
  { text: 'Get SDK docs for TSLA feed modules', dur: '2.3s' },
  { text: 'Upload feed script via JSON body', dur: '2.3s' },
];

/* 答案 bullets — 加粗段 + 普通段 */
const ANSWER_BULLETS: { bold: string; rest: string }[] = [
  { bold: 'Revenue Trend', rest: ' — bar chart, quarterly data, color-coded by segment' },
  { bold: 'Gross Margin', rest: ' — line chart with 73% current highlight and historical band' },
  { bold: 'Forward P/E Comparison', rest: ' — horizontal bar (NVDA vs AMD vs INTC)' },
];

/* Playbook 卡 mock(Figma Playbook/Card M,无 creator/stars footer) */
const CARD_TITLE = 'BTC Ultimate AI Trader';
const CARD_DESC =
  "This strategy intelligently pinpoints BTC's optimal trading sweet spots through dual-engine analysis: RSI oversold alerts + Bollinger Band breakouts. Automatically trimming position extremities to capture core price movements, it strategically accumulates during bumpy markets.";

function StepTimeline() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex w-full flex-col items-center gap-[12px]">
      {/* header — Ran N commands … + 折叠箭头 */}
      <button
        type="button"
        className="flex w-full cursor-pointer items-center gap-[4px] border-none bg-transparent p-0"
        onClick={() => setCollapsed((v) => !v)}
      >
        <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
          Ran 5 commands, searched code, read a file
        </span>
        <CdnIcon name={collapsed ? 'arrow-right-l2' : 'arrow-down-l2'} size={12} color="var(--text-n5, rgba(0,0,0,0.5))" />
      </button>

      {!collapsed && (
        <div className="flex w-full flex-col">
          {STEPS.map((s, i) => {
            const last = i === STEPS.length - 1;
            return (
              <div key={i} className={`flex w-full items-center gap-[8px] ${last ? '' : 'pb-[12px]'}`}>
                {/* 时间线左轨:圆点 + 连接线(Figma Dot top-3 / Line 向下连到下一节点) */}
                <div className="relative w-[14px] shrink-0 self-stretch">
                  <span className="absolute left-1/2 top-[3px] flex size-[14px] -translate-x-1/2 items-center justify-center">
                    <span className="size-[5px] rounded-full" style={{ background: 'var(--text-n3, rgba(0,0,0,0.3))' }} />
                  </span>
                  {!last && <span className="absolute left-[6.5px] top-[18px] bottom-[-12px] w-px" style={{ background: 'var(--line-l12, rgba(0,0,0,0.12))' }} />}
                </div>
                <p className="shrink-0 whitespace-nowrap text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
                  {s.text}
                </p>
                <p className="min-w-0 flex-1 text-right text-[10px] leading-[16px] tracking-[-0.2px]" style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
                  {s.dur}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function PlaybookCardM() {
  return (
    <div className="flex w-[360px] max-w-[360px] flex-col overflow-hidden rounded-[8px] bg-white p-[4px]" style={{ border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))' }}>
      {/* Cover — 占位渐变(Figma 为生成图) */}
      <div
        className="w-full overflow-hidden rounded-[4px]"
        style={{
          aspectRatio: '472 / 265.5',
          background: 'linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%)',
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 0.6px, transparent 0.6px)',
          backgroundSize: '3px 3px',
        }}
      />
      <div className="flex w-full flex-col gap-[12px] pb-[12px] pl-[12px] pr-[8px] pt-[16px]">
        {/* Title + desc(tag 区先去掉)*/}
        <div className="flex w-full flex-col gap-[4px]">
          <p className="w-full truncate text-[16px] leading-[26px] tracking-[0.16px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
            {CARD_TITLE}
          </p>
          <p
            className="w-full text-[12px] leading-[20px] tracking-[0.12px]"
            style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {CARD_DESC}
          </p>
        </div>
      </div>
    </div>
  );
}

export function AgentTaskDetail({ task, onBack }: { task: AgentTask; onBack: () => void }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      {/* 固定顶部:返回头 + Alva logo(Figma 中为 Content 滚动区的兄弟,不随正文滚动)*/}
      <div className="shrink-0 px-[28px] pt-[28px]">
        <div className="mx-auto w-full max-w-[960px]">
          <div className="flex w-full items-center gap-[8px]">
            <button type="button" aria-label="Back" className="flex size-[18px] shrink-0 cursor-pointer items-center justify-center border-none bg-transparent p-0" onClick={onBack}>
              <CdnIcon name="arrow-left-l1" size={18} color="var(--text-n9, rgba(0,0,0,0.9))" />
            </button>
            <p className="min-w-0 flex-1 truncate text-[20px] leading-[30px] tracking-[0.2px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
              {task.title}
            </p>
            <StatusTag status={task.status} />
          </div>
          {/* gap-16(Body)+ pt-8(logo 节点) = 24 */}
          <img src="https://alva-ai-static.b-cdn.net/icons/logo-alva-horizontal-green-black.svg" alt="Alva" className="mt-[24px] block h-[12px] w-[48px]" />
        </div>
      </div>

      {/* 滚动正文 — 子级 max-w-960,与顶部对齐;gap-16 接 logo */}
      <div className="min-h-0 flex-1 overflow-y-auto px-[28px]">
        <div className="mx-auto w-full max-w-[960px]">
          <div className="mt-[16px] flex w-full flex-col gap-[16px] pb-[28px]">
            <StepTimeline />

            {/* Answer */}
            <div className="flex w-full flex-col gap-[12px]">
              <p className="w-full text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                Building the <span className="font-medium">3-Widget Grid</span> layout:
              </p>
              <div className="flex w-full flex-col gap-[4px]">
                {ANSWER_BULLETS.map((b) => (
                  <div key={b.bold} className="flex w-full items-start">
                    <span className="flex h-[22px] w-[20px] shrink-0 items-center justify-center text-[14px] leading-[22px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                      •
                    </span>
                    <p className="min-w-0 flex-1 text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                      <span className="font-medium">{b.bold}</span>
                      {b.rest}
                    </p>
                  </div>
                ))}
              </div>

              <PlaybookCardM />

              {/* Copy + time */}
              <div className="flex w-full items-center gap-[8px]">
                <CdnIcon name="copy-l" size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
                <p className="flex-1 text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
                  Thursday 7:22 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 固定底部 composer — Content gap-0,正文 pb-28 提供间隔;外层 pb-28 = Body 底 padding */}
      <div className="shrink-0 px-[28px] pb-[28px]">
        <div className="mx-auto w-full max-w-[960px]">
          <ChatInput shadow subtleBorder allowReferences={false} placeholder="Ask Alva anything. @ for context, / for skills" />
        </div>
      </div>
    </div>
  );
}
