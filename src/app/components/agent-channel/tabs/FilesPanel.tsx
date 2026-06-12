/**
 * [INPUT]: artifacts.ts 的 ARTIFACTS、types 的 TONE 色板
 * [OUTPUT]: FilesPanel — 频道产出的文件列表
 * [POS]: agent-channel/tabs — Files tab（原 Artifacts 的 files 段独立成 tab）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import { ARTIFACTS } from '@/data/agent-channel/artifacts';
import { TONE_BG, TONE_FG } from '@/data/agent-channel/types';

export function FilesPanel() {
  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Files</h2>
        <p>Everything Alva has produced in this channel — memos, exports, and saved skills.</p>
      </div>
      <div className="art-list">
        {ARTIFACTS.map((a) => (
          <div className="art" key={a.t}>
            <span className="fi" style={{ background: TONE_BG[a.tone], color: TONE_FG[a.tone] }}>{a.kind}</span>
            <div>
              <div className="at">{a.t}</div>
              <div className="ab">{a.b}</div>
            </div>
            <span className={`badge ${a.badgeKind}`}>{a.badge}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
