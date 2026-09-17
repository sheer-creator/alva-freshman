# For You Feed — real recommendation snapshot

Open `/demo/for-you-feed/` through any static HTTP server. No backend, database, API keys or build step is required for this demo itself.

- 441 original public current theses from catalog v1.8.46, including source timestamps, authors and original media links.
- Five interest profiles with complete, ordered backend feed snapshots and exact Direct / Related / Platform pool provenance, displayed as Following / Related / Trending.
- Per-thesis Related results and scores exported from the running backend.
- New isolated test readers use the original watchlists and thesis-follow baselines; previous manual QA read/hide events do not affect these streams.
- Saved thesis state is stored only in this browser under `alva-for-you-snapshot-v1`. Reset clears this local state. Saving never reranks the frozen stream. Click a card body to open the full text and its Related theses together; no hide action or hide filtering is applied.
- Original images/avatars load from external source URLs. The content and recommendation data are static, but image availability depends on those hosts.
- Trending reflects a local backend ranking without real popularity data; it is not evidence of production popularity. Historical updates are not included.

`snapshot.json` records export time, source SHA-256, baseline follows, content, feeds and Related results. No embeddings, signed pagination tokens or credentials are included. The displayed ranking uses the original algorithm; the discussed recency bonus has not been implemented.
