# CarFai — production guide

> **Replaces `batch-01.md`**, which assumed shots you'd film yourself.
> Nothing here is filmed. Two ingredients only: Veo clips and screen recordings.
>
> Weeks 1–2 are specified in full. Weeks 3–4 get written once week 1 has data —
> planning a month before a single post exists is how calendars get abandoned.

---

## How to use this

Each piece below gives you four things:

1. **A Veo prompt** — paste it into Gemini, get a 10-second clip
2. **A screen recording spec** — what to capture on your phone
3. **An assembly timeline** — what goes where in CapCut
4. **Three captions** — one per platform, never reuse the same text

Work one piece at a time. Roughly 35 minutes each once you've done two.

---

## The recipe — same every time

```
[VEO 3 s]        opening — visual hook
[SCREEN 8-15 s]  the proof — the app doing the thing
[VEO 3 s]        close — breathing room
[OUTRO 2 s]      carfai-outro.html
```

One Veo clip covers both ends: generate 10 seconds, use the first 3 and the
last 3. One generation per piece.

**Screen recordings are your unlimited resource.** They're free, they're
unlimited, and they're the only thing that actually proves the app works. Veo
is decoration around them — never the substance.

**Never let Veo animate a screenshot.** It regenerates every pixel per frame, so
the app's text warps within two seconds. App screens are always real screen
recordings.

---

## How to screen-record properly

Do this once, get it right, reuse the habit.

1. **Set up the data first.** Empty screens kill a video. Have the vehicle, the
   16 documents, and real amounts in place before recording.
2. **Turn on Do Not Disturb.** A notification banner mid-recording ruins the take.
3. **iPhone**: Control Centre → screen record. Record 5 seconds longer than you
   need at both ends — trimming is easy, re-recording isn't.
4. **Move slowly.** Scroll at half the speed that feels natural. On playback it
   looks normal; at natural speed it looks frantic.
5. **Never speed up the AI.** If extraction takes 6 seconds, show 6 seconds.
   Faking latency is a small lie that reads on camera.

---

# WEEK 1

## Piece 1 — Day 1 — 14 s — "It files itself"

**Objective**: first post. Teach the algorithm what this account is about.

**Hook (0–2 s)**: `I photographed a receipt. That's the whole job.`

### Veo prompt
```
Vertical 9:16, 10-second live-action shot, photorealistic.

A crumpled paper receipt lies on a dark wooden table, lit by soft window light
from the left. A hand enters from the right, smooths the receipt flat with two
fingers, then withdraws. The receipt stays in frame, slightly curled at one
edge.

Camera: locked, directly overhead, looking straight down. No camera movement.

Lighting: soft, overcast daylight from a window to the left. Gentle shadow
under the curled edge. No direct sun, no lens flare.

Mood: ordinary and calm. A small domestic moment, not a dramatic one.

Anti-patterns: NO readable text on the receipt. NO faces. NO logos or brand
names. NO camera movement. NO slow motion. NO phone in frame.
```

### Screen recording
Open CarFai → camera tab → photograph a receipt → let "Analyzing document…"
run → hold on the filled Review & Refine screen. **One unbroken take, ~12 s.**

### Assembly
| Time | Content |
|---|---|
| 0–3 s | Veo, first 3 s (receipt on table) |
| 3–12 s | Screen recording |
| 12–14 s | Outro sting |

### On-screen text
- `0.0 s` — `I photographed a receipt.`
- `3.0 s` — `That's the whole job.`
- `10.0 s` — `Amount, vendor, date, category.`

### Captions

**TikTok**
```
photographed one receipt and the app did the rest

amount, vendor, date, category — nothing typed

carfai.app

#cartok #carmaintenance #carcosts #uberdriver
```

**Instagram**
```
One photo. Everything filled in.

The amount, the vendor, the date and the category — read automatically. The
reason people stop tracking car costs is the data entry, so that's the part
worth removing.

Free tier, no card. carfai.app

#cartok #carmaintenance #carcosts #cartips
```

