import ReactECharts from 'echarts-for-react';

export function NVDAPriceVsSPYWidget() {
  // Mock data for past week (7 days)
  const nvdaData: [string, number][] = [
    ['2026-02-07', 85],
    ['2026-02-08', 88],
    ['2026-02-09', 92],
    ['2026-02-10', 90],
    ['2026-02-11', 95],
    ['2026-02-12', 93],
    ['2026-02-13', 98],
  ];

  const spyData: [string, number][] = [
    ['2026-02-07', 70],
    ['2026-02-08', 72],
    ['2026-02-09', 75],
    ['2026-02-10', 73],
    ['2026-02-11', 78],
    ['2026-02-12', 76],
    ['2026-02-13', 80],
  ];

  const option = {
    tooltip: {
      trigger: 'axis' as const,
      backgroundColor: 'rgba(255,255,255,0.96)',
      borderColor: 'rgba(0,0,0,0.08)',
      borderWidth: 1,
      padding: [12, 12, 12, 12],
      extraCssText: 'border-radius:6px;box-shadow:none;',
      textStyle: {
        fontFamily: "'Delight', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: 12,
        fontWeight: 400
      },
      axisPointer: {
        type: 'line' as const,
        lineStyle: { color: 'rgba(0,0,0,0.12)', type: 'solid' as const, width: 1 }
      },
      formatter: function(params: { color: string; seriesName: string; data: [string, number] }[]) {
        if (!params.length) return '';
        const d = new Date(params[0].data[0]);
        const title = d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        let html = `<div style="font-family:'Delight',-apple-system,BlinkMacSystemFont,sans-serif;font-size:12px;font-weight:400;color:rgba(0,0,0,0.7);margin-bottom:6px">${title}</div>`;
        params.forEach((p) => {
          const dot = `<span style="display:inline-block;margin-right:4px;border-radius:50%;width:8px;height:8px;background-color:${p.color};vertical-align:middle"></span>`;
          html += `<div style="font-family:'Delight',-apple-system,BlinkMacSystemFont,sans-serif;font-size:12px;font-weight:400;color:rgba(0,0,0,0.9);line-height:20px">${dot}${p.seriesName}: ${p.data[1]}</div>`;
        });
        return html;
      }
    },
    legend: { show: false },
    grid: {
      left: 36,
      right: 0,
      top: 30,
      bottom: 20,
      containLabel: false
    },
    xAxis: {
      type: 'time' as const,
      boundaryGap: false,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.7)',
        fontFamily: "'Delight', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: 10,
        formatter: function(value: number) {
          const d = new Date(value);
          const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          return days[d.getDay()];
        }
      },
      min: '2026-02-07',
      max: '2026-02-13',
    },
    yAxis: {
      type: 'value' as const,
      name: 'Price Index',
      nameTextStyle: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontFamily: "'Delight', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: 10,
        align: 'left' as const,
        padding: [0, 0, 8, -24]
      },
      nameLocation: 'end' as const,
      min: 0,
      max: 100,
      interval: 25,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.7)',
        fontFamily: "'Delight', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: 10,
        padding: [0, 8, 0, 0],
        formatter: '{value}'
      }
    },
    series: [
      {
        name: 'NVDA',
        type: 'line' as const,
        data: nvdaData,
        symbol: 'circle',
        symbolSize: 10,
        showSymbol: false,
        smooth: 0.1,
        lineStyle: { width: 1, color: '#49A3A6' },
        itemStyle: { color: '#49A3A6' },
        emphasis: {
          itemStyle: {
            borderColor: '#ffffff',
            borderWidth: 1,
            color: '#49A3A6'
          }
        },
        markLine: {
          silent: true,
          symbol: 'none',
          data: [{ yAxis: 0 }],
          lineStyle: {
            color: 'rgba(0,0,0,0.3)',
            type: [3, 2] as any,
            width: 1
          },
          label: { show: false }
        }
      },
      {
        name: 'SPY',
        type: 'line' as const,
        data: spyData,
        symbol: 'circle',
        symbolSize: 10,
        showSymbol: false,
        smooth: 0.1,
        lineStyle: { width: 1, color: '#3D8BD1' },
        itemStyle: { color: '#3D8BD1' },
        emphasis: {
          itemStyle: {
            borderColor: '#ffffff',
            borderWidth: 1,
            color: '#3D8BD1'
          }
        }
      }
    ]
  };

  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] h-[370px] items-center min-h-px min-w-px relative rounded-[4px]">
      {/* Widget Title */}
      <div className="content-stretch flex gap-[12px] h-[22px] items-center relative shrink-0 w-full">
        <div className="content-stretch flex flex-[1_0_0] gap-[2px] items-center min-h-px min-w-px relative">
          <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">NVDA Price VS SPY</p>
        </div>
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
          <div className="relative shrink-0 size-[12px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
              <g clipPath="url(#clip0_nvda_spy)" id="clock-l">
                <path d="M6 0.6C8.98234 0.6 11.4 3.01766 11.4 6C11.4 8.98234 8.98234 11.4 6 11.4C3.01766 11.4 0.6 8.98234 0.6 6C0.6 3.01766 3.01766 0.6 6 0.6ZM6 1.2C3.34903 1.2 1.2 3.34903 1.2 6C1.2 8.65097 3.34903 10.8 6 10.8C8.65097 10.8 10.8 8.65097 10.8 6C10.8 3.34903 8.65097 1.2 6 1.2ZM6 3.50859C6.16569 3.50859 6.3 3.64291 6.3 3.80859V5.87578L7.71211 7.28789C7.82927 7.40505 7.82927 7.59495 7.71211 7.71211C7.59495 7.82927 7.40505 7.82927 7.28789 7.71211L5.78789 6.21211C5.73163 6.15585 5.7 6.07957 5.7 6V3.80859C5.7 3.64291 5.83431 3.50859 6 3.50859Z" fill="var(--fill-0, black)" fillOpacity="0.5" />
              </g>
              <defs>
                <clipPath id="clip0_nvda_spy">
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
              <p className="leading-[16px]">NVDA</p>
            </div>
          </div>
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
            <div className="bg-[#3D8BD1] rounded-[100px] shrink-0 size-[8px]" />
            <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
              <p className="leading-[16px]">SPY</p>
            </div>
          </div>
        </div>
        <div style={{ width: '100%', height: 'calc(100% - 20px)', position: 'relative' }}>
          <ReactECharts
            option={option}
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
        </div>
        {/* Watermark */}
        <div className="absolute bottom-[16px] left-[16px] font-['Delight:Regular',sans-serif] text-[16px] font-semibold text-[rgba(0,0,0,1)] opacity-20 z-[1]">
          Alva
        </div>
      </div>
    </div>
  );
}
