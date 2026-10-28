# Thesis onboarding: motion that explains relationships

Request: reduce ordinary horizontal page entrances and use motion to communicate how the next page relates to the current one. Static page structure, copy, selection rules and the existing Splash remain the reference.

| Relationship | Implemented behavior | Information conveyed |
| --- | --- | --- |
| Login → introduction | Login fades; the title and three thesis rows appear as content groups. The introduction clock starts after the entrance. | Entering the content experience; the first reading interval is preserved. |
| Introduction → People → Bookmark | Navigation coordinates stay fixed. The task area changes; the thesis deck rises and its existing back cards fan into position. | Moving between setup tasks and then choosing among multiple views. Following people does not currently filter this demo’s candidates, so avatars do not morph into cards. |
| Bookmark action | Immediate “Bookmarked” confirmation, then the saved card recedes in place and the next candidate rises from the deck. | Saving is distinct from browsing. Left/right movement is reserved for explicit Previous/Next card navigation. |
| Bookmark → Portfolio | The visible candidate fades neutrally. The existing explanation appears before the broker list. | Adding holdings as context. The outgoing candidate may be unsaved; it is never presented as the saved result. |
| Portfolio → Notifications | Actual saved thesis cards appear, followed by their existing Tracking signals status and notification controls. | These are the views being tracked; alerts relate to those views. Skipping portfolio connection preserves this same meaning. |
| Notifications → For You | The notification surface remains until the original Feed reports content ready; then the views crossfade. | Continuing into the product without a blank intermediate screen or a false shared-card transformation. |

Back navigation is a short revisit, not a reversal of saving or tracking. Page motion can settle immediately on a deliberate tap, keyboard focus or Reduce Motion change. Rapid navigation cancels previous animations before the next route starts.

## Basis

- **User request:** change motion to express content relationships, while retaining the established flow and page design.
- **Existing Alva motion specification:** 120/160/240/280ms duration roles, bounded displacement and no bounce. `onboarding/transitions.js` owns the page choreography; `cards.js` owns card actions.
- **Prior mobile onboarding research:** Finimize’s historical screens keep one value proposition and a primary visual together; Seeking Alpha’s detail/alert structures retain the specific research object. Alva applies those structural ideas by keeping the thesis identity visible when confirming tracking. The static references do **not** establish those products’ animation timings or effects. Research record: Alva-design project, `onboarding-research/2026-10-28-flow-density/comparative-research.md`.
- **[Apple motion guidance](https://developer.apple.com/design/human-interface-guidelines/motion):** motion should support understanding and remain optional. The timings here are Alva implementation choices.

## Validation

Passed: complete Gallery flow, immediate Bookmarked feedback, continuing during the save animation, repeated forward/back navigation, and the actual saved Gavin Baker thesis on both Notifications and For You. Light 440px and dark 360px device views were checked. A development server delayed Feed HTML by 3 seconds: the notification screen stayed visible, and switching to another Gallery prototype cancelled the pending handoff without a late route takeover. Startup Splash is retained.

Syntax checks, six onboarding-state tests, typecheck and the production build passed. Reduced-motion and cancellation edge cases also passed isolated lifecycle checks; OS-level reduced-motion emulation was not available in the browser tool.
