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
 * 时钟图标，用于 Widget 标题时间戳
 */
export function ClockIcon() {
  return (
    <svg className="block size-[12px] shrink-0" fill="none" viewBox="0 0 12 12">
      <path
        d="M6 0.6C8.98234 0.6 11.4 3.01766 11.4 6C11.4 8.98234 8.98234 11.4 6 11.4C3.01766 11.4 0.6 8.98234 0.6 6C0.6 3.01766 3.01766 0.6 6 0.6ZM6 1.2C3.34903 1.2 1.2 3.34903 1.2 6C1.2 8.65097 3.34903 10.8 6 10.8C8.65097 10.8 10.8 8.65097 10.8 6C10.8 3.34903 8.65097 1.2 6 1.2ZM6 3.50859C6.16569 3.50859 6.3 3.64291 6.3 3.80859V5.87578L7.71211 7.28789C7.82927 7.40505 7.82927 7.59495 7.71211 7.71211C7.59495 7.82927 7.40505 7.82927 7.28789 7.71211L5.78789 6.21211C5.73163 6.15585 5.7 6.07957 5.7 6V3.80859C5.7 3.64291 5.83431 3.50859 6 3.50859Z"
        fill="rgba(0,0,0,0.5)"
      />
    </svg>
  );
}

/**
 * Widget 标题组件
 * 包含标题、箭头图标和时间戳
 * @param rightExtra - 时钟左侧的额外内容（如时间段切换按钮）
 * @param showArrow - 是否显示标题右侧箭头，默认 true
 */
interface WidgetTitleProps {
  title: string;
  timestamp?: string;
  href?: string;
  rightExtra?: React.ReactNode;
  showArrow?: boolean;
}

