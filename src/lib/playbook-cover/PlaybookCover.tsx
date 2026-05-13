/**
 * [INPUT]: CoverInput (template, title, tickers, optional kind/anchor/series, etc.)
 * [OUTPUT]: SVG cover at the canonical 320×140 design size, scales to container.
 * [POS]: Component — used inside Explore PlaybookCard / HeroCarousel / NewChat
 *
 * 100% data-driven SVG renderer for the alva-cover-generation skill's CoverOutput.
 * Every value (color, font, opacity, position, dimension) comes from the SKILL
 * output (`generateCover`) or `dimensions.ts`. There are no constants in this
 * file. To change cover behavior: edit the SKILL, not this renderer.
 *
 * Public API kept compatible with the legacy wrapper:
 *   <PlaybookCover input={coverInput} staggerMs={...} />
 *
 * `staggerMs` continues to drive a 10s live-update loop on thesis & what-if
 * templates (numerical jitter on the original input strings); other templates
 * pass through unchanged.
 */

import { useEffect, useMemo, useState } from 'react';
import type {
  CoverInput, CoverOutput, ContentElement, RGB, TextPalette, FontStack,
} from './types';
import { generateCover } from './cover-gen';
import { rgbToCss } from './color';
import { materialSymbolUrl } from './icon-mapping';
import { COVER_W, COVER_H } from './dimensions';
import { BrandLogo } from './BrandLogo';

