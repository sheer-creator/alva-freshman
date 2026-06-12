/**
 * [INPUT]: kol.ts 的 KOL_DIGEST_AGG/KOL_SIGNALS/KOL_SIDE、ChannelMessage 原语、ExtraThread、KolFollowOnboard
 * [OUTPUT]: KolDigestView — Concept K 的 KOL Digest 视图（聚合卡 + 信号推文 + onboarding + 交互线程）
 * [POS]: agent-channel/kol — Chat tab 的 K concept（源自 demo planc 2968-3027 行）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import { Fragment } from 'react';
import { KOL_DIGEST_AGG, KOL_SIDE, KOL_SIGNALS } from '@/data/agent-channel/kol';
import type { ExtraMsg, ImId } from '@/data/agent-channel/types';
import { AgentMsg } from '../ChannelMessage';
import { ExtraThread, SourceTag } from '../ExtraThread';
import { avaColor, initials } from '../ava';
import { KolFollowOnboard } from './KolFollowOnboard';

interface KolDigestViewProps {
  onDigest: (count: number) => void;
  extra: ExtraMsg[];
  onGoTasks: () => void;
  onGoAlerts: () => void;
  onGoFiles: () => void;
  onConnectIm?: (im?: ImId) => void;
}

export function KolDigestView({ onDigest, extra, onGoTasks, onGoAlerts, onGoFiles, onConnectIm }: KolDigestViewProps) {
  const agg = KOL_DIGEST_AGG;
  return (
    <div className="stage-inner" style={{ maxWidth: 720 }}>
      {/* 聚合 digest — 领衔信息流 */}
      <AgentMsg persona="full" push time="07:30">
        <div className="digest">
          <div className="dg-h">
            <span className="dg-mark"><img src={`${import.meta.env.BASE_URL}logo-portrait.svg`} alt="Alva" /></span>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div className="dg-t">{agg.title}</div>
              <div className="dg-m">{agg.meta}</div>
            </div>
            <span className="dg-badge">Daily roundup</span>
          </div>
          <div className="dg-summary">{agg.summary}</div>
          <div className="dg-rows">
            {agg.rows.map((r, i) => {
              const s = KOL_SIDE[r.side];
              return (
                <div className="dg-row" key={i}>
                  <span className="dg-ava" style={{ background: avaColor(r.kol) }}>{initials(r.kol)}</span>
                  <span className="dg-tkr">{r.ticker}</span>
                  <span className="dg-side" style={{ background: s.c }}></span>
                  <span className="dg-take">{r.take}</span>
                  <span className="dg-kol">{r.kol}</span>
                </div>
              );
            })}
          </div>
          <div className="dg-foot"><SourceTag source={agg.source} onGoAlerts={onGoAlerts} /></div>
        </div>
      </AgentMsg>

      {/* 单条信号推送 — 极简 IM 风：推文 + tickers */}
      {KOL_SIGNALS.map((s, i) => (
        <AgentMsg persona="full" push time={s.time} key={i}>
          <div className="tweet">
            <div className="tw-h">
              <span className="tw-ava" style={{ background: avaColor(s.kol) }}>{initials(s.kol)}</span>
              <span className="tw-n">{s.kol}</span>
              <span className="tw-handle">{s.handle} · {s.time}</span>
            </div>
            <div className="tw-text">{s.quote} {s.tickers.map((t, ti) => <Fragment key={t}>{ti > 0 ? ' ' : ''}<span className="cashtag">${t}</span></Fragment>)}</div>
          </div>
          <div className="tw-note">{s.alva}</div>
          <SourceTag source={s.source} onGoAlerts={onGoAlerts} />
        </AgentMsg>
      ))}

      {/* 一键 follow onboarding GUI */}
      <AgentMsg persona="subtle">
        <div className="bubble plain" style={{ fontSize: 13.5, color: 'var(--text-n5)' }}>Want more voices in your digest? Tune who I follow:</div>
        <KolFollowOnboard onDigest={onDigest} />
      </AgentMsg>

      <ExtraThread extra={extra} subtle={false} onGoTasks={onGoTasks} onGoAlerts={onGoAlerts} onGoFiles={onGoFiles} onConnectIm={onConnectIm} />
    </div>
  );
}
