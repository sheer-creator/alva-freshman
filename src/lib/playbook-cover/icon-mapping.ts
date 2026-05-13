// icon-mapping.ts — domain → Material Symbol + per-template allow-list
//
// Google Material Symbols Rounded · Weight 400 · Fill 1 (Apache 2.0).
// Fetch pattern for on-demand rendering:
//   https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/{name}/fill1/48px.svg
//
// Production deployments should snapshot the full set into a local bundle.

import { DomainKey, Template } from "./types";

/**
 * (domain → Material Symbol name) — canonical mapping.
 * Adding a new domain: add a row here, append the domain to its template's
 * TEMPLATE_ALLOWED_DOMAINS array below, and add keyword hints to INFERENCE_KEYWORDS.
 */
export const DOMAIN_TO_SYMBOL: Record<DomainKey, string> = {
  // universal
  tech:             "memory",
  software:         "code",
  ai:               "bolt",
  crypto:           "currency_bitcoin",

  // factor
  dividend:         "paid",
  value:            "savings",
  growth:           "show_chart",
  momentum:         "trending_up",

  // sector
  defense:          "security",
  energy:           "oil_barrel",
  renewables:       "solar_power",
  biotech:          "medication",
  healthcare:       "local_hospital",
  retail:           "shopping_bag",
  consumer_staples: "kitchen",
  real_estate:      "apartment",
  banks:            "account_balance",

  // macro / policy
  fed:              "account_balance",
  macro:            "public",
  rates:            "percent",
  fx:               "currency_exchange",
  commodities:      "agriculture",

  // what-if specific
  trend_up:         "trending_up",
  trend_down:       "trending_down",
  trend_flat:       "trending_flat",
  event_study:      "event",
  earnings:         "event_note",

  // general
  guide:            "menu_book",
  weekly:           "calendar_today",
  review:           "history",
  watchlist:        "bookmark",
  alerts:           "notifications",
  leaderboard:      "leaderboard",
};

/**
 * Per-template allow-list. A template can only surface domains in its list.
 * Prevents e.g. a screener from showing `trend_up` (a what-if-owned symbol).
 */
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
  general: [
    "guide", "weekly", "review", "watchlist", "alerts",
  ],
};

/**
 * Keyword dictionary for auto-inference when the caller doesn't provide `domain`.
 * Matched against the lowercased title + joined chip text.
 */
export const INFERENCE_KEYWORDS: Array<[DomainKey, string[]]> = [
  ["ai",          ["ai", "ml", " llm", "gpt", "anthropic", "openai"]],
  ["crypto",      ["crypto", "btc", "eth", "defi", "bitcoin", "ethereum"]],
  ["defense",     ["defense", "military", "aerospace", "lockheed", "raytheon"]],
  ["energy",      ["oil", "gas", "energy", " xle", "barrel", "opec"]],
  ["renewables",  ["solar", "wind", "battery", "renewable"]],
  ["biotech",     ["biotech", "pharma", "drug", "fda", "clinical"]],
  ["healthcare",  ["hospital", "healthcare", "insurer", "unitedhealth"]],
  ["retail",      ["retail", "consumer discretionary", "amazon", "walmart"]],
  ["consumer_staples", ["consumer staples", "kitchen", "food", "household"]],
  ["real_estate", ["reit", "real estate", "housing", "mortgage"]],
  ["banks",       ["bank", "jpmorgan", "goldman", "regional bank"]],
  ["fed",         ["fed", "federal reserve", "fomc", "powell", "policy"]],
  ["macro",       ["macro", "global", "geopolitical", "recession"]],
  ["rates",       ["yield", "10-year", "treasury", "curve", "rate"]],
  ["fx",          [" fx ", "usd", "eur", "yen", "carry"]],
  ["commodities", ["commodity", "gold", "silver", "copper", "commodit"]],
  ["dividend",    ["dividend", "yield", "income"]],
  ["value",       ["value", "cheap", "bargain"]],
  ["growth",      ["growth", "high-growth"]],
  ["momentum",    ["momentum", "breakout", "trend-follow"]],
  ["tech",        ["tech", "semiconductor", "software", "chip"]],
  ["software",    ["saas", "enterprise software"]],
  ["event_study", ["what if", "after", "historical", "event"]],
  ["earnings",    ["earnings", "quarter", "q1", "q2", "q3", "q4"]],
  ["guide",       ["guide", "primer", "intro", "how to"]],
  ["weekly",      ["weekly", "week in", "daily"]],
  ["review",      ["review", "retrospective", "in retrospect"]],
  ["watchlist",   ["watchlist", "picks", "holdings"]],
];

/**
 * Infer a domain key from title + tickers. Returns null if no match — caller
 * should fail loudly (for all templates except `general`, which falls back
 * to "guide").
 */
export function inferDomain(title: string, tickers: string[]): DomainKey | null {
  const haystack = (title + " " + tickers.join(" ")).toLowerCase();
  for (const [domain, keywords] of INFERENCE_KEYWORDS) {
    if (keywords.some((k) => haystack.includes(k))) return domain;
  }
  return null;
}

/**
 * Resolve the domain for a given input, respecting the template allow-list.
 * If input.domain is set and valid, use it. Otherwise infer from keywords.
 * Fallback: "guide" for general, null (caller decides) for others.
 */
export function resolveDomain(
  template: Template,
  title: string,
  tickers: string[],
  explicit?: DomainKey
): DomainKey | null {
  const allowed = new Set(TEMPLATE_ALLOWED_DOMAINS[template]);
  if (explicit && allowed.has(explicit)) return explicit;
  const inferred = inferDomain(title, tickers);
  if (inferred && allowed.has(inferred)) return inferred;
  if (template === "general") return "guide";
  return null;
}

/**
 * Build the fetch URL for a Material Symbol. Callers should cache results.
 */
export function materialSymbolUrl(name: string): string {
  return `https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/${name}/fill1/48px.svg`;
}
