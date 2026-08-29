# CarFai — 30-day launch campaign

> Built 2026-08-29. Both stores live. Accounts at ~0 followers.
> Budget: 3 h/week, organic only, no creator spend.
> **Goal: activated users** — a download that scans at least one document.
>
> 12 pieces / 30 days / 3 per week. Five of them are already written in
> `batch-01.md`; seven are new and specified below.

---

## What I changed from the original brief, and why

**Teasers are cut.** A curiosity teaser works when you have an audience to
intrigue. At zero followers there is nobody to withhold information from — the
algorithm has no signal about who you are, so a cryptic clip gets shown to
nobody and teaches it nothing. Cold-start needs the opposite: instantly legible
content with high completion, so TikTok learns "show this to people who care
about car costs."

Curiosity still drives every hook — but it's *self-explaining* curiosity
("$487 for brake pads." → you want the breakdown) rather than *withheld*
curiosity ("something is coming…").

**Social proof is rebuilt.** You have ~12 downloads and no paying users. There
is nobody to testify. Fabricated testimonials are FTC exposure and a store
misrepresentation risk. Phase 6 is therefore founder-as-first-user: real
receipts, real OBD2 readouts, real numbers from your own Audi, and
build-in-public. That is honest proof, and at this stage it converts better
than a stranger's face anyway.

**"Available now" is spread, not spent once.** One launch post on a zero-
follower account reaches ~nobody. The availability message rides on the
strongest-performing piece instead, and repeats.

**The cinematic film is scaled to the budget.** A real short film does not fit
3 h/week. Piece 12 is 45 seconds assembled from four Gemini 10-second clips
plus assets you already have. It can still be the best thing on the account.

---

## The funnel

| Stage | Days | Pieces | Job |
|---|---|---|---|
| **Establish** | 1–8 | 1–3 | Teach the algorithm who to show you to. Legible, high-completion. |
| **Educate** | 9–16 | 4–6 | Show the mechanism. This is where activation is won. |
| **Prove** | 17–24 | 7–9 | Real numbers, real receipts, founder as first user. |
| **Elevate** | 25–30 | 10–12 | Availability push + the cinematic piece. |

Psychological progression: *what is this* → *how does it work* → *that's real* →
*this brand is worth following*.

---

## 30-day calendar

Post evenings, local time. Tue / Thu / Sat is the default rhythm — spacing
matters more than the exact days.

| # | Day | Format | Piece | Source | Phase |
|---|---|---|---|---|---|
| 1 | Tue 1 | Reel/TikTok 12 s | Receipt scan demo | `batch-01` CF-001 | Establish |
| 2 | Thu 3 | Reel/TikTok 28 s | $487 brake job breakdown | `batch-01` CF-002 | Establish |
| 3 | Sat 5 | Carousel 6 slides | What CarFai actually does | store screenshots | Establish |
| 4 | Tue 8 | Reel/TikTok 14 s | OBD2 code in plain language | `batch-01` CF-003 | Educate |
| 5 | Thu 10 | Reel/TikTok 18 s | Ask the advisor a real question | new — below | Educate |
| 6 | Sat 12 | Reel/TikTok 26 s | The renewal you forgot | `batch-01` CF-004 | Educate |
| 7 | Tue 15 | Reel/TikTok 20 s | 16 receipts, 7 categories, 0 typing | new — below | Prove |
| 8 | Thu 17 | Reel/TikTok 22 s | My real cost per 100 km | new — below | Prove |
| 9 | Sat 19 | Reel/TikTok 38 s | Shipping solo to both stores | `batch-01` CF-005 | Prove |
| 10 | Tue 22 | Carousel 5 slides | Spreadsheet vs CarFai | new — below | Elevate |
| 11 | Thu 24 | Reel/TikTok 15 s | It's out. Both stores. | new — below | Elevate |
| 12 | Sat 26 | **Cinematic 45 s** | *The Glovebox* | new — below | Elevate |
| — | Sun 27–30 | Stories only | Recycle top comments, behind-the-scenes | — | — |

