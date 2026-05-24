# CarFai TikTok — production doc

> The gig-driver receipt-avalanche cut. 6 scenes, 42 seconds, 9:16 vertical.
> The runnable script is [scripts/generate-tiktok.mjs](../scripts/generate-tiktok.mjs).
> Run it with `npm run gen:tiktok`. Edit prompts in the script directly.

---

## Concept

A gig driver opens a year's worth of car receipts. Tries to sort them by hand — chaos despite effort. Pivots: pulls out their phone, snaps one receipt, watches CarFai extract everything. Cuts to a clean table with the analytics dashboard showing $13,847 of tracked spending, 247 receipts auto-handled. Post-comp text overlays land the punchline: $8,407 in deductions almost missed, real hourly wage corrected from $14 to $19. Final beat — the driver's face, lit only by the phone screen, exhales a small smirk, looks toward tomorrow. Wordmark fades in.

**Target audience**: gig drivers (Uber, Lyft, DoorDash, Instacart) on TikTok. Secondary: any self-employed person tracking deductible vehicle expenses.

**TikTok mechanic**: pain (chaos) → tool (snap) → payoff (the numbers) → resolution (the face). Stop-the-scroll asset is the receipt avalanche in the first 2 seconds.

---

## Production constants

| Constant | Value |
|---|---|
| Total duration | 42 seconds |
| Aspect ratio | 9:16 vertical |
| Number of clips | 6 (Veo 2 max 8s per generation) |
| Genai model | `veo-2.0-generate-001` via `@google/genai` |
| Voiceover | None — music + text overlays only |
| Native audio | None (Veo 2 is silent) — all sound added in post |
| Estimated cost | ~$6.30 single attempt · $20–40 realistic with retries |

---

## The 6-scene arc

| # | Scene | Duration | Beat |
|---|---|---|---|
| 1 | The shoebox | 6s | Hook — receipt avalanche, "I drove Uber for a year. Want to see how much I actually kept?" |
| 2 | The manual sort | 7s | Frustration peak — time-lapse of trying to sort by hand, mess grows |
| 3 | The snap | 7s | Pivot — phone enters, captures one receipt, "Analyzing document…" modal |
| 4 | Review & Refine | 8s | Payoff for the snap — green checkmarks cascade across extracted fields |
| 5 | The year | 8s | Aggregate payoff — clean table, blue hour, dashboard with $13,847 + 247 docs, editorial overlays land $8,407 + $19/hr punchlines |
| 6 | The exhale | 6s | Close — hand lifts phone, hard cut to driver's face lit from below by the screen, small smirk, wordmark fades in |

Full per-scene prompts are inline in [scripts/generate-tiktok.mjs](../scripts/generate-tiktok.mjs) (the `SCENES` array). Edit there.

---

## Set bible (consistency anchor pasted into every scene prompt)

- **Location**: modest North American kitchen, mid-tone walnut table, window light from upper-left. Time of day shifts golden → blue hour across the cut.
- **Driver**: hands only in scenes 1–5 (dark grey hoodie sleeve, light olive skin, no rings/tattoos). Face in scene 6 — mid-30s male, light beard, dark eyes, same hoodie.
- **Phone**: matte graphite unbranded smartphone, no Apple/Samsung/Google logos.
- **Palette**: warm paper, walnut, hoodie graphite, phone dark navy. CarFai teal `#089BC3` for primary brand, indigo `#6B6BFF` for AI moments (scenes 3, 4 only), green `#4ADE80` for checkmarks and totals.
- **Film look**: Kodak Portra 400 simulation, f/4, slight organic grain.
- **Absolute bans**: no glowing UI, no holograms, no Tron lines, no scan-line sweeps, no Apple/Samsung/Google logos visible, no readable text on the paper receipts, no body above the wrist in scenes 1–5.

---

## Post-production text overlays

These are added in your NLE (After Effects / CapCut / Premiere) on top of the Veo-generated mp4s. They are NOT in the genai prompts — Veo's text rendering is unreliable, so all critical typography is comp'd in post.

### Scene 1 — The shoebox

| Time | Position | Content | Style |
|---|---|---|---|
| 0:02 | upper third | `I drove Uber for a year.` `Want to see how much I actually kept?` | Inter Medium 84px, paper `#FAFAF7`, slight drop shadow, centered |

### Scene 2 — The manual sort

No text overlays. The visual carries.

### Scene 3 — The snap

| Time | On screen | Content | Style |
|---|---|---|---|
| 4.5s | phone app bar | `SCAN DOCUMENT` | Inter Medium 36px white |
| 5.5s | phone modal title | `Analyzing document…` | Inter Semibold 52px ink `#0B0E13` |
| 5.6s | phone modal subtitle | `AI is extracting data from your document` | Inter Regular 28px slate |
| throughout | phone bottom + tab labels | `Gallery (1–5)` · `PDF` · `Enter manually` · `Home` `Documents` `Analytics` `AI Advisor` | Inter Regular ~22px |

