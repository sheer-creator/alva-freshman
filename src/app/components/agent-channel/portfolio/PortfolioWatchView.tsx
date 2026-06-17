/**
 * [INPUT]: portfolio 数据、ChannelMessage 原语、ExtraThread、PortfolioBriefCard、PortfolioOnboard
 * [OUTPUT]: PortfolioWatchView — Concept P 视图（引导条 + sample 产物 + onboarding + 共享线程）
 * [POS]: agent-channel/portfolio — Chat tab 的 P concept（套用 KolDigestView 骨架）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import { PORTFOLIO_SAMPLE_BRIEF, SAMPLE_MOVE_PUSH } from '@/data/agent-channel/portfolio';
import type { ExtraMsg, ImId, PortfolioAuto, PortfolioHolding } from '@/data/agent-channel/types';
import { ChannelIcon } from '../ChannelIcon';
import { AgentMsg, rich } from '../ChannelMessage';
import { ExtraThread } from '../ExtraThread';
import { PortfolioBriefCard } from './PortfolioBriefCard';
import { PortfolioOnboard } from './PortfolioOnboard';

interface PortfolioWatchViewProps {
  extra: ExtraMsg[];
  onSetup: (tickers: string[], autos: PortfolioAuto[], hasBroker: boolean, holdings: PortfolioHolding[]) => void;
  onGoTasks: () => void;
  onGoAlerts: () => void;
  onGoFiles: () => void;
  onConnectIm?: (im?: ImId) => void;
}

export function PortfolioWatchView({ extra, onSetup, onGoTasks, onGoAlerts, onGoFiles, onConnectIm }: PortfolioWatchViewProps) {
  return (
    <div className="stage-inner" style={{ maxWidth: 720 }}>
      <div className="entryband">
        <span className="eb-ico"><ChannelIcon name="trend" size={15} /></span>
        <span>Welcome to <b>Portfolio Watch</b>. Here’s a sample of your morning brief and a live alert — tune it below and it goes live in this channel.</span>
      </div>

      {/* sample 产物 1：晨间组合简报 */}
      <AgentMsg persona="full" push time="07:30">
        <PortfolioBriefCard {...PORTFOLIO_SAMPLE_BRIEF} onGoAlerts={onGoAlerts} />
      </AgentMsg>

      {/* sample 产物 2：实时个股异动 */}
      <AgentMsg persona="full" push time="09:48">
        <div className="tweet"><div className="tw-text">{rich(SAMPLE_MOVE_PUSH.text)}</div></div>
        <div className="tw-note">{SAMPLE_MOVE_PUSH.note}</div>
      </AgentMsg>

      {/* onboarding */}
      <AgentMsg persona="subtle">
        <div className="bubble plain" style={{ fontSize: 13.5, color: 'var(--text-n5)' }}>Make it yours:</div>
        <PortfolioOnboard onSetup={onSetup} />
      </AgentMsg>

      <ExtraThread extra={extra} subtle={false} onGoTasks={onGoTasks} onGoAlerts={onGoAlerts} onGoFiles={onGoFiles} onConnectIm={onConnectIm} />
    </div>
  );
}
