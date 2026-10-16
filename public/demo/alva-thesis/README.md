# Alva Thesis Demo

Browser-only exploration built on Alva Freshman's mobile MVP shell. The original MVP is unchanged. Its fonts, shared CSS primitives, company logos and Jensen Huang portrait are reused.

Serve the Freshman public directory and open /demo/alva-thesis/:

~~~sh
python3 -m http.server 8906 --bind 127.0.0.1 --directory public
~~~

## Try it

1. Pick a company in the nine-ticker grid. The blur panel offers compact author-and-judgment rows. Select all / Clear all applies to that ticker’s public choices, leaving private drafts intact. The top-right switch selects or deselects the ticker; Done, Escape or the backdrop closes the panel. Choose theses, add a private thesis, or continue with only the ticker.
2. For You combines source-backed speech, fictional native discussion and Alva evidence replies. Start with MU / memory or NVDA / inference to see all three. A single context line opens the tracked thesis or actual reply target. Ticker chips open the company page.
3. A source appears once across followed theses. Related judgments are discovery cards with their own Follow action. Following a related thesis adds its complete discussion independently.
4. A Thesis page presents compact related-thesis links below its original judgment and above Discussion. Source dates and authors remain visible. **Reply** adds to the selected post’s discussion. **Add thesis**, available on the original judgment and in the reply composer, carries your text into a separate private thesis with an original-thesis reference and confirmation before saving. **Ask Alva** opens private scripted chat with the post’s context.
5. Alva citations expand to reveal Company Feed or simulated Anomaly evidence and the original source. A source post can stand alone; useful Alva takes appear as first-level replies.
6. Ticker pages show followed and discoverable theses plus source-deduplicated discussion. Cross-ticker theses share one follow state. Removing a ticker preserves explicit thesis follows.
7. Save a private thesis, then expand **Alva tracking** to confirm activation, pause/resume, or simulate an empty/failed run. Human replies continue while paused. Editing preserves the original judgment and shows an author update. Questions can open private chat without creating a thesis.
8. You contains interests, subscriptions, theme controls and demo information. Reset is beside Dark / Light outside the phone on desktop and requires confirmation. Reload preserves confirmed choices.

## Data boundaries

27 public-source angles cover nine tickers, using 33 dated sources, including three podcast episodes, thirteen practitioner X posts and an AMD product reference; 21 speaking authors have real portraits. The sources are historical, from 2024–2026; this is not a current-market feed. SOURCES in data.js is the provenance registry, including original URLs, dates, source types and coauthors where relevant.

Quotation marks indicate short excerpts. Other source text, thesis titles, monitoring questions and evidence readings are Alva summaries or interpretations. Satya Nadella's X excerpt is also preserved in the linked Stratechery article; direct X access was unavailable during verification. A company keynote, earnings statement or essay retains that source type and is not presented as a tweet.

Dylan Patel, Ethan Mollick, Andrew Ng, Jukan, Rihard Jarc, Ophir Gottlieb and Gary Black illustrate Alva members with a checkmark. Their memberships and Alva verification are simulated, as disclosed outside the phone and in About this demo. Real portraits and source-backed summaries retain their original links. Other imported authors carry Public source; Alva carries Agent. No endorsement is implied. Publicly accessible source material and portraits do not constitute permission for production republication; review rights and platform requirements before distribution.

Alva replies and private tracking runs are scripted. Company Feed and simulated Anomaly citations reuse historical source facts. Your replies stay on this device. No live ingestion, model execution, portfolio connection, scheduling, authentication or billing is implemented. No Credits are consumed. Recommendations use ticker overlap and direct thesis relationships.

The company grid's Select all / Clear all includes every company and its selectable theses. Shared theses are selected once. For You opens with one available example of each: member, independent X voice, multimedia, Agent and another source. Remaining posts keep chronological order; private user posts stay first. Subscription eligibility and source deduplication apply throughout.

For the refresh demonstration, the first eight eligible non-user posts form the opening; the remainder arrive in batches of up to three. With all theses followed, 26 existing historical posts provide nine refresh rounds. New arrivals appear above user posts, without duplication. Scrolling beyond two viewport heights can announce the next batch; clicking the notice, pulling down or using Refresh reveals it. Completion feedback clears automatically. Exhausted refreshes report that the feed is up to date. Navigation preserves delivery for the session; reloading or resetting restarts the simulation. Original dates and subscription eligibility are unchanged.

