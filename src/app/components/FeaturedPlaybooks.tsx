import { AVATAR_COLOR_PALETTE } from '@/lib/chart-theme';

function UserAvatar({ name, size = 22 }: { name: string; size?: number }) {
  const initial = name.trim().charAt(0).toUpperCase();
  const color = AVATAR_COLOR_PALETTE[[...name].reduce((s, c) => s + c.charCodeAt(0), 0) % AVATAR_COLOR_PALETTE.length];

  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: size * 0.44, color: '#fff', lineHeight: 1, letterSpacing: 0, fontFamily: "'Delight', sans-serif" }}>
        {initial}
      </span>
    </div>
  );
}

function ViewAll() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="View All">
      <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.5)] tracking-[0.14px]">View All</p>
    </div>
  );
}

function HomeSectionTitle() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Home/Section Title">
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Featured Playbooks</p>
      <ViewAll />
    </div>
  );
}

function TabItemActive() {
  return (
    <div className="bg-[rgba(73,163,166,0.2)] content-stretch flex flex-col items-center justify-center px-[16px] py-[6px] relative rounded-[4px] shrink-0" data-name="Tab Item">
      <p className="font-['Delight',sans-serif] font-medium leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-center tracking-[0.14px]">Smart Screener</p>
    </div>
  );
}

function TabItem({ label }: { label: string }) {
  return (
    <div className="bg-[rgba(0,0,0,0.03)] content-stretch flex items-center justify-center px-[16px] py-[6px] relative rounded-[4px] shrink-0" data-name="Tab Item">
      <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">{label}</p>
    </div>
  );
}

function PlaybookTabs() {
  return (
    <div className="content-start flex flex-wrap gap-[12px] items-start relative shrink-0 w-full" data-name="Tab">
      <TabItemActive />
      <TabItem label="Asset Tracker" />
      <TabItem label="Portfolio Lens" />
      <TabItem label="Quant Signals" />
      <TabItem label="Risk Monitors" />
      <TabItem label="Macro Pulse" />
    </div>
  );
}

function PlaybookCreatorInfo({ name }: { name: string }) {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Playbook/Creator Info">
      <UserAvatar name={name} size={22} />
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">{name}</p>
    </div>
  );
}

function PlaybookMetric({ value }: { value: string }) {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['Delight',sans-serif] items-start min-h-px min-w-px not-italic relative whitespace-pre-wrap" data-name="Left">
      <p className="leading-[38px] relative shrink-0 text-[#49a3a6] text-[28px] tracking-[0.28px] w-full">{value}</p>
      <p className="leading-[20px] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] w-full">Annualized Return</p>
    </div>
  );
}

