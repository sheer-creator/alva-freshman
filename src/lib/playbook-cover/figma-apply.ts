// figma-apply.ts — Apply CoverOutput to an existing Figma card frame.
// Card structure expected per SKILL.md §Integration. Cover font: Delight
// (Inter fallback + [PENDING-DELIGHT] layer-name tag if unloaded).

import { CoverOutput, CoverInput, RGB, IconSpec, BarSpec } from "./types";

type FigmaNode = any;

export const COVER_FONT_FAMILY    = "Delight";
export const METADATA_FONT_FAMILY = "Inter";

/** True if Delight loadable; false → fall back to Inter + tag affected nodes. */
export async function tryLoadCoverFont(): Promise<boolean> {
  try {
    const figma = (globalThis as any).figma;
    await figma.loadFontAsync({ family: COVER_FONT_FAMILY, style: "Regular" });
    await figma.loadFontAsync({ family: COVER_FONT_FAMILY, style: "Semi Bold" });
    return true;
  } catch {
    return false;
  }
}

export async function applyCoverToFigma(
  cover: CoverOutput,
  target: { card: FigmaNode; input: CoverInput }
): Promise<void> {
  const card = target.card;
  const coverFrame = card.children.find((c: any) => c.name === "Cover");
  if (!coverFrame) throw new Error("Card has no Cover child");

  const figma = (globalThis as any).figma;
  await figma.loadFontAsync({ family: METADATA_FONT_FAMILY, style: "Regular" });
  await figma.loadFontAsync({ family: METADATA_FONT_FAMILY, style: "Semi Bold" });
  const delightAvailable = await tryLoadCoverFont();

  // ---- 1. Apply bg fill (gradient + optional portrait IMAGE layer) ----
  applyBackground(coverFrame, cover, target.input);

  // ---- 2. Apply or rebuild icon frame ----
  await applyIcon(coverFrame, cover.icon);

  // ---- 3. Apply text colors + typeface to all cover text nodes ----
  applyCoverTypography(coverFrame, cover.text, delightAvailable);

  // ---- 4. Lock subtitle to 40px height in metadata ----
  applySubtitleLock(card);
}

// ------------------------------------------------------------------
// Background
// ------------------------------------------------------------------

function applyBackground(coverFrame: FigmaNode, cover: CoverOutput, input: CoverInput): void {
  const gradient = {
    type: "GRADIENT_LINEAR",
    visible: true,
    opacity: 1,
    blendMode: "NORMAL",
    gradientStops: [
      { position: 0, color: { r: cover.bg.top.r, g: cover.bg.top.g, b: cover.bg.top.b, a: 1 } },
      { position: 1, color: { r: cover.bg.bot.r, g: cover.bg.bot.g, b: cover.bg.bot.b, a: 1 } },
    ],
    // Vertical top-to-bottom
    gradientTransform: [[0, 1, 0], [-1, 0, 1]],
  };

  const fills: any[] = [gradient];

  // Layer 2c: portrait image on top of gradient
  if (input.portrait) {
    fills.push({
      type: "IMAGE",
      visible: true,
      opacity: 0.18,
      blendMode: "NORMAL",
      scaleMode: "CROP",
      imageHash: input.portrait.imageHash,
      imageTransform: input.portrait.imageTransform ?? [[1, 0, 0], [0, 0.62, 0.13]],
      filters: {
        exposure: 0.22,
        contrast: 0.05,
        saturation: -0.55,
        temperature: 0,
        tint: 0,
        highlights: 0.10,
        shadows: 0.15,
      },
    });
  }

  coverFrame.fills = fills;
}

// ------------------------------------------------------------------
// Icon
// ------------------------------------------------------------------

