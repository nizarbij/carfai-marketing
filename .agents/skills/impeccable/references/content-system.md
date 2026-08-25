# CARFAI — content system

> Phase 2 reference. Written 2026-08-23, once the accounts existed.
> Pillars, hook library, script templates, caption formulas, Facebook Group rules.
> Specs and cadence live in `platform-specs.md`. Voice and claim limits in `brand-and-voice.md`.

---

## The one rule everything else serves

**Lead with the money or the hassle. The app is the resolution, never the premise.**

> ❌ "CarFai uses AI to extract data from your receipts"
> ✅ "I found $8,400 in deductions I almost didn't claim"

Nobody is searching for a document scanner. They are annoyed about car costs. Enter on the annoyance.

---

## Content pillars

Four. Every post belongs to exactly one — if you can't tell which, the concept isn't sharp enough yet.

### P1 · The Number *(≈40% of posts — the workhorse)*

A real, specific figure about car ownership, revealed with the app as the instrument.

- "What a brake job actually costs vs what I was quoted"
- "My real cost per kilometre after 12 months of tracking"
- "The 4 renewal dates that cost you late fees if you miss them"

**Why it works**: numbers are inherently scroll-stopping and infinitely repeatable. This is the pillar to over-index on early.

**Constraint**: the number must be real — from Nizar's own vehicle, a real receipt, or a cited public source shown on screen. See the claim boundaries in `brand-and-voice.md`.

### P2 · The Demo *(≈30%)*

The app doing one thing, start to finish, in one unbroken screen recording.

- Scan a receipt → watch the fields populate → save
- Plug in OBD2 → fault code appears → plain-language explanation
- Ask the advisor a real question → read the real answer

**Why it works**: cheapest asset you own and the most convincing. It's proof, not a claim.

**Constraint**: no speed-ramping the AI to look faster than it is. If extraction takes 6 seconds, show 6 seconds or cut honestly — don't fake latency.

### P3 · The Mistake *(≈20%)*

A specific costly error drivers make, and how to check whether you're making it.

- "Your insurance renewed at a higher rate and nobody told you"
- "You're paying for a warranty that expired"
- "The maintenance interval in your manual isn't the one your dealer quotes"

**Why it works**: loss-aversion outperforms gain-framing consistently. "You're losing $X" beats "you could save $X".

**Constraint**: never invent a statistic about how many people make the mistake.

### P4 · Build in Public *(≈10%)*

Solo founder, real numbers about making the thing.

- "What it cost me to ship an app to both stores"
- "Apple rejected my app 7 times. Here's every reason."
- "I built this with AI. Here's what it actually did and didn't do."

**Why it works**: a second audience (founders, indie devs) who won't use the app but will share it. Free reach.

**Constraint**: this is the one pillar where Nizar's own face and voice belong, even on a faceless brand account. Ignore the faceless default here.

---

## The hook library

The first two seconds decide everything. TikTok's ranking leans on completion rate and rewatches, both of which are lost in the first beat.

**Rules for every hook:**
- Under 8 words on screen
- Visible in frame at 0.0s — not fading in, not after a logo
- Upper third of the safe box (`platform-specs.md` § safe area)
- The spoken first line must not merely read the on-screen text aloud

### Number hooks *(P1)*

```
The garage quoted me $2,400.
$487 for brake pads. Here's the actual breakdown.
I tracked every car expense for 12 months.
My car costs $0.31/km. Here's what's in that.
Nobody tells you what a car actually costs.
```

### Question hooks *(P1, P3)*

```
Do you know what your car cost you last year?
When does your registration expire? Exactly?
What's your real cost per kilometre?
Your insurance went up. Do you know why?
```

### Loss hooks *(P3 — strongest cold-start category)*

```
You're losing money on this and you can't see it.
This costs you $200 a year. Silently.
Your mechanic isn't wrong. He's just not showing you everything.
The renewal you forgot is the one with the late fee.
```

### Demo hooks *(P2)*

```
Watch what happens when I photograph this receipt.
This took 4 seconds.
I plugged a $20 adapter into my car.
Point the camera. That's the whole workflow.
```

### Founder hooks *(P4)*

```
I built a car app alone. It cost me $X.
Apple rejected my app 7 times.
I shipped to Google Play. Here's what nobody warns you about.
```

**Rotate deliberately.** Reusing the same hook shape four posts running trains the audience to skip. Track which shape lands in the content log and make more of that shape — not more of that exact sentence.

---

## Script templates

### Template A — The Number *(21–34 s)*

```
0–2s    HOOK        the figure, on screen, spoken flat
2–6s    CONTEXT     where the number comes from. one sentence.
6–16s   BREAKDOWN   screen recording — the app showing the components
16–24s  TURN        the insight. what the number means for the viewer.
24–30s  CTA         soft. what they'd do next.
30–34s  OUTRO       carfai-outro sting
```

