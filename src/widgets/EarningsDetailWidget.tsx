import React, { useState } from 'react';
import { WidgetTitle } from '@/app/components/alva-ui-kit';
import { TICKER_LOGO_CONFIG } from '@/lib/ticker-config';

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
  const config = TICKER_LOGO_CONFIG[data.ticker] ?? { bg: '#F5F5F5', text: '#666666' };

  return (
    <div className="flex items-start gap-[12px] mb-[20px]">
      {/* Logo */}
      <div
        className="flex items-center justify-center rounded-full shrink-0 size-[48px]"
        style={{ backgroundColor: config.bg }}
      >
        <p
          className="font-['Delight',sans-serif] font-medium text-[15px] font-semibold"
          style={{ color: config.text }}
        >
          {data.ticker}
        </p>
      </div>

      {/* Company Info */}
      <div className="flex-1 flex flex-col gap-[4px]">
        <div className="flex items-baseline gap-[6px]">
          <p className="font-['Delight',sans-serif] text-[18px] text-[rgba(0,0,0,0.9)]">
            {data.ticker}
          </p>
          <p className="font-['Delight',sans-serif] text-[15px] text-[rgba(0,0,0,0.9)]">
            {data.quarter || 'Q2 2026'}
          </p>
        </div>
        <p className="font-['Delight',sans-serif] text-[13px] text-[rgba(0,0,0,0.5)]">
          {data.company} · {data.earningsDate} {data.timeSlot}
        </p>
      </div>

      {/* Status Badge */}
      {data.daysUntil && (
        <div className="shrink-0">
          <p className="font-['Delight',sans-serif] text-[13px] text-[rgba(0,0,0,0.5)]">
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
      <p className="font-['Delight',sans-serif] font-medium text-[12px] text-[rgba(0,0,0,0.5)] uppercase tracking-[0.5px]">
        {title}
      </p>
      <div>{children}</div>
    </div>
  );
}

function MetricRow({ label, value, subValue }: { label: string; value: string; subValue?: string }) {
  return (
    <div className="flex items-baseline justify-between py-[6px]">
      <span className="font-['Delight',sans-serif] text-[13px] text-[rgba(0,0,0,0.7)]">
        {label}
      </span>
      <div className="flex items-baseline gap-[4px]">
        <span className="font-['Delight',sans-serif] font-medium text-[14px] text-[rgba(0,0,0,0.9)] font-medium">
          {value}
        </span>
        {subValue && (
          <span className="font-['Delight',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)]">
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
        <p className="font-['Delight',sans-serif] font-medium text-[12px] text-[rgba(0,0,0,0.5)] uppercase tracking-[0.5px] mb-[8px]">
          Earnings Date
        </p>
        <div className="flex items-baseline gap-[8px]">
          <span className="font-['Delight',sans-serif] text-[18px] text-[rgba(0,0,0,0.9)]">
            {data.earningsDate} {data.timeSlot}
          </span>
          <span className="font-['Delight',sans-serif] text-[13px] text-[rgba(0,0,0,0.5)]">
            {data.timeSlot === 'AMC' ? 'After Market Close' : 'Before Market Open'}
          </span>
        </div>
      </div>

      {/* Estimates Box - Two-column layout */}
      <div className="bg-white p-[16px] rounded-[6px]">
        <div className="grid grid-cols-2 gap-[20px]">
          {/* EPS Column */}
          <div className="flex flex-col gap-[4px]">
            <p className="font-['Delight',sans-serif] font-medium text-[12px] text-[rgba(0,0,0,0.5)] uppercase tracking-[0.5px]">
              EPS Est.
            </p>
            <p className="font-['Delight',sans-serif] text-[28px] text-[rgba(0,0,0,0.9)]">
              {formatEPS(data.epsEstimate!)}
            </p>
            {data.epsEstimateRange && (
              <p className="font-['Delight',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)]">
                Range: {formatEPS(data.epsEstimateRange[0])} - {formatEPS(data.epsEstimateRange[1])}
              </p>
            )}
          </div>

          {/* Revenue Column */}
          <div className="flex flex-col gap-[4px]">
            <p className="font-['Delight',sans-serif] font-medium text-[12px] text-[rgba(0,0,0,0.5)] uppercase tracking-[0.5px]">
              Revenue Est
            </p>
            <p className="font-['Delight',sans-serif] text-[28px] text-[rgba(0,0,0,0.9)]">
              {formatRevenue(data.revenueEstimate!)}
            </p>
            {data.revenueEstimateRange && (
              <p className="font-['Delight',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)]">
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
            <p className="font-['Delight',sans-serif] font-medium text-[12px] text-[rgba(0,0,0,0.5)] uppercase tracking-[0.5px]">
              Beat Streak
            </p>
            <p className="font-['Delight',sans-serif] text-[13px] text-[rgba(0,0,0,0.5)]">
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
        <p className="font-['Delight',sans-serif] font-medium text-[12px] text-[rgba(0,0,0,0.5)] uppercase tracking-[0.5px] mb-[8px]">
          Results vs Estimates
        </p>
        <div className="grid grid-cols-2 gap-[20px]">
          {/* EPS Column */}
          <div className="flex flex-col gap-[4px]">
            <p className="font-['Delight',sans-serif] text-[12px] text-[rgba(0,0,0,0.7)]">
              EPS
            </p>
            <div className="flex items-baseline gap-[6px]">
              <p className="font-['Delight',sans-serif] text-[20px] text-[rgba(0,0,0,0.9)]">
                {formatEPS(data.epsActual!)}
              </p>
              <p className="font-['Delight',sans-serif] text-[13px] text-[#2a9b7d]">
                {formatSurprise(data.epsSurprise!)}
              </p>
            </div>
            <p className="font-['Delight',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)]">
              vs {formatEPS(data.epsEstimate!)}
            </p>
          </div>

          {/* Revenue Column */}
          <div className="flex flex-col gap-[4px]">
            <p className="font-['Delight',sans-serif] text-[12px] text-[rgba(0,0,0,0.7)]">
              Revenue
            </p>
            <div className="flex items-baseline gap-[6px]">
              <p className="font-['Delight',sans-serif] text-[20px] text-[rgba(0,0,0,0.9)]">
                {formatRevenue(data.revenueActual!)}
              </p>
              <p className="font-['Delight',sans-serif] text-[13px] text-[#2a9b7d]">
                {formatSurprise(data.revenueSurprise!)}
              </p>
            </div>
            <p className="font-['Delight',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)]">
              vs {formatRevenue(data.revenueEstimate!)}
            </p>
          </div>
        </div>
      </div>

      {/* Guidance Box - Two-column layout */}
      <div className="bg-white p-[16px] rounded-[6px]">
        <p className="font-['Delight',sans-serif] font-medium text-[12px] text-[rgba(0,0,0,0.5)] uppercase tracking-[0.5px] mb-[8px]">
          Guidance ({data.guidanceType})
        </p>
        <div className="grid grid-cols-2 gap-[20px]">
          {/* EPS Column */}
          <div className="flex flex-col gap-[4px]">
            <p className="font-['Delight',sans-serif] text-[12px] text-[rgba(0,0,0,0.7)]">
              EPS
            </p>
            <p className="font-['Delight',sans-serif] text-[20px] text-[rgba(0,0,0,0.9)]">
              {formatEPS(data.guidanceEps!)}
            </p>
          </div>

          {/* Revenue Column */}
          <div className="flex flex-col gap-[4px]">
            <p className="font-['Delight',sans-serif] text-[12px] text-[rgba(0,0,0,0.7)]">
              Revenue
            </p>
            <p className="font-['Delight',sans-serif] text-[20px] text-[rgba(0,0,0,0.9)]">
              {formatRevenue(data.guidanceRevenue!)}
            </p>
          </div>
        </div>
      </div>

      {/* Beat Streak Box */}
      {data.beatStreak && (
        <div className="bg-white p-[16px] rounded-[6px]">
          <div className="flex items-center justify-between mb-[8px]">
            <p className="font-['Delight',sans-serif] font-medium text-[12px] text-[rgba(0,0,0,0.5)] uppercase tracking-[0.5px]">
              Beat Streak
            </p>
            <p className="font-['Delight',sans-serif] text-[13px] text-[rgba(0,0,0,0.5)]">
              {data.beatStreak.filter(s => s === 'beat').length}/{data.beatStreak.length}
            </p>
          </div>
          <BeatStreak streak={data.beatStreak} />
        </div>
      )}

      <div className="mt-[8px] pt-[16px] border-t border-[rgba(0,0,0,0.05)] flex justify-center">
        <a
          href="#"
          className="font-['Delight',sans-serif] text-[13px] text-[#2196F3] hover:underline flex items-center gap-[4px]"
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

  const modeButtons = (
    <div className="flex gap-[4px]">
      {(['upcoming', 'results'] as const).map((m) => (
        <button
          key={m}
          onClick={() => setMode(m)}
          className="px-[8px] py-[2px] text-[11px] rounded-[3px] transition-colors"
          style={{
            backgroundColor: mode === m ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.03)',
            color: mode === m ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.5)',
          }}
        >
          {m === 'upcoming' ? 'Before' : 'After'}
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-[16px] h-full min-w-px relative rounded-[4px]">
      <WidgetTitle
        title="Earnings Detail"
        timestamp="02/13/2026 10:00"
        showArrow={false}
        rightExtra={modeButtons}
      />

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

      <div className="absolute bottom-[16px] left-[16px] font-['Delight',sans-serif] text-[16px] font-medium text-[rgba(0,0,0,1)] opacity-20 z-[1] pointer-events-none">
        Alva
      </div>
    </div>
  );
}
