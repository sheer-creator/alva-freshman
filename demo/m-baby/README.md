# m.baby mobile prototypes

This directory contains the browser-ready runtime imported from
[`RobertLee8888/m.baby`](https://github.com/RobertLee8888/m.baby) at commit
`a14386e12f630a3226ca6032d0d621a308a08d5e` (2026-10-22).

Open `/demo/m-baby/#/thesis-motion` for the latest navigation demo, or
`/demo/m-baby/` for the prototype gallery. Its current entries are Thesis
navigation motion, Thesis, MVP onboarding, Alpha Radar mobile onboarding,
Immersive onboarding and MVP. The motion demo includes detail, profile, ticker
and version-history navigation, with 29 versions across 11 theses. Page
expansion retains its rounded corners until full size, then squares them over
80 ms; returning restores the radius before movement.
The gallery owns its device previews, mobile routing and appearance controls, so
the Freshman demo switcher is intentionally disabled for this bundle. Internal
HTML documents are also hidden from the generated Freshman demo index.

The imported runtime is plain HTML, CSS and JavaScript. Update it from a tested
`m.baby` release rather than from an uncommitted working tree, then run
`npm run demo:index`, `npm run typecheck` and `npm run build`.
