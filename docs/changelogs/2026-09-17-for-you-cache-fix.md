# Prevent mixed For You GUI asset versions

## Failure
A browser received the new HTML without the right-side watchlist, but reused cached old `app.js` which still wrote to `#interests`. This caused a null innerHTML error and prevented the feed from loading. The fixed-name snapshot URL also allowed incompatible data and code versions to mix.

## Fix
Generate content-hashed script and JSON files in `releases/`. Each HTML version references its matching script, and each generated script references the matching data hash. Run generation before dev/build and retain older releases for cached HTML. Source files remain editable at their original paths. No recommendation or dataset changes.

## Validation
Verify hashes and script/data linkage, existing snapshot integrity tests, build, and live browser requests to the versioned paths. The stale script's `#interests` write was confirmed against the previous commit; new HTML and current source no longer reference that node.
