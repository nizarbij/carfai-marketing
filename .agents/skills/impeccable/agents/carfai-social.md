---
name: carfai-social
description: Run CARFAI's social media presence end-to-end on TikTok, Instagram and Facebook — from creating and configuring the accounts, through profile copy, content pillars and posting calendars, to writing ready-to-publish video scripts, captions and hashtag sets, and reviewing performance. Use this skill whenever the request touches CARFAI's social presence in any way — setting up or optimizing a TikTok, Instagram or Facebook account, writing a bio or handle, planning a content calendar, batching Reels or TikToks, writing captions or hooks, adapting content for a new market or language, deciding posting cadence, or analyzing what is working. Also use it for anything phrased as "post about the app", "make a video for TikTok", "what should I post this week", "grow the CARFAI account", or "our socials" — even when the platform is not named.
---

# CARFAI Social Media

Build and run CARFAI's owned social channels from zero. This skill covers account creation, profile setup, content production, publishing workflow, and iteration.

Claude cannot log into platforms or publish. What this skill produces is a **ready-to-execute package** — exact copy, exact settings, exact steps — that Niz executes in ten minutes on his phone or in Meta Business Suite. Every output should be copy-pasteable, not advisory.

## Product context

CARFAI (Car Financial and Administrative Intelligence) is a React Native/Expo app for vehicle document management and fleet intelligence. Positioning line: **"A second opinion for your car."** Signoff: **"Drive smarter."** Both are shipped strings — the site h1 and the wordmark tagline respectively. Spoken as **"car-FYE"**. Solo-founded, built with Claude Code, Supabase, and the Claude API. Two audiences: gig-economy drivers (B2C) and fleet managers (B2B). Pre-revenue as of launch — this constrains what claims are honest. See `references/brand-and-voice.md`.

**Live status (2026-08-23)**: Google Play **live** (`com.carfai.app`). Apple App Store **still in review** — no iOS link, no clickable App Store badge, until it clears.

## Phase map

Figure out which phase the request belongs to and go there. Don't run phases out of order — a content calendar for accounts that don't exist yet is wasted work.

| Phase | Trigger | Read |
|---|---|---|
| 0. Foundation | No handles reserved, no brand assets sized | `references/brand-and-voice.md` |
| 1. Account creation | "create the accounts", "set up TikTok" | `references/account-setup.md` |
| 2. Content system | "what should I post", "content pillars", "calendar" | `references/content-system.md` |
| 3. Production | "write me a TikTok", "batch 5 videos", "caption for this" | `references/content-system.md` + `references/platform-specs.md` |
| 4. Growth & iteration | "it's not growing", "review last month" | `references/growth-and-metrics.md` |
| Any phase, new market | "do this for France / Morocco" | `references/markets.md` |

Reference files are loaded on demand — read the one you need, not all of them.

## The three decisions to settle before anything else

If these aren't already settled in the conversation or in memory, resolve them first. Ask only about the ones that are genuinely open, and propose a default so the answer is a yes/no rather than an essay.

**1. One market or many?**
CARFAI targets US, Canada/Québec, UK, France, Morocco, and Mexico. Running six markets from one account teaches the algorithm nothing — it fragments the audience signal and every video underperforms. Default recommendation: **one account, one market, one language for the first 90 days.** Canada/gig drivers is the strongest starting wedge (home market, French+English both usable, App Store review already scoped there). Add markets as separate accounts only once the first one has a repeatable format. See `references/markets.md`.

**2. TikTok Business or Creator account?**
This is a real fork with a real cost, not a formality. Business accounts get the Business Suite, analytics, ads, and immediate link-in-bio — but are restricted to the Commercial Music Library, which cuts off trending pop sounds. Creator accounts get trending audio (a genuine reach advantage on TikTok) but no link in bio until 1,000 followers and no ad tooling. Default recommendation for CARFAI: **Business**, because the link to the App Store is the whole point and CARFAI's format (screen recordings + voiceover + text) doesn't lean on trending music. Say this out loud rather than silently choosing.

**3. Brand account or founder-led account?**
Faceless brand accounts for unknown apps start slow. A founder-led angle ("I built this app solo — here's what I learned about car costs") gets meaningfully more reach in the cold-start phase and gives a second content well (build-in-public) that costs nothing to produce. Default recommendation: **brand handle, founder voice** — CARFAI's name on the account, Niz on camera or in voiceover.

## Output contract

Whenever this skill produces content for publishing, use this exact structure. It's what makes the output executable rather than a suggestion.

