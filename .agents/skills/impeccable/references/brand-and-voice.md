# CARFAI — brand and voice for social

> Phase 0 reference. Read before writing any caption, script, or bio.
> Every value here is verified against the shipped product, not invented.
> Sources: `carfai-marketing/tailwind.config.ts`, `docs/DESIGN_TOKENS.md`,
> `messages/en.json`, the live Play Store listing.

---

## Name and pronunciation

**Written**: `CarFai` in body copy and captions. `CARFAI` in the wordmark lockup and the Play Store title (that's how the listing reads today).

**Spoken** (needed for every voiceover): **"car-FYE"** — one word, two syllables, stress on the second. Rhymes with *hi-fi*. It comes from **Car F**inancial **a**nd **A**dministrative **I**ntelligence.

Do NOT let a voiceover say "car-fay", "car-F-A-I", or spell it out. Pick this once and keep it identical across every video and every language — pronunciation drift across a catalogue is a real brand cost and it's free to avoid.

In French VO: keep the English pronunciation ("car-FYE"), don't Frenchify to "car-fé". In Arabic VO: "كار فاي" (kār fāy).

---

## Positioning lines — the real ones

These are shipped strings. Use them verbatim; don't paraphrase into something new.

| Line | Where it's from | Use it for |
|---|---|---|
| **"A second opinion for your car."** | Site h1, all 4 locales | The positioning line. Best single sentence for a bio or a closing frame. |
| **"Drive smarter."** | Wordmark tagline, all 12 store screenshots | The signoff. Goes under the logo on an end card. |
| **"The first AI that's actually seen what your car has seen."** | Site hero quote | The hook line. Strong opener for a founder-story or explainer video. |
| **"Know your car. Save your money."** | ❌ NOT A REAL STRING | Appeared in an earlier draft of the agent file. It ships nowhere. Do not use. |

**Localized positioning line** (from the live site, use these exact strings):

- FR — « Un deuxième avis pour votre voiture. » / « Roulez plus intelligemment. »
- ES — «Una segunda opinión para tu auto.» / «Conduce mejor.»
- AR — «رأي ثانٍ لسيارتك.» / «قُد بذكاء.»

---

## Palette

Locked in `tailwind.config.ts`. Social assets use the same tokens as the site and the store screenshots — a viewer who taps through from TikTok to the Play Store should see one brand, not two.

| Token | Hex | Social use |
|---|---|---|
| `paper` | `#FAFAF7` | Background of light end cards. **Never `#FFFFFF`.** |
| `ink` | `#0B0E13` | Body text on light. **Never `#000000`.** |
| `slate2` | `#3B475C` | Secondary text, captions burned into frame |
| `accent` | `#089BC3` | The teal. Primary CTA, highlight numbers, the "Fai" in the wordmark |
| `accentDeep` | `#0A3E8F` | Navy. Dark-band backgrounds, hover/pressed states |
| `accentMist` | `#E0F4FA` | Tinted callout backgrounds |
| `paperDeep` | `#F2EFE8` | Section band shift on cream |

**In-app accents that appear in screen recordings** (don't "correct" these in post — they're the real UI):
- Indigo `#6B6BFF` — AI moments (the sparkle badge, "Analyzing document…")
- Green `#4ADE80` — confirmation checkmarks, line-item totals

**Rule**: teal `#089BC3` is the only saturated colour in a given frame. If two saturated colours are fighting, one is wrong.

---

## Type

- **Sans**: Inter. Headlines at **Medium (500)**, not Bold. Bold-at-huge is the AI-template tell.
- **Mono**: JetBrains Mono. Eyebrows, section indices (`01 / 06`), stat callouts, the wordmark.
- **On-screen text in video**: Inter Medium, tight tracking (`-0.02em` at large sizes). White `#FAFAF7` on dark, ink `#0B0E13` on cream. Always with a subtle drop shadow when over footage.

Arabic sets in the system Arabic face — do **not** force Inter on Arabic text, and never letter-space Arabic (it breaks the joins). This bit us once already in the site's `SplitTextReveal`.

---

## Voice

**Register for social is not the register for the website.** The site is editorial restraint — cream paper, slow reveals, quiet confidence. That reads as *invisible* on TikTok. Social leads with the viewer's pain and pays it off with a number.

The split is by surface, not a global rule. Long-form, press, and B2B keep the editorial register.

**Sound like:**
- A driver who did the math and is telling you what he found
- Specific over impressive — "$487.32 on brakes in March" beats "significant savings"
- Short sentences. Fragments are fine. One idea per line of on-screen text.

**Don't sound like:**
- A startup founder pitching ("we're on a mission to revolutionize…")
- A feature list read aloud ("CarFai offers document scanning, OBD2 diagnostics, and…")
- An ad that knows it's an ad ("Download now and take control of your vehicle expenses today!")

**The lead is always the cost or the hassle, never the feature.** The app shows up as the resolution, not the premise. "I found $8,400 I almost didn't deduct" opens; "CarFai has AI document scanning" does not.

---

## Claim boundaries — the hard line

CarFai is **pre-revenue**. Play Store shows **10+ downloads**. There are no paying subscribers, no user base to cite, no testimonials that exist.

**Never produce, under any framing:**
- Invented testimonials or user quotes
- "Our users save $X/year" or any aggregate outcome claim
- Download, revenue, or rating numbers that aren't the real ones
- Screenshots with fabricated five-star reviews
- "Trusted by N drivers"
- Before/after savings framed as another person's real result

This is legal exposure (FTC endorsement rules, Play/App Store misrepresentation policy), not a style preference.

**What you CAN claim — all demonstrable:**
- What the app does, shown on screen doing it
- Real numbers from Nizar's own vehicle and real receipts
- Framed hypotheticals in second person: *"if you're spending $200/month on fuel and not tracking it…"*
- Public/industry data with the source named on screen
- The founder story: solo-built, what it cost, what he learned — all true

If a brief asks for a testimonial video, counter with the founder-story or the live-demo version. Don't negotiate on this one.

---

## What's actually live (as of 2026-07-18)

Everything a CTA can point to must be true on the day it posts.

| Surface | Status | Link |
|---|---|---|
| Google Play | ✅ **Live** | `https://play.google.com/store/apps/details?id=com.carfai.app` |
| Apple App Store | ⏳ In review | No link. Do not write "available on iOS" or show an App Store badge as clickable. |
| Website | ✅ Live, 4 locales | `https://carfai.app` |
| Press kit | ✅ Live | `https://carfai.app/press` |

**Until Apple approves**: every link-out goes to Play or to `carfai.app`. If a video shows an iPhone (the store screenshots do), the CTA still says Google Play or "link in bio" — never "download on the App Store".

When iOS goes live, update this table, `assets/profile-copy.md`, and `app/[locale]/_lib/install-urls.ts` in the same pass.

---

## Pricing — say it accurately or not at all

| Tier | Price |
|---|---|
| Free | $0 forever |
| Starter | $8.99 / mo |
| Max | $19.99 / mo |
| Pro | $49.99 / mo |
| Fleet | $99 / mo |
| Max Lifetime | $39.99 one-time |

The honest headline for social is **"Free tier, no card, no trial timer."** That is true and it is the strongest thing you can say about the pricing. Don't imply the paid tiers are discounted or time-limited — they aren't.

---

## Assets

| Asset | Path | Use |
|---|---|---|
| App icon (square mark) | `carfai-app-mobile/assets/icon.png` (1024²) | Profile pictures on all platforms |
| Wordmark lockup | `carfai-marketing/public/logo.png` (878×254) | End cards, banners |
| Store screenshots | `carfai-marketing/output/{ios,android}/` | B-roll, carousel posts |
| Real app screen recordings | Nizar's device | **The primary content source — see the working rules in the agent file** |