### Template B — The Demo *(8–15 s, loops)*

```
0–2s    HOOK        "watch what happens when…"
2–10s   ACTION      one unbroken screen recording. no cuts.
10–13s  RESULT      the payoff frame, held
13–15s  OUTRO       sting — the loop back to the hook feels intentional
```

Keep these short. A demo that loops cleanly earns rewatches, and rewatches are worth more than length.

### Template C — The Mistake *(21–30 s)*

```
0–2s    HOOK        the loss, stated plainly
2–8s    SETUP       how the mistake happens. relatable, specific.
8–14s   COST        what it actually costs. real number.
14–24s  CHECK       how to find out if it applies to you — app on screen
24–30s  OUTRO
```

### Template D — Build in Public *(30–45 s, the one place length is allowed)*

```
0–3s    HOOK        the surprising fact about building it
3–25s   STORY       founder to camera. real voice, real face.
25–38s  LESSON      what you'd tell someone attempting it
38–45s  OUTRO
```

---

## Caption formulas

One asset, three captions. Never paste the same text to all three — Meta suppresses detected duplicate cross-posted copy, and the register genuinely differs.

### TikTok

```
[Hook restated, slightly different words than the on-screen text]

[One line of context or the number again]

[Soft CTA]

#tag #tag #tag
```

Short. Lowercase-leaning. Number or question inside the first six words. 3–5 tags.

### Instagram

```
[Hook — must land inside the first 125 characters, that's the fold]

[2–3 lines of context. More composed than TikTok, still not corporate.]

[CTA — "link in bio" only once the link field is actually unlocked]

#tag #tag #tag
```

### Facebook

```
[Full sentence hook — no fragments]

[3–4 lines. More context, more B2B-friendly. Fleet angle if the concept supports it.]

[CTA with the plain URL — Facebook doesn't hide links the way the others do]
```

0–2 hashtags. Hashtags underperform on Facebook.

---

## Hashtags

3–5 per post. Hashtag walls are dead — the ranking signal moved to caption text and on-screen text for search.

**English starting set** — verify volume in-app before the first batch:

| Tier | Tags |
|---|---|
| Broad | `#cartok` `#cars` `#driving` |
| Niche | `#carmaintenance` `#carcosts` `#usedcars` `#cartips` |
| Audience | `#uberdriver` `#gigwork` `#rideshare` `#sidehustle` |
| B2B | `#fleetmanagement` `#smallbusiness` |
| Founder (P4 only) | `#buildinpublic` `#indiehacker` `#solofounder` |

Mix one broad + two niche + one audience. Don't use all five tiers in one post.

---

## The outro

`social/carfai-outro.html` → open in Chrome → **Download** → `carfai-outro.mp4`. Built once, appended to every clip in CapCut.

Its tagline is **"Drive smarter."**, matching the wordmark on the store screenshots. Don't change it per-video — the whole value of an outro is that it's identical every time.

Regenerate a variant saying "Now on the App Store" only once iOS actually approves.

---

## Facebook Groups — read before posting anything

Groups are where CarFai's audience already is. They are also where self-promotion gets you banned fastest.

**The rules, non-negotiable:**

1. **Join and post from Nizar's personal profile**, never the Page. Pages posting in groups reads as spam and most groups block it outright.
2. **Read the group's pinned rules first.** Most driver groups ban promotional links entirely. Some allow it on a designated day.
3. **Answer questions genuinely, with no link.** Someone asks what a brake job should cost — answer with the real number and the reasoning. That's it. No CTA.
4. **CarFai lives in the profile bio**, not in the comment. People who find your answers useful will look.
5. **Never post the same message in multiple groups.** Facebook flags it and the groups notice.

This compounds slowly and it works. It is not a growth hack and it cannot be batched.

**Target groups** — search and join, don't post for the first two weeks:
- Uber/Lyft driver groups, city-specific for your market
- DoorDash / Instacart driver groups
- Fleet manager and small-business-vehicle groups
- Car maintenance and DIY repair groups

---

## What not to make

- **Feature tours.** "CarFai has 6 features!" — nobody watches. One idea per video.
- **Anything requiring a testimonial.** Pre-revenue. See `brand-and-voice.md`.
- **Trend-chasing with borrowed audio.** The Business account can't use trending sounds anyway, and a car-cost app doing a dance trend reads as desperate.
- **Talking-head explainers with no screen recording.** The app on screen is the proof; without it you're a person making claims.
- **Anything that needs to be understood at 2× speed with sound off.** That's how it will be watched. If the on-screen text alone doesn't carry the idea, rebuild it.