export function WidgetTitle({ title, timestamp = 'Live', href, rightExtra, showArrow = true }: WidgetTitleProps) {
  const ArrowIcon = () => (
    <svg className="block size-[14px] shrink-0" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
      <g id="arrow-right-l">
        <path d="M4.74411 11.6823L9.44637 6.98002L4.74411 2.27776C4.60743 2.14108 4.60743 1.91947 4.74411 1.78279C4.8808 1.6461 5.10241 1.6461 5.23909 1.78279L10.1888 6.73253C10.3255 6.86922 10.3255 7.09082 10.1888 7.22751L5.23909 12.1773C5.10241 12.3139 4.8808 12.3139 4.74411 12.1773C4.60743 12.0406 4.60743 11.819 4.74411 11.6823Z" fill="var(--fill-0, black)" fillOpacity="0.9" id="Vector" />
      </g>
    </svg>
  );

  return (
    <div className="flex gap-[12px] h-[22px] items-center w-full shrink-0">
      <div className="flex flex-1 gap-[2px] items-center min-w-0">
        {href ? (
          <a
            href={href}
            className="font-['Delight',sans-serif] text-[14px] text-[rgba(0,0,0,0.9)] leading-[22px] tracking-[0.14px] hover:text-primary transition-colors cursor-pointer"
          >
            {title}
          </a>
        ) : (
          <span className="font-['Delight',sans-serif] text-[14px] text-[rgba(0,0,0,0.9)] leading-[22px] tracking-[0.14px]">
            {title}
          </span>
        )}
        {showArrow && <ArrowIcon />}
      </div>
      <div className="flex gap-[4px] items-center">
        {rightExtra}
        <ClockIcon />
        <span className="font-['Delight',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)] leading-[20px] tracking-[0.12px]">
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
      <div className="bg-[rgba(0,0,0,0.02)] dark:bg-[rgba(255,255,255,0.02)] flex-1 w-full relative rounded-[6px] overflow-hidden">
        <div className="rounded-[inherit] size-full">
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
    <div className="absolute bottom-[16px] left-[16px] opacity-20 leading-[0] pointer-events-none">
      <svg
        width="56"
        height="14"
        viewBox="0 0 203 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M34.4683 0.398037C38.1368 -0.131394 41.8623 -0.13136 45.5308 0.398037C45.8246 0.440433 46.1201 0.487313 46.7095 0.58163C46.9059 0.613052 47.0043 0.628428 47.0924 0.648037C48.22 0.8993 49.1007 1.78021 49.3521 2.9078C49.3717 2.99586 49.3871 3.095 49.4185 3.29159C49.5128 3.88084 49.5607 4.17561 49.6031 4.46933C50.1325 8.13779 50.1325 11.8634 49.6031 15.5318C49.5607 15.8256 49.5128 16.1211 49.4185 16.7105C49.3871 16.9069 49.3717 17.0053 49.3521 17.0933C49.1008 18.221 48.22 19.1018 47.0924 19.3531C47.0043 19.3727 46.9059 19.3881 46.7095 19.4195C46.1201 19.5138 45.8246 19.5617 45.5308 19.6041C43.6969 19.8687 41.8487 19.9996 40.0006 19.9996V20.0006C29.1282 20.0008 20.281 28.6767 20.0064 39.483L20.0006 39.9996C20.0006 41.8484 19.8678 43.6972 19.6031 45.5318C19.5607 45.8256 19.5138 46.1211 19.4195 46.7105C19.3881 46.9069 19.3717 47.0053 19.3521 47.0933C19.1008 48.221 18.2201 49.1019 17.0924 49.3531C17.0044 49.3727 16.9059 49.3881 16.7095 49.4195C16.1202 49.5138 15.8256 49.5617 15.5318 49.6041C11.8632 50.1335 8.13697 50.1335 4.46833 49.6041C4.17469 49.5617 3.8798 49.5138 3.29059 49.4195C3.09418 49.3881 2.9958 49.3727 2.90778 49.3531C1.78008 49.1018 0.899336 48.221 0.648017 47.0933C0.628412 47.0053 0.613022 46.9069 0.581611 46.7105C0.487294 46.1211 0.439436 45.8256 0.39704 45.5318C-0.132337 41.8634 -0.132357 38.1378 0.39704 34.4693C0.439428 34.1756 0.487331 33.8808 0.581611 33.2916C0.613065 33.095 0.628398 32.9959 0.648017 32.9078C0.899399 31.7802 1.78012 30.8993 2.90778 30.648C2.99581 30.6284 3.09416 30.6131 3.29059 30.5816C3.87973 30.4874 4.17473 30.4404 4.46833 30.398C6.30274 30.1333 8.15189 30.0006 10.0006 30.0006V29.9986C20.9979 29.9982 29.9203 21.1224 29.9976 10.1432L29.9996 9.9996C29.9996 8.15142 30.1324 6.30326 30.397 4.46933C30.4394 4.17562 30.4864 3.88079 30.5806 3.29159C30.6121 3.095 30.6284 2.99586 30.648 2.9078C30.8994 1.78024 31.7801 0.899262 32.9078 0.648037C32.9957 0.628464 33.0943 0.613031 33.2906 0.58163C33.8799 0.487344 34.1746 0.440425 34.4683 0.398037Z"
          fill="#49A3A6"
        />
        <path
          d="M45.5322 30.397C41.8635 29.8676 38.1373 29.8676 34.4687 30.397C34.1749 30.4394 33.8803 30.4873 33.2909 30.5816C33.0946 30.613 32.9961 30.6284 32.9081 30.648C31.7804 30.8993 30.8997 31.7801 30.6484 32.9078C30.6288 32.9958 30.6124 33.0942 30.581 33.2906C30.4867 33.8801 30.4398 34.1755 30.3974 34.4693C29.868 38.1378 29.868 41.8633 30.3974 45.5318C30.4398 45.8255 30.4867 46.1204 30.581 46.7095C30.6124 46.9061 30.6287 47.0053 30.6484 47.0933C30.8998 48.2209 31.7805 49.1019 32.9081 49.3531C32.9961 49.3727 33.0946 49.3881 33.2909 49.4195C33.8802 49.5138 34.175 49.5607 34.4687 49.6031C38.1373 50.1325 41.8635 50.1325 45.5322 49.6031C45.8258 49.5607 46.1207 49.5138 46.7099 49.4195C46.9063 49.3881 47.0047 49.3727 47.0927 49.3531C48.2204 49.1019 49.1011 48.2209 49.3525 47.0933C49.3721 47.0053 49.3874 46.9061 49.4189 46.7095C49.5132 46.1203 49.5611 45.8255 49.6034 45.5318C50.1328 41.8633 50.1328 38.1378 49.6034 34.4693C49.5611 34.1755 49.5132 33.8801 49.4189 33.2906C49.3875 33.0943 49.3721 32.9958 49.3525 32.9078C49.1011 31.7801 48.2204 30.8993 47.0927 30.648C47.0047 30.6284 46.9063 30.6131 46.7099 30.5816C46.1206 30.4873 45.8258 30.4394 45.5322 30.397ZM15.5322 0.397047C11.8637 -0.132363 8.13812 -0.132335 4.46966 0.397047C4.17589 0.439443 3.88043 0.4873 3.29095 0.581617C3.09462 0.61303 2.99614 0.628418 2.90813 0.648024C1.78048 0.899332 0.899667 1.78013 0.648369 2.90779C0.628762 2.99579 0.613376 3.09426 0.581962 3.2906C0.487646 3.88008 0.439788 4.17554 0.397392 4.46931C-0.131981 8.13777 -0.132002 11.8634 0.397392 15.5318C0.439779 15.8255 0.487684 16.1203 0.581962 16.7095C0.613417 16.9061 0.62875 17.0053 0.648369 17.0933C0.899733 18.2209 1.78053 19.1018 2.90813 19.3531C2.99614 19.3727 3.0946 19.3881 3.29095 19.4195C3.88042 19.5138 4.17589 19.5607 4.46966 19.6031C8.13819 20.1325 11.8636 20.1325 15.5322 19.6031C15.8259 19.5607 16.1206 19.5138 16.7099 19.4195C16.9061 19.3881 17.0048 19.3727 17.0927 19.3531C18.2204 19.1019 19.1021 18.221 19.3534 17.0933C19.3731 17.0053 19.3884 16.9061 19.4199 16.7095C19.5141 16.1203 19.5611 15.8255 19.6034 15.5318C20.1329 11.8633 20.1328 8.13784 19.6034 4.46931C19.5611 4.17554 19.5142 3.88008 19.4199 3.2906C19.3884 3.09423 19.3731 2.9958 19.3534 2.90779C19.1022 1.78003 18.2205 0.899279 17.0927 0.648024C17.0048 0.628452 16.9061 0.613018 16.7099 0.581617C16.1206 0.487329 15.8259 0.439437 15.5322 0.397047Z"
          fill="black"
        />
        <path
          d="M184.032 10.4023C186.934 10.4023 189.528 10.7815 191.812 11.5391C194.108 12.2967 196.049 13.3916 197.634 14.8252C199.231 16.2588 200.448 18.0133 201.288 20.0879C202.127 22.1625 202.546 24.5113 202.546 27.1338V50.002H193.77V39.8965C193.315 41.6214 192.628 43.1775 191.708 44.5645C190.798 45.9398 189.685 47.1107 188.368 48.0781C187.051 49.0338 185.553 49.7684 183.875 50.2812C182.208 50.794 180.396 51.0508 178.438 51.0508C176.398 51.0508 174.539 50.7704 172.861 50.2109C171.194 49.6631 169.766 48.8881 168.578 47.8857C167.389 46.8834 166.468 45.6769 165.815 44.2666C165.174 42.8448 164.854 41.2716 164.854 39.5469C164.854 37.752 165.209 36.1436 165.92 34.7217C166.631 33.2999 167.651 32.0932 168.979 31.1025C170.319 30.1118 171.951 29.3536 173.875 28.8291C175.798 28.293 177.966 28.0254 180.378 28.0254H193.77V27.1338C193.77 25.677 193.543 24.3716 193.088 23.2178C192.634 22.0522 191.975 21.061 191.113 20.2451C190.262 19.4293 189.224 18.8062 188 18.375C186.777 17.9438 185.395 17.7275 183.857 17.7275C182.295 17.7276 180.937 17.9082 179.784 18.2695C178.642 18.6192 177.698 19.1208 176.952 19.7734C176.206 20.4261 175.652 21.213 175.291 22.1338C174.929 23.0544 174.749 24.0856 174.749 25.2275H165.99C165.99 22.955 166.41 20.9039 167.249 19.0742C168.088 17.2444 169.282 15.6883 170.833 14.4062C172.394 13.1126 174.288 12.1213 176.514 11.4336C178.752 10.746 181.258 10.4024 184.032 10.4023ZM108.882 50.0029H99.0923L95.1587 38.2363H73.5845L69.5815 50.0029H60.0005L77.938 0.000976562H91.1899L108.882 50.0029ZM121.173 50.0029H112.397V0.000976562H121.173V50.0029ZM144.812 44.5127L155.511 11.4521H164.48L151.088 50.002H138.326L125.056 11.4521H134.235L144.812 44.5127ZM180.885 34.1797C178.484 34.1797 176.666 34.5815 175.43 35.3857C174.207 36.19 173.595 37.3788 173.595 38.9521C173.595 40.6072 174.266 41.8779 175.606 42.7637C176.958 43.6376 178.904 44.0752 181.445 44.0752C183.24 44.0752 184.889 43.8589 186.392 43.4277C187.907 42.9848 189.208 42.3727 190.292 41.5918C191.387 40.811 192.237 39.8845 192.843 38.8125C193.461 37.7286 193.77 36.5507 193.77 35.2803V34.1797H180.885ZM76.2417 30.4043H92.5356L84.4419 6.24219L76.2417 30.4043Z"
          fill="black"
        />
      </svg>
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
