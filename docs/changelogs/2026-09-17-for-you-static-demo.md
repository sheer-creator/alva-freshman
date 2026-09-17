# For You recommendation snapshot demo

## 1. Request and scope
Publish the existing local For You feed reading experience under Alva Freshman's Demo directory on alva.baby. Preserve real thesis text, source media URLs, backend order, Related scores, and the compact English source labels.

## 2. Data and behavior
The snapshot contains all 441 current public theses from catalog v1.8.46. It excludes 1,008 historical updates. Five dedicated local readers reproduce the original baseline ticker and thesis follows, without prior manual-test read/hide history. Each stream is paginated from the real backend through exhaustion. Pool labels come from the backend's persisted candidate records. Related results are exported from the real API for every thesis.

## 3. Boundaries
This is a static exploration demo, not a live recommendation service. Follow and hide state is browser-local and does not retrain or rerank the snapshot. Reset restores baseline follows and clears local hides. Trending is the local backend's platform pool; the source catalog has no real popularity events. Images and avatars retain original HTTPS links and require those external hosts to remain available. No credentials, signed cursors, local service addresses, embeddings, or private operational records are published.

## 4. Implementation
Add public/demo/for-you-feed/index.html, app.js, snapshot.json and README.md. Reuse the local page's visual layout and card rendering, replace live service calls with a single static JSON load, and retain infinite scrolling, reader switching, Related expansion, reading dialog, original-source links, and local follow/hide interactions. Generate the shared Demo index and switcher using the repository script.

## 5. Validation
Passed: 441 original bodies, source timestamps and media arrays match the import; five complete 441-item unique streams; all 441 Related lists resolve to other authors in descending score order; static-only data load and isolated label classes. Node snapshot tests (3/3), JavaScript syntax and TypeScript checks pass. Desktop and 390px mobile browser smoke covered switching, 10-to-20 item infinite scroll, five Related results, reading dialog, local follow/hide persistence and reset; no page errors, no mobile horizontal overflow, zero center offset between names and labels. Build passes with existing lottie eval and large-chunk warnings. Deployed verification follows merge.

## 6. Authorization
The user requested the complete static demo and real data in Freshman's Demo directory for colleagues to experience, and identified alva.baby as the formal domain. Existing unrelated checkout modifications remain untouched in a separate worktree.

## 7. Outcome
Static demo complete; publishing through the existing main-branch Pages workflow. Snapshot JSON is approximately 506 KiB. Requested NU interest has no entity in the source sample and is omitted from the effective ticker list, consistent with the original importer; requested tickers remain recorded separately.

## 8. Remaining limitations
Images remain remote resources. Fresh recommendation generation requires re-exporting from a running backend. No time bonus or relevance-threshold changes are included.
