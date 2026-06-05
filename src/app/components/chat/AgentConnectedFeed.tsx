import { CdnIcon } from '../shared/CdnIcon';
import { ActivityTrace } from './ActivityTrace';
import alvaLogo from './logo-green-black.svg';

const FONT = "font-['Delight',sans-serif]";

function AlvaMark() {
  return <img src={alvaLogo} alt="Alva" style={{ height: 12, width: 47 }} />;
}

function FeedBarsIcon() {
  return (
    <span className="inline-flex size-[14px] shrink-0 items-end gap-[1px] align-[-2px]">
      <span className="block w-[3px] rounded-[1px]" style={{ height: 10, background: '#4f7df3' }} />
      <span className="block w-[3px] rounded-[1px]" style={{ height: 13, background: 'var(--main-m1, #49A3A6)' }} />
      <span className="block w-[3px] rounded-[1px]" style={{ height: 8, background: '#f5a623' }} />
    </span>
  );
}

function SourceLink() {
  return (
    <div className="flex items-center gap-[4px] w-full">
      <span className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)]`}>Source:</span>
      <span className="flex min-w-0 items-center gap-[2px]">
        <span
          className={`${FONT} truncate text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] underline decoration-dotted underline-offset-[3px]`}
          style={{ textDecorationColor: 'var(--text-n5)' }}
        >
          BTC Ultimate AI Trader
        </span>
        <CdnIcon name="go-l" size={14} />
      </span>
    </div>
  );
}

function AgentNotification({ showGenerated = false }: { showGenerated?: boolean }) {
  return (
    <div className="flex w-full flex-col items-start gap-[16px]">
      <div className="flex w-full flex-col items-start gap-[4px] pt-[4px]">
        <AlvaMark />
      </div>
      {showGenerated && <ActivityTrace />}
      <div className="flex w-full flex-col items-start gap-[12px]">
        <p className={`${FONT} flex items-center gap-[2px] text-[14px] font-medium leading-[22px] tracking-[0.14px] text-[var(--text-n9)]`}>
          <FeedBarsIcon />
          <span>Feed - AI Chip Supply Chain</span>
        </p>
        <div className={`${FONT} text-[14px] font-medium leading-[22px] tracking-[0.14px] text-[var(--text-n9)]`}>
          <p className="mb-0">AI chip supply chain — @E055Michel1842: @jukan05 In other words demand is so high that TSMC can’t cope with the demand</p>
          <p>Questions are</p>
        </div>
        <p className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)]`}>
          A quiet day on the supply-chain front. Worth monitoring TSMC capacity allocations and SMIC trailing-edge output for the next trigger.
        </p>
        <SourceLink />
      </div>
    </div>
  );
}

export function AgentConnectedFeed({ className = '' }: { className?: string }) {
  return (
    <div className={`flex w-full flex-col gap-[48px] pt-[16px] ${className}`}>
      <AgentNotification showGenerated />
      <AgentNotification />
      <AgentNotification />
    </div>
  );
}
