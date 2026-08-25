# CARFAI — platform specs, cadence, and per-platform role

> **Specs go stale.** Everything here was verified 2026-08-23. Before a big
> production batch, or if a number looks off against what the app is telling
> Nizar, re-check rather than trusting this file.

---

## The shared master format

All three platforms take the same file. Produce once, export once.

| Spec | Value |
|---|---|
| Resolution | **1080 × 1920** |
| Aspect | **9:16** |
| Container | MP4 — H.264 video, AAC audio |
| Frame rate | 30 fps (screen recordings + VO) · 60 fps only if there's fast motion |
| Loudness | −14 LUFS integrated, true peak ≤ −1 dBTP |

Export one master per language, then upload the same file to TikTok and Instagram. Don't re-encode per platform; each one re-encodes on ingest anyway and a double pass just softens it.

**Never upload a TikTok-watermarked file to Instagram.** Reels demotes visible competitor watermarks. Export the clean master from CapCut, not the TikTok download.

---

## Safe area — the thing that actually breaks

Both platforms overlay UI on the bottom and right of the frame. Text placed there is unreadable in the feed even though it looks fine in the editor.

Keep all on-screen text inside:
- **Top**: 220 px clear (TikTok's top nav, IG's header)
- **Bottom**: 480 px clear (caption, CTA button, tab bar, audio label)
- **Right**: 200 px clear (the action rail — like/comment/share)

That leaves a usable box of roughly **880 × 1220 centred slightly high**. Put the hook text in the upper third of that box, never the lower half.

---

## TikTok

| Spec | Value |
|---|---|
| Caption | 2,200 characters |
| Video length | up to 10 min recorded in-app, up to 60 min uploaded |
| **Our target length** | **21–34 s** |
| File size | ~72 MB Android · ~288 MB iOS in-app · up to 4 GB via web uploader |
| Cover | Pick a frame + up to ~30 chars of cover text |
| Scheduling | `tiktok.com/tiktokstudio` — up to 10 days ahead, **one account per session** |

**Why 21–34 s**: long enough to land pain → tool → payoff, short enough that completion rate stays high. Completion rate is the dominant ranking input for a cold account. A 15-second video that everyone finishes beats a 60-second video that half the viewers drop.

**Business account music constraint** — Commercial Music Library only. No trending pop sounds. Use original voiceover as the primary audio and a Commercial Library bed underneath at low level.

**Posting cadence**: 4–5 per week per account. Below 3/week the algorithm deprioritizes the account; above ~7/week a solo founder can't sustain the quality.

**Best posting windows** (America/Toronto, for the EN account): 11:00–13:00 and 19:00–22:00 on weekdays. Treat as a starting hypothesis — replace with the account's own analytics after 2 weeks of data.

---

## Instagram Reels

| Spec | Value |
|---|---|
| Caption | 2,200 characters (first ~125 shown before "more") |
| Reel length | up to 3 min |
| **Our target length** | **same master, 21–34 s** |
| File size | up to 4 GB |
| Cover | Custom cover image supported — use it |
| Scheduling | Meta Business Suite → Planner |

**Front-load the caption.** Only ~125 characters show before the fold. The hook has to be in the first sentence, not after a line of emoji.

**Posting cadence**: 3–4 Reels per week on the EN account. Add 2–3 Stories per week — Stories reach existing followers cheaply and are the right home for build-in-public scraps that don't deserve a Reel.

---

## Facebook

| Spec | Value |
|---|---|
| Page post | 63,206 characters (only ~477 shown before "See more") |
| Page short description | 255 characters |
| About preview | 101 characters |
| Reels | same 1080×1920 master |
| Cover photo | 1640 × 856 upload · crops to ~820×312 desktop, ~640×360 mobile |

**The Page feed is not where the value is.** Organic Page reach for a new brand is close to zero and no posting cadence fixes that.

**Groups are the value.** Gig-driver and fleet-operator groups are where the high-intent audience already talks about exactly the problem CarFai solves. But:

- Groups are joined and posted in from Nizar's **personal profile**, not the Page
- **Most driver groups ban self-promotion outright** — a link drop gets removed and often banned
- The play is answering cost/maintenance questions genuinely and well, with CarFai in the profile bio. Slow, compounding, and it actually works
- This needs its own rules before it starts. **Phase 2.** Do not freelance it.

**Cadence**: 1–2 Page posts per week (mostly Reel cross-posts). Groups: participate when there's something real to say, not on a schedule.

---

## Cross-posting rules

**One asset, three captions.** Never paste the same caption to all three. Meta suppresses reach on detected duplicate cross-posted copy, and a caption that lands on TikTok reads as try-hard under a Facebook fleet post.

| Platform | Caption register |
|---|---|
| TikTok | Short, punchy, lowercase-ish. Question or number in the first 6 words. 3–5 tags. |
| Instagram | Slightly more composed. Hook in the first 125 chars. 3–5 tags, in the caption not the comments. |
| Facebook | Full sentences. More context, more B2B-friendly. 0–2 tags — hashtags underperform on FB. |

**Auto-cross-post is off.** Instagram's "also share to Facebook" toggle produces a Facebook post with an Instagram caption. Post them separately.

---

## Numbers to watch per platform

Track in `assets/content-log-template.csv`. These are the leading indicators — followers are a lagging vanity number.

| Platform | Primary signal | Healthy for a cold account |
|---|---|---|
| TikTok | Completion rate | > 45 % at 25 s |
| TikTok | Watch time vs length | > 60 % average |
| Instagram | Reach from non-followers | > 60 % of total reach |
| Facebook | Link clicks | any — the Page is a placeholder, not an engine |
| All | Profile visits → link clicks | > 8 % |

Full KPI framework and the iteration loop is Phase 4 (`references/growth-and-metrics.md`, not yet written — write it when there's data to analyze, not before).
