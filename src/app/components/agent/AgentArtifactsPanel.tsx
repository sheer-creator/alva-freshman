/**
 * [INPUT]: Figma Page/Agent/Artifacts(7919:175902)
 * [OUTPUT]: Agent 页 Artifacts tab — All/Images/Files 过滤 pills + 产物列表;image/html/md 点击进查看器,其余格式仅下载
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
    name: 'logo-horizontal-color-black-green.png',
    detail: 'Generated from your Theme Tracker run · 2.4 MB',
    kind: 'image',
  },
  {
    id: 'a4',
    name: 'nvda-theme-tracker.html',
    detail: 'Rendered report from your Theme Tracker run · 88 KB',
    kind: 'file',
  },
  {
    id: 'a5',
    name: 'mag7-thesis.md',
    detail: 'Research notes drafted by Alva · 12 KB',
    kind: 'file',
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

/* ========== 按扩展名判断可预览类型;null = 仅下载 ========== */
type ViewKind = 'image' | 'html' | 'md';

function viewKindOf(name: string): ViewKind | null {
  const ext = name.split('.').pop()?.toLowerCase() ?? '';
  if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp'].includes(ext)) return 'image';
  if (ext === 'html' || ext === 'htm') return 'html';
  if (ext === 'md' || ext === 'markdown') return 'md';
  return null;
}

