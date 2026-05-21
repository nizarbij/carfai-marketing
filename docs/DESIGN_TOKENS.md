# CarFai marketing — Design Tokens (H1b)

> **Authored 2026-05-20 via `studio-landing-page` skill, step 1.**
> This doc is the single source of truth for the marketing landing.
> If a component drifts from these tokens, point at this doc and fix
> the component — never the other way around.

---

## Brand inputs (LOCKED — from mobile app)

The mobile app already has a brand identity; the marketing site
extends it, never overrides it.

- **Brand primary (teal)**: `#089BC3` — top-left of the logo gradient. Use for primary CTAs, focused-link underline, key callouts.
- **Brand secondary (navy)**: `#0A3E8F` — bottom-right of the logo gradient. Use for footer accent, hover-state on primary CTA, deep-section background tint.
- **Brand light (mist)**: `#E0F4FA` — surface tint for highlighted callout boxes (e.g. "for fleets" band).
- Source: [`carfai-app-mobile/theme/colors.ts`](../../carfai-app-mobile/theme/colors.ts) `colors.light.accent` / `accentDark` / `accentLight`.

The marketing site uses **light theme only** for H1b. Dark-mode pass is out of scope until post-launch.

---

## References studied (skill step 1)

| Site | What we're stealing | What we're NOT taking |
|---|---|---|
| [stripe.com](https://stripe.com) | Bento-grid feature cards · large numerical stat callouts · "Get started / Contact sales" dual-CTA pattern · editorial aerial photography for case studies · geometric brand motif as background detail | The 10+ section count (too dense for a v1 launch) · the wave background animation (custom WebGL we can't justify at v1) |
| [apple.com](https://www.apple.com) | Full-bleed hero block · 2–6 word headlines ("Amazing Mac. Surprising price.") · right-aligned dual CTA · product photography over render | Stacking 3 product heroes at the top (we have one product, not a lineup) |
| [linear.app](https://linear.app) | Section-per-feature rhythm · product UI screenshots as the imagery · inline `Feature →` section CTAs · mono code samples for technical legitimacy | Their warm-dark `#08090A` background — we're on light editorial paper for H1b |
| [igloo.inc](https://www.igloo.inc) | Editorial mono small-caps labels · single-accent restraint · magnetic-cursor on primary CTA · custom cursor states | The 3D / WebGL hero (way over budget) · the horizontal-only navigation |
| [awwwards](https://www.awwwards.com) winners | Cream-paper background instead of pure white · `splittext-reveal` on hero · type at huge sizes in regular weight (not bold) · single brand accent | Award-bait tricks like full-screen video autoplay (perf cost + accessibility hit) |

**Synthesis**: editorial restraint (Apple typography, Linear section
rhythm, Stripe stat callouts) on a warm cream paper, with the CarFai
teal/navy as the only colour that breaks the monochrome. Motion is
intentional and named, never decorative.

---

## Palette (LOCKED in `tailwind.config.ts`)

| Token | Hex | Use |
|---|---|---|
| `paper` | `#FAFAF7` | Page background. **Not** `#FFFFFF` — the slight warm bias separates premium from default. |
| `ink` | `#0B0E13` | Body text. **Not** `#000000` — same reason in reverse. |
| `graphite` | `#1C2230` | Section heads (h2/h3) when we want them quieter than `ink`. |
| `slate2` | `#3B475C` | Body copy quieter tier · subtitles · footer text. |
| `rule` | `#E6E4DE` | Hairline dividers · table borders · faint card outlines. |
| `paperDeep` | `#F2EFE8` | Section background tint when we want a subtle band shift. |
| `accent` (teal) | `#089BC3` | Primary CTA · link underline · stat highlight · selection. |
| `accentDeep` (navy) | `#0A3E8F` | Hover on primary CTA · deep-section bg · footer accent. |
| `accentMist` | `#E0F4FA` | Highlighted callout box bg (e.g. "for fleets" band). |
| `signal` | `#10B981` | Reserved for "checkmark" and "OK" affordances. Use sparingly — green is loud on a cream page. |
| `warn` | `#F59E0B` | Reserved for warning copy. Almost never on the landing. |

**Rules:**
- No more than 1 hex inline in any component. Always reference the
  token name (`bg-paper`, `text-ink`). Drift is the failure mode.
- Brand teal `#089BC3` is the only saturated colour in any given
  viewport. If two are visible, one is wrong.

---

## Type system (LOCKED)

- **Sans (default)**: Inter — system fallback `system-ui, -apple-system, sans-serif`
- **Mono**: JetBrains Mono — system fallback `ui-monospace, SFMono-Regular`
- **No serif** — keeps the page closer to Stripe/Linear than to a NYT-style editorial. (Could revisit post-launch if we want a stronger editorial swing.)

### Weight ramp

| Use | Weight | Notes |
|---|---|---|
| Hero `h1` | 500 (medium) | **Not bold.** The Awwwards / Linear premium look uses regular-to-medium at huge sizes. Bold-at-huge is the AI-template tell. |
| Section `h2` | 500 (medium) | Tracks tight: `tracking-tight` in Tailwind. Revised down from semibold during the H1b polish pass — the softer weight reads more editorial at the 3xl/5xl size we use, and matches Hero. Tier-card `h3` on /pricing stays semibold for a clearer hierarchy break at the smaller size. |
| Subhead `h3` | 500–600 | 500 in section bodies (Maintenance bullets, Advisor labels, ScanTrack steps). 600 inside Pricing tier cards where the price block needs more weight to read as a list-of-products. |
| Body | 400 (regular) | Line-height `relaxed`. |
| Eyebrow / label | 500 (medium) mono · `uppercase` · `tracking-widest` · small (10–12 px). Shared `<Eyebrow>` component owns the implementation. Two-section rhythm break: Maintenance and Fleet ship without a top-of-section eyebrow on purpose. |
| Stat callouts | 600 (semibold) mono | E.g. "5,000+ vehicles tracked" — mono adds legitimacy. |

### Size scale (TailwindCSS classes)

| Use | Class | px @ default |
|---|---|---|
| Hero h1 | `text-5xl md:text-7xl` | 48 → 72 |
| h2 (section heads) | `text-3xl md:text-5xl` | 30 → 48 |
| h3 | `text-xl md:text-2xl` | 20 → 24 |
| Lead paragraph (under hero) | `text-lg md:text-xl` | 18 → 20 |
| Body | base | 16 |
| Caption / footer | `text-sm` | 14 |
| Eyebrow | `text-xs` | 12 |

---

## Motion vocabulary (LOCKED — names from the skill)

| Section | Pattern | Rationale |
|---|---|---|
| 1. Hero | `splittext-reveal` | Letters of the headline animate in on mount. Awwwards default for premium heroes. Subtle — 30 ms stagger, opacity + 8 px y-translate. |
| 2. Problem | static — no motion | Restraint. After the hero reveal the reader needs a beat. |
| 3. Feature deep-dive: Scan → Track | `pinned-scrub` | Section pins; receipt-scan → cost-rollup screenshot crossfades as the user scrolls within the pinned viewport. Apple Vision Pro pattern. |
| 4. Feature deep-dive: AI Advisor | `splittext-reveal` on the chat-bubble copy as it enters the viewport | Reinforces "this is what your car would say." Static UI screenshot underneath. |
| 5. B2B / Fleet band | `horizontal-on-vertical` | Scroll down; fleet dashboard cards move sideways. Linear features pattern. Tells the visitor "B2B is a real thing" without forcing a separate page. |
| 6. Pricing | `sticky-stack` | Each tier card holds while the next slides over. Stripe pricing pattern. Lets the visitor compare side-by-side without rendering all 5 tiers in a wide grid. |
| 7. Closing CTA | `magnetic-cursor` on the button + `splittext-reveal` on the heading | Igloo Inc closing-CTA pattern. The cursor pull is the only "trick" on the page — concentrate the delight there. |

### Motion stack (libraries to install in H1b step 5)

- **`motion`** (formerly `framer-motion`) — animation runtime
- **`gsap`** + **`gsap/ScrollTrigger`** — pinned-scrub, sticky-stack, horizontal-on-vertical
- **`lenis`** — smooth scroll. Required to keep ScrollTrigger deltas consistent.
- **`split-type`** — splittext-reveal helper (lightweight alternative to GSAP's SplitText premium plugin)

---

## Section plan v2 (revised 2026-05-20 — LOCKED)

**9 sections** for `/` (the home landing). B2C-led per founder
direction. Founder feedback during build: original 7-section plan
under-explained the differentiating features (OBD2, AI maintenance
calendar, vehicle valuation, document expiry). Two sections added
between ScanTrack and Advisor to fix that.

| # | Section | One-liner | Motion |
|---|---|---|---|
| 1 | Hero | "A second opinion for your car." Subhead + dual CTA + photo slot. | `splittext-reveal` |
| 2 | Problem | "Owning a car is expensive and confusing. We didn't fix the cost." | static |
| 3 | Scan → track | Receipt → category → trend story. 3 real app screens crossfade inside a phone-shaped frame. | `pinned-scrub` |
| 4 | Maintenance & OBD2 | NEW. Editorial split — `app-analytics-maintenance.jpg` left + 3 bullets right (AI calendar / OBD2 / document expiry). | static (rhythm breather between two motion sections) |
| 5 | Valuation | NEW. Dark band — Stripe-style stat callout (`$25,400 ± 4%`) + factor chips + phone-frame screenshot right. | `splittext-reveal` on headline |
| 6 | Advisor | "Ask your car anything." `app-aiadvisor.jpg` in phone frame. | `splittext-reveal` on copy |
| 7 | For fleets | A B2B band — 4 cards, "From 1 vehicle to 200." | `horizontal-on-vertical` |
| 8 | Pricing | All 5 tiers as sticky-stack cards. Locked teal accent on Max. | `sticky-stack` |
| 9 | Closing CTA | "Start free. No card." + one button. | `magnetic-cursor` + `splittext-reveal` |

**Rhythm guard**: the dark Valuation band at section 5 breaks
the cream paper into two halves. That contrast is intentional —
without it the 9 sections of cream paper would feel flat. Closing
CTA also dark, bookending.

**Other routes (lighter treatments):**

| Route | Treatment | Motion |
|---|---|---|
| `/pricing` | Reuse section 6 but expanded with a feature-comparison table below. | `sticky-stack` for the cards; static table. |
| `/contact` | Single-form page — name / email / message + "We reply within 1 business day." | static |
| `/support` | FAQ accordion + email contact + status page link. | static |
| `/press` | Founder bio · logo download · screenshot zip · contact. | static |

---

## Anti-patterns — refuse to ship these

(From the `studio-landing-page` skill — re-listed inline so they're
unavoidable.)

- Purple → indigo gradient hero. We don't do gradients here at all,
  except the *brand* teal → navy on the logo lockup.
- Glassmorphism / backdrop-blur cards floating on a gradient.
- "Trusted by 1000+ teams" with four AI-generated testimonial photos.
- `<h1 class="font-bold text-7xl">` on default. Hero is `font-medium`.
- Three feature cards in a 3-column grid with icons in coloured
  circles. (We have 2 deep-dives instead.)
- "Get started for free" pill on every section. One repeated CTA in
  hero + closing — that's it.
- Pure black background (`#000000`) or pure white background (`#FFFFFF`).
- Copy that opens with "In today's fast-paced world…" or "Imagine
  if…"
- Pricing "Most Popular" ribbon on the middle tier with no rationale.

---

## Sign-off

Before any section component is written, this document is the only
acceptable source for:

- Hex codes
- Font choices
- Type sizes
- Motion patterns
- Section order

If a deviation is needed, **update this doc first**, then the
component. PR review enforces this.

| Version | Date | Notes |
|---|---|---|
| v0.1 | 2026-05-20 | Initial token lock from skill step 1+2. Based on references: apple, stripe, linear, igloo.inc, awwwards. Brand teal/navy carried from mobile app. |
