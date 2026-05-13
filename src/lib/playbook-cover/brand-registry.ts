// brand-registry.ts — ticker → brand metadata
//
// Consumed by Layer 1b (brand bg) and Layer 2b (brand logo) when the input
// has exactly one ticker that's registered here.
//
// Rules:
//   - If a ticker is NOT in this registry → default (hashed) bg + Material Symbol
//   - If `mono: true` → keep the logo replacement but skip the brand-color bg tint
//   - Logos are referenced by relative path under a shared logos/ folder. The
//     SKILL package does not ship the SVGs directly; callers wire up the
//     logo loader (SimpleIcons CDN, bundled asset folder, etc.).

import { BrandRegistry } from "./types";

export const BRAND_REGISTRY: BrandRegistry = {
  // ---------- US equities — top coverage ----------
  AAPL: { color: "#000000", logoSvg: "AAPL.svg", mono: true,  source: "https://simpleicons.org/?q=apple",  lastVerified: "2026-04-23", logoSlug: "apple", fallbackSymbol: "smartphone" , hasCdnLogo: true },
  AMZN: { color: "#FF9900", logoSvg: "AMZN.svg", mono: false, source: "https://simpleicons.org/?q=amazon", lastVerified: "2026-04-23", logoSlug: "amazon", fallbackSymbol: "shopping_bag" , hasCdnLogo: true },
  GOOGL:{ color: "#4285F4", logoSvg: "GOOGL.svg",mono: false, source: "https://simpleicons.org/?q=google", lastVerified: "2026-04-23", logoSlug: "google", fallbackSymbol: "search" , hasCdnLogo: true },
  META: { color: "#1877F2", logoSvg: "META.svg", mono: false, source: "https://simpleicons.org/?q=meta",   lastVerified: "2026-04-23", logoSlug: "meta", fallbackSymbol: "groups" , hasCdnLogo: true },
  MSFT: { color: "#F25022", logoSvg: "MSFT.svg", mono: false, source: "https://simpleicons.org/?q=microsoft", lastVerified: "2026-04-23", logoSlug: "microsoft", fallbackSymbol: "computer" , hasCdnLogo: true },
  NVDA: { color: "#76B900", logoSvg: "NVDA.svg", mono: false, source: "https://simpleicons.org/?q=nvidia", lastVerified: "2026-04-23", logoSlug: "nvidia", fallbackSymbol: "memory" , hasCdnLogo: true },
  TSLA: { color: "#E82127", logoSvg: "TSLA.svg", mono: false, source: "https://simpleicons.org/?q=tesla",  lastVerified: "2026-04-23", logoSlug: "tesla", fallbackSymbol: "directions_car" , hasCdnLogo: true },
  AMD:  { color: "#ED1C24", logoSvg: "AMD.svg",  mono: false, source: "https://simpleicons.org/?q=amd",    lastVerified: "2026-04-23", logoSlug: "amd", fallbackSymbol: "memory" , hasCdnLogo: true },
  AVGO: { color: "#CC092F", logoSvg: "AVGO.svg", mono: false, source: "https://en.wikipedia.org/wiki/Broadcom", lastVerified: "2026-04-23", logoSlug: "broadcom", fallbackSymbol: "memory" , hasCdnLogo: true },
  INTC: { color: "#0071C5", logoSvg: "INTC.svg", mono: false, source: "https://simpleicons.org/?q=intel",  lastVerified: "2026-04-23", logoSlug: "intel", fallbackSymbol: "memory" , hasCdnLogo: true },
  TSM:  { color: "#D70000", logoSvg: "TSM.svg",  mono: false, source: "https://en.wikipedia.org/wiki/TSMC", lastVerified: "2026-04-23", logoSlug: "tsmc", fallbackSymbol: "memory" , hasCdnLogo: false },
  PANW: { color: "#F04E23", logoSvg: "PANW.svg", mono: false, source: "https://en.wikipedia.org/wiki/Palo_Alto_Networks", lastVerified: "2026-04-23", logoSlug: "paloaltonetworks", fallbackSymbol: "security" , hasCdnLogo: true },
  CRM:  { color: "#00A1E0", logoSvg: "CRM.svg",  mono: false, source: "https://simpleicons.org/?q=salesforce", lastVerified: "2026-04-23", logoSlug: "salesforce", fallbackSymbol: "groups" , hasCdnLogo: true },
  ORCL: { color: "#F80000", logoSvg: "ORCL.svg", mono: false, source: "https://simpleicons.org/?q=oracle", lastVerified: "2026-04-23", logoSlug: "oracle", fallbackSymbol: "storage" , hasCdnLogo: true },
  IBM:  { color: "#1F70C1", logoSvg: "IBM.svg",  mono: false, source: "https://simpleicons.org/?q=ibm",    lastVerified: "2026-04-23", logoSlug: "ibm", fallbackSymbol: "computer" , hasCdnLogo: true },
  ADBE: { color: "#FF0000", logoSvg: "ADBE.svg", mono: false, source: "https://simpleicons.org/?q=adobe",  lastVerified: "2026-04-23", logoSlug: "adobe", fallbackSymbol: "draw" , hasCdnLogo: true },
  NFLX: { color: "#E50914", logoSvg: "NFLX.svg", mono: false, source: "https://simpleicons.org/?q=netflix",lastVerified: "2026-04-23", logoSlug: "netflix", fallbackSymbol: "movie" , hasCdnLogo: true },
  DIS:  { color: "#006E99", logoSvg: "DIS.svg",  mono: false, source: "https://en.wikipedia.org/wiki/Walt_Disney_Company", lastVerified: "2026-04-23", logoSlug: "walt-disney", fallbackSymbol: "movie" , hasCdnLogo: false },
  JPM:  { color: "#0F4C81", logoSvg: "JPM.svg",  mono: false, source: "https://en.wikipedia.org/wiki/JPMorgan_Chase", lastVerified: "2026-04-23", logoSlug: "jpmorganchase", fallbackSymbol: "account_balance" , hasCdnLogo: false },
  BAC:  { color: "#012169", logoSvg: "BAC.svg",  mono: false, source: "https://en.wikipedia.org/wiki/Bank_of_America", lastVerified: "2026-04-23", logoSlug: "bankofamerica", fallbackSymbol: "account_balance" , hasCdnLogo: true },
  V:    { color: "#1A1F71", logoSvg: "V.svg",    mono: false, source: "https://simpleicons.org/?q=visa",   lastVerified: "2026-04-23", logoSlug: "visa", fallbackSymbol: "credit_card" , hasCdnLogo: true },
  MA:   { color: "#EB001B", logoSvg: "MA.svg",   mono: false, source: "https://simpleicons.org/?q=mastercard", lastVerified: "2026-04-23", logoSlug: "mastercard", fallbackSymbol: "credit_card" , hasCdnLogo: true },
  WMT:  { color: "#0071CE", logoSvg: "WMT.svg",  mono: false, source: "https://simpleicons.org/?q=walmart",lastVerified: "2026-04-23", logoSlug: "walmart", fallbackSymbol: "shopping_bag" , hasCdnLogo: true },
  HD:   { color: "#F96302", logoSvg: "HD.svg",   mono: false, source: "https://en.wikipedia.org/wiki/Home_Depot", lastVerified: "2026-04-23", logoSlug: "homedepot", fallbackSymbol: "construction" , hasCdnLogo: false },
  COST: { color: "#E31837", logoSvg: "COST.svg", mono: false, source: "https://en.wikipedia.org/wiki/Costco", lastVerified: "2026-04-23", logoSlug: "costco", fallbackSymbol: "shopping_bag" , hasCdnLogo: false },
  KO:   { color: "#F40009", logoSvg: "KO.svg",   mono: false, source: "https://simpleicons.org/?q=cocacola", lastVerified: "2026-04-23", logoSlug: "cocacola", fallbackSymbol: "local_drink" , hasCdnLogo: true },
  PEP:  { color: "#004B93", logoSvg: "PEP.svg",  mono: false, source: "https://simpleicons.org/?q=pepsi",  lastVerified: "2026-04-23", logoSlug: "pepsi", fallbackSymbol: "local_drink" , hasCdnLogo: true },
  PG:   { color: "#003DA5", logoSvg: "PG.svg",   mono: false, source: "https://en.wikipedia.org/wiki/Procter_%26_Gamble", lastVerified: "2026-04-23", logoSlug: "procter-and-gamble", fallbackSymbol: "shopping_bag" , hasCdnLogo: false },
  JNJ:  { color: "#CC0000", logoSvg: "JNJ.svg",  mono: false, source: "https://en.wikipedia.org/wiki/Johnson_%26_Johnson", lastVerified: "2026-04-23", logoSlug: "johnsonandjohnson", fallbackSymbol: "medication" , hasCdnLogo: false },
  PFE:  { color: "#0093D0", logoSvg: "PFE.svg",  mono: false, source: "https://simpleicons.org/?q=pfizer", lastVerified: "2026-04-23", logoSlug: "pfizer", fallbackSymbol: "medication" , hasCdnLogo: false },
  LLY:  { color: "#E11F29", logoSvg: "LLY.svg",  mono: false, source: "https://en.wikipedia.org/wiki/Eli_Lilly_and_Company", lastVerified: "2026-04-23", logoSlug: "eli-lilly", fallbackSymbol: "medication" , hasCdnLogo: false },
  UNH:  { color: "#002677", logoSvg: "UNH.svg",  mono: false, source: "https://en.wikipedia.org/wiki/UnitedHealth_Group", lastVerified: "2026-04-23", logoSlug: "unitedhealth", fallbackSymbol: "local_hospital" , hasCdnLogo: false },
  XOM:  { color: "#E1150E", logoSvg: "XOM.svg",  mono: false, source: "https://en.wikipedia.org/wiki/ExxonMobil", lastVerified: "2026-04-23", logoSlug: "exxon", fallbackSymbol: "oil_barrel" , hasCdnLogo: false },
  CVX:  { color: "#1F4E9D", logoSvg: "CVX.svg",  mono: false, source: "https://en.wikipedia.org/wiki/Chevron_Corporation", lastVerified: "2026-04-23", logoSlug: "chevron", fallbackSymbol: "oil_barrel" , hasCdnLogo: false },
  BA:   { color: "#0033A0", logoSvg: "BA.svg",   mono: false, source: "https://simpleicons.org/?q=boeing", lastVerified: "2026-04-23", logoSlug: "boeing", fallbackSymbol: "flight" , hasCdnLogo: true },
  LMT:  { color: "#0F1C49", logoSvg: "LMT.svg",  mono: false, source: "https://en.wikipedia.org/wiki/Lockheed_Martin", lastVerified: "2026-04-23", logoSlug: "lmt", fallbackSymbol: "security" , hasCdnLogo: false },
  RTX:  { color: "#C00A2A", logoSvg: "RTX.svg",  mono: false, source: "https://en.wikipedia.org/wiki/RTX_Corporation", lastVerified: "2026-04-23", logoSlug: "rtx", fallbackSymbol: "security" , hasCdnLogo: false },
  CAT:  { color: "#FFCD11", logoSvg: "CAT.svg",  mono: false, source: "https://simpleicons.org/?q=caterpillar", lastVerified: "2026-04-23", logoSlug: "caterpillar", fallbackSymbol: "construction" , hasCdnLogo: true },
  DE:   { color: "#367C2B", logoSvg: "DE.svg",   mono: false, source: "https://en.wikipedia.org/wiki/John_Deere", lastVerified: "2026-04-23", logoSlug: "johndeere", fallbackSymbol: "agriculture" , hasCdnLogo: true },
  NKE:  { color: "#000000", logoSvg: "NKE.svg",  mono: true,  source: "https://simpleicons.org/?q=nike",   lastVerified: "2026-04-23", logoSlug: "nike", fallbackSymbol: "memory" , hasCdnLogo: true },
  SBUX: { color: "#006241", logoSvg: "SBUX.svg", mono: false, source: "https://simpleicons.org/?q=starbucks", lastVerified: "2026-04-23", logoSlug: "starbucks", fallbackSymbol: "local_cafe" , hasCdnLogo: true },
  MCD:  { color: "#FFC72C", logoSvg: "MCD.svg",  mono: false, source: "https://simpleicons.org/?q=mcdonalds", lastVerified: "2026-04-23", logoSlug: "mcdonalds", fallbackSymbol: "restaurant" , hasCdnLogo: true },
  UBER: { color: "#000000", logoSvg: "UBER.svg", mono: true,  source: "https://simpleicons.org/?q=uber",   lastVerified: "2026-04-23", logoSlug: "uber", fallbackSymbol: "memory" , hasCdnLogo: true },
  ABNB: { color: "#FF5A5F", logoSvg: "ABNB.svg", mono: false, source: "https://simpleicons.org/?q=airbnb", lastVerified: "2026-04-23", logoSlug: "airbnb", fallbackSymbol: "memory" , hasCdnLogo: true },
  COIN: { color: "#0052FF", logoSvg: "COIN.svg", mono: false, source: "https://simpleicons.org/?q=coinbase", lastVerified: "2026-04-23", logoSlug: "coinbase", fallbackSymbol: "memory" , hasCdnLogo: true },
  SQ:   { color: "#000000", logoSvg: "SQ.svg",   mono: true,  source: "https://simpleicons.org/?q=square", lastVerified: "2026-04-23", logoSlug: "square", fallbackSymbol: "memory" , hasCdnLogo: true },
  SHOP: { color: "#7AB55C", logoSvg: "SHOP.svg", mono: false, source: "https://simpleicons.org/?q=shopify", lastVerified: "2026-04-23", logoSlug: "shopify", fallbackSymbol: "memory" , hasCdnLogo: true },
  SNOW: { color: "#29B5E8", logoSvg: "SNOW.svg", mono: false, source: "https://simpleicons.org/?q=snowflake", lastVerified: "2026-04-23", logoSlug: "snowflake", fallbackSymbol: "memory" , hasCdnLogo: true },

  // ---------- Crypto — top coverage ----------
  BTC:   { color: "#F7931A", logoSvg: "BTC.svg",   mono: false, source: "https://simpleicons.org/?q=bitcoin", lastVerified: "2026-04-23", logoSlug: "bitcoin", fallbackSymbol: "currency_bitcoin" , hasCdnLogo: true },
  ETH:   { color: "#627EEA", logoSvg: "ETH.svg",   mono: false, source: "https://simpleicons.org/?q=ethereum", lastVerified: "2026-04-23", logoSlug: "ethereum", fallbackSymbol: "currency_bitcoin" , hasCdnLogo: true },
  USDT:  { color: "#26A17B", logoSvg: "USDT.svg",  mono: false, source: "https://simpleicons.org/?q=tether",   lastVerified: "2026-04-23", logoSlug: "tether", fallbackSymbol: "currency_bitcoin" , hasCdnLogo: true },
  USDC:  { color: "#2775CA", logoSvg: "USDC.svg",  mono: false, source: "https://en.wikipedia.org/wiki/USD_Coin", lastVerified: "2026-04-23", logoSlug: "usdc", fallbackSymbol: "currency_bitcoin" , hasCdnLogo: false },
  BNB:   { color: "#F3BA2F", logoSvg: "BNB.svg",   mono: false, source: "https://simpleicons.org/?q=binance",   lastVerified: "2026-04-23", logoSlug: "binance", fallbackSymbol: "currency_bitcoin" , hasCdnLogo: true },
  SOL:   { color: "#9945FF", logoSvg: "SOL.svg",   mono: false, source: "https://simpleicons.org/?q=solana",    lastVerified: "2026-04-23", logoSlug: "solana", fallbackSymbol: "currency_bitcoin" , hasCdnLogo: true },
  XRP:   { color: "#000000", logoSvg: "XRP.svg",   mono: true,  source: "https://simpleicons.org/?q=xrp",       lastVerified: "2026-04-23", logoSlug: "xrp", fallbackSymbol: "currency_bitcoin" , hasCdnLogo: true },
  DOGE:  { color: "#C2A633", logoSvg: "DOGE.svg",  mono: false, source: "https://simpleicons.org/?q=dogecoin",  lastVerified: "2026-04-23", logoSlug: "dogecoin", fallbackSymbol: "currency_bitcoin" , hasCdnLogo: true },
  ADA:   { color: "#0033AD", logoSvg: "ADA.svg",   mono: false, source: "https://simpleicons.org/?q=cardano",   lastVerified: "2026-04-23", logoSlug: "cardano", fallbackSymbol: "currency_bitcoin" , hasCdnLogo: true },
  AVAX:  { color: "#E84142", logoSvg: "AVAX.svg",  mono: false, source: "https://en.wikipedia.org/wiki/Avalanche_(blockchain_platform)", lastVerified: "2026-04-23", logoSlug: "avax", fallbackSymbol: "currency_bitcoin" , hasCdnLogo: false },
  LINK:  { color: "#2A5ADA", logoSvg: "LINK.svg",  mono: false, source: "https://simpleicons.org/?q=chainlink", lastVerified: "2026-04-23", logoSlug: "chainlink", fallbackSymbol: "currency_bitcoin" , hasCdnLogo: true },
  DOT:   { color: "#E6007A", logoSvg: "DOT.svg",   mono: false, source: "https://simpleicons.org/?q=polkadot",  lastVerified: "2026-04-23", logoSlug: "polkadot", fallbackSymbol: "currency_bitcoin" , hasCdnLogo: true },
  UNI:   { color: "#FF007A", logoSvg: "UNI.svg",   mono: false, source: "https://simpleicons.org/?q=uniswap",   lastVerified: "2026-04-23", logoSlug: "uni", fallbackSymbol: "currency_bitcoin" , hasCdnLogo: false },

  // ---------- ETFs — distinct branding only ----------
  SPY:   { color: "#000000", logoSvg: "SPY.svg",   mono: true,  source: "https://en.wikipedia.org/wiki/SPDR_S%26P_500_ETF_Trust", lastVerified: "2026-04-23", logoSlug: "spy", fallbackSymbol: "public" , hasCdnLogo: false },
  QQQ:   { color: "#00B0B9", logoSvg: "QQQ.svg",   mono: false, source: "https://en.wikipedia.org/wiki/Invesco_QQQ", lastVerified: "2026-04-23", logoSlug: "qqq", fallbackSymbol: "memory" , hasCdnLogo: false },
  VOO:   { color: "#96151D", logoSvg: "VOO.svg",   mono: false, source: "https://en.wikipedia.org/wiki/Vanguard_S%26P_500_ETF", lastVerified: "2026-04-23", logoSlug: "voo", fallbackSymbol: "public" , hasCdnLogo: false },
  VTI:   { color: "#96151D", logoSvg: "VTI.svg",   mono: false, source: "https://en.wikipedia.org/wiki/Vanguard_Total_Stock_Market_Index_Fund", lastVerified: "2026-04-23", logoSlug: "vti", fallbackSymbol: "public" , hasCdnLogo: false },
  IWM:   { color: "#000000", logoSvg: "IWM.svg",   mono: true,  source: "https://en.wikipedia.org/wiki/iShares", lastVerified: "2026-04-23", logoSlug: "iwm", fallbackSymbol: "savings" , hasCdnLogo: false },
  ARKK:  { color: "#000000", logoSvg: "ARKK.svg",  mono: true,  source: "https://en.wikipedia.org/wiki/Ark_Invest", lastVerified: "2026-04-23", logoSlug: "arkk", fallbackSymbol: "trending_up" , hasCdnLogo: false },
};
