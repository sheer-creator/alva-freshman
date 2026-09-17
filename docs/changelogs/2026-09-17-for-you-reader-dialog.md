# For You reading dialog

## Request
The user requested opening a thesis from the whole card body, showing original text and Related theses together by default, removing Not interested, and aligning thesis action terminology with Save / Saved.

## Implementation
The card body is mouse and keyboard accessible. The reading dialog renders the original text and all exported Related hits immediately. Save and original-source links remain separate actions. Removed the hide action and all filtering based on previous local hidden state; existing saved items remain intact. Ranking and snapshot data stay unchanged.

## Validation
JavaScript and snapshot integrity checks, production build, browser desktop/mobile interactions and keyboard opening. Publication through the existing Freshman PR and deployment flow.
