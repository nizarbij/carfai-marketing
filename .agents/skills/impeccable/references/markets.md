# CARFAI — market structure

> Phase 0 reference. **Revised 2026-08-23.**
>
> **Current plan: English only.** One account per platform, `carfai.info@gmail.com`,
> all created 2026-08-23. FR / ES / AR are designed below and deferred — bring
> them online once the EN posting rhythm is proven sustainable.
>
> The original decision was multi-market from day one. It changed during setup
> when the four-TikTok-accounts structure ran into TikTok's unique-email-per-
> account rule and the plan was rescoped to reduce commitment. That's a sound
> de-risking move and it happens to match the agent's own default recommendation
> (one market for the first 90 days).

---

## Trigger for adding a market

Don't add FR / ES / AR on a date. Add them when **all three** are true:

1. The EN account has posted **≥ 4 weeks without a gap**
2. At least one format has repeated well enough to call it a template
3. There's a spare ~2 h/week that isn't already committed

Adding a second account before the first one is a habit just produces two neglected accounts.

**When that trigger fires**, everything below applies as written. The one extra step: TikTok requires a **unique email string per account**, so FR / ES / AR sign up with `carfai.info+tt.fr@gmail.com`, `+tt.es@`, `+tt.ar@` — same Gmail inbox, different strings. And create them **one per day**, not in one sitting (see `references/account-setup.md` § pacing).

---

## The deferred multi-market design

Keeping this documented so the decision doesn't need re-litigating later.

**Why it's more defensible here than it usually is**: the account is **faceless** (screen recording + text overlay + voiceover). A localized variant is a caption swap, a text-overlay swap, and a re-record of a 20-second VO. That's ~12 minutes. On a founder-face account the same variant would be a full reshoot, and multi-market would genuinely be a mistake.

**The real cost, computed honestly** — 4 base videos/week, localized to 4 languages:

| Work | Time |
|---|---|
| 4 base videos (record + cut + caption) | ~3 h |
| 12 localizations (12 min each) | ~2.4 h |
| Scheduling + logging | ~0.5 h |
| **Total** | **~6 h/week, one batching session** |

If a week goes by where 6 hours doesn't exist, **post the English variants only and skip the rest**. A gap on the FR account costs less than abandoning the whole system in week three. That failure mode — quitting by week three — is the one that actually kills solo-founder social.

---

## Structure by language, not geography

TikTok's algorithm reads **content language** and serves the video to speakers of that language, wherever they are. It does not read "this account is for Canada." So splitting by geo (`@carfai.ca`, `@carfai.us`) fragments English across two accounts that compete with each other, while splitting by language keeps each account's signal clean.

Four accounts, mapping 1:1 to the four locales already shipped on the site and in the app:

| Account | Language | Primary geos it reaches | Site locale |
|---|---|---|---|
| **EN** | English | US, Canada (ROC), UK, AU | `/en` |
| **FR** | French | France, Québec, Morocco, Belgium | `/fr` |
| **ES** | Spanish | Mexico, Spain, LatAm, US Hispanic | `/es` |
| **AR** | Arabic | Morocco, Gulf, Egypt, Levant | `/ar` |

Every account links to the matching locale of the site (`carfai.app/fr`, etc.) and to the same Play Store listing — Play localizes its own store page by device language automatically.

---

## Platform allocation

Not every platform gets four accounts. That would be 12 properties and it would collapse.

### TikTok — the growth engine (1 account now, 4 in the full design)

EN is live now (created 2026-08-23). FR / ES / AR are deferred until the trigger above fires. TikTok is where an unknown app can still get cold-start reach without an ad budget, and it is the platform where the language split matters most — so it is the first place to add a market, not the last.

Handles and bios: `assets/profile-copy.md`.

### Instagram — 2 accounts, staged

- **EN account** — live now (created 2026-08-23), cross-posts the TikTok cut as a Reel.
- **FR account** — deferred with the rest.
- **ES / AR** — not as separate accounts. Post ES and AR variants to the EN account's *Stories* with localized text, or hold them for TikTok only. Revisit at 90 days.