The composer keeps Review in the header, with watchlist-first ticker chips and code/name search across the demo companies. Selecting a company reveals up to three single-line ideas with author avatars. Selecting an idea changes only the input placeholder without copying text, following the idea or creating a parent relationship; existing draft text is preserved. Company selection is optional and toggleable; derived and edited theses retain their company context. Tracking focus stays in one horizontally scrollable row and can be skipped with its existing default. Review preserves private confirmation before saving. Following uses single-line rows; each row exposes the complete author and title to accessibility tools and on hover. Thesis detail root text uses regular-weight body-sized typography for reading.

Source previews retain small thumbnails and distinguish X, Reddit, YouTube and Podcast formats. Imported X posts use one author header and optional 96 × 72 px image. Source links sit beside ticker chips, followed by Excerpt or Summary. When a primary multimedia card already identifies the source and treatment, its footer keeps only tickers. Nested X previews are reserved for citations inside Alva replies. Ordinary articles and product documents use inline source links. Twelve selected source readings receive inline Alva interpretations; other readings retain their source and Ask access without an automatic reply. Interpretations explain the evidence change, its implication and the remaining uncertainty; they do not turn an author's expectation into a verified company result.

Chat's creation starter asks for a company and a personal judgment. Research questions receive a clarification prompt. A judgment opens a specialized inline card for editing the view, company and focus; it does not navigate to New thesis. Contextual focus adjustments use the same card to revise an owned thesis or derive a private view from public content. Saving stays in the conversation and shows a saved-thesis link without enabling tracking. Unsaved card edits survive navigation within the session and can be cancelled. This guidance is scripted, not live AI.

State remains isolated under alva_thesis_demo_v1. No runtime dependencies or build step are required.

## Author profiles

Select an author's name or feed avatar to open their profile. Profiles retain the member checkmark or Public source identity, portrait, publication and original source/account link. Theses include only that author's attributed, non-curated views. Posts are grouped by original source across thesis discussions; references to another author's thesis do not transfer authorship. Thesis follow controls share the existing subscription state. Back returns to the previous screen and scroll position.

## Multimedia and practitioner sources

Verified on September 7, 2026. Source text is paraphrased; Alva takes are separate interpretations. Image/video previews are 56 × 48 px, link to original material and do not autoplay. Media and the three new X profile images load from their publishers.

