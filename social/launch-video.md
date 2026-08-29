# CarFai — launch announcement video

> 30 seconds · 9:16 · both stores live.
> Produced 2026-08-29.
>
> **One new Veo generation required.** Everything else already exists.

---

## The tool split — read this before generating anything

**Never let Veo animate a UI screenshot.** Video models regenerate every pixel
each frame. Feed it a screenshot of the app and it will warp the text: "Documents"
becomes glyph soup, the numbers in the cards drift, the tab bar melts. It's
obvious within two seconds and it destroys the credibility of a launch video.

| Element | Tool | Why |
|---|---|---|
| Live-action beats (receipts, car, hands) | **Veo** | Exactly what it's good at |
| App screens | **CapCut** — static frames + Ken Burns | Pixel-perfect, zero drift |
| "Now available" card | **CapCut** — text + store badges | Must be legible |
| Outro sting | `social/carfai-outro.html` | Already built |

The earlier Veo-API attempt failed because it was asked to invent a consistent
world across six independent calls — table, hand, sleeve and lighting changed
every time. That's structural, not a prompting problem. This cut avoids it by
using Veo for **one** shot and anchoring everything else to real assets.

---

## Assets — almost all of it already exists

| Asset | Path | Status |
|---|---|---|
| Shoebox avalanche clip | `output/geminai-local/c_f_b_d_b_c_a_cmp_.mp4` | ✅ reuse as the hook |
| 6 video frames, 1080×1920 | `output/appstore/video/*.png` | ✅ `npm run gen:appstore` |
| Store badges | `public/store-apple.png`, `public/store-google.png` | ✅ |
| Outro generator | `social/carfai-outro.html` | ✅ tagline already "Drive smarter." |
| Closing shot | — | ⬜ **the one Veo generation** |

---

## Timeline — 30 s

| # | Time | Beat | Source |
|---|---|---|---|
| 1 | 0.0–3.5 | Receipts avalanche — the problem | existing mp4 |
| 2 | 3.5–6.0 | Title card: "There's a better way." | CapCut text |
| 3 | 6.0–9.0 | Home screen | `video/01_home.png` |
| 4 | 9.0–12.0 | Scan → filed automatically | `video/02_scan.png` |
| 5 | 12.0–15.0 | AI Advisor | `video/03_advisor.png` |
| 6 | 15.0–18.0 | Maintenance calendar | `video/04_maintenance.png` |
| 7 | 18.0–20.5 | Spending analytics | `video/05_spending.png` |
| 8 | 20.5–25.5 | **"Now available"** + both badges | CapCut |
| 9 | 25.5–28.0 | Closing live-action shot | **Veo** |
| 10 | 28.0–30.0 | Outro sting | `carfai-outro.html` |

---

## Beat-by-beat

### 1 · 0.0–3.5 — Hook

Use the existing avalanche clip. Trim to the moment the receipts settle.

**On-screen text @ 0.3s:** `Every receipt. Every renewal. Every repair.`
Inter Medium, 64px, white, drop shadow, upper third.

**On-screen text @ 2.0s:** `Somewhere.`
Same style, replaces the line above.

### 2 · 3.5–6.0 — Turn

Hard cut to solid `#089BC3`. One line, centred, large.

```
There's a better way to own a car.
```
Inter Medium, 76px, `#FAFAF7`. Fades in over 0.3s, holds, cuts.

### 3–7 · 6.0–20.5 — The app

Five frames from `output/appstore/video/`. Each gets **~3 s** with a slow
Ken Burns: scale 100% → 106%, no pan. Hard cuts between them, no dissolves —
dissolves read as slow on short-form.

The frames already carry their headline and subhead, so **do not add more text**
over them. One message per frame.

Order matters: home → scan → advisor → maintenance → spending. It walks the
viewer from "what is it" to "what does it do for me".

### 8 · 20.5–25.5 — The announcement

This is the point of the whole video. Give it the most screen time of any beat.

Background: the teal→navy gradient (`#089BC3` → `#0A3E8F`), matching the frames.

```
0.0s   CarFai                    ← wordmark, Mono Medium, 72px
0.4s   is out.                   ← Inter Medium, 96px
1.2s   [App Store badge] [Google Play badge]   ← side by side, fade in together
2.2s   Free tier. No card.       ← Inter Regular, 44px, white 80%
3.5s   carfai.app                ← Mono, 40px, teal-tinted white
```

