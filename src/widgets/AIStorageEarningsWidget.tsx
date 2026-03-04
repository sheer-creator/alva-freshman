import { useState } from 'react';
import { AlvaWatermark, WidgetTitle } from '@/app/components/alva-ui-kit';
import { TICKER_LOGO_CONFIG } from '@/lib/ticker-config';

type EarningsStatus = 'upcoming' | 'beat' | 'miss' | 'meet';

interface EarningsData {
  ticker: string;
  company: string;
  quarter: string;
  date: string;
  timeSlot?: 'AMC' | 'BMO'; // After Market Close / Before Market Open
  status: EarningsStatus;
  daysUntil?: number;
  hoursAgo?: number;
  daysAgo?: number;
  epsEstimate?: number;
  epsActual?: number;
  revenueEstimate?: number; // in billions
  revenueActual?: number; // in billions
  beatPercent?: number;
}

const mockData: EarningsData[] = [
  {
    ticker: 'MU',
    company: 'Micron Technology',
    quarter: 'Q1 2026',
    date: 'Feb 18',
    timeSlot: 'AMC',
    status: 'upcoming',
    daysUntil: 5,
    epsEstimate: 1.45,
    revenueEstimate: 8.2,
  },
  {
    ticker: 'WDC',
    company: 'Western Digital',
    quarter: 'Q4 2025',
    date: 'Feb 11',
    status: 'beat',
    hoursAgo: 18,
    epsEstimate: 2.10,
    epsActual: 2.32,
    revenueEstimate: 5.1,
    revenueActual: 5.4,
    beatPercent: 3.2,
  },
  {
    ticker: 'SNDK',
    company: 'SanDisk',
    quarter: 'Q1 2026',
    date: 'Feb 20',
    timeSlot: 'BMO',
    status: 'upcoming',
    daysUntil: 7,
    epsEstimate: 1.82,
    revenueEstimate: 6.5,
  },
  {
    ticker: 'STX',
    company: 'Seagate Technology',
    quarter: 'Q4 2025',
    date: 'Feb 10',
    status: 'miss',
    daysAgo: 3,
    epsEstimate: 1.95,
    epsActual: 1.88,
    revenueEstimate: 4.8,
    revenueActual: 4.6,
    beatPercent: -2.1,
  },
];

function CompanyLogo({ ticker }: { ticker: string }) {
  const config = TICKER_LOGO_CONFIG[ticker];

  return (
    <div
      className="flex items-center justify-center rounded-[8px] shrink-0 size-[40px]"
      style={{ backgroundColor: config.bg }}
    >
      <p
        className="font-['Delight',sans-serif] font-medium text-[13px] font-semibold"
        style={{ color: config.text }}
      >
        {ticker}
      </p>
    </div>
  );
}