**Facebook**
```
The entire workflow: photograph a receipt, and the amount, vendor, date and category are logged automatically.

If you track vehicle costs for work or for a fleet, manual entry is the step that makes people give up. Removing it is most of the value.

Free tier, no card required: https://carfai.app
```

**Why it works**: the shortest possible distance between a problem everyone has
and proof that it's solved. First posts should be legible, not clever.

---

## Piece 2 — Day 3 — 26 s — "$487 for brake pads"

**Objective**: a real number. Numbers are the most repeatable format you have.

**Hook (0–2 s)**: `$487 for brake pads.`

> Use **your real receipt**. If the number on screen and the number in the
> caption disagree, the piece is worthless.

### Veo prompt
```
Vertical 9:16, 10-second live-action shot, photorealistic.

A long printed service invoice lies on a dark wooden table, curling slightly at
the bottom edge. Soft window light from the left. The paper is slightly creased
from being folded in a pocket.

Camera: locked, directly overhead. Extremely slow push-in — the frame tightens
by about 8% across the ten seconds. Nothing else moves.

Lighting: soft overcast daylight from the left, shallow shadow along the crease.

Mood: quiet, factual. The feeling of sitting down to finally look at a bill.

Anti-patterns: NO readable text or numbers on the invoice. NO faces. NO hands.
NO logos. NO fast camera movement. NO dramatic lighting.
```

### Screen recording
Documents → open the brake-service document → scroll slowly through the Line
Items card, showing parts and labour subtotals. **~14 s.**

### Assembly
| Time | Content |
|---|---|
| 0–3 s | Veo, invoice on table |
| 3–17 s | Screen recording, line items |
| 17–24 s | Hold on the two subtotals |
| 24–26 s | Outro |

### On-screen text
- `0.0 s` — `$487 for brake pads.`
- `6.0 s` — `Parts: $312`
- `12.0 s` — `Labour: $175`
- `20.0 s` — `Know the split.`

### Captions

**TikTok**
```
$487 brake job, itemized

parts $312, labour $175 — that split is what tells you if a quote is fair

carfai.app

#carmaintenance #carcosts #cartok #cartips
```

**Instagram**
```
$487 for a front brake job. The actual breakdown:

Pads $94.99 · Rotors $189.99 · Fluid $27.42 · Labour $134.92 · Inspection $40

Parts came to $312, labour to $175. Knowing that ratio is what lets you sanity-check a quote — and it's the part most invoices bury.

carfai.app

#carmaintenance #carcosts #cartips #usedcars
```

**Facebook**
```
A front brake job cost me $487.32. Itemized:

Front pads — $94.99
Front rotors — $189.99
Brake fluid — $27.42
Labour (1.5 hrs) — $134.92
Multi-point inspection — $40.00

Parts $312.40, labour $174.92.

Knowing the parts-to-labour split is what lets you judge whether a quote is reasonable. For anyone running vehicles for work, having every invoice broken down this way is the difference between knowing your costs and guessing.

https://carfai.app
```

**Why it works**: specificity. "$487.32" is believable in a way "save money" never is.

---

## Piece 3 — Day 5 — Carousel — "What CarFai does"

**Zero production.** Six images already exist at
`output/appstore/en/video/01…06.png`, sized 1080×1920 with headline and subhead
burned in.

Post as a carousel on Instagram, photo mode on TikTok.
Order: home → scan → advisor → maintenance → spending → fleet.

**Caption (Instagram)**
```
Six things CarFai does, in the order you'd actually use them.

Scan a receipt and it files itself. Ask the advisor about your car and it answers from your own service history. See what the thing actually costs you per month.

Free tier, no card. carfai.app

#cartok #carmaintenance #carcosts #uberdriver
```

**KPI**: saves. Carousels over-index on saves, and saves predict follows.

---

# WEEK 2

## Piece 4 — Day 8 — 16 s — "P0043, in English"

