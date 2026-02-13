/**
 * Alva UI Kit - 可复用的设计系统组件库
 * 基于Alva金融交易平台的设计系统
 * 所有组件使用CSS变量，支持浅色/深色主题
 */

import React from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';

// ============================================================================
// 基础UI组件
// ============================================================================

/**
 * 按钮组件
 * 支持多种变体：primary, secondary, outline, ghost, destructive
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 transition-colors font-[Delight,sans-serif] disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-primary text-primary-foreground hover:opacity-90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-muted',
    outline: 'border border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground',
    ghost: 'bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground',
    destructive: 'bg-destructive text-destructive-foreground hover:opacity-90'
  };
  
  const sizeStyles = {
    sm: 'h-8 px-3 text-[12px] rounded-[4px]',
    md: 'h-10 px-4 text-[14px] rounded-[var(--radius-button)]',
    lg: 'h-12 px-6 text-[16px] rounded-[var(--radius-button)]'
  };
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * 卡片组件
 * 用于内容容器
 */
interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ children, className = '', padding = 'md' }: CardProps) {
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };
  
  return (
    <div className={`bg-card text-card-foreground rounded-[var(--radius-card)] shadow-[var(--elevation-sm)] ${paddingStyles[padding]} ${className}`}>
      {children}
    </div>
  );
}

/**
 * 输入框组件
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-[14px] font-[Delight,sans-serif] text-foreground">
          {label}
        </label>
      )}
      <input
        className={`h-10 w-full rounded-[var(--radius)] border border-border bg-input-background px-3 py-2 text-[16px] font-[Delight,sans-serif] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      />
      {error && (
        <span className="text-[12px] font-[Delight,sans-serif] text-destructive">
          {error}
        </span>
      )}
    </div>
  );
}

/**
 * 徽章组件
 * 用于标签、状态指示等
 */
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'destructive' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variantStyles = {
    default: 'bg-muted text-foreground border-border',
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground border-border',
    destructive: 'bg-destructive text-destructive-foreground',
    outline: 'bg-transparent text-foreground border-border'
  };
  
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[12px] font-[Delight,sans-serif] transition-colors ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}

// ============================================================================
// Dashboard Widget 组件
// ============================================================================

/**
 * Widget 标题组件
 * 包含标题、箭头图标和时间戳
 */
interface WidgetTitleProps {
  title: string;
  timestamp?: string;
  href?: string;
}

export function WidgetTitle({ title, timestamp = 'Live', href }: WidgetTitleProps) {
  const ArrowIcon = () => (
    <svg className="block size-[14px] shrink-0" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
      <path d="M3.5 7h7m0 0L7 3.5M10.5 7L7 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const ClockIcon = () => (
    <svg className="block size-[12px] shrink-0" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
      <path d="M6 3v3l2 1m4-4a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div className="flex gap-3 h-[22px] items-center w-full">
      <div className="flex flex-1 gap-0.5 items-center min-w-0">
        {href ? (
          <a 
            href={href}
            className="font-[Delight,sans-serif] text-[14px] text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            {title}
          </a>
        ) : (
          <span className="font-[Delight,sans-serif] text-[14px] text-foreground">
            {title}
          </span>
        )}
        <ArrowIcon />
      </div>
      <div className="flex gap-1 items-center">
        <ClockIcon />
        <span className="font-[Delight,sans-serif] text-[12px] text-muted-foreground">
          {timestamp}
        </span>
      </div>
    </div>
  );
}

/**
 * Widget 容器组件
 * 提供统一的widget外观
 */
interface WidgetContainerProps {
  title: string;
  timestamp?: string;
  href?: string;
  height?: number | string;
  children: React.ReactNode;
  className?: string;
}

