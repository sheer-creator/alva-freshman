// metadata-layout.ts — title / subtitle / chip / author rules for the
// metadata frame BELOW the cover.
//
// Why this exists in code (not docs): the user reported "GOOGL Antitrust
// Catalyst Map" rendering as a single ellipsis-truncated line in
// production despite SKILL.md saying titles should wrap. The rule was
// only in prose; the user's CSS had `white-space: nowrap; overflow:
// hidden; text-overflow: ellipsis` hardcoded. Encoding the layout in
// code (this module) means production can `import { TITLE_STYLE }` and
// spread it into the title element — when the rule changes, production
// picks it up at next skill bump, no CSS hand-editing.
//
// Pattern matches src/person-registry.ts and src/image-fetcher.ts:
// renderer-specific rules → exported values, not prose.

// ---------- Layout constants ----------

export const METADATA_LAYOUT = {
  /**
   * Playbook title — primary heading in the metadata frame.
   *
   * `maxLines: 2` is deliberate (was 1 before 2026-04-27 — user feedback
   * "所有标题需要尽量折行" surfaced that long titles like "GOOGL Antitrust
   * Catalyst Map" rendered as single ellipsis-truncated lines and looked
   * bad). Two lines is the right ceiling: covers most playbook titles
   * fully, still bounds card height.
   */
  title: {
    maxLines: 2,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 600,                 // Inter Semi Bold
    fontFamily: "Inter",
    textOverflow: "ellipsis" as const,
  },

  /**
   * Subtitle — secondary description line. Height-locked to 40 px so
   * Explore grid row baselines don't jitter with subtitle line count.
   */
  subtitle: {
    maxLines: 2,
    height: 40,                       // locked, regardless of 1/2 line content
    fontSize: 13,
    lineHeight: 18,
    fontWeight: 400,                 // Inter Regular
    fontFamily: "Inter",
    textOverflow: "ellipsis" as const,
  },

  /**
   * Tag-row chips (template / ticker / theme) — single-line caps.
   */
  chip: {
    maxLines: 1,
    fontSize: 9,
    lineHeight: 12,
    fontWeight: 600,                 // Inter Semi Bold
    fontFamily: "Inter",
    letterSpacing: 0.16,
    textTransform: "uppercase" as const,
    paddingX: 6,
    paddingY: 2,
    borderRadius: 4,
  },

  /**
   * Author name in the creator row — single line, soft truncation.
   */
  author: {
    maxLines: 1,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 500,                 // Inter Medium
    fontFamily: "Inter",
    textOverflow: "ellipsis" as const,
  },
} as const;

// ---------- CSS-in-JS spread-friendly style objects ----------

/**
 * Style object for the metadata title. Spread into a `<h2>` / `<h3>` /
 * `<p>` element to enable 2-line wrap with ellipsis on overflow.
 *
 *   <h3 style={{ ...TITLE_STYLE }}>{title}</h3>
 *
 * Replaces the older single-line pattern `whiteSpace: 'nowrap'`. If your
 * production CSS has `white-space: nowrap` on the title, REMOVE it —
 * `-webkit-box` + `line-clamp` handles ellipsis correctly across rows.
 */
export const TITLE_STYLE = {
  fontSize: METADATA_LAYOUT.title.fontSize,
  lineHeight: `${METADATA_LAYOUT.title.lineHeight}px`,
  fontWeight: METADATA_LAYOUT.title.fontWeight,
  fontFamily: METADATA_LAYOUT.title.fontFamily,
  display: "-webkit-box",
  WebkitLineClamp: METADATA_LAYOUT.title.maxLines,
  WebkitBoxOrient: "vertical" as const,
  overflow: "hidden",
  textOverflow: METADATA_LAYOUT.title.textOverflow,
  // Critical: do NOT set `whiteSpace: 'nowrap'` — that defeats line-clamp.
  whiteSpace: "normal" as const,
  wordBreak: "break-word" as const,
} as const;

/**
 * Style object for the metadata subtitle. Height-locked to 40 px so
 * Explore grid rows align regardless of 1/2 line subtitle content.
 *
 *   <p style={{ ...SUBTITLE_STYLE }}>{subtitle}</p>
 */
export const SUBTITLE_STYLE = {
  height: METADATA_LAYOUT.subtitle.height,        // locked
  fontSize: METADATA_LAYOUT.subtitle.fontSize,
  lineHeight: `${METADATA_LAYOUT.subtitle.lineHeight}px`,
  fontWeight: METADATA_LAYOUT.subtitle.fontWeight,
  fontFamily: METADATA_LAYOUT.subtitle.fontFamily,
  display: "-webkit-box",
  WebkitLineClamp: METADATA_LAYOUT.subtitle.maxLines,
  WebkitBoxOrient: "vertical" as const,
  overflow: "hidden",
  textOverflow: METADATA_LAYOUT.subtitle.textOverflow,
  whiteSpace: "normal" as const,
  wordBreak: "break-word" as const,
} as const;

/**
 * Style object for tag-row chips (template / ticker / theme).
 */
export const CHIP_STYLE = {
  fontSize: METADATA_LAYOUT.chip.fontSize,
  lineHeight: `${METADATA_LAYOUT.chip.lineHeight}px`,
  fontWeight: METADATA_LAYOUT.chip.fontWeight,
  fontFamily: METADATA_LAYOUT.chip.fontFamily,
  letterSpacing: `${METADATA_LAYOUT.chip.letterSpacing}em`,
  textTransform: METADATA_LAYOUT.chip.textTransform,
  padding: `${METADATA_LAYOUT.chip.paddingY}px ${METADATA_LAYOUT.chip.paddingX}px`,
  borderRadius: METADATA_LAYOUT.chip.borderRadius,
  whiteSpace: "nowrap" as const,                  // chips never wrap
} as const;

// ---------- Figma plugin equivalents (for the figma-apply.ts wiring) ----------

/**
 * Figma TEXT node settings for the title. Apply via:
 *
 *   titleNode.textAutoResize = FIGMA_TITLE_LAYOUT.textAutoResize;
 *   titleNode.maxLines       = FIGMA_TITLE_LAYOUT.maxLines;
 *   titleNode.textTruncation = FIGMA_TITLE_LAYOUT.textTruncation;
 */
export const FIGMA_TITLE_LAYOUT = {
  textAutoResize: "TRUNCATE" as const,
  maxLines: METADATA_LAYOUT.title.maxLines,
  textTruncation: "ENDING" as const,
};

export const FIGMA_SUBTITLE_LAYOUT = {
  textAutoResize: "TRUNCATE" as const,
  maxLines: METADATA_LAYOUT.subtitle.maxLines,
  textTruncation: "ENDING" as const,
  lockedHeight: METADATA_LAYOUT.subtitle.height,
};