function PlaybookCard({
  creator,
  title,
  description,
  value,
  icon,
}: {
  creator: string;
  title: string;
  description: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[6px]" data-name="Playbook/Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[20px] items-start p-[16px] relative w-full">
          <PlaybookCreatorInfo name={creator} />
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Frame">
            <div className="content-stretch flex gap-[6px] items-center justify-center relative shrink-0 w-full" data-name="Name">
              {icon}
              <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[28px] min-h-px min-w-px not-italic overflow-hidden relative text-[18px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.18px] whitespace-nowrap">
                {title}
              </p>
            </div>
            <p className="font-['Delight',sans-serif] h-[44px] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[13px] text-[rgba(0,0,0,0.7)] text-ellipsis tracking-[0.13px] w-full whitespace-pre-wrap">
              {description}
            </p>
          </div>
          <div className="content-stretch flex gap-[8px] items-end relative shrink-0 w-full" data-name="Feed/Card Info">
            <PlaybookMetric value={value} />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function StrategyIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="sidebar-strategy-normal">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path
          d="M10.8182 2.50004C10.8182 2.04718 10.451 1.67993 9.99809 1.67993C9.54523 1.67993 9.17798 2.04718 9.17798 2.50004V3.05526C6.00099 3.44011 3.54163 6.1463 3.54163 9.4276C3.54163 11.0426 4.13631 12.5184 5.11958 13.6493L4.05044 14.7185C3.7302 15.0387 3.7302 15.5579 4.05044 15.8781C4.37067 16.1984 4.88984 16.1984 5.21008 15.8781L6.27923 14.809C7.41012 15.7923 8.88594 16.3869 10.5009 16.3869C13.7822 16.3869 16.4884 13.9276 16.8733 10.7506H17.4285C17.8813 10.7506 18.2486 10.3833 18.2486 9.9305C18.2486 9.47764 17.8813 9.11039 17.4285 9.11039H16.8733C16.4884 5.93341 13.7822 3.47404 10.5009 3.47404C10.3927 3.47404 10.2848 3.47672 10.1772 3.48202V2.50004H10.8182ZM10.5009 5.11426C13.1637 5.11426 15.3228 7.27342 15.3228 9.93619C15.3228 12.599 13.1637 14.7581 10.5009 14.7581C7.83811 14.7581 5.67895 12.599 5.67895 9.93619C5.67895 7.27342 7.83811 5.11426 10.5009 5.11426ZM10.5378 6.68304C10.085 6.68304 9.71772 7.05029 9.71772 7.50315V9.59994L8.00731 11.3104C7.68707 11.6306 7.68707 12.1497 8.00731 12.47C8.32754 12.7902 8.84672 12.7902 9.16695 12.47L11.112 10.5249C11.266 10.3709 11.3525 10.1621 11.3525 9.94446V7.50315C11.3525 7.05029 10.9852 6.68304 10.5324 6.68304H10.5378Z"
          fill="var(--fill-0, black)"
          fillOpacity="0.9"
        />
      </svg>
    </div>
  );
}

const PLAYBOOK_ROWS = [
  [
    {
      creator: 'Alva Intern',
      title: 'BTC Ultimate AI Trader',
      description:
        "This strategy intelligently pinpoints BTC's optimal trading sweet spots through dual-engine analysis: RSI oversold alerts + Bollinger Band breakouts. Automatically trimming position extremities to capture core price movements, it strategically accumulates during bumpy markets.",
      value: '338.23%',
    },
    {
      creator: 'Harry Zzz',
      title: 'MAG7 Equal-Weight Monthly Rebalance',
      description: 'Maintains a fully invested equal-weight portfolio of the Magnificent 7 stocks and rebalances monthly',
      value: '142.8%',
    },
    {
      creator: 'Leo Leo',
      title: 'PEPE Long vs BTC Short Monthly Rebalance',
      description:
        'The OI Abnormal Movement Monitoring Strategy tracks selected crypto tokens on a 4-hour timeframe to detect unusually large changes in Open Interest (OI) and trading volume.',
      value: '65.36%',
    },
  ],
  [
    {
      creator: 'Sheer YLL YGG',
      title: 'Attribution Analysis Strategy for Price Trends',
      description:
        'Monitor selected tokens on a 4-hour timeframe to detect abnormal changes in Open Interest (OI) and trading volume in order to capture unusual market activity and generate alerts.',
      value: '120.9%',
      icon: <StrategyIcon />,
    },
    {
      creator: 'Macro Scope X',
      title: 'BTC MACD 1h Simple Crossover',
      description:
        'Trade BTC using MACD(12,26,9) line crossing its signal on 1-hour candles; enter long on bullish cross, exit on bearish cross.',
      value: '12.8%',
    },
    {
      creator: 'Smart Jing',
      title: 'NVDA +3% Triggered TSM TP/SL',
      description:
        'Buys TSM at the close when NVDA gains >3% close-to-close, then exits on +10% take-profit or -5% stop-loss.',
      value: '27.73%',
    },
  ],
];

export function FeaturedPlaybooks() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start max-w-[1200px] relative shrink-0 w-full" data-name="Featured Playbooks">
      <HomeSectionTitle />
      <PlaybookTabs />
      <div className="content-stretch flex flex-col gap-[12px] items-start justify-center relative shrink-0 w-full" data-name="Playbook/Card List">
        {PLAYBOOK_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name={`playbook-row-${rowIndex + 1}`}>
            {row.map((playbook) => (
              <PlaybookCard
                key={playbook.title}
                creator={playbook.creator}
                title={playbook.title}
                description={playbook.description}
                value={playbook.value}
                icon={playbook.icon}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