Badges: `public/store-apple.png` and `public/store-google.png`, equal size,
centred, ~40% frame width combined.

**Both stores are live**, so both badges are honest. Do not show one larger
than the other.

### 9 · 25.5–28.0 — Closing shot

The one Veo generation. Prompt below.

### 10 · 28.0–30.0 — Outro

Open `social/carfai-outro.html` in Chrome → **Download** → append the mp4.
Tagline reads "Drive smarter." — already correct, don't edit it.

---

## The Veo prompt — closing shot only

Run this in **Gemini Pro's interface**, not the API. The interface holds
consistency far better, and it's inside the subscription you already pay for
(the API path cost ~$5 for unusable output).

Give it **`output/appstore/video/01_home.png` as a reference image** so the
phone and the app's look carry over.

```
Vertical 9:16, 3-second live-action shot, photorealistic.

A person's hand slides a matte graphite smartphone into a car's dashboard
vent mount, then withdraws. The phone screen is on and glowing faintly, but
its content is NOT legible — it reads as a soft blue-white glow, not as
readable UI.

Camera: locked, slightly low, framing the mount and the top of the dashboard.
No camera movement. Shallow depth of field — the phone is sharp, the
windshield beyond is softly out of focus.

Lighting: early morning. Cool daylight through the windshield from the front,
a warm sliver of low sun across the dashboard from the right. Clean, calm,
not dramatic.

Setting: a modern car interior, dark grey. Clean but lived-in. No visible
manufacturer badges, no logos anywhere.

Mood: quiet readiness. The start of a normal drive, not a triumphant moment.

Anti-patterns: NO readable text on the phone screen. NO app UI rendered.
NO faces. NO car brand logos or badges. NO lens flare. NO dramatic music
cue implied by the motion. NO fast camera moves. NO hands beyond the wrist.
```

**Why the screen must be illegible**: the moment you ask Veo for readable UI,
it invents warped text. A glow reads as "the app is running" without the model
having to render anything it will get wrong.

If Veo drifts anyway, the fallback is a 10-second real shot on your own phone —
you have a car and a dashboard mount. It will look better than any generation.

---

## Audio

Veo 2 renders silent. All audio in post.

| Time | Sound |
|---|---|
| 0.0–3.5 | Paper rustle under the avalanche. No music yet. |
| 3.5 | Music enters — mid-tempo, restrained, no vocal |
| 6.0–20.5 | Bed continues. One soft tick per frame transition. |
| 20.5 | Music lifts for the announcement — the only "moment" in the cut |
| 25.5 | Ambient: a car door, a seatbelt click, an engine turning over |
| 28.0–30.0 | Resolve on the outro sting |

Track style: instrumental, restrained. Tycho / Bonobo territory. Sources:
Epidemic Sound, Artlist, or the TikTok Commercial Music Library if it's going
straight to the Business account.

---

## Export

| Setting | Value |
|---|---|
| Resolution | 1080 × 1920 |
| Frame rate | 30 fps |
| Codec | H.264, AAC audio |
| Loudness | −14 LUFS, true peak ≤ −1 dBTP |

**Keep the safe area**: 220 px clear at the top, 480 px at the bottom, 200 px
on the right. The announcement card at beat 8 must sit fully inside that box —
it's the one frame where a cropped word costs a download.

---

## Where it goes

| Surface | Cut | Note |
|---|---|---|
| TikTok | full 30 s | pin it |
| Instagram Reels | full 30 s | + cross-post to Stories |
| Facebook Page | full 30 s | launch post |
| App Store preview | ⚠️ **not this cut** | see below |

**App Store app previews have their own rules** — they must be captured device
footage, no live action, no third-party imagery. This cut would be rejected as
a store preview. If you want one, it's a separate 15–30 s edit made only of
screen recordings. Different job.

---

## Cost

| Item | Cost |
|---|---|
| Veo closing shot (Gemini Pro) | included in the subscription — 1 of your ~2/day |
| Everything else | existing assets |
| Music | free tier or existing subscription |
| **Total** | **≈ $0** |

Compare with the earlier Veo-API attempt: ~$5 for six clips that didn't cut
together. The difference is scope — one shot instead of six, and every other
beat anchored to something real.