**Hook (0–2 s)**: `Your check engine light means something specific.`

### Veo prompt
```
Vertical 9:16, 10-second live-action shot, photorealistic.

A car dashboard instrument cluster seen from the driver's seat, engine running.
An amber check-engine warning symbol is illuminated among the gauges. The
needles rest at idle. Everything is still.

Camera: locked, framed on the cluster, slightly off-axis. No camera movement.

Lighting: dim early evening. The cluster's own backlight is the main source,
cool blue-white, with the amber warning symbol clearly the warmest point in
frame. Soft ambient light through the windscreen behind.

Mood: low-grade dread. The specific feeling of a warning light you don't
understand.

Anti-patterns: NO readable text or numbers on the gauges. NO faces. NO hands.
NO manufacturer badges or logos. NO camera movement. NO lens flare.
```

### Screen recording
OBD2 dashboard → the fault codes card → tap P0043 → hold on the plain-language
explanation. **~10 s.**

### Assembly
| Time | Content |
|---|---|
| 0–4 s | Veo, warning light |
| 4–14 s | Screen recording |
| 14–16 s | Outro |

### On-screen text
- `0.0 s` — `Your check engine light means something specific.`
- `4.0 s` — `P0043`
- `11.0 s` — `In English.`

### Captions

**TikTok**
```
check engine light → actual answer in 10 seconds

any $20 bluetooth obd2 adapter works

carfai.app

#cartok #carmaintenance #cartips #obd2
```

**Instagram**
```
Your check engine light isn't vague. The car knows exactly what's wrong — you just can't read it.

Any $20 Bluetooth OBD2 adapter plus the app returns the code and what it actually means, plus live battery voltage, coolant temp and fuel trim.

P0043 = oxygen sensor heater circuit, bank 1, sensor 3. Not a mystery. A translation problem.

carfai.app

#carmaintenance #cartips #obd2 #cartok
```

**Facebook**
```
A check engine light is not vague information — the car knows precisely what is wrong. The gap is that the code is unreadable without a scanner.

Any $20 Bluetooth OBD2 adapter pairs with the app and returns the fault code in plain language, along with live readings: battery voltage, coolant temperature, fuel trim, engine load.

For anyone running vehicles for work, this is the difference between "something's wrong, book a diagnostic" and knowing what it is before you call anyone.

https://carfai.app
```

---

## Piece 5 — Day 10 — 18 s — "I asked my car why insurance went up"

**Hook (0–2 s)**: `I asked my car why my insurance went up.`

### Veo prompt
```
Vertical 9:16, 10-second live-action shot, photorealistic.

An open insurance renewal letter lies on a kitchen table beside a set of car
keys. The paper is slightly crumpled. Late afternoon light falls across it from
the right, warm and low.

Camera: locked, three-quarter overhead angle. No movement.

Lighting: warm low sun from the right, long soft shadow from the keys across
the paper.

Mood: the small annoyance of an unexplained price increase.

Anti-patterns: NO readable text or numbers on the letter. NO faces. NO hands.
NO logos or insurer branding. NO camera movement.
```

### Screen recording
AI Advisor → type the question → send → let the **real** answer render at real
speed → hold. **~11 s.**

### Assembly
| Time | Content |
|---|---|
| 0–3 s | Veo, renewal letter |
| 3–15 s | Screen recording, question and answer |
| 15–18 s | Outro |

### On-screen text
- `0.0 s` — `I asked my car why my insurance went up.`
- `10.0 s` — `It used my actual history.`
- `15.0 s` — `Not a Google answer.`

### Captions

**TikTok**
```
asked the app why my insurance went up

it has my service history so the answer was about MY car, not cars in general

carfai.app

#carinsurance #cartok #carcosts #uberdriver
```

**Instagram**
```
I asked the app why my insurance went up — and it answered from my own service history, my mileage, my documents.

That's the difference between an AI that has seen your car and a search engine that hasn't.

carfai.app

#carinsurance #carcosts #cartips #cartok
```