| Source | Date | Evidence used |
| --- | --- | --- |
| [Jensen Huang / Lex Fridman #494](https://lexfridman.com/jensen-huang-transcript/) | 2026-03-23 | Reasoning and agents, 25:32–28:12; memory supply chain, 41:06–41:55. Video timestamps follow the transcript's linked YouTube edition; the audio outline has different offsets. |
| [Satya Nadella / Dwarkesh](https://www.dwarkesh.com/p/satya-nadella) | 2025-02-19 | 15:18 economic growth and inference revenue as a demand signal. |
| [Mark Zuckerberg / Dwarkesh](https://www.dwarkesh.com/p/mark-zuckerberg-2) | 2025-04-29 | 11:34 chapter: assistant context, user learning and feedback loops. |
| [Ethan Mollick on X](https://x.com/emollick/status/1947482417888932258) | 2025-07-22 | Supervised agent use for chart maintenance; source's attached workflow image. |
| [swyx on X](https://x.com/swyx/status/1882933368444309723) | 2025-01-24 | Historical price-performance comparison; represents the author's pricing argument, not a current benchmark. |
| [Jiayi Pan on X](https://x.com/jiayi_pirate/status/1882839370505621655) | 2025-01-24 | Narrow Countdown experiment, cross-checked with the author's [TinyZero repository](https://github.com/Jiayi-Pan/TinyZero). The reported cost excludes training the base model. |
| [Vamsi Boppana / AMD](https://www.amd.com/en/blogs/2025/amd-instinct-mi350-series-and-beyond-accelerating-the-future-of-ai-and-hpc.html) | 2025-06-12 | MI350X memory specifications and official platform image, cited in Alva's reply to the AMD event. |

Additional posts: [Andrew Ng, January 27, 2025](https://x.com/AndrewYNg/status/1883972263177072730), on model competition benefiting application builders; [Andrej Karpathy, December 26, 2024](https://x.com/karpathy/status/1872362712958906460), on DeepSeek-V3's reported training efficiency.

X text, dates, handles, profile images and attachments were checked against X's `cdn.syndication.twimg.com/tweet-result` response for each post ID. The swyx and Karpathy responses truncate their long posts; summaries use only the returned openings. YouTube video IDs and thumbnails were checked with YouTube oEmbed.

## Additional KOL sources

Discovered through the alva skill's public KOL directory and ticker lens on September 7, 2026 (directory snapshot: 10:00:21 UTC). Each account's raw tweet records supplied the complete post text; the Arrays X URL lookup independently matched all eight handles, URLs, original dates and content types. This verifies the posts as recorded by Alva, not every underlying company claim. Direct unauthenticated X page access returned 403. Avatars use the directory's original X profile-image URLs. Selection is based on relevance and substantive reasoning, without a performance ranking.

| Author / original post | Original date | Existing discussion | Reading boundary |
| --- | --- | --- | --- |
| [Jukan: HBM pricing](https://x.com/jukan05/status/2082267807950184614) | 2026-07-29 | Memory demand | Relayed SK hynix Q&A; supplier explanation, not Micron margin evidence. |
| [Jukan: HBM supply](https://x.com/jukan05/status/2082645100187029829) | 2026-07-30 | Memory demand, supply cycle | Translation of Samsung management plans; not completed capacity. |
| [Rihard Jarc: consumer relationship](https://x.com/RihardJarc/status/2091878506359648466) | 2026-08-24 | Personal AI | Relayed interview opinion, not an official Meta commitment. |
| [Rihard Jarc: model integration](https://x.com/RihardJarc/status/2094424164241215655) | 2026-08-31 | Model distribution, AI efficiency | One employee's view; no benchmark or pricing forecast adopted as fact. Original attachment shown as a small preview. |
| [Ophir Gottlieb: supporting compute](https://x.com/OphirGottlieb/status/2085051195975242032) | 2026-08-05 | Compute demand, AMD software | Author's opportunity assessment with deployment caveats; original attachment preview. |
| [Ophir Gottlieb: concentration](https://x.com/OphirGottlieb/status/2088731325515911423) | 2026-08-15 | Compute demand, AWS demand | Author's revised risk assessment; no inferred concentration percentage. |
| [Gary Black: robotaxi tests](https://x.com/garyblack00/status/2096257060291649689) | 2026-09-05 | Autonomy, robotaxi economics | Questions about earnings, competition and safety; original attachment preview. |
| [Gary Black: customer acquisition](https://x.com/garyblack00/status/2096666423858765852) | 2026-09-06 | Autonomy | Author's marketing argument, not evidence of adoption. |

## Portrait provenance

Local files are resized public portraits. Face framing uses CSS; no generated likenesses.

| File | Person | Original asset |
| --- | --- | --- |
| ben.jpg | Ben Thompson | [Stratechery](https://stratechery.com/wp-content/uploads/2015/05/BenPortrait-medium-1.jpg) |
| aswath.jpg | Aswath Damodaran | [NYU Stern](https://www.stern.nyu.edu/sites/default/files/styles/480w_x_543h/public/media/adamodar.jpg?h=29e569de&itok=-Ya6jwO7) |
| dylan-photo.png | Dylan Patel | [Andes RISC-V CON 2024 speaker portrait](https://www.andestech.com/Andes_RISC-V_CON_2024_US/assets/img/speakers/Dylan%20Patel.png) |
| tasha.jpg | Tasha Keeney | [TashaARK on X](https://pbs.twimg.com/profile_images/1619163541470060544/8IhIvkOn_400x400.jpg) |
| satya.jpg | Satya Nadella | [Microsoft](https://news.microsoft.com/source/wp-content/uploads/2024/07/satya.jpg) |
| sanjay.jpg | Sanjay Mehrotra | [Micron](https://dmassets.micron.com/is/image/microntechnology/sanjay-mehrotra-01%3A1-1-carousel?dpr=off&ts=1744755194482) |
| tim.jpg | Tim Cook | [Apple](https://www.apple.com/leadership/images/bio/Tim_Cook_bio.png.og.jpg?1788376247103) |
| andy.jpg | Andy Jassy | [American Academy of Arts & Sciences](https://www.amacad.org/sites/default/files/person/headshots/Jassy%20Headshot.jpg) |
| mark.jpg | Mark Zuckerberg | [WIRED archival portrait](https://media.wired.com/photos/5c54e3eca9851f2c3080460f/1%3A1/w_1190%2Ch_1190%2Cc_limit/FB-Oct2007-wi200710_101_pdf.jpg) |
| lisa.jpg | Lisa Su | [Lenovo Tech World speaker portrait](https://p1-ofp.static.pub/ShareResource/events/techworld/2025/images/lenovo-tw-speaker-lisa-su.jpg) |
| sundar.jpg | Sundar Pichai | [World Bank Live](https://s7d1.scene7.com/is/image/wbcollab/sundar_pichai_google_ceo-1%3Afb?qlt=90) |

Jensen's portrait remains in the sibling MVP's people/jensen.jpg asset.

## Checks

### Profile and ticker detail

Ticker headers put company identity and price on one row, with change/symbol underneath and the snapshot date beside the range controls. The 160px chart leaves the research tabs and substantive views visible on the first screen.

Profiles have one chronological, source-deduplicated author stream. Original theses and contributions appear together; “In discussion” links indicate context, not authorship or agreement. Inline Alva commentary stays in the discussion/feed rather than the author's profile. Ticker, composer inspiration, Related theses and Following share the same single-line avatar/author/title component.

Ticker detail uses `market-snapshot.json`: real Alva Arrays `/api/v1/stocks/kline` daily OHLCV, fetched September 7, 2026, with the final regular session on September 4. Nine companies have 1M/3M/6M viewing windows, volume and crosshair values. It is a historical snapshot, not a live quote. Adjustment convention is unspecified by the provider. One invalid AMD candle (April 17: open above high) was excluded and retained in the rejection record; no candle was synthesized. `scripts/fetch-thesis-candles.js` is the read-only Alva jagent fetch script; credentials are resolved only in the runtime, never shipped in the demo. The existing sibling MVP's licensed Lightweight Charts 5.2.1 library is reused.

Ticker research now has four functional tabs: Theses, Earnings, Peers and Smart Money. Clicking the active Theses tab (label or chevron) opens its filter; clicking from another tab returns to the stream. The picker uses aligned icon/avatar rows and a single trailing check, with no selection fill or navigation chevrons. A selected filter shows an avatar, full title, change action and one-tap clear below the tabs; unfiltered mode has no extra row. Arrow-key navigation switches tabs without opening the picker. There is no separate Latest discussion section. Arrays, Daily candles and Price data & source chrome were removed; dated close and accessible OHLC data remain, and provenance stays in the snapshot and this README.

Earnings links official IR materials for all nine companies. Tesla additionally shows Q2 2026 reported revenue, diluted GAAP EPS and common-stockholder net income, verified against its [June 30, 2026 10-Q](https://www.sec.gov/Archives/edgar/data/1318605/000162828026049270/tsla-20260630.htm), with a link to the [July 22 webcast](https://ir.tesla.com/webcast-2026-07-22). Peers provides editorial business-comparison lenses with internal ticker navigation or official IR destinations. Smart Money offers disclosure links and separately labeled existing investor commentary; it does not claim live holdings, trades or institutional flow data. Original Feed APP remains unchanged.

~~~sh
node --test scripts/tests/alva-thesis.test.mjs
node --check public/demo/alva-thesis/app.js
node --check public/demo/alva-thesis/model.js
node --check public/demo/alva-thesis/data.js
~~~

Tests cover attribution, varied statement length, selectable theses, source deduplication, independent follow relationships, three content origins, cross-ticker identity, private ownership, manual replies during paused tracking, empty/failed runs, reply validation and legacy-state persistence. Browser QA covers onboarding, feed, ticker/discussion links, evidence expansion, private creation and tracking controls.

Thesis details include 30 scripted Alva tracking cards across ten main theses: two historical event checks and a dated audit per thesis. Audits distinguish the verdict, missing evidence and next checkpoint, with links into the existing source registry. All are labeled Demo replay; they are not live monitoring results. They join the detail discussion chronologically, support replies and private chat, and do not enter home delivery or private-thesis tracking.