**Days 27–30 are deliberately empty of new production.** Use them to reply to
comments, repost the best-performing piece to Stories, and read the analytics
before planning month two. Burning the buffer is how people stop posting in
week five.

---

## Your Gemini budget

You generate 10-second clips, ~2/day. Only **five pieces** need generation, and
only the cinematic one needs more than a single clip.

| Piece | Gemini clips needed |
|---|---|
| 8 — cost per 100 km | 1 (car on a road, morning) |
| 11 — availability | 1 (phone into dash mount) |
| 12 — cinematic | 4 (see the shot list) |
| **Total** | **6 clips over 30 days** |

That's three days of quota across a month. Everything else is screen
recordings, existing assets, and static frames.

**Never let Gemini animate a UI screenshot** — the model regenerates every
pixel per frame and the app's text warps within two seconds. App screens are
always real screen recordings or the static frames in
`output/appstore/en/video/`.

---

## The seven new pieces

### Piece 3 — Carousel · Day 5 · "What CarFai actually does"

**Objective**: give the algorithm and a first-time visitor a legible summary.
**Format**: 6-slide carousel (Instagram + TikTok photo mode).
**Source**: `output/appstore/en/video/01…06.png` — already sized 1080×1920 with
headline and subhead burned in. Zero production work.

**Slide order**: home → scan → advisor → maintenance → spending → fleet.

**Caption (IG)**:
```
Six things CarFai does, in the order you'd actually use them.

Scan a receipt → it files itself. Ask the advisor anything about your car → it
answers from your own service history. See what the car actually costs you.

Free tier, no card. carfai.app

#cartok #carmaintenance #carcosts #uberdriver
```

**CTA**: `carfai.app`
**KPI**: saves + profile visits. Carousels over-index on saves; saves are the
strongest early follow predictor.
**Connects**: piece 2 gave one number; this shows the whole surface. Piece 4
then goes deep on one feature.

---

### Piece 5 — Reel/TikTok 18 s · Day 10 · "Ask it something real"

**Objective**: demonstrate the paywalled differentiator honestly.
**Hook (0–2 s)**: `I asked my car why insurance went up.`

**Shot list**
1. `0–2 s` — phone in hand, advisor screen open
2. `2–8 s` — screen recording: type the question, send
3. `8–15 s` — the real answer scrolls. Don't speed it up.
4. `15–18 s` — hold on the answer

**On-screen text**
| Time | Text |
|---|---|
| 0.0 s | `I asked my car why insurance went up.` |
| 8.0 s | `It used my actual history.` |
| 15.0 s | `Not a Google answer.` |

**Voiceover**
```
0–2s   I asked my car why my insurance went up.
2–8s   Not a search engine. The app — which has my service history,
       my documents, my mileage.
8–16s  It answered from my data first.
16–18s That's the whole difference.
```

**Caption (TikTok)**
```
asked the app why my insurance went up

it knows my service history so the answer was about MY car, not cars in general

carfai.app

#carinsurance #cartok #carcosts #uberdriver
```

**Visual direction**: screen recording only, no cuts inside the answer.
**Editing**: real-time. Speeding up an AI response reads as faking latency.
**Sound**: no music under the answer — dry reads as credible.
**Emotion**: recognition. Everyone has had a premium rise with no explanation.
**KPI**: completion rate. If people watch the answer to the end, the feature sold.
**Connects**: piece 4 showed the app reading the car; this shows it reasoning.

---

### Piece 7 — Reel/TikTok 20 s · Day 15 · "16 receipts, 7 categories, 0 typing"

**Objective**: the activation argument, stated as a number.
**Hook (0–2 s)**: `I photographed 16 receipts. I typed nothing.`

**Shot list**
1. `0–3 s` — real receipts fanned on a table, top-down
2. `3–12 s` — screen recording: the Documents screen, scrolling the 7 category
   folders with their counts
