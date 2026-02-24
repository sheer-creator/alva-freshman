import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Legend,
  ChartOptions,
  Plugin
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { ddr4Data, ddr5Data } from './dramPriceData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Legend
);

// Custom plugin: draw "Price (USD)" above Y-axis + dashed zero line
const yAxisLabelPlugin: Plugin = {
  id: 'yAxisLabel',
  afterDraw(chart) {
    const yAxis = chart.scales.y;
    const xAxis = chart.scales.x;
    const ctx = chart.ctx;
    ctx.save();

    // Draw "Price (USD)" label 4px above the top tick ($80)
    const topTickY = yAxis.getPixelForValue(yAxis.max);
    ctx.font = "400 10px 'Delight', -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    // topTickY is center of "$80" text; move up half font (5px) + 4px gap
    ctx.fillText('Price (USD)', yAxis.left, topTickY - 5 - 8);

    // Draw dashed zero line (dash 3, gap 2)
    const zeroY = yAxis.getPixelForValue(0);
    if (zeroY >= yAxis.top && zeroY <= yAxis.bottom) {
      ctx.beginPath();
      ctx.setLineDash([3, 2]);
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.lineWidth = 1;
      ctx.moveTo(xAxis.left, zeroY);
      ctx.lineTo(xAxis.right, zeroY);
      ctx.stroke();
    }

    ctx.restore();
  }
};

