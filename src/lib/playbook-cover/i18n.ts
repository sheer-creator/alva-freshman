// i18n.ts — locale-aware data + helpers for cover content.
//
// Scope: only the strings the skill itself produces. User-supplied input
// (title / subtitle / kind / anchor / series) stays as-is — the caller
// passes already-localized text. The skill translates:
//   - Category labels (RISK / CATALYST / AMBIGUOUS as canonical keys)
//   - Default fallbacks when caller doesn't supply (e.g., screener label)
//   - Font stack per locale (Delight + CJK fallback chain)
//   - Width estimation (CJK ≈ 1× fontSize, Latin ≈ 0.55× fontSize)
//   - splitDelta separator priority list (CJK adds 、，：；)

export type Locale = "en" | "zh-CN" | "zh-TW" | "ja-JP" | "ko-KR";
export type Direction = "ltr" | "rtl";

export const SUPPORTED_LOCALES: readonly Locale[] = ["en", "zh-CN", "zh-TW", "ja-JP", "ko-KR"];

const CJK_LOCALES: ReadonlySet<Locale> = new Set(["zh-CN", "zh-TW", "ja-JP", "ko-KR"]);

export function isCJKLocale(locale: Locale): boolean {
  return CJK_LOCALES.has(locale);
}

export function directionFor(_locale: Locale): Direction {
  // All currently supported locales are LTR. Reserved for future RTL
  // (Arabic / Hebrew). Renderer can read output.direction directly.
  return "ltr";
}

// ---------- Category labels ----------

export type CategoryKey = "RISK" | "CATALYST" | "AMBIGUOUS";

export const CATEGORY_LABELS: Record<Locale, Record<CategoryKey, string>> = {
  "en":    { RISK: "RISK",     CATALYST: "CATALYST", AMBIGUOUS: "AMBIGUOUS" },
  "zh-CN": { RISK: "风险",      CATALYST: "催化",      AMBIGUOUS: "不明朗" },
  "zh-TW": { RISK: "風險",      CATALYST: "催化",      AMBIGUOUS: "不明朗" },
  "ja-JP": { RISK: "リスク",    CATALYST: "カタリスト", AMBIGUOUS: "不透明" },
  "ko-KR": { RISK: "리스크",    CATALYST: "촉매",      AMBIGUOUS: "불확실" },
};

/** Translate a canonical category key to the locale's display string. */
export function localizeCategory(category: CategoryKey, locale: Locale): string {
  return CATEGORY_LABELS[locale]?.[category] ?? CATEGORY_LABELS.en[category];
}

// ---------- Default-fallback labels ----------

export type DefaultLabels = {
  screenerSeries: string;       // e.g. "SCORED · DAILY · 6H"
  thesisLabelPrefix: string;    // "TODAY'S DELTA"
  thesisAnchorTBD: string;      // "TBD"
  whatIfLabel: string;          // generic "EVENT STUDY · 5×"
  generalKind: string;          // "CONTEXT FEED · DAILY"
};

export const DEFAULT_LABELS: Record<Locale, DefaultLabels> = {
  "en": {
    screenerSeries:    "SCORED · DAILY · 6H",
    thesisLabelPrefix: "TODAY'S DELTA",
    thesisAnchorTBD:   "TBD",
    whatIfLabel:       "EVENT STUDY · 5×",
    generalKind:       "CONTEXT FEED · DAILY",
  },
  "zh-CN": {
    screenerSeries:    "评分 · 日 · 6小时",
    thesisLabelPrefix: "今日变化",
    thesisAnchorTBD:   "待定",
    whatIfLabel:       "事件研究 · 5×",
    generalKind:       "情境信息流 · 每日",
  },
  "zh-TW": {
    screenerSeries:    "評分 · 日 · 6小時",
    thesisLabelPrefix: "今日變化",
    thesisAnchorTBD:   "待定",
    whatIfLabel:       "事件研究 · 5×",
    generalKind:       "情境資訊流 · 每日",
  },
  "ja-JP": {
    screenerSeries:    "スコア · 日次 · 6時間",
    thesisLabelPrefix: "本日の変化",
    thesisAnchorTBD:   "未定",
    whatIfLabel:       "イベント分析 · 5×",
    generalKind:       "コンテキスト · デイリー",
  },
  "ko-KR": {
    screenerSeries:    "점수 · 일별 · 6시간",
    thesisLabelPrefix: "오늘의 변화",
    thesisAnchorTBD:   "미정",
    whatIfLabel:       "이벤트 분석 · 5×",
    generalKind:       "콘텍스트 피드 · 일일",
  },
};

