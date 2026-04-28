/**
 * [INPUT]: brand slug + color + size + fallback Material Symbol
 * [OUTPUT]: SVG element rendering the brand logo with multi-source fallback
 * [POS]: Component — used inside PlaybookCover for Layer 2b (brand icon)
 *
 * Mirrors the spirit of skill `src/image-fetcher.ts` for the client side:
 * we can't `fetch()` an SVG and inspect its body without CORS friction, so
 * we instead pre-load via `Image()` and walk a source list on error.
 *
 *   Primary  : jsDelivr `simple-icons@latest` (works for ALL slugs including
 *              the trademark-restricted brands — microsoft, amazon, oracle,
 *              adobe, salesforce — which simpleicons.org's curated CDN
 *              omits)
 *   Secondary: cdn.simpleicons.org (faster, brand-color baked in, but blocks
 *              ~5 brands)
 *   Final    : a Material Symbol per brand (e.g. NVDA → "memory", BTC →
 *              "currency_bitcoin") so the cover never renders empty
 *
 * Render technique: CSS `mask-image` over a brand-color `background-color`
 * div inside a `foreignObject`. This is the same pattern the Material Symbol
 * path uses — it lets us re-color the SVG on the fly (the CDN SVGs are
 * black) and keeps the rendering consistent across all 4 templates.
 */

import { useEffect, useRef, useState } from "react";
import { materialSymbolUrl } from "./icon-mapping";

const JSDELIVR = (slug: string) =>
  `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`;
const SIMPLEICONS_BLACK = (slug: string) =>
  `https://cdn.simpleicons.org/${slug}/000000`;

type Props = {
  /** SimpleIcons slug (e.g. "nvidia", "apple"). */
  slug: string;
  /** Brand color (hex string, with or without `#`). Drives the rendered fill. */
  color: string;
  /** Outer frame size in cover-units. */
  size: number;
  /** Composite opacity. */
  opacity: number;
  /** Material Symbol name to fall back to if both CDNs fail. */
  fallbackSymbol: string;
  /** Position inside the cover (frame top-left). */
  x: number;
  y: number;
  /** Inset ratio (0..1) for the inner vector — defaults to 0.10 per skill. */
  innerInset?: number;
};

export function BrandLogo({
  slug, color, size, opacity, fallbackSymbol, x, y,
  innerInset = 0.10,
}: Props) {
  const sources = [JSDELIVR(slug), SIMPLEICONS_BLACK(slug)];
  const [attempt, setAttempt] = useState(0);

  // Pre-load the current source via Image(); on error, advance to next source.
  // Important: a 200 response with empty body (some CDNs do this for missing
  // slugs) still triggers `naturalWidth === 0`, so we check after `onload` too.
  // Stabilize sources reference so the effect doesn't re-fire every render.
  const sourcesRef = useRef(sources);
  sourcesRef.current = sources;

  useEffect(() => {
    const list = sourcesRef.current;
    if (attempt >= list.length) return; // already on Material Symbol fallback
    const img = new Image();
    img.crossOrigin = "anonymous";
    let cancelled = false;
    img.onload = () => {
      if (cancelled) return;
      if (img.naturalWidth === 0) setAttempt((a) => a + 1); // empty SVG body
    };
    img.onerror = () => {
      if (!cancelled) setAttempt((a) => a + 1);
    };
    img.src = list[attempt];
    return () => { cancelled = true; };
  }, [attempt, slug]); // re-arm when ticker changes (slug → new sources)

  const inset = size * innerInset;
  const innerSize = size * (1 - innerInset * 2);
  const colorCss = color.startsWith("#") ? color : `#${color}`;

  // Final fallback: Material Symbol via CSS mask, brand color
  const url = attempt < sources.length
    ? sources[attempt]
    : materialSymbolUrl(fallbackSymbol);

  return (
    <foreignObject x={x + inset} y={y + inset} width={innerSize} height={innerSize}>
      <div
        // @ts-expect-error xmlns required for foreignObject children
        xmlns="http://www.w3.org/1999/xhtml"
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: colorCss,
          opacity,
          WebkitMaskImage: `url(${url})`,
          maskImage: `url(${url})`,
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
    </foreignObject>
  );
}

/**
 * Tag-pill variant — a very small (10×10) HTML rendering of the brand logo,
 * used inline in the metadata `TagPill` next to a ticker label. Returns a
 * `<span>` instead of `<foreignObject>` (HTML context, not SVG). Same
 * fallback chain, smaller geometry.
 */
export function BrandLogoMark({
  slug, color, fallbackSymbol, size = 10,
}: {
  slug: string;
  color: string;
  fallbackSymbol: string;
  size?: number;
}) {
  const sources = [JSDELIVR(slug), SIMPLEICONS_BLACK(slug)];
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (attempt >= sources.length) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    let cancelled = false;
    img.onload = () => {
      if (cancelled) return;
      if (img.naturalWidth === 0) setAttempt((a) => a + 1);
    };
    img.onerror = () => { if (!cancelled) setAttempt((a) => a + 1); };
    img.src = sources[attempt];
    return () => { cancelled = true; };
  }, [attempt, sources]);

  const colorCss = color.startsWith("#") ? color : `#${color}`;
  const url = attempt < sources.length
    ? sources[attempt]
    : materialSymbolUrl(fallbackSymbol);

  return (
    <span
      style={{
        display: "inline-block",
        width: size,
        height: size,
        flexShrink: 0,
        backgroundColor: colorCss,
        WebkitMaskImage: `url(${url})`,
        maskImage: `url(${url})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
