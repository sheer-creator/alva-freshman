import React, { useState } from 'react';

type WidgetState = 'upcoming' | 'results';

interface EarningsDetailData {
  ticker: string;
  company: string;
  quarter?: string;
  status: 'upcoming' | 'beat' | 'miss' | 'meet';
  daysUntil?: number;
  earningsDate?: string;
  timeSlot?: 'AMC' | 'BMO';

  // Estimates (Before)
  epsEstimate?: number;
  epsEstimateRange?: [number, number];
  revenueEstimate?: number; // in billions
  revenueEstimateRange?: [number, number];

  // Actuals (After)
  epsActual?: number;
  epsSurprise?: number; // percentage
  revenueActual?: number;
  revenueSurprise?: number;

  // Guidance (After)
  guidanceEps?: number;
  guidanceRevenue?: number;
  guidanceType?: 'Adjusted' | 'GAAP';

  // Beat Streak (8 quarters)
  beatStreak?: ('beat' | 'miss' | 'meet' | 'pending')[];
}

const mockUpcomingData: EarningsDetailData = {
  ticker: 'STX',
  company: 'Seagate Technology Holdings plc',
  quarter: 'Q2 2026',
  status: 'upcoming',
  daysUntil: 36,
  earningsDate: 'Feb 6',
  timeSlot: 'AMC',
  epsEstimate: 1.93,
  epsEstimateRange: [1.88, 1.96],
  revenueEstimate: 2.73,
  revenueEstimateRange: [2.7, 2.76],
  beatStreak: ['beat', 'beat', 'beat', 'miss', 'beat', 'beat', 'beat', 'pending']
};

const mockResultsData: EarningsDetailData = {
  ticker: 'WDC',
  company: 'Western Digital',
  quarter: 'Q4 2025',
  status: 'beat',
  earningsDate: 'Feb 11',
  timeSlot: 'AMC',
  epsActual: 2.32,
  epsEstimate: 2.10,
  epsSurprise: 10.5,
  revenueActual: 5.4,
  revenueEstimate: 5.1,
  revenueSurprise: 5.9,
  guidanceEps: 2.45,
  guidanceRevenue: 5.8,
  guidanceType: 'Adjusted',
  beatStreak: ['beat', 'beat', 'miss', 'beat', 'beat', 'beat', 'beat', 'beat']
};

function CompanyHeader({ data }: { data: EarningsDetailData }) {
  const getLogoConfig = (ticker: string) => {
    const configs: Record<string, { bg: string; text: string }> = {
      MU: { bg: '#E8F4F5', text: '#49A3A6' },
      WDC: { bg: '#E8F5E9', text: '#40A544' },
      SNDK: { bg: '#FFF3E0', text: '#FF9800' },
      STX: { bg: '#EDE7F6', text: '#5F75C9' },
    };
    return configs[ticker] || { bg: '#F5F5F5', text: '#666666' };
  };

  const config = getLogoConfig(data.ticker);

  return (
    <div className="flex items-start gap-[12px] mb-[20px]">
      {/* Logo */}
      <div
        className="flex items-center justify-center rounded-full shrink-0 size-[48px]"
        style={{ backgroundColor: config.bg }}
      >
        <p
          className="font-['Delight:Medium',sans-serif] text-[15px] font-semibold"
          style={{ color: config.text }}
        >
          {data.ticker}
        </p>
      </div>

      {/* Company Info */}
      <div className="flex-1 flex flex-col gap-[4px]">
        <div className="flex items-baseline gap-[6px]">
          <p className="font-['Delight:Regular',sans-serif] text-[18px] text-[rgba(0,0,0,0.9)]">
            {data.ticker}
          </p>
          <p className="font-['Delight:Regular',sans-serif] text-[15px] text-[rgba(0,0,0,0.9)]">
            {data.quarter || 'Q2 2026'}
          </p>
        </div>
        <p className="font-['Delight:Regular',sans-serif] text-[13px] text-[rgba(0,0,0,0.5)]">
          {data.company} · {data.earningsDate} {data.timeSlot}
        </p>
      </div>

      {/* Status Badge */}
      {data.daysUntil && (
        <div className="shrink-0">
          <p className="font-['Delight:Regular',sans-serif] text-[13px] text-[rgba(0,0,0,0.5)]">
            In {data.daysUntil} days
          </p>
        </div>
      )}
    </div>
  );
}

function InfoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[8px] mb-[16px]">
      <p className="font-['Delight:Medium',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)] uppercase tracking-[0.5px]">
        {title}
      </p>
      <div>{children}</div>
    </div>
  );
}

function MetricRow({ label, value, subValue }: { label: string; value: string; subValue?: string }) {
  return (
    <div className="flex items-baseline justify-between py-[6px]">
      <span className="font-['Delight:Regular',sans-serif] text-[13px] text-[rgba(0,0,0,0.7)]">
        {label}
      </span>
      <div className="flex items-baseline gap-[4px]">
        <span className="font-['Delight:Medium',sans-serif] text-[14px] text-[rgba(0,0,0,0.9)] font-medium">
          {value}
        </span>
        {subValue && (
          <span className="font-['Delight:Regular',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)]">
            {subValue}
          </span>
        )}
      </div>
    </div>
  );
}

function BeatStreak({ streak }: { streak: ('beat' | 'miss' | 'meet' | 'pending')[] }) {
  const getColor = (result: 'beat' | 'miss' | 'meet' | 'pending') => {
    switch (result) {
      case 'beat':
        return '#2a9b7d';
      case 'miss':
        return '#e05357';
      case 'meet':
        return 'rgba(0,0,0,0.5)';
      case 'pending':
        return 'rgba(0,0,0,0.15)';
    }
  };

  return (
    <div className="flex items-center gap-[6px]">
      {streak.map((result, index) => {
        const color = getColor(result);
        return (
          <div
            key={index}
            className="size-[12px] rounded-full shrink-0"
            style={{ backgroundColor: color }}
          />
        );
      })}
    </div>
  );
}