3. `12–18 s` — tap into Maintenance, show the 7 items
4. `18–20 s` — back out to the category list

**On-screen text**: `16 documents` @ 3 s · `7 categories` @ 8 s · `0 typed` @ 16 s

**Caption (IG)**
```
16 receipts. 7 categories. Nothing typed.

Contravention, fuel, inspection, insurance, maintenance, parking, tolls — each
one photographed once and filed by itself.

The reason people stop tracking car costs is the data entry. Remove that and
the tracking just happens.

carfai.app

#carmaintenance #carcosts #cartips #gigwork
```

**KPI**: link clicks. This is the piece most likely to convert to a download.
**Connects**: piece 6 warned about a missed renewal; this shows the system that
prevents it.

---

### Piece 8 — Reel/TikTok 22 s · Day 17 · "My real cost per 100 km"

**Objective**: founder-as-first-user proof, with a real number.
**Hook (0–2 s)**: `My car costs me $1 per 100 km. Here's the math.`

> ⚠️ Use **your real figure** from the app, not this placeholder. If the number
> on screen and the number in the caption disagree, the whole piece loses.

**Gemini clip needed** (1 × 10 s): a car on an ordinary road, early morning,
exterior tracking shot, no visible badges. Used as the opening 3 seconds and
the closing 3 seconds.

**Shot list**
1. `0–3 s` — Gemini clip, road
2. `3–8 s` — screen recording: the cost-per-100km card on the home screen
3. `8–17 s` — Analytics: total spent, avg/month
4. `17–22 s` — Gemini clip again, held

**Caption (TikTok)**
```
my car costs $X per 100km and i only know that because the app worked it out
from 16 real receipts

most people have no idea what their car actually costs

carfai.app

#carcosts #cartok #gigwork #uberdriver
```

**Emotion**: mild alarm, then control.
**KPI**: comments. Cost numbers reliably provoke "mine is worse" replies —
answer every one in the first hour.
**Connects**: piece 7 showed the input; this shows what the input buys you.

---

### Piece 10 — Carousel 5 slides · Day 22 · "Spreadsheet vs CarFai"

**Objective**: name the real competitor — which is *nothing*, or a spreadsheet.

**Slides**
1. `The way most people track car costs:` over a photo of a receipt pile
2. `A spreadsheet you update for three weeks and then abandon.`
3. `The problem was never the spreadsheet. It was the typing.`
4. Screenshot: the Documents screen, 16 docs sorted
5. `Photograph it once. That's the whole workflow.` + `carfai.app`

**Note on competitors**: name the *behaviour*, not the products. Naming
Everlance or MileIQ invites comparison on their turf and gives them free
awareness. "A spreadsheet you abandoned" is a competitor everyone recognises
and nobody defends.

**KPI**: saves and shares.
**Connects**: pieces 7–9 proved it works; this frames the alternative.

---

### Piece 11 — Reel/TikTok 15 s · Day 24 · "It's out. Both stores."

**Objective**: the availability push, placed where it can actually land — after
three weeks of content have built some reach.

**Hook (0–2 s)**: `It's out.`

**Gemini clip needed** (1 × 10 s): hand slides a phone into a car dash mount,
screen glowing but **not legible**. Prompt is in `launch-video.md`.

**Shot list**
1. `0–2 s` — Gemini clip, phone into mount
2. `2–8 s` — three fast screen-recording flashes: scan, advisor, analytics
3. `8–13 s` — announcement card: `CarFai is out.` + both store badges
4. `13–15 s` — outro sting from `carfai-outro.html`

**On-screen text**: `It's out.` @ 0 s · `App Store · Google Play` @ 8 s ·
`Free tier. No card.` @ 11 s

**Caption (all platforms, adapt length)**
```
CarFai is out on the App Store and Google Play.

Scan a receipt and it files itself. Ask the advisor anything about your car.
See what the thing actually costs you.

Free tier, no card, no trial timer.

carfai.app
```