export function WidgetContainer({ 
  title, 
  timestamp, 
  href, 
  height = 370, 
  children, 
  className = '' 
}: WidgetContainerProps) {
  return (
    <div 
      className={`flex flex-col gap-4 items-center rounded ${className}`}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    >
      <WidgetTitle title={title} timestamp={timestamp} href={href} />
      <div className="bg-[rgba(0,0,0,0.02)] dark:bg-[rgba(255,255,255,0.02)] flex-1 w-full relative rounded-[6px]">
        <div className="overflow-clip rounded-[inherit] size-full">
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Alva Logo 水印组件
 * 用于图表等内容的品牌标识
 */
export function AlvaWatermark() {
  return (
    <div className="absolute bottom-0 left-0 pb-4 pl-4 z-[1]">
      <div className="h-[14px] opacity-20 w-[56px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="xMinYMin meet" viewBox="0 0 56 14">
          <text x="0" y="12" className="font-[Delight,sans-serif] text-[10px] fill-current">
            ALVA
          </text>
        </svg>
      </div>
    </div>
  );
}

// ============================================================================
// 图表组件
// ============================================================================

/**
 * 热力图组件
 * 基于ECharts的热力图可视化
 */
interface HeatmapData {
  xLabels: string[];
  yLabels: string[];
  data: [number, number, number][]; // [x index, y index, value]
}

interface HeatmapWidgetProps {
  title: string;
  timestamp?: string;
  href?: string;
  data: HeatmapData;
  colorRange?: [string, string, string, string, string];
  valueRange?: [number, number];
  height?: number;
  className?: string;
}

export function HeatmapWidget({ 
  title, 
  timestamp, 
  href, 
  data, 
  colorRange = [
    'rgba(73, 163, 166, 0.1)',
    'rgba(73, 163, 166, 0.3)',
    'rgba(73, 163, 166, 0.5)',
    'rgba(73, 163, 166, 0.7)',
    'rgba(73, 163, 166, 1)'
  ],
  valueRange = [0, 100],
  height = 370,
  className = ''
}: HeatmapWidgetProps) {
  const option: EChartsOption = {
    tooltip: {
      position: 'top',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: 'rgba(0, 0, 0, 0.3)',
      borderWidth: 1,
      textStyle: {
        color: 'rgba(0, 0, 0, 0.9)',
        fontFamily: 'Delight, sans-serif',
        fontSize: 11
      },
      formatter: (params: any) => {
        return `${data.yLabels[params.data[1]]}, ${data.xLabels[params.data[0]]}<br/><strong>${params.data[2]}${valueRange[1] > 10 ? '%' : ''}</strong>`;
      }
    },
    grid: {
      left: 50,
      top: 20,
      right: 20,
      bottom: 50,
      containLabel: false
    },
    xAxis: {
      type: 'category',
      data: data.xLabels,
      splitArea: {
        show: true
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontFamily: 'Delight, sans-serif',
        fontSize: 9
      }
    },
    yAxis: {
      type: 'category',
      data: data.yLabels,
      splitArea: {
        show: true
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontFamily: 'Delight, sans-serif',
        fontSize: 10
      }
    },
    visualMap: {
      min: valueRange[0],
      max: valueRange[1],
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: 5,
      textStyle: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontFamily: 'Delight, sans-serif',
        fontSize: 9
      },
      inRange: {
        color: colorRange
      }
    },
    series: [
      {
        name: title,
        type: 'heatmap',
        data: data.data,
        label: {
          show: false
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 8,
            shadowColor: 'rgba(73, 163, 166, 0.4)',
            borderColor: 'rgba(73, 163, 166, 1)',
            borderWidth: 1
          }
        }
      }
    ]
  };

  return (
    <WidgetContainer 
      title={title} 
      timestamp={timestamp} 
      href={href} 
      height={height}
      className={className}
    >
      <div className="relative size-full p-4">
        <ReactECharts 
          option={option} 
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
        <AlvaWatermark />
      </div>
    </WidgetContainer>
  );
}

/**
 * 折线图组件
 */