Rationale: Instagram's reach for a zero-follower brand account is materially worse than TikTok's. Four IG accounts would be four ghost towns. Two is enough to hold the handles and catch the Reels spillover.

### Facebook — 1 Page, and the Page is not the point

One English Page, created mainly so the brand name is claimed and so Instagram can link to it for cross-posting.

**Facebook's actual value for CarFai is Groups, not the feed.** Gig-driver communities and fleet-operator groups are where the B2B and high-intent B2C audience already is. Groups are joined and posted in from a *personal* profile, not a Page — so this is Nizar's own account participating honestly, not the brand broadcasting.

Group strategy is Phase 2 work and needs its own rules (most driver groups ban self-promotion outright — the play is answering cost questions genuinely and having CarFai in the bio, not dropping links). Do not post promotional content into Groups before those rules are written.

**Created in Phase 1 (2026-08-23): 1 TikTok + 1 Instagram + 1 Facebook Page = 3**, all on `carfai.info@gmail.com`. The deferred set adds 3 TikTok + 1 Instagram when the trigger fires.

---

## The localization workflow

One recording, four posts. The recording never changes — only the layer on top.

**Base asset (produced once, in English):**
1. Screen-record the app doing the thing (no UI language change needed for the recording itself if the concept is visual — a receipt scanning, a fault code resolving)
2. Cut in CapCut, no text yet
3. Export as the clean master

**Per language (~12 min each):**
1. Swap the on-screen text overlays — pull the exact strings from the site's `messages/{locale}.json` so the wording matches the product
2. Re-record the voiceover, or swap to text-only + trending-adjacent audio if VO isn't available in that language
3. Write the caption fresh — **never machine-translate a caption**. A translated caption reads as translated and kills the native feel
4. Swap the hashtags to that language's actual tags (see below)
5. Export, log the row in the content log

**Where the app UI language matters**: if a recording shows a lot of UI text, record it four times with the app set to each language. The app already ships all four. It costs one extra minute per language and it's much better than an English UI with French captions.

### Hashtags do not translate

Each language has its own real tags. Machine-translating `#uberdriver` into `#chauffeuruber` produces a tag with 40 posts on it.

| Language | Starting tags — verify volume in-app before the first batch |
|---|---|
| EN | `#uberdriver` `#gigwork` `#rideshare` `#cartok` `#sidehustle` |
| FR | `#vtc` `#chauffeurvtc` `#uberfrance` `#autoentrepreneur` `#voiture` |
| ES | `#conductor` `#ubermexico` `#didi` `#autos` `#emprendedor` |
| AR | `#سيارات` `#سائق` `#المغرب` `#صيانة_السيارات` |

3–5 tags per post. Hashtag walls underperform on both platforms now — the ranking signal has moved to caption text and on-screen text for search.

---

## Currency and market-specific numbers

A video quoting `$487` reads as USD to an American, CAD to a Canadian, and as nothing to a French viewer.

- **EN account** — USD, and say so on screen (`$487 USD`) when the number is load-bearing
- **FR account** — EUR for France-first content, CAD for Québec-first content. Pick per video, don't mix in one frame
- **ES account** — MXN or USD depending on the concept; label it
- **AR account** — MAD for Morocco content, USD as the neutral default

The app itself shows the user's own currency, so a screen recording will show whatever Nizar's device is set to. If the number in the recording contradicts the number in the caption, that's a credibility hit — either match them or don't quote a number in the caption.

Pricing tiers are set by the stores per-region. Never state a paid-tier price in a non-USD caption unless it's been checked in that region's store listing. **"Free tier, no card"** is true everywhere and is the safer claim.

---

## Adding a market later

The four locales above are the ceiling for now, because they're the four the product actually speaks. Adding a fifth language means localizing the app and the site first — social can't lead the product there.

Adding a *geo* within an existing language (e.g. targeting Australia on the EN account) needs no new account. Adjust content references and currency, keep the same handle.
