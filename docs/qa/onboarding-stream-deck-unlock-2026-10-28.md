# Onboarding stream, real card deck, and notification unlock

Scope: the existing Freshman Gallery `#/thesis-onboarding`, following the 2026-10-28 feedback. Splash, login, people, portfolio, exact bookmark identity and the existing For You handoff remain in the same flow.

## Behaviour

- The selected thesis stays in place. The analysis block approaches from below, closes its seam with the thesis and continues to shimmer. Its task subtitle rotates through source-reading, relevance, supporting/challenging evidence and monitoring descriptions.
- Tickers appear below the attached pair. Each arriving signal is inserted at the top of the signal list, displacing earlier signals downwards. Got it appears after the first signal and does not end the stream. Arrival intervals alternate between randomized 2.8–5 second and 4.2–7 second waits. The three existing source-backed records cycle as demo content; no live data request or fabricated fourth record is implied.
- Scrolling down to read or focusing a source link pauses reordering. Returning to the top permits it to resume. Hidden pages suspend motion; cleanup cancels timers and animations. Reduced Motion presents a static, readable final state.
- The brand mark uses the existing dual-colour drawing from `Alva-design/alva-glass-orb/index.html`'s `TEX_GREEN` asset: white connecting curves and black blocks, unchanged path geometry. It is not flattened or inverted. A green backing makes both parts legible. The incorrect single-colour file was removed.
- Bookmark Previous, Bookmark and Next controls sit in one row inside each card. Every exposed back layer is another actual thesis article with an author and body. The same DOM article is promoted, scaled and straightened in 280ms. Saved state persists before the next card is promoted; at least one bookmark is required to continue.
- Notification heading and navigation use the setup-page structure. Skip is top-right. A slider progressively removes the preview-card blur and opens the existing simulated permission sheet at 92%. Partial/cancelled drags reset. Pointer travel accounts for Gallery scaling. Arrow keys, Home/End and Enter/Space work; closing the sheet allows retry.
- Notifications show the exact saved theses and the existing three signals. Signals explicitly name Gavin's thesis; when Gavin is not selected they are labelled Signal preview, so they cannot be mistaken for evidence attached to another saved thesis. Authentication, brokerage and notification permission remain simulated.

## Validation

- `npm run typecheck` and `npm run build` passed. Build retains existing lottie eval and large-chunk advisory warnings.
- `node --test scripts/tests/thesis-onboarding-state.test.mjs`: 6 passed, covering exact content/signal identity, persistence, completion and restart behaviour.
- JS syntax and `git diff --check` passed.
- Isolated interaction/lifecycle checks covered real-node deck promotion, rapid navigation, save confirmation, last/all saved states, keyboard/swipe, reduced-motion changes and cleanup; notification drag geometry at 20 width/scale combinations, cancellation, retry, allow/deny/skip and cleanup; intro hidden-animation ownership and settling timers/promises.
- In-browser Gallery checks: Splash and login; continuing signal emissions after Got it; cycling subtitle and resolved black/white logo; light/dark themes; 320px, 360px and 440px layouts; real back-card identity promoted to the front; in-card controls; multiple saved thesis/signal previews; 50% slider blur state, partial drag reset, scaled pointer completion, Escape and retry, keyboard completion and Allow → existing For You with the exact saved Satya thesis.

Visual constraint: the full thesis, attached analysis and complete signal cards exceed short-phone height. The output area scrolls naturally, retaining chart previews and full signal content instead of shrinking text or automatically pushing the thesis upwards.