**Sound**: this is the one piece where the music should lift.
**KPI**: link clicks and installs — the only piece judged primarily on installs.
**Connects**: everything before it earned the right to ask.

---

### Piece 12 — Cinematic 45 s · Day 26 · *The Glovebox*

Full treatment below.

---

## The cinematic piece — *The Glovebox*

**Deliberately not** a screen recording with dramatic music. The product appears
once, late, and briefly.

### Concept
A glovebox is where car ownership goes to be forgotten. The film follows one
glovebox across years — the same hand opening it, the pile growing, the owner
ageing slightly — until the moment it's finally emptied.

### Story
Not about an app. About the quiet weight of paperwork you keep because you
might need it, and never organise because there's never a good moment.

### Character
Only hands and a shoulder. No face until the final shot, and even then in
profile, out of focus. The viewer should be able to be this person.

### Conflict
Nothing dramatic. The pile grows. That's the whole conflict — and that's why it
lands. Every car owner recognises it.

### Emotional turning point
The glovebox is emptied onto a table. Not in frustration — deliberately. The
decision to finally deal with it.

### How the app enters
Only after the emptying. One shot: a phone photographing one receipt. No UI
close-up, no feature tour. The app is the *answer to a decision already made*,
not the premise.

### Final reveal
The glovebox again — closed, then opened. Empty except for the registration and
a pen. It reads as relief, not as a product demo.

### Final shot
Hand closes the glovebox. Cut to black. Wordmark.

### Tagline
```
A second opinion for your car.
```

### Voiceover
Sparse. Roughly 30 words across 45 seconds. Long silences are the point.
```
0–8s     (silence — only the sound of paper)
9–14s    Every car comes with a second glovebox. The one in your head.
15–26s   (silence)
27–33s   You keep it all because you might need it. You never look at it again.
34–40s   Until you do.
41–45s   (silence, then the wordmark)
```

### Shot list — 4 Gemini clips + 2 practical

| # | Shot | Source | Duration |
|---|---|---|---|
| 1 | Glovebox opens, papers press outward | **Gemini** | 8 s |
| 2 | Same glovebox, fuller, different light | **Gemini** | 6 s |
| 3 | Same glovebox, overfull, a paper falls out | **Gemini** | 6 s |
| 4 | Papers emptied onto a table, top-down | your existing avalanche clip | 8 s |
| 5 | Phone photographs one receipt | **practical** — film it yourself | 8 s |
| 6 | Glovebox closes, empty | **Gemini** | 6 s |
| 7 | Wordmark | `carfai-outro.html` | 3 s |

**Gemini prompt, shot 1** (adapt light and fill level for 2, 3, 6):
```
Vertical 9:16, 8-second live-action shot, photorealistic.

A car glovebox opens slowly. It is packed with folded papers, receipts and
document wallets — they press outward against the door as it lowers, and one
slides forward. A hand catches it and pushes it back, then closes the
compartment partway.

Camera: locked, framed square on the glovebox from the passenger seat's
position. No camera movement whatsoever.

Lighting: overcast daylight through the side window, soft and cool. Deep
shadow inside the compartment. No direct sun, no lens flare.

Setting: a modern car interior, dark grey, clean but used. No manufacturer
badges, no logos, no readable text on any of the papers.

Mood: mundane. This is an ordinary moment, not a dramatic one.

Anti-patterns: NO readable text on the papers. NO faces. NO car brand logos.
NO camera movement. NO dramatic lighting. NO slow-motion. NO music implied
by the motion.
```

### Camera
Locked throughout. One position for the glovebox, one top-down for the table.
The refusal to move the camera is the style — it makes the pile the only thing
changing.

### Lighting
Shots 1–3 progress: overcast → late afternoon → dusk. Time passing without a
caption saying so.