```
## [Post ID] — [Platform] — [Pillar] — [Target date]

**Hook (0–2s):** [on-screen text, verbatim]
**Script:** [voiceover, timestamped, ≤ the platform's sweet spot]
**Shot list:** [what to film/record, shot by shot]
**On-screen text:** [each overlay + when it appears]
**Caption:** [verbatim, platform-tailored]
**Hashtags:** [3–5, platform-tailored]
**Cover frame:** [which frame, what text on it]
**CTA:** [exact wording + where the link goes]
**Publish notes:** [sound choice, posting time, cross-post or not]
```

Two rules that this format exists to enforce:

- **Never write one caption and reuse it.** Meta suppresses reach on identical cross-posted copy, and the same sentence that lands on TikTok reads as try-hard on a Facebook fleet-manager post. One asset, three tailored captions.
- **Never invent proof.** CARFAI is pre-revenue with no subscriptions sold. No fabricated testimonials, no "our users save $X/year", no invented download counts, no fake five-star reviews on screen. Use demonstrable claims (what the app does, real receipts, real OBD2 readouts, real numbers from Niz's own Audi) or framed hypotheticals ("if you're spending $X on..."). This is a legal exposure and a brand risk, not a stylistic preference. If a request asks for a testimonial-style video, offer the founder-story or demo alternative instead.

## Working rules

**Specs go stale.** Aspect ratios, length caps, and scheduling limits change every few months. `references/platform-specs.md` has current numbers, but before a big production batch or if the file's numbers look off against what Niz reports seeing in-app, verify with a quick web search rather than asserting from the file.

**Batch, don't drip.** Producing one video at a time is how solo founders stop posting by week three. When asked for content, default to producing a batch of 5–7 covering a full posting week, then schedule it all at once. Ask whether a batch is wanted before writing just one.

**Screen recordings are the cheapest asset CARFAI has.** The app itself is the content: scanning a registration, an OBD2 fault code resolving, the AI Advisor answering a real question, a fleet dashboard filling in. Reach for a screen-record concept before reaching for a talking-head or an AI-generated video concept — it's faster to produce and more convincing.

**Respect existing work.** A TikTok concept already exists and is documented in `carfai-marketing/docs/TIKTOK_PRODUCTION.md` — a 6-scene gig-driver "receipt avalanche" narrative (shoebox of receipts → failed manual sort → scan → extraction → year-total reveal → founder exhale). Build on it rather than proposing a parallel system.

Two corrections to how that work is often described: the **Veo 2 API path was tried and abandoned** — it cannot hold character/set consistency across separately-generated clips, which is a structural limit of the tool, not a prompting problem. What actually worked was **Gemini Pro's interactive interface** (multi-panel storyboards that stay consistent within one generation), where 5 storyboards + 1 motion clip already exist. Post is CapCut. Nizar's Gemini quota is ~2 videos/day, which paces any AI-video production.

**Track everything in one place.** Every published post gets a row in the content log (`assets/content-log-template.csv`). Without it, phase 4 has nothing to analyze and iteration becomes vibes.

## Anti-patterns

- Producing a 12-week calendar before a single video has been posted. Plan two weeks, publish, then plan the next two with data.
- Writing captions stuffed with 20 hashtags. Both platforms have moved to topic/search signals; 3–5 specific tags outperform hashtag walls.
- Leading with app features. Lead with the cost or the hassle the viewer already has; the app appears as the resolution, not the premise.
- Treating Facebook as a copy of Instagram. Facebook's value for CARFAI is Groups (gig driver communities, fleet operator groups) and B2B credibility, not the feed. See `references/platform-specs.md`.
- Posting the App Store link before the app is live. Confirm live status before writing any link-out CTA.

## Files

Written (Phase 0 + Phase 1, 2026-08-23):

- ✅ `references/brand-and-voice.md` — palette, type, real taglines, voice rules, claim boundaries, pronunciation, live-status table
- ✅ `references/markets.md` — the multi-market structure (4 language accounts), localization workflow, per-language hashtags, currency rules
- ✅ `references/account-setup.md` — step-by-step creation for all accounts, incl. the unique-email constraint and the paced-creation rule
- ✅ `references/platform-specs.md` — verified specs, safe area, cadence, per-platform role, cross-posting rules
- ✅ `assets/profile-copy.md` — final handles, display names, bios with verified character counts
- ✅ `assets/content-log-template.csv` — the tracking sheet

Not yet written — write each when its phase is actually reached, not before:

- ✅ `references/content-system.md` — 4 content pillars, hook library, 4 script templates, caption formulas per platform, Facebook Group rules
- ⬜ `references/growth-and-metrics.md` — **Phase 4.** Cold-start tactics, KPIs, iteration loop. Writing this before there is data to analyze produces fiction.

Generated assets:

- `carfai-marketing/scripts/gen-social-avatars.mjs` → `npm run gen:social` → `output/social/` (avatars for all 3 platforms + FB cover)