interface LineChartData {
  xData: string[];
  series: {
    name: string;
    data: number[];
    color?: string;
  }[];
}

interface LineChartWidgetProps {
  title: string;
  timestamp?: string;
  href?: string;
  data: LineChartData;
  height?: number;
  className?: string;
  showLegend?: boolean;
}

export function LineChartWidget({ 
  title, 
  timestamp, 
  href, 
  data, 
  height = 370,
  className = '',
  showLegend = true
}: LineChartWidgetProps) {
  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: 'rgba(0, 0, 0, 0.3)',
      borderWidth: 1,
      textStyle: {
        color: 'rgba(0, 0, 0, 0.9)',
        fontFamily: 'Delight, sans-serif',
        fontSize: 11
      }
    },
    legend: showLegend ? {
      top: 5,
      left: 'center',
      textStyle: {
        color: 'rgba(0, 0, 0, 0.7)',
        fontFamily: 'Delight, sans-serif',
        fontSize: 11
      }
    } : undefined,
    grid: {
      left: 50,
      right: 30,
      top: showLegend ? 40 : 20,
      bottom: 40,
      containLabel: false
    },
    xAxis: {
      type: 'category',
      data: data.xData,
      axisLine: {
        lineStyle: {
          color: 'rgba(0, 0, 0, 0.2)'
        }
      },
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontFamily: 'Delight, sans-serif',
        fontSize: 10
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(0, 0, 0, 0.1)',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontFamily: 'Delight, sans-serif',
        fontSize: 10
      }
    },
    series: data.series.map((s, idx) => ({
      name: s.name,
      type: 'line',
      data: s.data,
      smooth: true,
      itemStyle: {
        color: s.color || `var(--chart-${(idx % 5) + 1})`
      },
      lineStyle: {
        width: 2
      }
    }))
  };

  return (
    <WidgetContainer 
      title={title} 
      timestamp={timestamp} 
      href={href} 
      height={height}
      className={className}
    >
      <div className="relative size-full p-4">
        <ReactECharts 
          option={option} 
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
        <AlvaWatermark />
      </div>
    </WidgetContainer>
  );
}

/**
 * 柱状图组件
 */
interface BarChartData {
  xData: string[];
  series: {
    name: string;
    data: number[];
    color?: string;
  }[];
}

interface BarChartWidgetProps {
  title: string;
  timestamp?: string;
  href?: string;
  data: BarChartData;
  height?: number;
  className?: string;
  showLegend?: boolean;
  horizontal?: boolean;
}

export function BarChartWidget({ 
  title, 
  timestamp, 
  href, 
  data, 
  height = 370,
  className = '',
  showLegend = true,
  horizontal = false
}: BarChartWidgetProps) {
  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: 'rgba(0, 0, 0, 0.3)',
      borderWidth: 1,
      textStyle: {
        color: 'rgba(0, 0, 0, 0.9)',
        fontFamily: 'Delight, sans-serif',
        fontSize: 11
      }
    },
    legend: showLegend ? {
      top: 5,
      left: 'center',
      textStyle: {
        color: 'rgba(0, 0, 0, 0.7)',
        fontFamily: 'Delight, sans-serif',
        fontSize: 11
      }
    } : undefined,
    grid: {
      left: horizontal ? 80 : 50,
      right: 30,
      top: showLegend ? 40 : 20,
      bottom: 40,
      containLabel: false
    },
    xAxis: {
      type: horizontal ? 'value' : 'category',
      data: horizontal ? undefined : data.xData,
      axisLine: {
        lineStyle: {
          color: 'rgba(0, 0, 0, 0.2)'
        }
      },
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontFamily: 'Delight, sans-serif',
        fontSize: 10
      }
    },
    yAxis: {
      type: horizontal ? 'category' : 'value',
      data: horizontal ? data.xData : undefined,
      axisLine: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(0, 0, 0, 0.1)',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontFamily: 'Delight, sans-serif',
        fontSize: 10
      }
    },
    series: data.series.map((s, idx) => ({
      name: s.name,
      type: 'bar',
      data: s.data,
      itemStyle: {
        color: s.color || `var(--chart-${(idx % 5) + 1})`,
        borderRadius: [4, 4, 0, 0]
      }
    }))
  };

  return (
    <WidgetContainer 
      title={title} 
      timestamp={timestamp} 
      href={href} 
      height={height}
      className={className}
    >
      <div className="relative size-full p-4">
        <ReactECharts 
          option={option} 
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
        <AlvaWatermark />
      </div>
    </WidgetContainer>
  );
}