### Editing rhythm
Slow. Cuts on stillness, never on action. Average shot ~6.5 s, which is four
times the length of everything else on the account — that contrast is what
makes it feel like a film.

### Sound design
Paper is the whole score for the first 26 seconds. Rustle, slide, the plastic
click of the glovebox latch. Music enters only at shot 5, and stays under.

### Music
One sustained instrumental, no percussion until the final 8 seconds. Nothing
triumphant.

### Colour
Desaturated, cool, slight green in the shadows. The only warm object in the
film is the paper. Then the phone screen, once.

### The three cuts

**15 s** — shots 1, 4, 5, 7. Drops the time-passage entirely; becomes "pile →
decision → answer". Use this one on TikTok.

**30 s** — shots 1, 3, 4, 5, 7. Keeps one beat of time passing. The default
Reels cut.

**45 s** — all seven shots. YouTube Shorts and the pinned post.

---

## Platform adaptation

**Identical across all three**: the video file, the on-screen text, the visual
grade. Produce once.

**Different on each**:

| | TikTok | Instagram Reels | YouTube Shorts |
|---|---|---|---|
| Caption | short, lowercase, number or question in the first 6 words | hook inside the first 125 characters | keyword-led — Shorts is a search surface |
| Hashtags | 3–5 | 3–5 | 2–3, in the description |
| Cover | frame + ≤30 characters | custom cover image | thumbnail matters more here |
| Length bias | 12–28 s | 15–30 s | up to 45 s performs fine |
| Cinematic cut | 15 s | 30 s | 45 s |

**Never paste the same caption to all three.** Meta suppresses detected
duplicate cross-posted copy, and a TikTok caption reads as try-hard under a
YouTube Short.

**Export the clean master from CapCut**, never the TikTok download — the
watermark demotes the video on Reels.

---

## Repurposing — one asset, several surfaces

| Original | Becomes |
|---|---|
| Any Reel | Instagram Story with a poll sticker, 24 h later |
| Piece 2 ($487 breakdown) | Static carousel of the itemised receipt |
| Piece 12 cinematic | 3 cuts + a still frame as a Facebook Page post |
| Best-performing piece | Pin it on TikTok; reuse its hook shape in month two |
| Any comment that asks a real question | The hook for a new piece — free ideas |

---

## KPIs — measured against *activated users*

Since the goal is activation, not raw installs, judge by depth not volume.

| Level | Metric | Healthy at day 30 |
|---|---|---|
| Content | Completion rate | > 45 % on the sub-20 s pieces |
| Content | Reach from non-followers | > 60 % |
| Profile | Profile visits → link clicks | > 8 % |
| Store | Link clicks → installs | > 25 % |
| **Product** | **Installs → first document scanned** | **> 40 %** |

The last row is the only one that matters. 200 installs with 10 % activation is
worse than 60 installs with 60 %.

**Log every post** in `.agents/skills/impeccable/assets/content-log-template.csv`
at 24 h and 7 days. Without it, month two is guesswork.

**Read the numbers at day 30, not before.** Any single piece is noise. What you
are looking for is which *pillar* performed, not which video.

---

## Rules

- **No fabricated proof.** No invented testimonials, no "users save $X", no
  fake review screenshots. You have ~12 downloads and that is fine — founder-
  as-first-user is honest and converts better than a stranger at this stage.
- **Never lead with a feature.** Lead with the cost or the hassle. The app is
  the resolution, never the premise.
- **One idea per video.** A 45-second video with a 12-second idea in it is how
  reach dies.
- **Never speed up the AI.** If extraction takes 6 seconds, show 6 seconds.
  Faking latency is the kind of small lie that reads on camera.
- **Reply to every comment in the first hour.** Early engagement is weighted
  heavily and it is free.
- **Don't buy followers.** It poisons the audience signal permanently and makes
  your own analytics useless.
- **Don't post daily.** Three a week, sustained for a month, beats seven a week
  for nine days and then silence.
