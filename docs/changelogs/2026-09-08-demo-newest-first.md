# Demo directory: newest first

## 1. Current state
Lifecycle priority places the new Thesis exploration below older active demos.
## 2. Behavior
Sort all demo entries by displayed update date descending, with stable path ties and undated entries last. Keep lifecycle labels.
## 3. Design
Remove only the lifecycle sort priority; preserve metadata extraction and page styling.
## 4. Implementation
Update the generator and regenerate the directory and shared switcher. Document the ordering.
## 5. Verification
Generator syntax, regeneration, all generated dates descending, identical directory/switcher route order, and diff check. Full-stack E2E not applicable.
## 6. Scope
Small follow-up PR in Freshman; no merge or changes to individual demos.
## 7. Outcome
Generator syntax and regeneration pass. Verified all 20 directory dates descend, Thesis is first, and switcher routes match directory order. Date extraction in the initial verification command matched prose; corrected it to target demo-updated metadata and reran successfully. Diff check passes. No page styling or metadata extraction changes.
## 8. Remaining work
PR submission; merge remains a human action.
