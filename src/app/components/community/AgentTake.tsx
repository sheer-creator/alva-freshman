/**
 * [INPUT]: agentTake mock 数据
 * [OUTPUT]: Agent's Take 结构化分析 + Timeline
 * [POS]: 社区组件 — AI 生成的 Playbook 分析摘要
 */

import { AlvaWatermark } from '@/app/components/alva-ui-kit';
import type { TimelineEntry } from '@/data/community-mock';

interface AgentTakeProps {
  marketThesis: string;
  keyAssumptions: string[];
  riskFactors: string[];
  buildLog: string;
  usageGuide: string;
  timeline: TimelineEntry[];
}

export function AgentTake({ marketThesis, keyAssumptions, riskFactors, buildLog, usageGuide, timeline }: AgentTakeProps) {
  return (
    <div className="flex flex-col gap-[16px]">
      {/* 标题 */}
      <div className="flex items-center justify-between h-[22px]">
        <p className="text-[14px]" style={{ color: 'var(--text-n9)' }}>Agent's Take</p>
        <span className="text-[12px]" style={{ color: 'var(--text-n5)' }}>Auto-generated · Mar 2026</span>
      </div>

      {/* 内容体 */}
      <div className="relative" style={{ background: 'var(--grey-g01)', borderRadius: 4, padding: 20 }}>
        <div className="flex flex-col gap-[20px]">
          <Section title="MARKET THESIS" content={marketThesis} />
          <Section title="KEY ASSUMPTIONS" items={keyAssumptions} />
          <Section title="RISK FACTORS" items={riskFactors} />
          <Section title="BUILD LOG" content={buildLog} />
          <Section title="USAGE GUIDE" content={usageGuide} />

          {/* Timeline */}
          <div>
            <SectionLabel>TIMELINE</SectionLabel>
            <div className="flex flex-col mt-[8px]">
              {timeline.map((entry, i) => (
                <div key={i} className="flex gap-[12px]" style={{ paddingBottom: i < timeline.length - 1 ? 16 : 0 }}>
                  {/* 竖线 + 圆点 */}
                  <div className="flex flex-col items-center" style={{ width: 12, flexShrink: 0 }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                      background: entry.active ? 'var(--main-m1)' : 'var(--grey-g03, #e0e0e0)',
                    }} />
                    {i < timeline.length - 1 && (
                      <div style={{ width: 2, flex: 1, background: 'var(--main-m1)', opacity: 0.3, marginTop: 4 }} />
                    )}
                  </div>
                  {/* 内容 */}
                  <div style={{ paddingBottom: 0 }}>
                    <p className="text-[12px]" style={{ color: 'var(--text-n5)' }}>{entry.date}</p>
                    <p className="text-[14px] leading-[22px] mt-[2px]" style={{ color: 'var(--text-n9)' }}>{entry.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <AlvaWatermark />
      </div>
    </div>
  );
}

/* ========== 内部组件 ========== */

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-[12px] tracking-[1px]" style={{ color: 'var(--text-n5)', letterSpacing: 1 }}>{children}</p>
  );
}

function Section({ title, content, items }: { title: string; content?: string; items?: string[] }) {
  return (
    <div>
      <SectionLabel>{title}</SectionLabel>
      {content && <p className="text-[14px] leading-[22px] mt-[8px]" style={{ color: 'var(--text-n9)' }}>{content}</p>}
      {items && (
        <div className="flex flex-col gap-[4px] mt-[8px]">
          {items.map((item, i) => (
            <p key={i} className="text-[14px] leading-[22px]" style={{ color: 'var(--text-n9)' }}>• {item}</p>
          ))}
        </div>
      )}
    </div>
  );
}
