# m.baby mobile prototypes

This directory contains the browser-ready runtime imported from
[`RobertLee8888/m.baby`](https://github.com/RobertLee8888/m.baby) at commit
`8ec658ecb1f638c7e4f95d48f8737ee5c1392a03` (2026-10-22).

Open `/demo/m-baby/#/thesis-onboarding` for the current onboarding flow,
`/demo/m-baby/#/thesis-motion` for the navigation demo, or `/demo/m-baby/` for
the prototype gallery. Thesis onboarding is an additional entry; Thesis
navigation motion, Thesis, MVP onboarding, Alpha Radar mobile onboarding,
Immersive onboarding and MVP remain available. The motion demo includes detail, profile, ticker
and version-history navigation, with 29 versions across 11 theses. Page
expansion retains its rounded corners until full size, then squares them over
80 ms; returning restores the radius before movement.
The gallery owns its device previews, mobile routing and appearance controls, so
the Freshman demo switcher is intentionally disabled for this bundle. Internal
HTML documents are also hidden from the generated Freshman demo index.

Thesis onboarding follows the [current Figma section](https://www.figma.com/design/EHag6olZJxmlkf1hbAzSi7/Thesis-MVP?node-id=12552-199268):
login, continuous thesis/signal introduction, people, bookmarks, portfolio and
notifications. It uses the existing device frame, platform chrome and theme
controls, then enters the existing For You renderer. Login, broker connection
and notification permission are local simulations. Gallery Restart resets this
onboarding flow; browser refresh preserves its progress.

The handoff stores each selected thesis under a source-specific `onboarding-`
ID, retaining its exact content and only its own signals. It does not match
different theses by author name or replace the original eleven reference
theses. Notification preference (`allowed`, `denied`, `skipped`) and the exact
selected thesis IDs are stored locally; no system permission is requested.

The imported runtime is plain HTML, CSS and JavaScript. Update it from a tested
`m.baby` release rather than from an uncommitted working tree, then run
`npm run demo:index`, `npm run typecheck` and `npm run build`.
Two Track variants reuse the same pages with a different order:
`#/thesis-onboarding-track` (bookmark one thesis from the deck, watch Alva analyze
it in place, notifications, more theses, people, log in, portfolio) and
`#/thesis-onboarding-track-login-first` (log in first; portfolio and notifications
close the flow). Both are `onboarding/index.html?intro=track[&order=login-first]`
and keep independent saved progress (`thesis-demo-state.js` keys). The Track step
(`onboarding/intro-track.js`) pins the bookmarked card and streams the demo's
three signals beneath it; picks other than the Gavin Baker thesis reuse those
signals with placeholder analyses marked in the copy.

The onboarding extension is kept in `onboarding/` and `thesis-demo-state.js`.
Its state and resource checks run with
`node --test scripts/tests/thesis-onboarding-state.test.mjs` from the Freshman root.
