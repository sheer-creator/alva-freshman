/**
 * [INPUT]: Figma Page/Agent/Files(8341:126063) — 卡片网格改版
 * [OUTPUT]: Agent 页 Files tab — 3 列卡片网格(每卡:类型图标 + 文件名 + 日期,右上 download;hover 深边框 + delete)
 *           image/html/md 点击进查看器,其余格式点击即下载;delete 从列表移除(mock)
 * [POS]: AgentNewSession tab==='artifacts' 渲染;产物数驱动页级 tab 计数
 */

import { useState } from 'react';
import { CdnIcon } from '@/app/components/shared/CdnIcon';

const FONT = "'Delight', sans-serif";
const BASE = import.meta.env.BASE_URL;

/* 类型图标 — Figma photo-f / file-f(填充,fill-opacity 0.2=n2);CDN 无 file-f,统一用导出 svg 直出 */
const ICON_IMAGE = `${BASE}icon-artifact-image.svg`;
const ICON_FILE = `${BASE}icon-artifact-file.svg`;

export type AgentArtifactKind = 'image' | 'file';

export interface AgentArtifact {
  id: string;
  name: string;
  /** 生成日期 MM/DD/YYYY */
  date: string;
  kind: AgentArtifactKind;
}

export const AGENT_ARTIFACTS: AgentArtifact[] = [
  { id: 'a1', name: 'logo-horizontal-color-black-green.png', date: '06/24/2026', kind: 'image' },
  { id: 'a4', name: 'nvda-theme-tracker.html', date: '06/24/2026', kind: 'file' },
  { id: 'a5', name: 'mag7-thesis.md', date: '06/23/2026', kind: 'file' },
  { id: 'a2', name: 'my-semis-screener.skill', date: '06/22/2026', kind: 'file' },
  { id: 'a3', name: 'mag7-backtest-results.csv', date: '06/21/2026', kind: 'file' },
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

/* 卡片 — Figma 8341:126070:白底 / border 0.5 l2(hover→l9) / 圆角 8 / px20 py16 / gap8 items-start
   icon 24 + (名称行[名 flex-1 truncate · download 16 n9] + 日期 12 n5);hover 出现 delete(16 n9) */
function ArtifactCard({ artifact, onOpen, onDelete }: { artifact: AgentArtifact; onOpen: () => void; onDelete: () => void }) {
  const openable = viewKindOf(artifact.name) !== null;
  return (
    <div
      className="group flex cursor-pointer items-start gap-[8px] overflow-hidden rounded-[8px] border-[0.5px] border-[color:var(--line-l2,rgba(0,0,0,0.2))] bg-white px-[20px] py-[16px] transition-colors hover:border-[color:var(--line-l9,rgba(0,0,0,0.9))]"
      onClick={openable ? onOpen : () => simulateDownload(artifact.name)}
    >
      <img src={artifact.kind === 'image' ? ICON_IMAGE : ICON_FILE} alt="" className="size-[24px] shrink-0" />
      <div className="flex min-w-0 flex-1 flex-col gap-[4px]">
        <div className="flex w-full items-center gap-[8px]">
          <p className="min-w-0 flex-1 truncate text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
            {artifact.name}
          </p>
          {/* delete — 悬浮出现 */}
          <button
            type="button"
            aria-label={`Delete ${artifact.name}`}
            className="hidden size-[16px] shrink-0 cursor-pointer items-center justify-center border-none bg-transparent p-0 transition-opacity hover:opacity-60 group-hover:flex"
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
          >
            <CdnIcon name="delete-l" size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
          </button>
          <button
            type="button"
            aria-label={`Download ${artifact.name}`}
            className="flex size-[16px] shrink-0 cursor-pointer items-center justify-center border-none bg-transparent p-0 transition-opacity hover:opacity-60"
            onClick={(e) => { e.stopPropagation(); simulateDownload(artifact.name); }}
          >
            <CdnIcon name="download-l" size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
          </button>
        </div>
        <p className="w-full truncate text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
          {artifact.date}
        </p>
      </div>
    </div>
  );
}

export function AgentArtifactsPanel() {
  const [items, setItems] = useState<AgentArtifact[]>(AGENT_ARTIFACTS);
  const [openedId, setOpenedId] = useState<string | null>(null);

  const opened = openedId ? items.find((a) => a.id === openedId) ?? null : null;
  const openedView = opened ? viewKindOf(opened.name) : null;

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-[28px]">
      <div className="mx-auto grid w-full max-w-[960px] grid-cols-3 gap-[16px]">
        {items.map((a) => (
          <ArtifactCard
            key={a.id}
            artifact={a}
            onOpen={() => setOpenedId(a.id)}
            onDelete={() => setItems((prev) => prev.filter((x) => x.id !== a.id))}
          />
        ))}
      </div>

      {opened && openedView && (
        <ArtifactViewer artifact={opened} view={openedView} onClose={() => setOpenedId(null)} />
      )}
    </div>
  );
}
