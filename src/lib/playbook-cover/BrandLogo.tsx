/**
 * [INPUT]: brand slug + color + size + fallback Material Symbol
 * [OUTPUT]: SVG element rendering the brand logo with multi-source fallback
 * [POS]: Component — used inside PlaybookCover for Layer 2b (brand icon)
 *
 * Mirrors the spirit of skill `src/image-fetcher.ts` for the client side:
 * we can't `fetch()` an SVG and inspect its body without CORS friction, so
 * we instead pre-load via `Image()` and walk a source list on error.
 *
 *   Primary  : jsDelivr `simple-icons@latest`
 *   Secondary: cdn.simpleicons.org (black variant)
 *   Final    : a Material Symbol per brand (BrandLogo only — BrandLogoMark
 *              renders nothing on full failure to avoid the wrong icon
 *              appearing inside a tag pill)
 *
 * Render technique: CSS `mask-image` over a brand-color `background-color`
 * div inside a `foreignObject`.
 */

import { useEffect, useRef, useState } from 'react';
import { materialSymbolUrl } from './icon-mapping';

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
  const sourcesRef = useRef(sources);
  sourcesRef.current = sources;

  useEffect(() => {
    const list = sourcesRef.current;
    if (attempt >= list.length) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    let cancelled = false;
    img.onload = () => {
      if (cancelled) return;
      if (img.naturalWidth === 0) setAttempt(a => a + 1);
    };
    img.onerror = () => { if (!cancelled) setAttempt(a => a + 1); };
    img.src = list[attempt]!;
    return () => { cancelled = true; };
  }, [attempt, slug]);

  const inset = size * innerInset;
  const innerSize = size * (1 - innerInset * 2);
  const colorCss = color.startsWith('#') ? color : `#${color}`;
  const url = attempt < sources.length ? sources[attempt]! : materialSymbolUrl(fallbackSymbol);

  return (
    <foreignObject x={x + inset} y={y + inset} width={innerSize} height={innerSize}>
      <div
        // @ts-expect-error xmlns required for foreignObject children
        xmlns="http://www.w3.org/1999/xhtml"
        style={{
          width: '100%', height: '100%',
          backgroundColor: colorCss,
          opacity,
          WebkitMaskImage: `url(${url})`,
          maskImage: `url(${url})`,
          WebkitMaskSize: 'contain', maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center', maskPosition: 'center',
        }}
      />
    </foreignObject>
  );
}

/**
 * Inline 10×10 brand mark for tag pills. Renders ONLY when a real brand
 * logo loads from one of the simpleicons CDNs. If both sources fail, the
 * tag shows only the ticker text (no Material Symbol fallback — that
 * produced wrong "chip" icons on LMT / RTX / etc).
 *
 * `fallbackSymbol` is accepted for API compatibility with the BrandLogo
 * cover-icon variant but is intentionally ignored here.
 */
export function BrandLogoMark({
  slug, color, size = 10,
}: {
  slug: string;
  color: string;
  fallbackSymbol?: string;
  size?: number;
}) {
  const sources = [JSDELIVR(slug), SIMPLEICONS_BLACK(slug)];
  const [attempt, setAttempt] = useState(0);
  const sourcesRef = useRef(sources);
  sourcesRef.current = sources;

  useEffect(() => {
    const list = sourcesRef.current;
    if (attempt >= list.length) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    let cancelled = false;
    img.onload = () => { if (!cancelled && img.naturalWidth === 0) setAttempt(a => a + 1); };
    img.onerror = () => { if (!cancelled) setAttempt(a => a + 1); };
    img.src = list[attempt]!;
    return () => { cancelled = true; };
  }, [attempt, slug]);

  if (attempt >= sources.length) return null;

  const colorCss = color.startsWith('#') ? color : `#${color}`;
  const url = sources[attempt]!;

  return (
    <span
      style={{
        display: 'inline-block',
        width: size, height: size,
        flexShrink: 0,
        backgroundColor: colorCss,
        WebkitMaskImage: `url(${url})`, maskImage: `url(${url})`,
        WebkitMaskSize: 'contain', maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center', maskPosition: 'center',
      }}
    />
  );
}