### Scene 4 — Review & Refine (gig-driver brake-service receipt)

| On phone screen | Strings |
|---|---|
| App bar | Title: `Review & Refine` (Medium 38px white) + Pill: `Save` (Semibold 30px teal) |
| CORE DATA card | Label `CORE DATA` (Mono caps 22px teal). Rows: `Date` → `2026-03-14` · `Vendor` → `Midas Auto Service` · `Amount` → `$487.32` |
| AI INSIGHTS card | Label `AI INSIGHTS` (Mono caps 22px white, indigo sparkle). Rows: `Type` → `Maintenance` · `Category` → `Brake Service` · `Notes` → `Front brake pads and rotors replaced, includes labour and multi-point inspection.` |
| LINE ITEMS card | Label `LINE ITEMS` (Mono caps 22px green). |
| · BRAKE COMPONENTS | subtotal `$312.40` — Items: `Front brake pads (set) $94.99` · `Front rotors (pair) $189.99` · `Brake fluid (1L) $27.42` |
| · LABOR | subtotal `$174.92` — Items: `Front brake service (1.5 hrs) $134.92` · `Multi-point inspection $40.00` |

### Scene 5 — The year

**On phone screen** (light-theme dashboard):

| Element | String | Style |
|---|---|---|
| Title | `Analytics` | Inter Bold 84px dark navy |
| Subtitle | `2026 Honda Civic` | Inter Regular 30px grey |
| Vehicle pill | `2026 Honda Civic` | Inter Bold 36px dark |
| Toggle left | `Spending` (active) | Inter Semibold 32px navy |
| Toggle right | `Maintenance` | Inter Regular 32px grey |
| Filter pills | `This Year` (active) · `Last Year` · `Last 6 Mo.` · `All Time` | Semibold/Regular 28px |
| Section | `Overview` | Inter Bold 64px dark |
| Card A | label `TOTAL SPENT` (Mono 26px grey) + value `$13,847.20` (Bold 80px teal) — Veo counts up |
| Card B | label `AVG / MONTH` + value `$1,153.93` (Bold 80px navy) |
| Card C | label `DOCUMENTS` + value `247` (Bold 80px purple) + subtext `247 total` (22px grey) |
| Card D | label `REVIEWED` + value `247` (Bold 80px green) + subtext `of 247` (22px grey) |
| Section | `Monthly Spending Trends` | Inter Bold 58px dark |
| Subtitle | `Tap a dot to inspect that month` | Inter Regular 26px grey |
| Tab labels | `Home` · `Documents` · `Analytics` (teal, active) · `AI Advisor` | Inter Regular ~22px |

**Editorial overlays on top of the dashboard** (the punchlines):

| Time | Position | Content | Style |
|---|---|---|---|
| 4.5s | upper third | `$8,407 in deductions I would've missed.` | Inter Medium 96px paper `#FAFAF7`, slight drop shadow. Fade in over 0.4s. |
| 6.0s | lower third | `Real $/hr last year: $14` `Real $/hr this year: $19` | Inter Medium 64px cream, with teal `#089BC3` highlight on `$19`. Two lines, land 0.2s apart. |

### Scene 6 — The exhale

| Time | Position | Content | Style |
|---|---|---|---|
| 5.0s | lower third (over face) | `Car**Fai**` `Drive smarter.` | Wordmark: `Car` ink `#0B0E13` + `Fai` teal `#089BC3`, Mono Medium ~88px combined. Tagline slate2 Inter Regular 32px. Fade in over 0.6s. |

---

## Sound design (added in post)

### Music
- **0:00–0:02** — ambient kitchen silence
- **0:02** — music enters: low synth pad, slow tension build through scene 2
- **0:13** (scene 3) — shift to a calmer tone after the analyzing modal lands
- **0:20** (scene 4) — tick/chime cadence on the 6 checkmark pops, resolving downbeat on Save activation
- **0:28** (scene 5) — escalating build during the counter roll-up (1.0s–3.0s), resolving on landing
- **0:32** (scene 5) — soft chime with $8,407 overlay, softer chime with $19/hr overlay
- **0:36** (scene 6) — final sustained chord with the wordmark fade

Suggested track style: instrumental, mid-tempo, sparse production. Think Tycho / Bonobo / Hammock at the quieter end. Royalty-free options: Epidemic Sound, Artlist, Pixabay.