/* 模拟下载 — 用占位内容生成 Blob 触发浏览器下载 */
function simulateDownload(name: string) {
  const blob = new Blob([`Alva artifact placeholder — ${name}`], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/* ========== 查看器内容 mock ========== */
const IMAGE_SRC = 'https://alva-ai-static.b-cdn.net/icons/logo-alva-horizontal-green-black.svg';

const HTML_DOC = `<!doctype html><html><head><meta charset="utf-8"><style>
  body{font-family:-apple-system,system-ui,sans-serif;margin:32px;color:rgba(0,0,0,0.9);line-height:1.6}
  h1{font-size:22px;margin:0 0 4px}
  .sub{color:rgba(0,0,0,0.5);font-size:13px;margin:0 0 24px}
  table{border-collapse:collapse;width:100%;font-size:13px}
  th,td{border:1px solid rgba(0,0,0,0.12);padding:8px 12px;text-align:left}
  th{background:rgba(0,0,0,0.03);font-weight:600}
  .up{color:#2a9b7d}.down{color:#e05357}
</style></head><body>
  <h1>NVDA Theme Tracker</h1>
  <p class="sub">Generated Thu 7:22 PM · semiconductors / AI infrastructure</p>
  <table>
    <tr><th>Ticker</th><th>1D</th><th>5D</th><th>Note</th></tr>
    <tr><td>NVDA</td><td class="up">+2.4%</td><td class="up">+6.1%</td><td>HBM demand intact</td></tr>
    <tr><td>AMD</td><td class="down">-0.8%</td><td class="up">+1.9%</td><td>MI300 ramp</td></tr>
    <tr><td>INTC</td><td class="down">-1.2%</td><td class="down">-3.4%</td><td>Foundry overhang</td></tr>
  </table>
</body></html>`;

/* md 渲染态(prototype 手写,非真 md 解析) */
function MarkdownView() {
  return (
    <div className="flex w-full flex-col gap-[16px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
      <h1 className="text-[24px] font-medium leading-[34px] tracking-[0.24px]">Mag7 Thesis</h1>
      <p className="text-[14px] leading-[22px] tracking-[0.14px]">
        Core view: the <span className="font-medium">HBM / advanced packaging</span> bottleneck keeps crowding out
        general-purpose capacity. Marginal new info this week is the upstream materials angle.
      </p>
      <h2 className="text-[18px] font-medium leading-[28px] tracking-[0.18px]">Watch list</h2>
      <ul className="flex flex-col gap-[4px] pl-[20px] text-[14px] leading-[22px] tracking-[0.14px]" style={{ listStyle: 'disc' }}>
        <li>NVDA — demand intact, supply gated by HBM</li>
        <li>AMD — MI300 ramp, watch gross margin</li>
        <li>Kanto Denka — tungsten-layer consumable, possible July cutoff</li>
      </ul>
      <pre className="w-full overflow-x-auto rounded-[6px] p-[16px] text-[12px] leading-[20px]" style={{ background: 'var(--b-r03, rgba(0,0,0,0.03))', fontFamily: "'JetBrains Mono', monospace" }}>
{`screen = factor("hbm_exposure") > 0.6
       & factor("fwd_pe") < 35`}
      </pre>
    </div>
  );
}

function ArtifactViewer({ artifact, view, onClose }: { artifact: AgentArtifact; view: ViewKind; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50">
      {/* 内容 — 全屏纯展开,无标题/边框/下载 */}
      {view === 'image' && (
        <div className="absolute inset-0 flex items-center justify-center p-[40px]" style={{ background: 'rgba(0,0,0,0.9)' }} onClick={onClose}>
          <img src={IMAGE_SRC} alt={artifact.name} className="max-h-full max-w-full object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
      {view === 'html' && (
        <iframe title={artifact.name} srcDoc={HTML_DOC} className="absolute inset-0 h-full w-full border-none bg-white" />
      )}
      {view === 'md' && (
        <div className="absolute inset-0 overflow-y-auto bg-white">
          <div className="mx-auto w-full max-w-[800px] px-[28px] py-[56px]">
            <MarkdownView />
          </div>
        </div>
      )}

      {/* 关闭 — lightbox 风格,任意背景可见 */}
      <button
        type="button"
        aria-label="Close"
        className="absolute right-[24px] top-[24px] z-10 flex size-[36px] cursor-pointer items-center justify-center rounded-full border-none transition-opacity hover:opacity-80"
        style={{ background: 'rgba(0,0,0,0.5)' }}
        onClick={onClose}
      >
        <CdnIcon name="close-l1" size={18} color="#fff" />
      </button>
    </div>
  );
}

function ArtifactRow({ artifact, onOpen }: { artifact: AgentArtifact; onOpen?: () => void }) {
  const openable = viewKindOf(artifact.name) !== null;
  /* 卡片 — Figma 7930:185482:border 0.5 l2 / 圆角 8 / p-20 / gap 10;可预览的才点击进查看器 + hover 态 */
  return (
    <div
      className="group flex w-full cursor-pointer items-start gap-[10px] rounded-[8px] p-[20px] transition-shadow hover:shadow-xs"
      style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}
      onClick={openable ? onOpen : () => simulateDownload(artifact.name)}
    >
      {/* Icon — Figma 7919:176487:28px 方容器 br03 圆角 2,内嵌 16px icon;hover 卡片 → 底 br07,图标不变色 */}
      <div className="flex size-[28px] shrink-0 items-center justify-center rounded-[4px] bg-[var(--b-r03,rgba(0,0,0,0.03))] transition-colors group-hover:bg-[var(--b-r07,rgba(0,0,0,0.07))]">
        <CdnIcon name={artifact.kind === 'image' ? 'photo-l' : 'clip-l'} size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-[4px]">
        {/* 文件名行 — Figma 7975:136943:gap 4 / 名称 flex-1 truncate,右侧 download-l 16 */}
        <div className="flex w-full items-center gap-[4px]">
          <p className="min-w-0 flex-1 truncate text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
            {artifact.name}
          </p>
          <button
            type="button"
            aria-label={`Download ${artifact.name}`}
            className="flex size-[16px] shrink-0 cursor-pointer items-center justify-center border-none bg-transparent p-0 transition-opacity hover:opacity-60"
            onClick={(e) => {
              e.stopPropagation();
              simulateDownload(artifact.name);
            }}
          >
            <CdnIcon name="download-l" size={16} color="var(--text-n7, rgba(0,0,0,0.7))" />
          </button>
        </div>
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
  const [openedId, setOpenedId] = useState<string | null>(null);
  const artifacts = AGENT_ARTIFACTS.filter((a) => (filter === 'all' ? true : a.kind === filter));

  const opened = openedId ? AGENT_ARTIFACTS.find((a) => a.id === openedId) ?? null : null;
  const openedView = opened ? viewKindOf(opened.name) : null;

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-[28px]">
      <div className="mx-auto flex w-full max-w-[960px] flex-col gap-[16px]">
        {/* 过滤 pills — 同 Tasks tab 口径:h-28 px-10 py-4 rounded-full,active 深底白字;与卡片为兄弟组,继承父级 gap-16 */}
        <div className="flex flex-wrap gap-[12px]">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                className="h-[34px] shrink-0 cursor-pointer whitespace-nowrap rounded-full border-none px-[12px] py-[6px] text-[14px] leading-[22px] tracking-[0.14px] transition-colors"
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
        {artifacts.map((a) => (
          <ArtifactRow key={a.id} artifact={a} onOpen={() => setOpenedId(a.id)} />
        ))}
      </div>

      {opened && openedView && (
        <ArtifactViewer artifact={opened} view={openedView} onClose={() => setOpenedId(null)} />
      )}
    </div>
  );
}
