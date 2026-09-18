# m.baby mobile prototypes

This directory contains the browser-ready runtime imported from
[`RobertLee8888/m.baby`](https://github.com/RobertLee8888/m.baby) at commit
`8bf2529`.

Open `/demo/m-baby/` for the prototype gallery. Its current entries are Thesis,
MVP onboarding, Alpha Radar mobile onboarding, Immersive onboarding and MVP.
The gallery owns its device previews, mobile routing and appearance controls, so
the Freshman demo switcher is intentionally disabled for this bundle. Internal
HTML documents are also hidden from the generated Freshman demo index.

The imported runtime is plain HTML, CSS and JavaScript. Update it from a tested
`m.baby` release rather than from an uncommitted working tree, then run
`npm run demo:index`, `npm run typecheck` and `npm run build`.