### SFX
- **0:01–0:05** (scene 1) — paper-rustle layered under the avalanche
- **0:06–0:12** (scene 2) — calculator clicks, paper rustle, faint ticking clock
- **0:12** (scene 2) — pen-drop SFX
- **0:18** (scene 3) — soft camera-shutter synced to brightness pulse
- **0:18–0:20** (scene 3) — subtle high-frequency hum on the analyzing modal
- **0:21–0:22** (scene 4) — six soft ticks for the checkmark cascade
- **0:36** (scene 6) — sub-audible heartbeat thump at the hard cut to the face
- **0:38** (scene 6) — soft nose-exhale at 3.7s after the cut (record yourself, drop in)

---

## Running the script

```bash
# Generate all 6 scenes (default)
npm run gen:tiktok

# Regenerate just scene 3
npm run gen:tiktok -- --scene 3

# Regenerate scenes 3 and 5
npm run gen:tiktok -- --scenes 3,5

# Print prompts and cost estimate without calling the API
npm run gen:tiktok -- --dry-run
```

Output goes to `output/tiktok/`:
- `01-shoebox.mp4` through `06-exhale.mp4`
- `MANIFEST.md` (auto-generated summary of what was run)

The script reads `GEMINI_API_KEY` from `.env.local` at the repo root — same as `gen:hero`.

---

## Producer notes (per-scene risk + fallbacks)

### Scene 1 — risk: paper-avalanche physics
Veo 2 may struggle with the chaotic motion of 40+ pieces of paper. Budget 4–6 retries (~$5–7). **Real-shoot fallback**: 15 minutes with an actual shoebox of newspaper scraps and a phone on a tripod. Will look better than any genai version.

### Scene 2 — risk: hands in fast-motion
Hands are Veo 2's weakest case, especially at the time-lapse speed. The motion-blur abstraction during the speed-ramp is actually *helpful* — it forgives Veo's hand-rendering issues. **Real-shoot fallback**: 30 minutes top-down of you actually sorting paper. Even simpler than scene 1.

### Scene 3 — risk: phone-in-hand grip + brightness pulse timing
Phones-in-hands consistently fail at Veo. Use the tight thumb-on-screen-edge framing to crop out problem areas. The brightness pulse may render as a full white flash; counter-prompt phrase that has worked: `subtle exposure shift, ~10% lift, half-second duration`.

### Scene 4 — risk: six sequential checkmark pop-ins
Veo's motion timing is variable. If the cascade comes out uneven, generate the scene with **all checkmarks visible from start** and add the cascade animation in After Effects post (10-minute job).

### Scene 5 — risk: counter roll-up animation
Veo's digit-rolling on the `$0 → $13,847.20` counter may glitch. Fallback: static `$13,847.20` from frame 0, add counter animation in After Effects.

### Scene 6 — risk: human face (THE highest risk in the whole cut)
Veo 2 generates plausible faces but with identity drift across a 4.3s shot and weird micro-expression interpretations. Budget 8–12 retries (~$13–20). **Real-shoot fallback**: shoot yourself or anyone of similar build at a dim kitchen at dusk on a phone. 15 minutes. The other 5 scenes carry the genai story; the close gets human authenticity.

---

## Editing checklist

1. ☐ Download all 6 mp4s into your NLE
2. ☐ Stitch in order, no transitions between scenes (hard cuts only — the scene cuts ARE the rhythm)
3. ☐ Layer the per-scene text overlays per the tables above
4. ☐ Drop in the music + SFX per the sound-design notes
5. ☐ Record your own nose-exhale for scene 6 (3 takes), drop in at 0:38
6. ☐ Watch on a phone (not a desktop preview) — TikTok eyes only see vertical phone screens
7. ☐ Check the first 2 seconds — if the shoebox avalanche doesn't hit by 0:02, the rest doesn't matter
8. ☐ Export H.264, 1080×1920 minimum, mp4, target file size under 287MB (TikTok limit)
9. ☐ Caption for the post itself (this is separate from the text overlays in the video):
   > `If you drive for Uber / Lyft / DoorDash and you're not tracking receipts, this is for you. Real numbers from my last year. The app is CarFai.`
   `#uberdriver #lyftdriver #gigwork #sidehustle #taxes`

---

## Variants for future cuts

Same arc structure, swap the data + slight reframing for other audiences:

- **Tradesperson cut** — swap "Uber driver" for "contractor", swap brake-service receipt for materials invoice, swap "$/hr" for "job margin"
- **Tax-season specific cut** — same first 5 scenes, swap scene 6's exhale for the moment of handing the CSV export to an accountant
- **Fleet-owner cut** — replace personal narrative with a 3-vehicle fleet, swap dashboard for the org analytics screen, swap exhale for fleet-manager nod