// ---------- Font stacks ----------

export type FontStack = {
  /** Primary (Alva-branded) face. Renderer should request this first. */
  primary: string;
  /** Fallbacks tried in order — system fonts that have CJK glyphs. */
  fallbacks: string[];
};

export type FontConfig = {
  cover:    FontStack;
  metadata: FontStack;
};

const COMMON_LATIN_FALLBACKS  = ["-apple-system", "system-ui", "Segoe UI", "Helvetica", "Arial", "sans-serif"];
const COMMON_CJK_SC_FALLBACKS = ["PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Source Han Sans SC", "Noto Sans CJK SC", "sans-serif"];
const COMMON_CJK_TC_FALLBACKS = ["PingFang TC", "Hiragino Sans CNS", "Microsoft JhengHei", "Source Han Sans TC", "Noto Sans CJK TC", "sans-serif"];
const COMMON_JP_FALLBACKS     = ["Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic", "Meiryo", "Source Han Sans JP", "Noto Sans CJK JP", "sans-serif"];
const COMMON_KR_FALLBACKS     = ["Apple SD Gothic Neo", "Malgun Gothic", "Source Han Sans KR", "Noto Sans CJK KR", "sans-serif"];

const FALLBACK_BY_LOCALE: Record<Locale, string[]> = {
  "en":    COMMON_LATIN_FALLBACKS,
  "zh-CN": COMMON_CJK_SC_FALLBACKS,
  "zh-TW": COMMON_CJK_TC_FALLBACKS,
  "ja-JP": COMMON_JP_FALLBACKS,
  "ko-KR": COMMON_KR_FALLBACKS,
};

/**
 * Cover face stack. Delight is the Alva display face for Latin; CJK falls
 * through to the system CJK font (Delight has no CJK glyphs).
 */
export function getCoverFontStack(locale: Locale): FontStack {
  return {
    primary: "Delight",
    fallbacks: FALLBACK_BY_LOCALE[locale] ?? COMMON_LATIN_FALLBACKS,
  };
}

/** Metadata frame face stack — Inter primary + locale-appropriate CJK fallback. */
export function getMetadataFontStack(locale: Locale): FontStack {
  return {
    primary: "Inter",
    fallbacks: FALLBACK_BY_LOCALE[locale] ?? COMMON_LATIN_FALLBACKS,
  };
}

/** Build a CSS font-family value: `"Primary", Fallback1, Fallback2, …` */
export function fontStackToCss(stack: FontStack): string {
  const all = [stack.primary, ...stack.fallbacks];
  return all.map((f) => (f.includes(" ") || /[^a-zA-Z0-9-]/.test(f) ? `"${f}"` : f)).join(", ");
}

// ---------- Width estimation (for splitDelta + safe-zone audit) ----------

/**
 * Approximate rendered width per character for a given fontSize + locale.
 * - Latin: ~0.55× fontSize (works for Inter/Delight Semi Bold)
 * - CJK:   ~1.0× fontSize  (CJK glyphs are roughly square at body weights)
 *
 * This is a rough heuristic for splitDelta's overflow-prevention threshold,
 * not a substitute for actual TextMetrics measurement.
 */
export function avgCharWidth(fontSize: number, locale: Locale): number {
  return isCJKLocale(locale) ? fontSize * 1.0 : fontSize * 0.55;
}

/** Max chars that fit in `safeWidth` at the given fontSize for this locale. */
export function maxCharsForWidth(safeWidth: number, fontSize: number, locale: Locale): number {
  return Math.floor(safeWidth / avgCharWidth(fontSize, locale));
}

// ---------- splitDelta locale-specific separator priorities ----------

/**
 * Locale-specific extra separators added on top of the universal priority
 * list (vs / · / em-dash / colon / sign-boundary). For CJK these are the
 * common editorial-copy clause separators.
 *
 * Order within a locale = priority (first match wins after universal list).
 */
export const LOCALE_SEPARATORS: Record<Locale, readonly string[]> = {
  "en":    [],
  "zh-CN": ["，", "、", "：", "；"],
  "zh-TW": ["，", "、", "：", "；"],
  "ja-JP": ["、", "，", "：", "；"],
  "ko-KR": [",", "、", ":", ";"],
};

/** Default locale for inputs without an explicit one. */
export const DEFAULT_LOCALE: Locale = "en";
