// image-fetcher.ts — resilient image fetching for brand logos + portrait photos
//
// Why this exists: the user reported "有些 logo 获取失败的话需要重新获取，还
// 失败就换个来源" — single-host outages (simpleicons.org, upload.wikimedia.org,
// Wikipedia infobox CDN) caused logos to silently fail in production. The
// answer: retry with exponential backoff, then fall through to a fallback
// source list.
//
// Pure function module — no imports beyond fetch (which is global on web,
// Node 18+, Deno, Bun). Runtime-agnostic; works in browser, server-side
// rendering, build pipelines, and Figma plugin (where `fetch` is now
// available in 2024+ plugin APIs, though Figma sandboxes some hosts).

// ---------- Retry policy ----------

export type FetchPolicy = {
  /** Maximum attempts (including the first). Default 3. */
  attempts: number;
  /** Initial delay between attempts in ms. Default 250. */
  initialDelayMs: number;
  /** Backoff multiplier per attempt. Default 2 (exponential). */
  backoffFactor: number;
  /** Hard ceiling on per-attempt delay. Default 5000ms. */
  maxDelayMs: number;
  /** Per-attempt request timeout. Default 8000ms. */
  timeoutMs: number;
};

export const DEFAULT_POLICY: FetchPolicy = {
  attempts: 3,
  initialDelayMs: 250,
  backoffFactor: 2,
  maxDelayMs: 5000,
  timeoutMs: 8000,
};

// ---------- Result shape ----------

export type FetchResult = {
  ok: true;
  blob: Blob;
  url: string;            // The URL that actually succeeded (primary or fallback)
  attempts: number;       // Total attempts across all sources
  fromFallback: boolean;  // True if primary failed and a fallback was used
} | {
  ok: false;
  error: string;          // Last error message
  triedUrls: string[];    // All URLs attempted (primary + fallbacks)
  attempts: number;
};

// ---------- Core: fetchWithRetry (single URL) ----------

/**
 * Fetch a single URL, retrying on failure per the policy. Treats 5xx and
 * network errors as retryable; treats 4xx as terminal (a 404 won't recover
 * by retrying the same URL).
 *
 * Returns the response Blob on success, or throws on persistent failure.
 */
export async function fetchWithRetry(
  url: string,
  policy: Partial<FetchPolicy> = {},
): Promise<{ blob: Blob; attempts: number }> {
  const p = { ...DEFAULT_POLICY, ...policy };
  let lastErr: unknown;
  let delay = p.initialDelayMs;

  for (let attempt = 1; attempt <= p.attempts; attempt++) {
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), p.timeoutMs);
      try {
        const res = await fetch(url, { signal: ctrl.signal });
        if (!res.ok) {
          // 4xx: terminal — no retry
          if (res.status >= 400 && res.status < 500) {
            throw new Error(`HTTP ${res.status} ${res.statusText} (terminal — won't retry)`);
          }
          // 5xx: retryable
          throw new Error(`HTTP ${res.status} ${res.statusText} (retryable)`);
        }
        const blob = await res.blob();
        return { blob, attempts: attempt };
      } finally {
        clearTimeout(timer);
      }
    } catch (err) {
      lastErr = err;
      const msg = err instanceof Error ? err.message : String(err);
      // Don't retry terminal errors
      if (msg.includes("(terminal")) break;
      // Don't sleep after the last attempt
      if (attempt < p.attempts) {
        await sleep(delay);
        delay = Math.min(delay * p.backoffFactor, p.maxDelayMs);
      }
    }
  }
  throw lastErr instanceof Error
    ? lastErr
    : new Error(`fetchWithRetry exhausted: ${String(lastErr)}`);
}

// ---------- Core: fetchWithFallback (primary + fallback list) ----------

/**
 * Try the primary URL with retry; if persistent failure, walk the fallback
 * list, retrying each. Returns the first successful blob along with which
 * URL won. On total failure, returns ok=false with diagnostics.
 *
 * Use case: brand-registry entries with `fallbacks: [...]` get resilience
 * without renderer-side branching:
 *
 *   const result = await fetchWithFallback(brand.logoSvg, brand.fallbacks);
 *   if (result.ok) {
 *     useLogo(result.blob);
 *     if (result.fromFallback) console.warn(`Primary ${brand.logoSvg} failed; used ${result.url}`);
 *   } else {
 *     console.error(`All sources failed for ${ticker}:`, result.triedUrls);
 *     useDomainIcon();  // fall back to Material Symbol
 *   }
 */
export async function fetchWithFallback(
  primaryUrl: string,
  fallbackUrls: string[] = [],
  policy: Partial<FetchPolicy> = {},
): Promise<FetchResult> {
  const triedUrls: string[] = [];
  let totalAttempts = 0;
  let lastErr = "";

  const all = [primaryUrl, ...fallbackUrls].filter(Boolean);
  for (let i = 0; i < all.length; i++) {
    const url = all[i]!;
    triedUrls.push(url);
    try {
      const { blob, attempts } = await fetchWithRetry(url, policy);
      totalAttempts += attempts;
      return {
        ok: true,
        blob,
        url,
        attempts: totalAttempts,
        fromFallback: i > 0,
      };
    } catch (err) {
      lastErr = err instanceof Error ? err.message : String(err);
      totalAttempts += (policy.attempts ?? DEFAULT_POLICY.attempts);
    }
  }
  return {
    ok: false,
    error: lastErr || "no URLs provided",
    triedUrls,
    attempts: totalAttempts,
  };
}

// ---------- Brand logo convenience wrapper ----------

/**
 * Fetch a brand logo with retry + fallback, given a `BrandEntry`-like
 * object. Returns the same shape as fetchWithFallback. Caller is
 * responsible for caching (e.g., snapshot-to-bundle pattern in build).
 */
export async function fetchBrandLogo(
  brand: { logoSvg: string; fallbacks?: string[] },
  policy: Partial<FetchPolicy> = {},
): Promise<FetchResult> {
  return fetchWithFallback(brand.logoSvg, brand.fallbacks ?? [], policy);
}

/**
 * Fetch a person portrait with retry + fallback, given a `PersonEntry`-like
 * object. Same semantics as fetchBrandLogo.
 */
export async function fetchPersonPortrait(
  person: { imageHref: string; fallbacks?: string[] },
  policy: Partial<FetchPolicy> = {},
): Promise<FetchResult> {
  return fetchWithFallback(person.imageHref, person.fallbacks ?? [], policy);
}

// ---------- Helpers ----------

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