function StatusBadge({ status, daysUntil, beatPercent }: { status: EarningsStatus; daysUntil?: number; beatPercent?: number }) {
  const getStatusConfig = () => {
    switch (status) {
      case 'upcoming':
        return {
          bg: 'rgba(0,0,0,0.05)',
          text: 'rgba(0,0,0,0.5)',
          label: daysUntil ? `In ${daysUntil} day${daysUntil > 1 ? 's' : ''}` : 'Upcoming',
        };
      case 'beat':
        return {
          bg: 'rgba(42,155,125,0.1)',
          text: '#2a9b7d',
          label: `Beat ${beatPercent && beatPercent > 0 ? `+${beatPercent.toFixed(1)}%` : ''}`,
        };
      case 'miss':
        return {
          bg: 'rgba(224,83,87,0.1)',
          text: '#e05357',
          label: `Miss ${beatPercent ? `${beatPercent.toFixed(1)}%` : ''}`,
        };
      case 'meet':
        return {
          bg: 'rgba(0,0,0,0.05)',
          text: 'rgba(0,0,0,0.7)',
          label: 'Meet',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div
      className="flex items-center px-[8px] py-[4px] rounded-[4px] shrink-0"
      style={{ backgroundColor: config.bg }}
    >
      <span className="font-['Delight',sans-serif] text-[12px] whitespace-nowrap" style={{ color: config.text }}>
        {config.label}
      </span>
    </div>
  );
}

function EarningsFeedItem({ data }: { data: EarningsData }) {
  const getTimeInfo = () => {
    if (data.status === 'upcoming') {
      return `${data.date} ${data.timeSlot || ''}`;
    }
    if (data.hoursAgo !== undefined) {
      return `${data.hoursAgo}h ago`;
    }
    if (data.daysAgo !== undefined) {
      return `${data.daysAgo}d ago`;
    }
    return data.date;
  };

  const formatCurrency = (value: number) => `$${value.toFixed(2)}B`;
  const formatEPS = (value: number) => `$${value.toFixed(2)}`;

  return (
    <div className="flex items-center gap-[12px] p-[12px] rounded-[6px] hover:bg-[rgba(0,0,0,0.02)] transition-colors">
      {/* Logo */}
      <CompanyLogo ticker={data.ticker} />

      {/* Content */}
      <div className="flex-1 flex flex-col gap-[4px] min-w-0">
        {/* Header */}
        <div className="flex items-center gap-[8px]">
          <p className="font-['Delight',sans-serif] font-medium text-[14px] text-[rgba(0,0,0,0.9)] font-medium">
            {data.ticker}
          </p>
          <p className="font-['Delight',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)]">
            {data.quarter}
          </p>
          <span className="text-[rgba(0,0,0,0.3)]">·</span>
          <p className="font-['Delight',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)]">
            {getTimeInfo()}
          </p>
        </div>

        {/* Metrics */}
        <div className="flex items-center gap-[16px]">
          {/* EPS */}
          <div className="flex items-center gap-[4px]">
            <span className="font-['Delight',sans-serif] text-[11px] text-[rgba(0,0,0,0.5)]">EPS</span>
            {data.status === 'upcoming' ? (
              <span className="font-['Delight',sans-serif] text-[12px] text-[rgba(0,0,0,0.7)]">
                Est {formatEPS(data.epsEstimate!)}
              </span>
            ) : (
              <span className="font-['Delight',sans-serif] text-[12px] text-[rgba(0,0,0,0.9)]">
                {formatEPS(data.epsActual!)}
                <span className="text-[rgba(0,0,0,0.5)] ml-[2px]">vs {formatEPS(data.epsEstimate!)}</span>
              </span>
            )}
          </div>

          {/* Revenue */}
          <div className="flex items-center gap-[4px]">
            <span className="font-['Delight',sans-serif] text-[11px] text-[rgba(0,0,0,0.5)]">Rev</span>
            {data.status === 'upcoming' ? (
              <span className="font-['Delight',sans-serif] text-[12px] text-[rgba(0,0,0,0.7)]">
                Est {formatCurrency(data.revenueEstimate!)}
              </span>
            ) : (
              <span className="font-['Delight',sans-serif] text-[12px] text-[rgba(0,0,0,0.9)]">
                {formatCurrency(data.revenueActual!)}
                <span className="text-[rgba(0,0,0,0.5)] ml-[2px]">vs {formatCurrency(data.revenueEstimate!)}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <StatusBadge status={data.status} daysUntil={data.daysUntil} beatPercent={data.beatPercent} />
    </div>
  );
}

export function AIStorageEarningsWidget() {
  return (
    <div className="flex flex-col gap-[16px] h-full min-w-px relative rounded-[4px]">
      <WidgetTitle title="AI Storage Earnings" timestamp="02/13/2026 10:00" showArrow={false} />

      {/* Feed Body */}
      <div
        className="flex-[1_0_0] min-h-px min-w-px relative rounded-[6px] w-full overflow-y-auto"
        style={{
          backgroundColor: '#fafafa',
          padding: '4px',
        }}
      >
        {/* Feed List */}
        <div className="flex flex-col">
          {mockData.map((data, index) => (
            <div key={index}>
              <EarningsFeedItem data={data} />
              {index < mockData.length - 1 && (
                <div className="h-[1px] bg-[rgba(0,0,0,0.05)] mx-[12px]" />
              )}
            </div>
          ))}
        </div>

        <AlvaWatermark />
      </div>
    </div>
  );
}