async function applyIcon(coverFrame: FigmaNode, icon: IconSpec): Promise<void> {
  // Find the existing icon frame (first FRAME child with a single VECTOR)
  const existing = coverFrame.children.find((c: any) =>
    c.type === "FRAME" && c.children?.length === 1 && c.children[0].type === "VECTOR"
  );

  if (!icon) {
    // Portrait cover: remove the icon frame if present (portrait occupies the layer)
    if (existing) existing.remove();
    return;
  }

  if (!existing) {
    throw new Error(
      "Cover has no existing icon frame — use createCardShell() to bootstrap a card with the standard structure before applying."
    );
  }

  const vector = existing.children[0];

  // Resize frame + reposition
  existing.resize(icon.size, icon.size);
  existing.x = icon.x;
  existing.y = icon.y;

  // Inner vector sizing:
  //   - Material Symbols naturally occupy ~75-85% of the frame (built-in padding)
  //   - Brand SVGs typically fill 100% of the frame — we shrink to 80% centered
  //     so the visible footprint matches a Material Symbol at the same frame size.
  if (icon.kind === "brand") {
    const innerSize = icon.size * 0.80;
    const inset = (icon.size - innerSize) / 2;
    vector.resize(innerSize, innerSize);
    vector.x = inset;
    vector.y = inset;
  } else {
    // Non-brand: preserve Material Symbol's native geometry
    vector.resize(icon.size, icon.size);
    vector.x = 0;
    vector.y = 0;
  }

  // Apply color + opacity on the vector's fill
  vector.fills = [{
    type: "SOLID",
    color: icon.color,
    opacity: icon.opacity,
  }];

  // Right-anchor constraint so icon follows cover width changes
  existing.constraints = { horizontal: "MAX", vertical: "MIN" };
}

// ------------------------------------------------------------------
// Text colors
// ------------------------------------------------------------------

function applyCoverTypography(
  coverFrame: FigmaNode,
  text: CoverOutput["text"],
  delightAvailable: boolean,
): void {
  // Walk all TEXT nodes in the cover; classify by fontSize → role → opacity.
  // Also switch font family to Delight (or fallback-tag Inter).
  const texts = coverFrame.findAllWithCriteria
    ? coverFrame.findAllWithCriteria({ types: ["TEXT"] })
    : findAllTextsFallback(coverFrame);

  for (const t of texts) {
    const { opacity, weight } = roleForFontSize(t.fontSize);

    // Color
    t.fills = [{ type: "SOLID", color: text.base, opacity }];

    // Font family
    if (delightAvailable) {
      t.fontName = { family: COVER_FONT_FAMILY, style: weight };
      // Clear PENDING marker if present
      if (t.name.startsWith("[PENDING-DELIGHT]")) {
        t.name = t.name.replace(/^\[PENDING-DELIGHT\]\s*/, "");
      }
    } else {
      // Fallback to Inter, tag for backfill
      t.fontName = { family: METADATA_FONT_FAMILY, style: weight };
      if (!t.name.startsWith("[PENDING-DELIGHT]")) {
        t.name = `[PENDING-DELIGHT] ${t.name}`;
      }
    }
  }
}

function roleForFontSize(size: number): {
  role:    "hero" | "support" | "label";
  opacity: number;
  weight:  "Regular" | "Semi Bold";
} {
  if (size >= 22) return { role: "hero",    opacity: 0.92, weight: "Semi Bold" };
  if (size >= 16) return { role: "support", opacity: 0.92, weight: "Semi Bold" };  // verb / delta-primary
  if (size >= 10) return { role: "support", opacity: 0.70, weight: "Regular"   };
  return           { role: "label",   opacity: 0.55, weight: "Semi Bold" };
}

function findAllTextsFallback(node: FigmaNode): FigmaNode[] {
  const out: FigmaNode[] = [];
  const walk = (n: any) => {
    if (n.type === "TEXT") out.push(n);
    if ("children" in n) for (const c of n.children) walk(c);
  };
  walk(node);
  return out;
}

// ------------------------------------------------------------------
// Subtitle height lock
// ------------------------------------------------------------------

