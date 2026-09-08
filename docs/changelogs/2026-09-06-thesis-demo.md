# feat: add a standalone thesis experience demo

## Publication snapshot — September 8, 2026

The sections below record the initial implementation. The final demo now includes 27 source-backed thesis angles, varied KOL/member content, incremental feed refresh, profiles, inline chat creation, and ticker research tabs with historical OHLCV. Memberships, verification and Alva responses remain simulated. `public/demo/alva-thesis/README.md` describes the final experience and source boundaries.

The user requested a simple Freshman-only PR. Final checks: 43 Node tests, JavaScript syntax, `npm run typecheck`, `npm run build`, and `git diff --check` pass. Build emits existing Lottie eval and chunk-size warnings. Recent browser QA covers ticker filtering, selected states and clearing; earlier flow QA is recorded below and in the demo README. No backend or production SPA changes, new dependencies, migrations or mono-meta pointer changes. Full-stack E2E is unnecessary for this static demo. No merge is authorized.

## 1. Background and Current State

Freshman's `public/demo/alva-mobile-mvp` is a browser-only HTML/CSS/ES-module prototype at `c9b6bf8e`. It provides a Delight-based phone frame, dark/light tokens, For You / Chat / You tabs and source/Ask Alva sheets. Its local state uses `alva_mvp_demo_v1`.

## 2. Problem Model and End-to-End Behavior

- B1: Select one ticker or theme, or skip, then explore ready-made theses.
- B2: Follow a thesis and immediately see its current judgment, counterevidence and next checkpoint, with updates in For You.
- B3: Enter a personal idea, review a compact tracking preview, then create a locally saved personal thesis.
- B4: Ask about a contextual update; review a tracking adjustment before creating a personal version; show a subsequent simulated update reflecting the adjustment.
- B5: Preserve the original prototype. Persist the new demo independently and provide reset.
- F1: Reject blank personal inputs without creating data; unknown routes recover to the feed.
- F2: If storage is unavailable, keep the session usable and visibly explain that persistence is unavailable.
- Scope: Local frontend prototype, sample content and scripted responses only. No real AI, account connections, paid execution or publishing.

## 3. Research, Findings, and Architecture Decision

- D1: Add `public/demo/alva-thesis/`; reuse the existing mobile CSS primitives, font files and ticker assets through relative URLs. Keep all new JS state isolated.
- D2: Keep For You / Chat / You navigation, progressive options, inline updates and sheets. Thesis detail adds a concise persistent judgment and evidence context.
- D3: Use clearly labeled fictional sample research. Existing public theses are immutable; personal changes create or revise personal copies after confirmation.
- Existing patterns: `alva-mobile-mvp/index.html`, `css/app.css`, `js/state.js`, `js/app.js`. No outside research needed for this local mock expansion; the product proposal already covers the interaction rationale.
- R1: Scripted responses and sample updates validate navigation and presentation, not real research quality.

## 4. Implementation Design

- `index.html` and `style.css`: original visual shell plus independent screens and accessible modal sheets.
- `data.js`: three thesis fixtures, ticker/theme metadata, sample evidence and updates.
- `model.js`: pure state transitions for following, personal creation and revision. Namespaced localStorage is handled in app.js; all user text is HTML-escaped when rendered.
- `app.js`: hash navigation, screen rendering, delegated actions, input previews, follow/ask/edit interactions, persistent state and reset. Scripted responses never claim arbitrary model execution.
- `scripts/tests/alva-thesis.test.mjs`: native Node behavior tests, no dependencies.
- `README.md`: preview URL, covered flows and simulation limits. Run existing demo-index generator for discovery.
- No backend, schema, SPA routes, migrations or deployment changes. User-requested deliverable is a locally runnable demo.

### Serial Implementation Checklist

- [x] Add fixtures and pure model, with state-transition tests.
- [x] Build independent shell, first-use selection, feed, detail, creation, chat and adjustment.
- [x] Generate index, run syntax/state checks and browser smoke tests at phone and desktop sizes.
- [x] Review complete scoped diff and record evidence.

## 5. Verification and E2E Design

- `node --test scripts/tests/alva-thesis.test.mjs`: follow/unfollow, input validation, immutable public originals, personal revision, idempotent update preview, persistence parsing.
- `node --check public/demo/alva-thesis/app.js` and equivalent checks for data/model.
- `npm run demo:index`; `git diff --check`.
- Browser smoke: onboarding with one selection; public follow; sources; scripted question; cancel/confirm adjustment; next update; personal creation; reload persistence; reset; mobile overflow and keyboard modal close.
- Full service-stack E2E Required: no — no server contracts change. Browser interaction QA is required for the complete static demo flow.
- Lint unavailable: repository has no `make lint-fix`. SPA typecheck/build are outside the static change boundary; static asset loading and syntax are checked directly.

## 6. Human Decisions and Interaction

The user approved an independent demo preserving the original, with ticker/theme entry, ready-made or personal thesis creation, judgment/counterevidence/checkpoint, Ask Alva and next-update adjustment. Local mock state and no real AI/accounts/credits were confirmed by “继续”. Implementation uses the existing browser-only pattern without introducing external services.

## 7. Outcome and Evidence

- Implemented the complete static path at `/demo/alva-thesis/`, with three fictional public theses and custom private versions. The original MVP directory and its storage key are unchanged.
- B1–B5: browser-verified selection of one ticker, public follow and initial state, sources, contextual questions, cancel/confirm, personal creation, revised sample update, reload persistence, profile and reset.
- F1: blank idea showed the inline error; unknown thesis route recovered to For You. F2: storage exception handling reviewed; an unavailable-storage browser environment was not forced.
- Main-agent review covered all new files and the generated directory/switcher outputs. Fixed long inherited titles, stale revision summaries, malformed stored IDs, the close glyph, light-theme contrast and a 2px narrow-screen overflow; reran checks after the fixes.
- `node --test scripts/tests/alva-thesis.test.mjs`: 7/7 passed on final content. Syntax checks for app.js, model.js and data.js passed. `git diff --check` passed.
- `npm run demo:index`: generated 20 entries. The generator also refreshed pre-existing summaries, author metadata and ordering from current files/history; source pages were not edited.
- Browser smoke via Codex in-app browser: 1280×720 desktop, 390×844 phone and 320×740 narrow phone; dark and light themes; Escape closes source dialogs. Final narrow-screen DOM widths: viewport 320px, content 320px. No console errors/warnings observed.
- Preview server: `python3 -m http.server 8906 --bind 127.0.0.1 --directory public`. The deliverable tab is reset to the first-use screen.
- Local-only result, branch `leo/thesis-demo`. No PR, push, production writes or real AI/credit execution.

## 8. Remaining Work

No required demo work remains. The prototype uses scripted replies, a compact two-event history and separate public/personal cards; it does not validate live research, scheduling, billing or deduplication. Service-stack E2E and the unrelated SPA build/typecheck were not run because no service or SPA code changed.
