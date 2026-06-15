/**
 * [INPUT]: Figma Page/Agent/Artifacts(7919:175902)
 * [OUTPUT]: Agent 页 Artifacts tab 基本框架 — All/Images/Files 过滤 pills + 产物列表(image / file 两类)
 * [POS]: AgentNewSession tab==='artifacts' 渲染;产物数驱动页级 tab 计数
 */

import { useState } from 'react';
import { CdnIcon } from '@/app/components/shared/CdnIcon';

const FONT = "'Delight', sans-serif";

export type AgentArtifactKind = 'image' | 'file';

export interface AgentArtifact {
  id: string;
  name: string;
  /** 来源/说明行,可带 · 大小 */
  detail: string;
  kind: AgentArtifactKind;
}

export const AGENT_ARTIFACTS: AgentArtifact[] = [
  {
    id: 'a1',
    name: 'Type=Logo Horizontal, Color=Black + Green.png',
    detail: 'Generated from your Theme Tracker run · 2.4 MB',
    kind: 'image',
  },
  {
    id: 'a2',
    name: 'my-semis-screener.skill',
    detail: 'Custom factor screen you built and saved',
    kind: 'file',
  },
  {
    id: 'a3',
    name: 'mag7-backtest-results.csv',
    detail: '10Y equal-weight backtest output',
    kind: 'file',
  },
];

function ArtifactRow({ artifact }: { artifact: AgentArtifact }) {
  return (
    <div className="flex w-full items-start gap-[8px] py-[16px]" style={{ borderBottom: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' }}>
      {/* Icon — Figma 7919:176487:28px 方容器 br03 圆角 2,内嵌 16px icon */}
      <div className="flex size-[28px] shrink-0 items-center justify-center rounded-[2px]" style={{ background: 'var(--b-r03, rgba(0,0,0,0.03))' }}>
        <CdnIcon name={artifact.kind === 'image' ? 'photo-l' : 'clip-l'} size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-[4px]">
        <p className="w-full truncate text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
          {artifact.name}
        </p>
        <p className="w-full truncate text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
          {artifact.detail}
        </p>
      </div>
    </div>
  );
}

type ArtifactFilter = 'all' | 'image' | 'file';

const FILTERS: { id: ArtifactFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'image', label: 'Images' },
  { id: 'file', label: 'Files' },
];

export function AgentArtifactsPanel() {
  const [filter, setFilter] = useState<ArtifactFilter>('all');
  const artifacts = AGENT_ARTIFACTS.filter((a) => (filter === 'all' ? true : a.kind === filter));

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-[28px]">
      <div className="mx-auto flex w-full max-w-[960px] flex-col gap-[8px]">
        {/* 过滤 pills — 同 Tasks tab 口径:h-28 px-10 py-4 rounded-full,active 深底白字;与列表为兄弟组,继承父级 gap-8 */}
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
          {artifacts.map((a) => (
            <ArtifactRow key={a.id} artifact={a} />
          ))}
        </div>
      </div>
    </div>
  );
}