export function PlaybookCover({
  input: rawInput,
  staggerMs = 0,
}: {
  input: CoverInput;
  /** Initial delay before the first live tick. Used to stagger updates across cards. */
  staggerMs?: number;
}) {
  const input = useLiveInput(rawInput, staggerMs);
  const cover: CoverOutput = useMemo(() => generateCover(input), [input]);
  const { bg, icon, text, content, fonts } = cover;
  const fontFamily = stackToCss(fonts.cover);
  const uid = useMemo(() => `cv${Math.random().toString(36).slice(2, 9)}`, []);
  const gradId = `${uid}-bg`;
  const portrait = bg.portraitRender;

  return (
    <svg
      viewBox={`0 0 ${COVER_W} ${COVER_H}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={rgbToCss(bg.top)} />
          <stop offset="100%" stopColor={rgbToCss(bg.bot)} />
        </linearGradient>
      </defs>

      <rect width={COVER_W} height={COVER_H} fill={`url(#${gradId})`} />

      {portrait && (
        <image
          href={portrait.href}
          x={0} y={0} width={COVER_W} height={COVER_H}
          preserveAspectRatio={portrait.crop.svgPreserveAspectRatio}
          opacity={portrait.opacity}
          style={{ filter: `saturate(${1 + portrait.filters.saturation}) contrast(${1 + portrait.filters.contrast}) brightness(${1 + portrait.filters.exposure})` }}
        />
      )}

      {icon?.kind === 'material' && (
        <foreignObject x={icon.x} y={icon.y} width={icon.size} height={icon.size}>
          <div
            // @ts-expect-error xmlns required for foreignObject children
            xmlns="http://www.w3.org/1999/xhtml"
            style={{
              width: '100%', height: '100%',
              backgroundColor: rgbToCss(icon.color),
              opacity: icon.opacity,
              WebkitMaskImage: `url(${materialSymbolUrl(icon.symbol)})`,
              maskImage: `url(${materialSymbolUrl(icon.symbol)})`,
              WebkitMaskSize: 'contain', maskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center', maskPosition: 'center',
            }}
          />
        </foreignObject>
      )}

      {icon?.kind === 'brand' && (
        <BrandLogo
          slug={icon.logoSlug}
          color={rgbToCssHex(icon.color)}
          size={icon.size} opacity={icon.opacity}
          x={icon.x} y={icon.y}
          fallbackSymbol={icon.fallbackSymbol}
        />
      )}

      {content.map((el, i) => (
        <ContentEl key={i} el={el} text={text} fontFamily={fontFamily} />
      ))}
    </svg>
  );
}

function stackToCss(stack: FontStack): string {
  const all = [stack.primary, ...stack.fallbacks];
  return all.map(f => /[ ]/.test(f) && !f.startsWith('"') ? `"${f}"` : f).join(', ');
}

function ContentEl({
  el, text, fontFamily,
}: { el: ContentElement; text: TextPalette; fontFamily: string }) {
  switch (el.kind) {
    case 'label':
    case 'verb': {
      const display = el.caps ? el.text.toUpperCase() : el.text;
      return (
        <text
          x={el.x} y={el.y}
          fill={rgbToCss(text[el.paletteRole])}
          fontFamily={fontFamily} fontSize={el.fontSize} fontWeight={el.fontWeight}
          letterSpacing={`${el.letterSpacing}em`} dominantBaseline="hanging"
        >
          {display}
        </text>
      );
    }

    case 'series': {
      return (
        <text
          x={el.x} y={el.y}
          fill={rgbToCss(text[el.paletteRole])}
          fontFamily={fontFamily} fontSize={el.fontSize} fontWeight={el.fontWeight}
          letterSpacing={`${el.letterSpacing}em`} dominantBaseline="hanging"
        >
          {el.text}
        </text>
      );
    }

    case 'ticker':
    case 'hero-pulse':
    case 'hero-pct': {
      return (
        <text
          x={el.x} y={el.y}
          fill={rgbToCss(text[el.paletteRole])}
          fontFamily={fontFamily} fontSize={el.fontSize} fontWeight={el.fontWeight}
          letterSpacing={`${el.letterSpacing}em`} dominantBaseline="hanging"
        >
          {el.text}
        </text>
      );
    }

    case 'peer-chips': {
      const bgColor = rgbToCss(el.chipBg.color, el.chipBg.opacity);
      const fgColor = rgbToCss(el.chipTextColor);
      let cursor = el.x;
      const chips = el.tickers.map((tk, i) => {
        const w = el.chipPaddingX * 2 + tk.length * (el.chipFontSize * 0.62);
        const chip = (
          <g key={i}>
            <rect
              x={cursor} y={el.y - 1}
              width={w} height={el.chipHeight}
              rx={el.chipBorderRadius}
              fill={bgColor}
            />
            <text
              x={cursor + w / 2} y={el.textBaselineY}
              fill={fgColor}
              fontFamily={fontFamily} fontSize={el.chipFontSize}
              fontWeight={el.chipFontWeight} letterSpacing={`${el.chipLetterSpacing}em`}
              textAnchor="middle" dominantBaseline="middle"
            >
              {tk}
            </text>
          </g>
        );
        cursor += w + el.chipGap;
        return chip;
      });
      return <>{chips}</>;
    }

    case 'delta': {
      const lines = el.text.split('\n');
      return (
        <>
          <g>
            <circle
              cx={el.categoryX + 3}
              cy={el.categoryY}
              r={el.categoryDotSize / 2}
              fill={rgbToCss(el.categoryColor)}
            />
            <text
              x={el.categoryX + 10} y={el.categoryY}
              fill={rgbToCss(el.categoryColor)}
              fontFamily={fontFamily} fontSize={el.categoryFontSize}
              fontWeight={el.categoryFontWeight}
              letterSpacing={`${el.categoryLetterSpacing}em`}
              dominantBaseline="middle"
            >
              {el.categoryLabel}
            </text>
          </g>
          {lines.map((line, i) => (
            <text
              key={i}
              x={el.x} y={el.y + i * el.lineHeight}
              fill={rgbToCss(el.bodyColor)}
              fontFamily={fontFamily} fontSize={el.fontSize}
              fontWeight={el.fontWeight} letterSpacing={`${el.letterSpacing}em`}
              dominantBaseline="hanging"
            >
              {line}
            </text>
          ))}
        </>
      );
    }

    case 'bars': {
      return (
        <>
          {el.bars.length > 0 && (
            <line
              x1={el.zeroLine.x1} x2={el.zeroLine.x2}
              y1={el.zeroLineY} y2={el.zeroLineY}
              stroke={rgbToCss(el.zeroLine.color, el.zeroLine.opacity)}
              strokeWidth={el.zeroLine.strokeWidth}
            />
          )}
          {el.bars.map((b, i) => (
            <rect
              key={i}
              x={b.x} y={b.y} width={b.width} height={b.height}
              fill={rgbToCss(b.color, el.barOpacity)} rx={1}
            />
          ))}
        </>
      );
    }

    case 'chip':
    case 'delta-badge':
    case 'delta-stack':
      // Not currently emitted by the SKILL for our inputs. Wire when needed.
      return null;

    default:
      return null;
  }
}

function rgbToCssHex({ r, g, b }: RGB): string {
  const to = (x: number) => Math.round(x * 255).toString(16).padStart(2, '0');
  return `#${to(r)}${to(g)}${to(b)}`;
}

/* ---------- Live update ---------- */

const LIVE_INTERVAL_MS = 10_000;

/**
 * For thesis & what-if templates, returns a perturbed copy of `input` that
 * refreshes every 10s after an initial `staggerMs` delay. For other templates,
 * returns the original `input` unchanged.
 */
function useLiveInput(input: CoverInput, staggerMs: number): CoverInput {
  const isLive = input.template === 'thesis' || input.template === 'what-if';
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!isLive) return;
    let intervalId: ReturnType<typeof setInterval> | null = null;
    const startId = setTimeout(() => {
      setTick((t) => t + 1);
      intervalId = setInterval(() => setTick((t) => t + 1), LIVE_INTERVAL_MS);
    }, staggerMs);
    return () => {
      clearTimeout(startId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [isLive, staggerMs]);

  return useMemo(() => {
    if (!isLive || tick === 0) return input;
    return perturbInput(input, tick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, tick, isLive]);
}

function perturbInput(input: CoverInput, tick: number): CoverInput {
  if (input.template === 'thesis') {
    return {
      ...input,
      kind: input.kind ? jitterPercents(input.kind, 0.6, tick) : input.kind,
    };
  }
  if (input.template === 'what-if') {
    const newBars = input.whatIfBars?.map((v, i) => {
      const offset = pseudoRandom(tick * 9301 + i * 49297) * 0.7;
      return Number((v + offset).toFixed(1));
    });
    return {
      ...input,
      anchor: input.anchor ? jitterPercents(input.anchor, 0.8, tick) : input.anchor,
      whatIfBars: newBars,
    };
  }
  return input;
}

function jitterPercents(s: string, range: number, tick: number): string {
  let i = 0;
  return s.replace(/([+\-−])(\d+\.\d+)%/g, (_, sign, num) => {
    const offset = pseudoRandom(tick * 1009 + (i++ + 1) * 7919) * range;
    let next = parseFloat(num) + offset;
    if (next < 0.1) next = 0.1;
    return `${sign}${next.toFixed(1)}%`;
  });
}

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed) * 10_000;
  return (x - Math.floor(x)) - 0.5;
}
