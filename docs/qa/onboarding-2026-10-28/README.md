# Onboarding browser QA — 2026-10-28

Tested locally at `http://127.0.0.1:8872/demo/m-baby/#/thesis-onboarding` using an isolated Chrome CUA tab. The independent QA tab was closed after testing. No Figma UI, existing user tabs, system preferences, or deployment was changed by this QA pass.

## Verified in browser

- Gallery has 7 entries: the new Thesis onboarding plus all 6 previous prototypes.
- Complete flow: Login → three-stage thesis/analyzing/signals intro → People → Bookmark → Portfolio → Notifications → the existing `#/thesis-motion` For You.
- Followed Gavin Baker and Satya Nadella during People. Gavin’s existing profile showed Following after handoff.
- Bookmark Next is disabled with 0 bookmarks and enabled with 1. Saving Gavin advances to the next unsaved card. Previous / Next thesis buttons browse in both directions, remain below the card, and the Bookmark action stays inside the card.
- Handoff produces a separate current-Figma Gavin thesis with the exact onboarding body and selected bookmark, using the original feed renderer. Its bookmark action is Remove bookmark / pressed. The pre-existing Gavin thesis remains a separate record.
- Portfolio follows Bookmark; skipping Portfolio goes to Notifications. The notification card reflects the selected Gavin thesis. The local demo Allow action proceeds to the original For You page.
- Intro headings change to “Alva analyzes each thesis.” then “Track what matters.”. The selected card contains real chart previews visible above the clipped lower edge. Analysis card is 108 px high and contains the logo, two middle skeleton bars, a right corner skeleton, and skeletons beside both status text lines.
- Signal cards contain source avatar, name, role, date, complete source summary with a real source link, Alva logo and stance, and complete analysis. No actions or line clamping are rendered. At 360 px, scrolling reached the final analysis (scrollHeight 837 / clientHeight 486 / scrollTop 351).
- All 6 Gallery devices were selected: iPhone 17 (402×874), iPhone Air (420×912), iPhone 17 Pro Max (440×956), Galaxy A16 5G (412×892), Galaxy S25 Ultra (412×915), Redmi 14C (360×820). Narrowest/common/largest received visual checks; the other three also passed width and container checks.
- Light and Dark surfaces checked, including 360 px dark Bookmark, Notifications, and full Signal cards. The Topbar covering the heading and cold-load theme message race were found, fixed by the integration agent, and verified after reload. Status icons appear after the absolute asset URL fix.
- Restart returns to Login. Restart during the Analyzing phase cancels the flow without later rendering a stale phase.
- Final captured browser console: 0 error/warning entries.

- Final validation: 6 state/resource tests passed; typecheck, production build, syntax checks, and git diff checks passed.

## Code-verified / limitations

- Reduced motion was reviewed in code, not simulated as an OS setting in this browser: matchMedia is respected at entry, a preference change finishes the intro immediately, transition animation is bypassed, and skeleton animation is disabled by CSS. Chrome CUA exposed no media-emulation capability. No OS preference was changed.
- Root rechecked the final dark back arrow, Bookmark / Next buttons, and notification permission dialog visually after the final fixes. The dialog remains readable, and Allow returns to the existing For You with the selected thesis bookmarked. See `14-final-dark-permission.png`.
- Syntax checks for intro.js and cards.js passed. No new unit tests were added for visual CSS refinements.

## Evidence

- `06-handoff-followed-profile.jpg` — existing profile with Following and the current onboarding thesis bookmarked.
- `07-bookmark-dark-360.jpg` — narrow dark card, in-card Bookmark and separate arrow row. Captured before the final shared back-arrow/text-token fix.
- `08-signals-dark-360.jpg` — narrow dark signal entry, complete first card.
- `09-signals-full-analysis-360.jpg` — final two signal cards fully scrolled into view.
- `10-signals-light-440.jpg` — largest device with readable complete analysis.
- `11-intro-analyzing-440.jpg` — selected thesis while focusing into the analyzing phase.
- `12-analysis-card-402.jpg` — analyzing phase, visible charts, all five skeleton blocks (captured during its entrance fade).
- `13-login-final-402.jpg` — final common-device login after interrupted-animation Restart.

Earlier captures that exposed fixed defects are retained under `before-fixes/` and are not final-state screenshots.
