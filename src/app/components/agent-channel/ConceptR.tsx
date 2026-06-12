/**
 * [INPUT]: ChannelMessage 原语、ExtraThread 的 SourceTag
 * [OUTPUT]: ConceptR — 回访用户的每日状态（昨日线程续接 + 今日至多三条推送）
 * [POS]: agent-channel — Chat tab 的 R concept（源自 demo planc 2204-2258 行）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import { AgentMsg, DaySep, UserMsg } from './ChannelMessage';
import { SourceTag } from './ExtraThread';

/* ========== 时间感知问候 ========== */

function timeContext() {
  const now = new Date();
  const h = now.getHours();
  const at = (addMin: number) => {
    const d = new Date(now.getTime() + addMin * 60000);
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };
  if (h < 12) return { at, greeting: 'Good morning' };
  if (h < 18) return { at, greeting: 'Good afternoon' };
  return { at, greeting: 'Good evening' };
}

/* ========== 每日状态 — 持续的 1:1 对话，而非推送流 ========== */

export function ConceptR({ onGoAlerts }: { onGoAlerts: () => void }) {
  const t = timeContext();
  return (
    <>
      <DaySep label="Yesterday" />

      <UserMsg text="Is the power & grid trade getting crowded? VRT feels extended after this run." />

      <AgentMsg persona="full" time="21:38">
        <div className="bubble">
          <p>Heavier than January, but not crowded yet — net exposure in the group sits around the 60th percentile and spreads are intact. The bigger risk is <span className="cashtag">$VRT</span>’s print on Thursday: consensus already assumes a guide-raise.</p>
          <p style={{ marginTop: 8 }}>I’ll re-check utilization data before then and flag anything that changes the picture.</p>
        </div>
      </AgentMsg>

      <DaySep label="Today" />

      <AgentMsg persona="full" push time="07:30">
        <div className="bubble">
          <p style={{ marginBottom: 5 }}><span style={{ fontWeight: 500 }}>AI-Capex-Monitor</span> · 3 new matches</p>
          <p><span className="cashtag">$ANET</span> — capex guide +18%, networking pull-through</p>
          <p><span className="cashtag">$VRT</span> — backlog +31% YoY, raised FY guide</p>
          <p><span className="cashtag">$CRDO</span> — AEC design wins at two hyperscalers</p>
          <p style={{ marginTop: 8, color: 'var(--text-n5)' }}>Two of the three touch your basket.</p>
        </div>
        <div style={{ marginTop: 4 }}><SourceTag source={{ automation: 'AI-Capex-Monitor', playbook: 'Hyperscaler Capex Tracker' }} onGoAlerts={onGoAlerts} /></div>
      </AgentMsg>

      <AgentMsg persona="full" push time="12:41">
        <div className="bubble"><span className="cashtag">$VRT</span> +5.1% on 2.3× average volume, a day before the print — the move we talked about last night.</div>
        <div style={{ marginTop: 4 }}><SourceTag source={{ automation: 'Price-Spike-Watch' }} onGoAlerts={onGoAlerts} /></div>
      </AgentMsg>

      <AgentMsg persona="full" push time={t.at(0)}>
        <div className="bubble">{t.greeting}, leo. Your <span style={{ fontWeight: 500 }}>MAG7 backtest</span> finished overnight — +24.1% CAGR vs +18.9% for SPX, Sharpe 1.32. Full report in Files.</div>
      </AgentMsg>
    </>
  );
}

/* ========== R 态的个性化 quick replies（composer 上方） ========== */

export const CONCEPT_R_QUICK_REPLIES = [
  { icon: 'chat', text: 'Trim VRT or hold through Thursday?' },
  { icon: 'clock', text: 'My NVDA earnings game plan' },
  { icon: 'history', text: 'Walk me through my backtest' },
];
