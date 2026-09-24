# Thesis detail tracking replay

## 1. Request
Add more mocked Alva event/news follow-ups and thesis audits; keep this a lightweight demo.

## 2. Behavior
Ten main public theses get two evidence checks and one later audit each. Display historical sources, a clear Demo replay label, a specific conclusion, missing proof and next checkpoint. Existing discussion remains newest-first.

## 3. Boundary
Scripted synthesis of the existing historical source registry. No live monitoring, invented disclosures, automatic investment actions or mock events on private theses. Home delivery and profile attribution stay unchanged.

## 4. Implementation
Add tracking.js, detail-only thesisActivity, restrained tracking-card rendering and functional reply/private-chat context. No dependencies or production services.

## 5. Checks
Node tests cover provenance/date ordering, detail scope, private isolation and reply lookup. Browser smoke covers event/audit rendering and evidence disclosure.

## 6. Execution
Implement dataset, model and UI serially; validate with the existing demo suite and local browser. Publication authorized in the follow-up request; submit a separate PR against main.

## 7. Outcome and evidence
Implemented 30 cards on ten public theses, ordered with existing discussion. `node --test scripts/tests/alva-thesis.test.mjs`: 46 passed. `node --check` for app.js, model.js and tracking.js passed; `git diff --check` passed. Local HBM browser smoke verified rendering, expanded missing-evidence disclosure, full audit in Replies, and the exact audit context in private chat. Light-mode screenshot inspected. Full-stack E2E is unnecessary for static mock data and local interactions.

## 8. Limits
Demo-only change; production deployment follows human merge. Sources come from the existing historical registry and are not refreshed in this change. Other public angles and private theses retain their existing behavior.
