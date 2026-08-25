# CarFai — Organic Social Launch Playbook (TikTok + Instagram)

> ⚠️ **SUPERSEDED IN PART — 2026-08-23.** Accounts now exist and the handle,
> bio and email plans below are historical. The live source of truth is
> `.agents/skills/impeccable/`:
>
> | Topic | Current file |
> |---|---|
> | Live handles + URLs | `assets/accounts-live.md` |
> | Bios, display names | `assets/profile-copy.md` |
> | Specs, cadence, safe area | `references/platform-specs.md` |
> | Voice, claims, taglines | `references/brand-and-voice.md` |
>
> **What in this file is still good and still used:**
> - `carfai-outro.html` — the reusable animated end card. Real asset, keep it.
>   (Its TAGLINE was corrected 2026-08-23 from the never-shipped
>   "Your car. Organized." to the actual wordmark signoff "Drive smarter.")
> - § 7 Cheap wins — reply in the first hour, recycle top comments as hooks,
>   cross-post to Stories. All still true.
> - § 6 Launch-day flips — still the right sequence, but note `STORES_LIVE`
>   no longer exists; store links are now per-store in
>   `app/[locale]/_lib/install-urls.ts`.
>
> **What changed and why:**
> - Handles: `@carfai` was the plan; actual is `@carfai.app` (TikTok + IG) and
>   `carfai.official` (Facebook — it rejects TLD-like usernames).
> - Email: plan said use a brand address; actual is `carfai.info@gmail.com`.
> - Facebook was not in the original plan; a Page now exists.
> - Clip length: this file says ≤13s, the new specs say 21–34s. **Both are
>   right for different formats** — see the note in § 4 below.


Zero-budget, organic-first. Goal: stand up TikTok + Instagram, post the pre-made
10s clips (each ending with the `carfai-outro` sting), and drive to `carfai.app`
/ the app stores once live.

---

## 1. Accounts to create

| Platform | Handle (try in order) | Type |
|---|---|---|
| TikTok | `@carfai` → `@carfaiapp` → `@getcarfai` | **Business** account (free; unlocks analytics + scheduling + link in bio) |
| Instagram | same handle as TikTok for consistency | **Professional → Business** (free; analytics + link sticker) |

- Use the **same handle on both** (and reserve it on YouTube + X even if unused, so nobody squats it).
- Sign up with a brand email (e.g. `social@carfai.app` or `hello@carfai.app`), not your personal one.
- Profile photo: the CarFai app icon (square, from the marketing repo / app assets).
- TikTok Business + IG Business are free — do **not** "promote"/boost anything yet (organic only).

## 2. Bio (paste-ready)

**TikTok bio (80 char max):**
```
AI that organizes your car — receipts, maintenance, costs. 🚗
👇 Get the app
```
Link field → `carfai.app` (pre-launch) → swap to the store link / smart link at launch.

**Instagram bio:**
```
CarFai — AI for your car 🚗
Scan a doc → costs, maintenance & reminders, sorted.
Fleet plans for teams.
```
Link → `carfai.app` (use a single link; IG allows up to 5 — add App Store + Play at launch).

## 3. The outro (closing animation)

- Open `social/carfai-outro.html` in Chrome/Edge → click **Download** → you get
  `carfai-outro.mp4` (or `.webm`). Built once, reused on every clip.
- In CapCut: import your 10s clip → append `carfai-outro` at the end → export 1080×1920, 30fps, MP4.
- Edit `TAGLINE` / `DOMAIN` at the top of the HTML if you want different end-card text.
- **At launch**, regenerate a variant whose end card says "Now on the App Store / Google Play".

## 4. Posting cadence (organic ramp)

- **Pre-launch (now → approval):** post **3–5×/week**, same clip to TikTok **and** IG Reels (cross-post; don't let either sit empty). Build a small back catalog before launch day.
- **Launch week:** 1 post/day; pin your best-performing clip + a "we're live, get it here" clip.
- **Post-launch:** settle to 3×/week; double down on whatever format got the most watch-time.
- Post in the **evening local time** for your main market; consistency matters more than perfect timing.

**Clip length — reconciled 2026-08-23.** This file says ≤13s; `references/platform-specs.md` says 21–34s. Neither supersedes the other, they suit different formats:

| Format | Length | Why |
|---|---|---|
| Single-beat (one feature, one number, one reveal) | **8–15 s** | Short enough to loop. Rewatches are a strong ranking signal, and the outro sting makes the loop feel deliberate. |
| Narrative (pain → tool → payoff, e.g. the receipt-avalanche cut) | **21–34 s** | Needs the room to land all three beats. Completion rate stays high because the payoff is withheld. |

Pick per concept. What kills reach is a 45-second video with a 12-second idea in it.

## 5. Captions + hashtags

- Hook in the first line of the caption (mirror the on-screen hook).
- 3–5 hashtags, mix broad + niche. Rotate from:
  `#cartok #cars #carmaintenance #fleetmanagement #smallbusiness #cartips #ai #carcosts #driving #usedcars`
- Add a soft CTA: "Link in bio" / "carfai.app".
- TikTok rewards **watch-time + rewatches** — the looping outro helps; keep total clip ≤ ~13s.

## 6. Launch-day flips (tie to website H5.b)

When Apple + Google approve:
1. Swap bio links → store links (or a smart link that routes by device).
2. Post the "we're live" clip (outro variant with store badges).
3. Add App Store + Play QR / badges on `carfai.app` (that's the marketing-site **H5.b** task — `npm run gen:qr` + flip `STORES_LIVE`).
4. Pin the launch clip on both profiles.

## 7. Cheap wins
- Reply to every comment in the first hour (TikTok weights early engagement).
- Re-use top comments as the hook for the next video.
- Cross-post Reels to Instagram **Stories** too (extra free surface).
- Keep a running note of which hooks landed; make more of those.

---

**Status:** assets ready (`carfai-outro.html`). Accounts + first posts are founder
actions. No spend — organic only until there's a clip that's clearly working,
then consider a small boost (decide later, out of scope for v1 launch).
