// Domain → Material Symbol mapping + per-template allow-list + inference.
// Mirror of skill icon-mapping.ts.

import type { DomainKey, Template } from "./types";

export const DOMAIN_TO_SYMBOL: Record<DomainKey, string> = {
  tech: "memory",
  software: "code",
  ai: "bolt",
  crypto: "currency_bitcoin",
  dividend: "paid",
  value: "savings",
  growth: "show_chart",
  momentum: "trending_up",
  defense: "security",
  energy: "oil_barrel",
  renewables: "solar_power",
  biotech: "medication",
  healthcare: "local_hospital",
  retail: "shopping_bag",
  consumer_staples: "kitchen",
  real_estate: "apartment",
  banks: "account_balance",
  fed: "account_balance",
  macro: "public",
  rates: "percent",
  fx: "currency_exchange",
  commodities: "agriculture",
  trend_up: "trending_up",
  trend_down: "trending_down",
  trend_flat: "trending_flat",
  event_study: "event",
  earnings: "event_note",
  guide: "menu_book",
  weekly: "calendar_today",
  review: "history",
  watchlist: "bookmark",
  alerts: "notifications",
  leaderboard: "leaderboard",
};

export const TEMPLATE_ALLOWED_DOMAINS: Record<Template, DomainKey[]> = {
  screener: [
    "tech", "software", "dividend", "value", "growth", "momentum", "crypto",
    "defense", "ai", "energy", "renewables", "biotech", "healthcare", "retail",
    "consumer_staples", "real_estate", "banks", "commodities", "fx",
    "watchlist", "leaderboard",
  ],
  thesis: [
    "tech", "software", "defense", "ai", "energy", "renewables", "biotech",
    "healthcare", "retail", "real_estate", "banks", "macro", "rates", "fx",
    "commodities",
  ],
  "what-if": [
    "trend_up", "trend_down", "trend_flat", "event_study", "earnings", "fed",
    "macro", "rates",
  ],
  general: ["guide", "weekly", "review", "watchlist", "alerts"],
};

const INFERENCE_KEYWORDS: Array<[DomainKey, string[]]> = [
  ["ai",          ["ai ", " ml", " llm", "gpt", "anthropic", "openai"]],
  ["crypto",      ["crypto", "btc", "eth", "defi", "bitcoin", "ethereum", "pepe", "sol", "doge"]],
  ["defense",     ["defense", "military", "aerospace", "lockheed", "raytheon"]],
  ["energy",      ["oil", "gas", "energy", " xle", "barrel", "opec"]],
  ["renewables",  ["solar", "wind", "battery", "renewable"]],
  ["biotech",     ["biotech", "pharma", "drug", "fda", "clinical"]],
  ["healthcare",  ["hospital", "healthcare", "insurer", "unitedhealth"]],
  ["retail",      ["retail", "amazon", "walmart"]],
  ["banks",       ["bank", "jpmorgan", "goldman"]],
  ["fed",         ["fed", "federal reserve", "fomc", "powell"]],
  ["macro",       ["macro", "global", "geopolitical", "recession"]],
  ["rates",       ["yield", "10-year", "treasury", "curve", "rate"]],
  ["fx",          [" fx ", "usd", "eur", "yen", "carry"]],
  ["commodities", ["commodity", "gold", "silver", "copper"]],
  ["dividend",    ["dividend", "income"]],
  ["value",       ["value", "cheap", "bargain"]],
  ["growth",      ["growth"]],
  ["momentum",    ["momentum", "breakout", "trend-follow", "macd", "rsi", "bollinger"]],
  ["tech",        ["tech", "semiconductor", "chip", "nvda", "tsm", "amd", "avgo", "intc"]],
  ["software",    ["saas", "software"]],
  ["event_study", ["what if", "after", "historical", "event", "triggered"]],
  ["earnings",    ["earnings", "quarter"]],
  ["watchlist",   ["watchlist", "picks", "holdings"]],
];

export function inferDomain(title: string, tickers: string[]): DomainKey | null {
  const haystack = (title + " " + tickers.join(" ")).toLowerCase();
  for (const [domain, keywords] of INFERENCE_KEYWORDS) {
    if (keywords.some((k) => haystack.includes(k))) return domain;
  }
  return null;
}

export function resolveDomain(
  template: Template,
  title: string,
  tickers: string[],
  explicit?: DomainKey
): DomainKey {
  // Explicit domain always wins — caller is asserting intent and may have
  // a reason the allow-list doesn't capture (e.g. SKILL's migration recipe
  // recommends `leaderboard` for general-template playbooks even though
  // leaderboard isn't in general's inference allow-list).
  if (explicit) return explicit;
  const allowed = new Set(TEMPLATE_ALLOWED_DOMAINS[template]);
  const inferred = inferDomain(title, tickers);
  if (inferred && allowed.has(inferred)) return inferred;
  // Sensible fallbacks per template
  if (template === "general") return "guide";
  if (template === "what-if") return "event_study";
  if (template === "thesis") return "macro";
  return "leaderboard"; // screener fallback
}

export function materialSymbolUrl(name: string): string {
  return `https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/${name}/fill1/48px.svg`;
}
