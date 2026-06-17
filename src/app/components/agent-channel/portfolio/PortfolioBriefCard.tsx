/**
 * [INPUT]: types 的 PortfolioHolding、kol 的 KOL_SIDE、ava 工具、ExtraThread 的 SourceTag
 * [OUTPUT]: PortfolioBriefCard — 晨间组合简报卡（复用 .digest 骨架；holdings 态显示权重/盘前盈亏并按规模排序）
 * [POS]: agent-channel/portfolio — Concept P 的核心产物（digest）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import { KOL_SIDE } from '@/data/agent-channel/kol';
import type { PortfolioHolding } from '@/data/agent-channel/types';
import { ChannelIcon } from '../ChannelIcon';
import { avaColor, initials } from '../ava';

interface PortfolioBriefCardProps {
  title: string;
  meta: string;
  summary: string;
  rows: PortfolioHolding[];
  /** true = 连了 broker，显示权重/盘前盈亏列 */
  holdings?: boolean;
  /** 右上角徽标覆盖（默认按 holdings 推断 Sample/Live portfolio） */
  badge?: string;
  onGoAlerts: () => void;
}

export function PortfolioBriefCard({ title, meta, summary, rows, holdings, badge, onGoAlerts }: PortfolioBriefCardProps) {
  return (
    <div className="digest">
      <div className="dg-h">
        <span className="dg-mark"><img src={`${import.meta.env.BASE_URL}logo-portrait.svg`} alt="Alva" /></span>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div className="dg-t">{title}</div>
          <div className="dg-m">{meta}</div>
        </div>
        <span className="dg-badge">{badge ?? (holdings ? 'Live portfolio' : 'Sample')}</span>
      </div>
      <div className="dg-summary">{summary}</div>
      <div className="dg-rows">
        {rows.map((r) => {
          const s = KOL_SIDE[r.side] ?? KOL_SIDE.neutral;
          return (
            <div className="dg-row" key={r.symbol}>
              <span className="dg-ava" style={{ background: avaColor(r.symbol) }}>{initials(r.symbol)}</span>
              <span className="dg-tkr">{r.symbol}</span>
              <span className="dg-side" style={{ background: s.c }}></span>
              <span className="dg-take">{r.take}</span>
              {holdings && r.weight != null
                ? <span className="dg-wt">{r.weight}% · <span className={(r.pnlPct ?? 0) >= 0 ? 'up' : 'down'}>{(r.pnlPct ?? 0) >= 0 ? '+' : ''}{r.pnlPct}%</span></span>
                : <span className="dg-kol">{r.tag}</span>}
            </div>
          );
        })}
      </div>
      <div className="dg-foot">
        {/* 内联 srctag（不依赖 ExtraThread，避免循环 import） */}
        <button className="srctag" onClick={onGoAlerts}>
          <span className="src-ico"><ChannelIcon name="automation" size={13} /></span>
          <span className="src-txt"><span className="src-auto">Portfolio Morning Brief</span><span className="src-standalone"> · channel alert</span></span>
        </button>
      </div>
    </div>
  );
}