function UpcomingContent({ data }: { data: EarningsDetailData }) {
  const formatEPS = (value: number) => `$${value.toFixed(2)}`;
  const formatRevenue = (value: number) => `$${value.toFixed(1)}B`;

  return (
    <div className="flex flex-col gap-[12px]">
      {/* Earnings Date Box */}
      <div className="bg-white p-[16px] rounded-[6px]">
        <p className="font-['Delight:Medium',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)] uppercase tracking-[0.5px] mb-[8px]">
          Earnings Date
        </p>
        <div className="flex items-baseline gap-[8px]">
          <span className="font-['Delight:Regular',sans-serif] text-[18px] text-[rgba(0,0,0,0.9)]">
            {data.earningsDate} {data.timeSlot}
          </span>
          <span className="font-['Delight:Regular',sans-serif] text-[13px] text-[rgba(0,0,0,0.5)]">
            {data.timeSlot === 'AMC' ? 'After Market Close' : 'Before Market Open'}
          </span>
        </div>
      </div>

      {/* Estimates Box - Two-column layout */}
      <div className="bg-white p-[16px] rounded-[6px]">
        <div className="grid grid-cols-2 gap-[20px]">
          {/* EPS Column */}
          <div className="flex flex-col gap-[4px]">
            <p className="font-['Delight:Medium',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)] uppercase tracking-[0.5px]">
              EPS Est.
            </p>
            <p className="font-['Delight:Regular',sans-serif] text-[28px] text-[rgba(0,0,0,0.9)]">
              {formatEPS(data.epsEstimate!)}
            </p>
            {data.epsEstimateRange && (
              <p className="font-['Delight:Regular',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)]">
                Range: {formatEPS(data.epsEstimateRange[0])} - {formatEPS(data.epsEstimateRange[1])}
              </p>
            )}
          </div>

          {/* Revenue Column */}
          <div className="flex flex-col gap-[4px]">
            <p className="font-['Delight:Medium',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)] uppercase tracking-[0.5px]">
              Revenue Est
            </p>
            <p className="font-['Delight:Regular',sans-serif] text-[28px] text-[rgba(0,0,0,0.9)]">
              {formatRevenue(data.revenueEstimate!)}
            </p>
            {data.revenueEstimateRange && (
              <p className="font-['Delight:Regular',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)]">
                Range: {formatRevenue(data.revenueEstimateRange[0])} - {formatRevenue(data.revenueEstimateRange[1])}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Beat Streak Box */}
      {data.beatStreak && (
        <div className="bg-white p-[16px] rounded-[6px]">
          <div className="flex items-center justify-between mb-[8px]">
            <p className="font-['Delight:Medium',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)] uppercase tracking-[0.5px]">
              Beat Streak
            </p>
            <p className="font-['Delight:Regular',sans-serif] text-[13px] text-[rgba(0,0,0,0.5)]">
              {data.beatStreak.filter(s => s === 'beat').length}/{data.beatStreak.length}
            </p>
          </div>
          <BeatStreak streak={data.beatStreak} />
        </div>
      )}

    </div>
  );
}

function ResultsContent({ data }: { data: EarningsDetailData }) {
  const formatEPS = (value: number) => `$${value.toFixed(2)}`;
  const formatRevenue = (value: number) => `$${value.toFixed(1)}B`;
  const formatSurprise = (value: number) => `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;

  return (
    <div className="flex flex-col gap-[12px]">
      {/* Results vs Estimates Box - Two-column layout */}
      <div className="bg-white p-[16px] rounded-[6px]">
        <p className="font-['Delight:Medium',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)] uppercase tracking-[0.5px] mb-[8px]">
          Results vs Estimates
        </p>
        <div className="grid grid-cols-2 gap-[20px]">
          {/* EPS Column */}
          <div className="flex flex-col gap-[4px]">
            <p className="font-['Delight:Regular',sans-serif] text-[12px] text-[rgba(0,0,0,0.7)]">
              EPS
            </p>
            <div className="flex items-baseline gap-[6px]">
              <p className="font-['Delight:Regular',sans-serif] text-[20px] text-[rgba(0,0,0,0.9)]">
                {formatEPS(data.epsActual!)}
              </p>
              <p className="font-['Delight:Regular',sans-serif] text-[13px] text-[#2a9b7d]">
                {formatSurprise(data.epsSurprise!)}
              </p>
            </div>
            <p className="font-['Delight:Regular',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)]">
              vs {formatEPS(data.epsEstimate!)}
            </p>
          </div>

          {/* Revenue Column */}
          <div className="flex flex-col gap-[4px]">
            <p className="font-['Delight:Regular',sans-serif] text-[12px] text-[rgba(0,0,0,0.7)]">
              Revenue
            </p>
            <div className="flex items-baseline gap-[6px]">
              <p className="font-['Delight:Regular',sans-serif] text-[20px] text-[rgba(0,0,0,0.9)]">
                {formatRevenue(data.revenueActual!)}
              </p>
              <p className="font-['Delight:Regular',sans-serif] text-[13px] text-[#2a9b7d]">
                {formatSurprise(data.revenueSurprise!)}
              </p>
            </div>
            <p className="font-['Delight:Regular',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)]">
              vs {formatRevenue(data.revenueEstimate!)}
            </p>
          </div>
        </div>
      </div>

      {/* Guidance Box - Two-column layout */}
      <div className="bg-white p-[16px] rounded-[6px]">
        <p className="font-['Delight:Medium',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)] uppercase tracking-[0.5px] mb-[8px]">
          Guidance ({data.guidanceType})
        </p>
        <div className="grid grid-cols-2 gap-[20px]">
          {/* EPS Column */}
          <div className="flex flex-col gap-[4px]">
            <p className="font-['Delight:Regular',sans-serif] text-[12px] text-[rgba(0,0,0,0.7)]">
              EPS
            </p>
            <p className="font-['Delight:Regular',sans-serif] text-[20px] text-[rgba(0,0,0,0.9)]">
              {formatEPS(data.guidanceEps!)}
            </p>
          </div>

          {/* Revenue Column */}
          <div className="flex flex-col gap-[4px]">
            <p className="font-['Delight:Regular',sans-serif] text-[12px] text-[rgba(0,0,0,0.7)]">
              Revenue
            </p>
            <p className="font-['Delight:Regular',sans-serif] text-[20px] text-[rgba(0,0,0,0.9)]">
              {formatRevenue(data.guidanceRevenue!)}
            </p>
          </div>
        </div>
      </div>

      {/* Beat Streak Box */}
      {data.beatStreak && (
        <div className="bg-white p-[16px] rounded-[6px]">
          <div className="flex items-center justify-between mb-[8px]">
            <p className="font-['Delight:Medium',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)] uppercase tracking-[0.5px]">
              Beat Streak
            </p>
            <p className="font-['Delight:Regular',sans-serif] text-[13px] text-[rgba(0,0,0,0.5)]">
              {data.beatStreak.filter(s => s === 'beat').length}/{data.beatStreak.length}
            </p>
          </div>
          <BeatStreak streak={data.beatStreak} />
        </div>
      )}

      <div className="mt-[8px] pt-[16px] border-t border-[rgba(0,0,0,0.05)] flex justify-center">
        <a
          href="#"
          className="font-['Delight:Regular',sans-serif] text-[13px] text-[#2196F3] hover:underline flex items-center gap-[4px]"
        >
          View Full Earnings Details
          <span>→</span>
        </a>
      </div>
    </div>
  );
}

export function EarningsDetailWidget() {
  const [mode, setMode] = useState<WidgetState>('upcoming');
  const data = mode === 'upcoming' ? mockUpcomingData : mockResultsData;

  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] h-full items-center min-h-px min-w-px relative rounded-[4px]">
      {/* Widget Title */}
      <div className="content-stretch flex gap-[12px] h-[22px] items-center relative shrink-0 w-full">
        <div className="content-stretch flex flex-[1_0_0] gap-[2px] items-center min-h-px min-w-px relative">
          <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">
            Earnings Detail
          </p>
        </div>

        {/* Toggle buttons for demo */}
        <div className="flex gap-[4px]">
          <button
            onClick={() => setMode('upcoming')}
            className="px-[8px] py-[2px] text-[11px] rounded-[3px] transition-colors"
            style={{
              backgroundColor: mode === 'upcoming' ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.03)',
              color: mode === 'upcoming' ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.5)'
            }}
          >
            Before
          </button>
          <button
            onClick={() => setMode('results')}
            className="px-[8px] py-[2px] text-[11px] rounded-[3px] transition-colors"
            style={{
              backgroundColor: mode === 'results' ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.03)',
              color: mode === 'results' ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.5)'
            }}
          >
            After
          </button>
        </div>

        <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
          <div className="relative shrink-0 size-[12px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
              <g clipPath="url(#clip0_earnings_detail)">
                <path
                  d="M6 0.6C8.98234 0.6 11.4 3.01766 11.4 6C11.4 8.98234 8.98234 11.4 6 11.4C3.01766 11.4 0.6 8.98234 0.6 6C0.6 3.01766 3.01766 0.6 6 0.6ZM6 1.2C3.34903 1.2 1.2 3.34903 1.2 6C1.2 8.65097 3.34903 10.8 6 10.8C8.65097 10.8 10.8 8.65097 10.8 6C10.8 3.34903 8.65097 1.2 6 1.2ZM6 3.50859C6.16569 3.50859 6.3 3.64291 6.3 3.80859V5.87578L7.71211 7.28789C7.82927 7.40505 7.82927 7.59495 7.71211 7.71211C7.59495 7.82927 7.40505 7.82927 7.28789 7.71211L5.78789 6.21211C5.73163 6.15585 5.7 6.07957 5.7 6V3.80859C5.7 3.64291 5.83431 3.50859 6 3.50859Z"
                  fill="var(--fill-0, black)"
                  fillOpacity="0.5"
                />
              </g>
              <defs>
                <clipPath id="clip0_earnings_detail">
                  <rect fill="white" height="12" width="12" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] whitespace-nowrap">
            <p className="leading-[20px]">02/13/2026 10:00</p>
          </div>
        </div>
      </div>

      {/* Widget Body */}
      <div
        className="flex-[1_0_0] min-h-px min-w-px relative rounded-[6px] w-full overflow-y-auto p-[20px]"
        style={{
          backgroundColor: '#fafafa',
        }}
      >
        <CompanyHeader data={data} />

        {mode === 'upcoming' ? (
          <UpcomingContent data={data} />
        ) : (
          <ResultsContent data={data} />
        )}
      </div>

      {/* Watermark - Fixed at page bottom-left */}
      <div className="fixed bottom-[16px] left-[244px] font-['Delight:Regular',sans-serif] text-[16px] font-semibold text-[rgba(0,0,0,1)] opacity-20 z-[9999] pointer-events-none">
        Alva
      </div>
    </div>
  );
}
