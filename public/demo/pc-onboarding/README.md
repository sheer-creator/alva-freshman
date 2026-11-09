# PC Onboarding · Track

Desktop onboarding demo (Figma: Thesis MVP › PC Thesis › Onboarding · PC v3, node 14233:88697).

`index.html` is the entry; it sets `<base href="/demo/m-baby/onboarding/">` so it reuses the
mobile onboarding modules, styles and assets (`pc.js`, `pc.css`, `setup.js`, `cards.js`,
`intro.js`, `intro-track.js`) without copying them. The page is a full browser window, not
part of the mobile prototype gallery.

One modal for the whole flow — width min(864, viewport − 64), height min(640, viewport − 80) —
with a fixed 320 left rail and a right panel that only carries content. Notifications are
skipped. `?step=people|pick|track|portfolio|ready` jumps to a step (`&settled=1` for a finished
Signals list).