function applySubtitleLock(card: FigmaNode): void {
  const meta = card.children.find((c: any) =>
    c.type === "FRAME" && c.name !== "Cover"
  );
  if (!meta) return;

  const textBlock = meta.children.find((c: any) => c.name === "TextBlock");
  if (!textBlock || textBlock.children.length < 2) return;

  const subtitle = textBlock.children[1];
  if (subtitle.type !== "TEXT") return;

  subtitle.textAutoResize = "TRUNCATE";
  subtitle.maxLines = 2;
  subtitle.textTruncation = "ENDING";

  // FILL horizontal handled by layout; height fixed to 40
  subtitle.resize(Math.round(subtitle.width), 40);

  // Re-apply FILL after resize (resize flips sizing modes to FIXED)
  try { subtitle.layoutSizingHorizontal = "FILL"; } catch (_) {}
}

// ------------------------------------------------------------------
// Card shell bootstrap (creates the standard structure)
// ------------------------------------------------------------------

/**
 * Create a new empty card with the canonical structure and auto-layout /
 * constraints set up correctly. Subsequent `applyCoverToFigma` calls then
 * fill in the content.
 */
export function createCardShell(parent: FigmaNode): FigmaNode {
  const card = (globalThis as any).figma.createFrame();
  card.name = "Card";
  card.resize(328, 302);
  card.cornerRadius = 12;
  card.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  card.strokes = [{ type: "SOLID", color: { r: 0.92, g: 0.93, b: 0.94 } }];
  card.strokeWeight = 1;
  card.effects = [{
    type: "DROP_SHADOW",
    color: { r: 0, g: 0, b: 0, a: 0.04 },
    offset: { x: 0, y: 2 },
    radius: 8,
    spread: 0,
    visible: true,
    blendMode: "NORMAL",
  }];
  card.layoutMode = "VERTICAL";
  card.primaryAxisSizingMode = "AUTO";
  card.counterAxisSizingMode = "FIXED";
  card.paddingLeft = 4;
  card.paddingRight = 4;
  card.paddingTop = 4;
  card.paddingBottom = 4;
  card.itemSpacing = 0;
  parent.appendChild(card);

  // Cover
  const cover = (globalThis as any).figma.createFrame();
  cover.name = "Cover";
  cover.resize(320, 140);
  cover.cornerRadius = 8;
  cover.clipsContent = true;
  card.appendChild(cover);
  cover.layoutSizingHorizontal = "FILL";
  cover.layoutSizingVertical = "FIXED";

  // Icon frame placeholder (default 100×100)
  const iconFrame = (globalThis as any).figma.createFrame();
  iconFrame.name = "IconFrame";
  iconFrame.resize(100, 100);
  iconFrame.x = 196;
  iconFrame.y = 22;
  iconFrame.fills = [];
  iconFrame.constraints = { horizontal: "MAX", vertical: "MIN" };
  cover.appendChild(iconFrame);

  const vector = (globalThis as any).figma.createVector();
  vector.resize(100, 100);
  vector.x = 0;
  vector.y = 0;
  iconFrame.appendChild(vector);

  // Metadata frame
  const meta = (globalThis as any).figma.createFrame();
  meta.name = "Metadata";
  meta.layoutMode = "VERTICAL";
  meta.primaryAxisSizingMode = "AUTO";
  meta.counterAxisSizingMode = "FIXED";
  meta.paddingLeft = 12;
  meta.paddingRight = 12;
  meta.paddingTop = 12;
  meta.paddingBottom = 12;
  meta.itemSpacing = 12;
  meta.fills = [];
  card.appendChild(meta);
  meta.layoutSizingHorizontal = "FILL";

  // TagRow, TextBlock, CreatorRow — minimal skeleton
  for (const name of ["TagRow", "TextBlock", "CreatorRow"]) {
    const row = (globalThis as any).figma.createFrame();
    row.name = name;
    row.layoutMode = name === "TextBlock" ? "VERTICAL" : "HORIZONTAL";
    row.primaryAxisSizingMode = "FIXED";
    row.counterAxisSizingMode = "AUTO";
    row.fills = [];
    row.itemSpacing = name === "TextBlock" ? 4 : 8;
    row.counterAxisAlignItems = "CENTER";
    meta.appendChild(row);
    try { row.layoutSizingHorizontal = "FILL"; } catch (_) {}
  }

  return card;
}