**Facebook**
```
I asked the app why my insurance premium went up this year.

It answered using my own service history, my documents and my mileage — not a general article about insurance pricing. That distinction is the entire point of the product.

https://carfai.app
```

**Why it works**: this is the paywalled feature. Showing it working honestly is
the strongest argument for upgrading that exists.

---

## Piece 6 — Day 12 — 20 s — "16 receipts, 7 categories, 0 typing"

**Hook (0–2 s)**: `16 receipts. I typed nothing.`

### Veo prompt
```
Vertical 9:16, 10-second live-action shot, photorealistic.

A car glovebox opens slowly. It is packed with folded papers and receipts that
press outward against the door as it lowers. One slips forward and rests on the
edge. Nothing else moves.

Camera: locked, square on the glovebox from the passenger seat position. No
camera movement.

Lighting: soft overcast daylight through the side window, cool. Deep shadow
inside the compartment.

Mood: mundane accumulation. Ordinary, not dramatic.

Anti-patterns: NO readable text on the papers. NO faces. NO hands. NO
manufacturer badges. NO camera movement. NO slow motion.
```

### Screen recording
Documents screen → scroll the 7 category folders with their counts → tap into
Maintenance → show the 7 items → back out. **~14 s.**

### Assembly
| Time | Content |
|---|---|
| 0–4 s | Veo, glovebox |
| 4–18 s | Screen recording |
| 18–20 s | Outro |

### On-screen text
- `0.0 s` — `16 receipts.`
- `2.0 s` — `I typed nothing.`
- `8.0 s` — `7 categories, sorted automatically.`

### Captions

**TikTok**
```
16 receipts, 7 categories, zero typing

contravention, fuel, inspection, insurance, maintenance, parking, tolls — each photographed once

carfai.app

#carmaintenance #carcosts #cartips #gigwork
```

**Instagram**
```
16 receipts. 7 categories. Nothing typed.

Each one photographed once, then filed by itself — contravention, fuel, inspection, insurance, maintenance, parking, tolls.

The reason people stop tracking car costs is the data entry. Remove that and the tracking just happens.

carfai.app

#carmaintenance #carcosts #cartips #gigwork
```

**Facebook**
```
16 receipts, filed into 7 categories, with nothing typed by hand.

Each document is photographed once; the amount, vendor, date and category are extracted automatically and the original stays attached.

For a fleet this compounds quickly — the admin load is what stops most small operators from tracking properly in the first place.

https://carfai.app
```

---

# Your existing "Available now" video

**Don't post it yet.** It goes at **Day 24**, not day 1.

A launch announcement on a zero-follower account reaches almost nobody. Posted
after three weeks of content, it lands on an audience that already knows what
CarFai is — which is when an availability message actually converts.

If you want to use it sooner: put it in **Instagram Stories** now (Stories reach
your existing followers, so there's no waste), and keep the feed slot for Day 24.

---

# Your raw Veo clips

Tell me what each one shows and I'll assign them to pieces — several of the
prompts above may already be covered by something you've generated, which saves
you the quota.

---

# Weeks 3–4

Deliberately unwritten. After week 2 you'll know:

- which **pillar** performed (numbers vs demos vs problems)
- which **hook shape** held attention past 3 seconds
- whether **screen recordings** beat **Veo-led** openings

Then weeks 3–4 get built out of what worked instead of what I guessed. The
outline stands: proof (days 15–19) → availability (day 24) → cinematic (day 26).

---

## Rules

- **One idea per video.** A 40-second video with a 12-second idea is how reach dies.
- **Lead with the cost or the hassle**, never the feature. The app is the resolution.
- **No fabricated proof.** No invented testimonials, no "users save $X". You have
  ~12 downloads and that's fine — your own real receipts are stronger anyway.
- **Reply to every comment in the first hour.** Weighted heavily, costs nothing.
- **Three posts a week, sustained.** Not seven for nine days and then silence.