// ============================================================================
// 数据展示组件
// ============================================================================

/**
 * 统计卡片组件
 * 用于展示关键指标
 */
interface StatCardProps {
  label: string;
  value: string | number;
  change?: {
    value: number;
    trend: 'up' | 'down' | 'neutral';
  };
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({ label, value, change, icon, className = '' }: StatCardProps) {
  const trendColors = {
    up: 'text-[rgba(42,155,125,1)]',
    down: 'text-destructive',
    neutral: 'text-muted-foreground'
  };

  const trendIcons = {
    up: '↑',
    down: '↓',
    neutral: '→'
  };

  return (
    <Card className={className}>
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-[14px] font-[Delight,sans-serif] text-muted-foreground">
            {label}
          </p>
          <p className="text-[24px] font-[Delight,sans-serif] font-medium text-foreground">
            {value}
          </p>
          {change && (
            <div className={`flex items-center gap-1 text-[12px] font-[Delight,sans-serif] ${trendColors[change.trend]}`}>
              <span>{trendIcons[change.trend]}</span>
              <span>{Math.abs(change.value)}%</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="text-primary opacity-50">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

/**
 * 表格组件
 * 简单的数据表格
 */
interface TableColumn {
  key: string;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface TableProps {
  columns: TableColumn[];
  data: Record<string, any>[];
  className?: string;
}

export function Table({ columns, data, className = '' }: TableProps) {
  return (
    <div className={`w-full overflow-auto ${className}`}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`py-3 px-4 text-${col.align || 'left'} text-[14px] font-[Delight,sans-serif] font-medium text-muted-foreground`}
                style={{ width: col.width }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b border-border last:border-0 hover:bg-muted transition-colors">
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`py-3 px-4 text-${col.align || 'left'} text-[14px] font-[Delight,sans-serif] text-foreground`}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================================
// 工具函数
// ============================================================================

/**
 * 生成热力图示例数据
 */
export function generateHeatmapSampleData(
  xLabels: string[],
  yLabels: string[],
  minValue: number = 0,
  maxValue: number = 100
): HeatmapData {
  const data: [number, number, number][] = [];
  
  yLabels.forEach((_, yIdx) => {
    xLabels.forEach((_, xIdx) => {
      const value = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      data.push([xIdx, yIdx, value]);
    });
  });
  
  return { xLabels, yLabels, data };
}

/**
 * 生成折线图示例数据
 */
export function generateLineChartSampleData(
  xLabels: string[],
  seriesCount: number = 1,
  seriesNames?: string[]
): LineChartData {
  const series = Array.from({ length: seriesCount }, (_, idx) => ({
    name: seriesNames?.[idx] || `Series ${idx + 1}`,
    data: xLabels.map(() => Math.floor(Math.random() * 100))
  }));
  
  return { xData: xLabels, series };
}

/**
 * 格式化数字
 */
export function formatNumber(num: number, decimals: number = 2): string {
  return num.toFixed(decimals);
}

/**
 * 格式化百分比
 */
export function formatPercentage(num: number, decimals: number = 2): string {
  return `${(num * 100).toFixed(decimals)}%`;
}

/**
 * 格式化货币
 */
export function formatCurrency(num: number, currency: string = '$'): string {
  return `${currency}${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
