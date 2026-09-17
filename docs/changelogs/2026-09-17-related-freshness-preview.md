# Related score and freshness preview

## Request and boundary
Display a Related score both on feed cards and in the thesis reading dialog, including existing entity bonuses. Preview the agreed 30-day freshness plateau and decay in the static GUI. The user will confirm the effect before a backend PR is opened; this change does not modify or publish backend code.

## Ranking
Keep the backend semantic top-100 cross-author candidate sets. Score is semantic cosine + 0.05 once for any shared company/person + freshness. Freshness is 0.03 for age 0–30 days, then halves every 30 days. Use original source publication time and a fixed snapshot as-of time, clamp future ages to zero. Candidate eligibility, direct/trending order, per-seed round-robin and mixer slots remain unchanged. Do not introduce a relevance cutoff in this experiment.

## Provenance and validation
Reconstruct baseline rankings from the real feature index, reproducing backend float32 normalization and cosine dot products. Require a full sequence match with the previously exported five backend streams before applying the bonus. Re-rank the entire semantic shortlist before selecting the top five Related items. Every displayed score records its seed, semantic score, entity bonus and freshness bonus. Outer-feed scores refer to the actual selected recall seed; dialog scores refer to the opened thesis.

Verified baseline: all five complete backend feed sequences and all 441 Related top-five lists match before the bonus. With freshness enabled, 340 Related top-five lists change; the cold-start stream stays unchanged.

Static snapshot and UI are explicitly labeled as a freshness experiment, not a newly deployed backend algorithm. Snapshot integrity/score validation, build and browser desktop/mobile smoke are required before publishing the preview.

## Verification outcome
Four snapshot tests pass, including every score component and temporal formula; build and syntax checks pass. Mobile browser smoke verifies outer scores, seed attribution, all five dialog scores, and no page errors. Only the Freshman preview is published; backend PR remains pending user confirmation.