export function DRAMPriceTrendWidget() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = (chartRef.current as any).chart;
      if (chart && !chart.config.plugins.some((p: any) => p.id === 'yAxisLabel')) {
        chart.config.plugins.push(yAxisLabelPlugin);
        chart.update();
      }
    }
  }, []);

  const data = {
    datasets: [
      {
        label: 'DDR5 16Gb',
        data: ddr5Data.map(d => ({ x: d[0], y: d[1] })),
        borderColor: '#49A3A6',
        backgroundColor: '#49A3A6',
        borderWidth: 1,
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#49A3A6',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 1,
        fill: false,
        order: 1,
      },
      {
        label: 'DDR4 16Gb',
        data: ddr4Data.map(d => ({ x: d[0], y: d[1] })),
        borderColor: '#FF9800',
        backgroundColor: '#FF9800',
        borderWidth: 1,
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#FF9800',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 1,
        fill: false,
        order: 2,
      }
    ]
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255,255,255,0.96)',
        titleColor: 'rgba(0,0,0,0.7)',
        bodyColor: 'rgba(0,0,0,0.9)',
        borderColor: 'rgba(0,0,0,0.08)',
        borderWidth: 1,
        cornerRadius: 6,
        caretSize: 0,
        padding: { top: 12, bottom: 12, left: 12, right: 12 },
        titleFont: {
          family: "'Delight', -apple-system, BlinkMacSystemFont, sans-serif",
          size: 12,
          weight: '400',
        },
        bodyFont: {
          family: "'Delight', -apple-system, BlinkMacSystemFont, sans-serif",
          size: 12,
          weight: '400',
        },
        displayColors: true,
        boxWidth: 8,
        boxHeight: 8,
        boxPadding: 4,
        usePointStyle: true,
        callbacks: {
          title: function(items) {
            if (items.length) {
              const d = new Date(items[0].parsed.x);
              return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
            }
            return '';
          },
          label: function(context) {
            return ' ' + context.dataset.label + ': $' + context.parsed.y.toFixed(2);
          }
        }
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
          displayFormats: {
            month: 'MMM yy'
          },
          tooltipFormat: 'MMM dd, yyyy',
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            family: "'Delight', -apple-system, BlinkMacSystemFont, sans-serif",
            size: 10,
            weight: '400',
          },
          color: 'rgba(0,0,0,0.7)',
          maxRotation: 0,
          autoSkipPadding: 20,
        },
      },
      y: {
        position: 'left',
        grid: {
          color: function(context) {
            if (context.tick.value === 0) {
              return 'rgba(0,0,0,0.12)';
            }
            return 'rgba(0,0,0,0)';
          },
          lineWidth: function(context) {
            return context.tick.value === 0 ? 1 : 0;
          },
          drawTicks: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            family: "'Delight', -apple-system, BlinkMacSystemFont, sans-serif",
            size: 10,
            weight: '400',
          },
          color: 'rgba(0,0,0,0.7)',
          padding: 8,
          callback: function(value) {
            return '$' + value;
          },
        },
        beginAtZero: true,
      }
    },
    layout: {
      padding: {
        top: 26,
        bottom: 0,
        left: 0,
        right: 0,
      }
    }
  };

  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] h-[370px] items-center min-h-px min-w-px relative rounded-[4px]">
      {/* Widget Title */}
      <div className="content-stretch flex gap-[12px] h-[22px] items-center relative shrink-0 w-full">
        <div className="content-stretch flex flex-[1_0_0] gap-[2px] items-center min-h-px min-w-px relative">
          <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">DRAM Price Trend</p>
        </div>
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
          <div className="relative shrink-0 size-[12px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
              <g clipPath="url(#clip0_dram)">
                <path d="M6 0.6C8.98234 0.6 11.4 3.01766 11.4 6C11.4 8.98234 8.98234 11.4 6 11.4C3.01766 11.4 0.6 8.98234 0.6 6C0.6 3.01766 3.01766 0.6 6 0.6ZM6 1.2C3.34903 1.2 1.2 3.34903 1.2 6C1.2 8.65097 3.34903 10.8 6 10.8C8.65097 10.8 10.8 8.65097 10.8 6C10.8 3.34903 8.65097 1.2 6 1.2ZM6 3.50859C6.16569 3.50859 6.3 3.64291 6.3 3.80859V5.87578L7.71211 7.28789C7.82927 7.40505 7.82927 7.59495 7.71211 7.71211C7.59495 7.82927 7.40505 7.82927 7.28789 7.71211L5.78789 6.21211C5.73163 6.15585 5.7 6.07957 5.7 6V3.80859C5.7 3.64291 5.83431 3.50859 6 3.50859Z" fill="black" fillOpacity="0.5" />
              </g>
              <defs>
                <clipPath id="clip0_dram">
                  <rect fill="white" height="12" width="12" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] whitespace-nowrap">
            <p className="leading-[20px]">02/12/2026 12:30</p>
          </div>
        </div>
      </div>

      {/* Chart Body */}
      <div
        className="flex-[1_0_0] min-h-px min-w-px relative rounded-[6px] w-full"
        style={{
          backgroundColor: '#ffffff',
          backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.18) 0.6px, transparent 0.6px)',
          backgroundSize: '3px 3px',
          padding: '16px'
        }}
      >
        {/* Legend */}
        <div className="content-stretch flex gap-[8px] h-[16px] items-center justify-end overflow-clip relative shrink-0 w-full z-[5] mb-[4px]">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
            <div className="bg-[#49A3A6] rounded-[100px] shrink-0 size-[8px]" />
            <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
              <p className="leading-[16px]">DDR5 16Gb</p>
            </div>
          </div>
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
            <div className="bg-[#FF9800] rounded-[100px] shrink-0 size-[8px]" />
            <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
              <p className="leading-[16px]">DDR4 16Gb</p>
            </div>
          </div>
        </div>
        {/* Chart Container */}
        <div style={{ width: '100%', height: 'calc(100% - 20px)', position: 'relative' }}>
          <Line ref={chartRef} data={data} options={options} plugins={[yAxisLabelPlugin]} />
        </div>
        {/* Watermark */}
        <div className="absolute bottom-[16px] left-[16px] font-['Delight:Regular',sans-serif] text-[16px] font-semibold text-[rgba(0,0,0,1)] opacity-20 z-[1]">
          Alva
        </div>
      </div>
    </div>
  );
}
