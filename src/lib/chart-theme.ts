/**
 * [INPUT]: 无外部依赖
 * [OUTPUT]: ECharts 共享配置 — 调色板、tooltip、轴、系列默认值
 * [POS]: 所有 Widget 图表的视觉语言统一层
 */

/* ========== 调色板 ========== */

export const CHART_COLORS = {
  primary: '#49A3A6',
  orange: '#FF9800',
  green: '#40A544',
  blue: '#5F75C9',
  red: '#E05357',
  yellow: '#E6A91A',
  deepBlue: '#3D8BD1',
} as const;

export const CHART_COLOR_PALETTE = [
  CHART_COLORS.primary,
  CHART_COLORS.orange,
  CHART_COLORS.green,
  CHART_COLORS.blue,
  CHART_COLORS.red,
  CHART_COLORS.yellow,
];

/**
 * 用户头像专用调色板（15 色）。
 * sum(charCodes) % 15 对以下全部已知用户保证零碰撞：
 * Alva Intern(9) · YGGYLL(7) · Harry Zzz(14) · Leo Leo(8)
 * Sheer YLL YGG(4) · Macro Scope X(1) · Smart Jing(13)
 */
export const AVATAR_COLOR_PALETTE = [
  '#49A3A6',  // 0  cyan / Alva primary
  '#FF9800',  // 1  orange
  '#40A544',  // 2  green1
  '#8FC13A',  // 3  green2
  '#3D8BD1',  // 4  blue1
  '#0D7498',  // 5  blue2
  '#5F75C9',  // 6  purple1
  '#7474D8',  // 7  purple2
  '#A878DC',  // 8  violet
  '#DC7AA5',  // 9  pink
  '#C76466',  // 10 red1
  '#E6A91A',  // 11 yellow
  '#E05357',  // 12 neg-red
  '#007949',  // 13 deep-green
  '#838383',  // 14 grey
];

/* ========== 字体 & 图表背景 ========== */

export const FONT = "'Delight', -apple-system, BlinkMacSystemFont, sans-serif";

/** 点阵背景：图表卡片通用底纹（不含 padding，由使用方按需叠加） */
export const CHART_DOT_BG = {
  backgroundColor: '#ffffff',
  backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.18) 0.6px, transparent 0.6px)',
  backgroundSize: '3px 3px',
} as const;

/* ========== Tooltip ========== */

export function tooltipConfig(overrides?: Record<string, unknown>) {
  return {
    trigger: 'axis' as const,
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderColor: 'rgba(0,0,0,0.08)',
    borderWidth: 1,
    padding: [12, 12, 12, 12],
    extraCssText: 'border-radius:6px;box-shadow:none;',
    textStyle: { fontFamily: FONT, fontSize: 12, fontWeight: 400 },
    axisPointer: {
      type: 'line' as const,
      lineStyle: { color: 'rgba(0,0,0,0.12)', type: 'solid' as const, width: 1 },
    },
    ...overrides,
  };
}

/** 标准 tooltip formatter：日期标题 + 彩点系列值 */
export function tooltipFormatter(
  params: { color: string; seriesName: string; data: [string, number] }[],
  valueSuffix = '',
) {
  if (!params.length) return '';
  const d = new Date(params[0].data[0]);
  const title = d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  let html = `<div style="font-family:${FONT};font-size:12px;color:rgba(0,0,0,0.7);margin-bottom:6px">${title}</div>`;
  params.forEach((p) => {
    const dot = `<span style="display:inline-block;margin-right:4px;border-radius:50%;width:8px;height:8px;background:${p.color};vertical-align:middle"></span>`;
    html += `<div style="font-family:${FONT};font-size:12px;color:rgba(0,0,0,0.9);line-height:20px">${dot}${p.seriesName}: ${valueSuffix}${p.data[1]}</div>`;
  });
  return html;
}

/* ========== 轴 ========== */

export function timeXAxisConfig(overrides?: Record<string, unknown>) {
  return {
    type: 'time' as const,
    boundaryGap: false,
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { show: false },
    axisLabel: { color: 'rgba(0,0,0,0.7)', fontFamily: FONT, fontSize: 10 },
    ...overrides,
  };
}

export function valueYAxisConfig(name: string, overrides?: Record<string, unknown>) {
  return {
    type: 'value' as const,
    name,
    nameTextStyle: {
      color: 'rgba(0,0,0,0.5)',
      fontFamily: FONT,
      fontSize: 10,
      align: 'left' as const,
      padding: [0, 0, 8, -24],
    },
    nameLocation: 'end' as const,
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { show: false },
    axisLabel: {
      color: 'rgba(0,0,0,0.7)',
      fontFamily: FONT,
      fontSize: 10,
      padding: [0, 8, 0, 0],
    },
    ...overrides,
  };
}

export const GRID_DEFAULT = { left: 36, right: 0, top: 30, bottom: 20, containLabel: false };

/* ========== 系列 ========== */

export function lineSeriesConfig(name: string, color: string, overrides?: Record<string, unknown>) {
  return {
    name,
    type: 'line' as const,
    symbol: 'circle',
    symbolSize: 10,
    showSymbol: false,
    smooth: 0.1,
    lineStyle: { width: 1, color },
    itemStyle: { color },
    emphasis: { itemStyle: { borderColor: '#ffffff', borderWidth: 1, color } },
    ...overrides,
  };
}

/** 零线虚线标记 */
export const ZERO_MARK_LINE = {
  silent: true,
  symbol: 'none',
  data: [{ yAxis: 0 }],
  lineStyle: { color: 'rgba(0,0,0,0.3)', type: [3, 2] as unknown as string, width: 1 },
  label: { show: false },
};

/* ========== 时间轴格式化器 ========== */

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

export function monthYearFormatter(value: number) {
  const d = new Date(value);
  return MONTHS[d.getMonth()] + ' ' + String(d.getFullYear()).slice(2);
}

export function dayOfWeekFormatter(value: number) {
  return DAYS[new Date(value).getDay()];
}
