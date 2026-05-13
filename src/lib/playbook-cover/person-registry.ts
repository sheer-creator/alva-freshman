// person-registry.ts — curated public-figure portraits for portrait covers
//
// Why this exists: production was rendering "Buffett Watch" with a stock photo
// of someone who isn't Warren Buffett, because the user's app had hardcoded
// the wrong image href. The fix is the same pattern as brand-registry: the
// SKILL ships a curated registry, the user's app reads from it.
//
// Rules:
//   - Only specific named real-world public figures (NOT generic personas;
//     validatePortrait throws on personas)
//   - Wikimedia Commons `Special:FilePath/<filename>.jpg` URLs preferred —
//     they redirect to the actual upload URL and stay stable across MD5
//     path changes
//   - License must be explicit (PD / CC0 / CC-BY / CC-BY-SA / official)
//   - Source aspect ratio must be ≥ 1.5 (landscape) — vertical-portrait
//     sources don't fit the wide cover
//   - `fallbacks` lists alternate URLs in case the primary fetch fails
//
// Adding a new person:
//   1. Find a Wikimedia Commons image, verify license is one of the allowed.
//   2. Use `Special:FilePath/<filename>` form for stability.
//   3. Eyeball portraitH (warm 20-50°, cool 200-240°, neutral 100-140°).
//   4. Verify imageAspectRatio ≥ 1.5.
//   5. Add an entry below; bump lastVerified.

import { PersonRegistry } from "./types";

export const PERSON_REGISTRY: PersonRegistry = {
  "Warren Buffett": {
    name: "Warren Buffett",
    // Wikimedia Special:FilePath redirects to the canonical upload URL —
    // this Fisher College of Business photo is the same image used in the
    // Direction D Figma sample card (imageHash c69f9aed25... in Figma).
    imageHref:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Warren_Buffett_with_Fisher_College_of_Business_Student.jpg",
    fallbacks: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Warren_Buffett_at_the_2015_SelectUSA_Investment_Summit.jpg",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Warren_Buffett_KU_Visit.jpg",
    ],
    portraitH: 30,                // warm interior wood + skin tones
    imageAspectRatio: 1.5,         // 4:3 source after Wikimedia thumbnail
    source:
      "https://commons.wikimedia.org/wiki/File:Warren_Buffett_with_Fisher_College_of_Business_Student.jpg",
    license: "CC-BY",
    capturedYear: 2017,
    lastVerified: "2026-04-27",
  },
  // Template — uncomment + fill in to add new persons:
  //
  // "Stanley Druckenmiller": {
  //   name: "Stanley Druckenmiller",
  //   imageHref: "https://commons.wikimedia.org/wiki/Special:FilePath/...jpg",
  //   fallbacks: ["..."],
  //   portraitH: 0,                 // estimate dominant hue
  //   imageAspectRatio: 1.78,       // 16:9 etc
  //   source: "https://commons.wikimedia.org/wiki/File:...jpg",
  //   license: "PD",
  //   capturedYear: 2023,
  //   lastVerified: "2026-04-27",
  // },
};

// ---------- Lookup helper ----------

/**
 * Look up a person entry by name. Returns null if the subject isn't in the
 * registry — the caller is expected to either supply their own portrait
 * data (with the same shape) or switch the playbook to a non-portrait
 * template (per validatePortrait scope rule).
 *
 * Matching is case-insensitive trim-tolerant; "Warren Buffett",
 * "warren buffett", "  Warren Buffett  " all resolve to the same entry.
 */
export function lookupPerson(name: string): PersonRegistry[string] | null {
  if (!name) return null;
  const norm = name.trim().toLowerCase();
  for (const key of Object.keys(PERSON_REGISTRY)) {
    if (key.toLowerCase() === norm) return PERSON_REGISTRY[key]!;
  }
  return null;
}
