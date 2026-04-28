/**
 * Brand registry — `tickers.length === 1` matches here trigger the brand
 * override path (Layer 1b bg + Layer 2b logo). Mirror of skill's
 * brand-registry.ts, simplified to the brands we actually demo and using
 * SimpleIcons CDN slugs (https://cdn.simpleicons.org/{slug}/{color}) for
 * the logo asset instead of bundled SVGs.
 *
 * `mono: true` means the brand is pure B/W (e.g. AAPL, NKE, SPY) — keep
 * the logo replacement but skip the bg tint (alpha-on-white over black
 * just gives grey, which reads as "broken theme").
 */

export type BrandEntry = {
  /** Hex string with leading "#" (e.g. "#76B900"). Drives bg + logo color. */
  color: string;
  /** SimpleIcons slug used in the CDN URL: https://cdn.simpleicons.org/{slug}/{color} */
  logoSlug: string;
  /** Pure B/W brand — skip Layer 1b bg tint, keep Layer 2b logo. */
  mono: boolean;
  /** Material Symbol shown when both CDN sources fail to deliver the SVG. */
  fallbackSymbol: string;
};

export const BRAND_REGISTRY: Record<string, BrandEntry> = {
  // US equities — top single-ticker brand identities
  AAPL: { color: "#000000", logoSlug: "apple",      mono: true,  fallbackSymbol: "phone_iphone" },
  AMZN: { color: "#FF9900", logoSlug: "amazon",     mono: false, fallbackSymbol: "shopping_cart" },
  GOOGL:{ color: "#4285F4", logoSlug: "google",     mono: false, fallbackSymbol: "search" },
  META: { color: "#1877F2", logoSlug: "meta",       mono: false, fallbackSymbol: "groups" },
  MSFT: { color: "#0078D4", logoSlug: "microsoft",  mono: false, fallbackSymbol: "window" },
  NVDA: { color: "#76B900", logoSlug: "nvidia",     mono: false, fallbackSymbol: "memory" },
  TSLA: { color: "#E82127", logoSlug: "tesla",      mono: false, fallbackSymbol: "directions_car" },
  AMD:  { color: "#ED1C24", logoSlug: "amd",        mono: false, fallbackSymbol: "memory" },
  INTC: { color: "#0071C5", logoSlug: "intel",      mono: false, fallbackSymbol: "memory" },
  ORCL: { color: "#F80000", logoSlug: "oracle",     mono: false, fallbackSymbol: "database" },
  ADBE: { color: "#FF0000", logoSlug: "adobe",      mono: false, fallbackSymbol: "brush" },
  CRM:  { color: "#00A1E0", logoSlug: "salesforce", mono: false, fallbackSymbol: "cloud" },
  NFLX: { color: "#E50914", logoSlug: "netflix",    mono: false, fallbackSymbol: "movie" },
  SHOP: { color: "#7AB55C", logoSlug: "shopify",    mono: false, fallbackSymbol: "shopping_bag" },
  COIN: { color: "#0052FF", logoSlug: "coinbase",   mono: false, fallbackSymbol: "currency_bitcoin" },
  PLTR: { color: "#000000", logoSlug: "palantir",   mono: true,  fallbackSymbol: "shield" },
  SNOW: { color: "#29B5E8", logoSlug: "snowflake",  mono: false, fallbackSymbol: "ac_unit" },
  UBER: { color: "#000000", logoSlug: "uber",       mono: true,  fallbackSymbol: "local_taxi" },
  ABNB: { color: "#FF5A5F", logoSlug: "airbnb",     mono: false, fallbackSymbol: "home" },
  SPOT: { color: "#1ED760", logoSlug: "spotify",    mono: false, fallbackSymbol: "music_note" },

  // Crypto
  BTC:  { color: "#F7931A", logoSlug: "bitcoin",    mono: false, fallbackSymbol: "currency_bitcoin" },
  ETH:  { color: "#627EEA", logoSlug: "ethereum",   mono: false, fallbackSymbol: "currency_bitcoin" },
  SOL:  { color: "#9945FF", logoSlug: "solana",     mono: false, fallbackSymbol: "currency_bitcoin" },
};

/** Build the SimpleIcons CDN URL for a brand logo. */
export function brandLogoUrl(slug: string, hexColor: string): string {
  // SimpleIcons accepts hex without the leading '#'.
  const c = hexColor.startsWith("#") ? hexColor.slice(1) : hexColor;
  return `https://cdn.simpleicons.org/${slug}/${c}`;
}
