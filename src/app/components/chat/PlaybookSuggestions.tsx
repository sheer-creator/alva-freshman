import { CdnIcon } from '../shared/CdnIcon';
import DotMatrixWave from '../shared/DotMatrixWave';

export const EMPTY_PROMPTS = [
  {
    icon: 'target-l2',
    text: 'Backtest Any Market Scenario Before You Risk a Dollar',
  },
  {
    icon: 'target-l2',
    text: 'Track Any Theme in Real Time',
  },
  {
    icon: 'sidebar-thread-normal',
    text: 'See Beyond the Numbers',
  },
];

export function EmptyPromptPill({
  icon,
  text,
  onClick,
}: {
  icon: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-[36px] max-w-full shrink-0 cursor-pointer items-center gap-[4px] rounded-[960px] border-0 px-[12px] py-[8px] transition-colors hover:bg-[var(--b-r07)]"
      style={{ background: 'var(--grey-g02, #f5f5f5)' }}
    >
      <CdnIcon name={icon} size={16} color="var(--text-n9)" />
      <span
        className="min-w-0 truncate font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px]"
        style={{ color: 'var(--text-n9)' }}
      >
        {text}
      </span>
    </button>
  );
}

export function ChatEmptyState({ onPromptClick }: { onPromptClick: (text: string) => void }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden w-full">
      <div className="relative flex min-h-[320px] flex-1 items-center justify-center overflow-hidden px-[16px] pb-[20px]">
        <DotMatrixWave
          className="pointer-events-none absolute inset-0 h-full w-full"
          enableHover={false}
          dotColor="#cfe8e8"
          waveSpeed={0.72}
        />
        <h2
          className="relative z-[1] m-0 max-w-[616px] text-center font-['Delight',sans-serif] text-[24px] font-normal leading-[34px] tracking-[0.24px]"
          style={{ color: 'var(--text-n9)' }}
        >
          Turn Ideas into Live
          <br />
          Investing Playbooks in Minutes
        </h2>
      </div>

      <div className="flex shrink-0 flex-wrap items-center justify-start gap-[8px] overflow-hidden p-[16px] pt-[8px]">
        {EMPTY_PROMPTS.map((prompt) => (
          <EmptyPromptPill
            key={prompt.text}
            icon={prompt.icon}
            text={prompt.text}
            onClick={() => onPromptClick(prompt.text)}
          />
        ))}
      </div>
    </div>
  );
}
