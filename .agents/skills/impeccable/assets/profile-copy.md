# CARFAI — profile copy, ready to paste

> Phase 1 asset. Every string below is final copy, not a template.
> Character limits verified 2026-08-23 against current platform docs:
> **TikTok** username 24 · display name 30 · bio 80.
> **Instagram** username 30 · bio 150.
> **Facebook Page** short description 255 · About preview 101.
>
> Counts shown as `(n/max)`. Emoji are counted as 2 (UTF-16 surrogate pairs) —
> the safe assumption, since platform counters disagree on this.
>
> **Scope as of 2026-08-23: EN only.** TikTok EN + Instagram EN + Facebook Page,
> all on `carfai.info@gmail.com`. The FR / ES / AR copy below is written and
> parked — see `references/markets.md` § Trigger for adding a market.

---

## ✅ Live accounts (created 2026-08-23)

| Platform | Handle | URL |
|---|---|---|
| Facebook Page | `carfai.official` | https://www.facebook.com/carfai.official/ |
| Instagram | `carfai.app` | https://www.instagram.com/carfai.app/ |
| TikTok | `carfai.app` | https://www.tiktok.com/@carfai.app |

**Why Facebook differs**: Facebook rejects usernames containing a TLD-like string (`.app`), an anti-phishing rule. `carfai.app` was refused there and `carfai.official` taken instead. TikTok and Instagram both accepted `carfai.app`. The inconsistency is confined to the Facebook Page URL, which is the lowest-visibility of the three — nobody types a Page URL.

---

## ⚠️ Handle availability (for the deferred accounts)

Claude cannot check whether a handle is taken. Every handle below is a **candidate**. Check all four platforms before committing to one — a consistent handle across platforms is worth more than a marginally better name on one of them.

**Check in this order**, and if the primary is gone on any one platform, drop to the fallback everywhere rather than mixing:
1. TikTok (hardest to get, check first)
2. Instagram
3. Facebook Page URL
4. YouTube (reserve even if unused — Shorts is a likely phase-5 channel)

---

## TikTok — 4 accounts

### EN — primary account

| Field | Value | Count |
|---|---|---|
| Username | `carfai.app` | (10/24) |
| — fallback 1 | `carfaiapp` | (9/24) |
| — fallback 2 | `getcarfai` | (9/24) |
| — fallback 3 | `carfai.official` | (15/24) |
| Display name | `CarFai · Car Cost Tracker` | (25/30) |
| Bio | `A second opinion for your car.`<br>`Scan receipts · read OBD2 · ask anything.` | (72/80) |
| Link | `https://play.google.com/store/apps/details?id=com.carfai.app` | |
| Category | Apps / Software (under Business) | |

Bio as one pasteable string:
```
A second opinion for your car. Scan receipts · read OBD2 · ask anything.
```

### FR

| Field | Value | Count |
|---|---|---|
| Username | `carfai.fr` | (9/24) |
| — fallback | `carfai.france` | (13/24) |
| Display name | `CarFai · Frais auto` | (19/30) |
| Bio | see below | (73/80) |
| Link | Play Store URL (same) | |

```
Un deuxième avis pour votre voiture. Reçus scannés · OBD2 · IA embarquée.
```

### ES

| Field | Value | Count |
|---|---|---|
| Username | `carfai.es` | (9/24) |
| — fallback | `carfai.espanol` | (14/24) |
| Display name | `CarFai · Gastos del auto` | (24/30) |
| Bio | see below | (70/80) |
| Link | Play Store URL (same) | |

```
Una segunda opinión para tu auto. Escanea recibos · OBD2 · IA a bordo.
```

### AR

| Field | Value | Count |
|---|---|---|
| Username | `carfai.ar` | (9/24) |
| — fallback | `carfai.arabi` | (12/24) |
| Display name | `CarFai · مصاريف سيارتك` | (22/30) |
| Bio | see below | (59/80) |
| Link | Play Store URL (same) | |

```
رأي ثانٍ لسيارتك. امسح الإيصالات · اقرأ OBD2 · اسأل أي شيء.
```

**Arabic note**: paste the bio as-is. Do not add Latin punctuation at the end of the line — it jumps to the wrong visual side in RTL. The `·` separators are safe because they sit between Arabic runs.

---

## Instagram — 2 accounts

### EN — live day one

| Field | Value | Count |
|---|---|---|
| Username | `carfai.app` | (10/30) |
| Display name | `CarFai · Car Cost Tracker` | (25/30) |
| Category | App Page | |
| Link | `https://carfai.app` (site — routes to both stores as they go live) | |

Bio (139/150) — the line breaks matter, paste with them:
```
A second opinion for your car.
Scan a receipt → AI logs the cost.
OBD2 codes in plain language.
Free tier, no card.
↓ Get it on Google Play
```

### FR — week 3, not day one

| Field | Value | Count |
|---|---|---|
| Username | `carfai.fr` | (9/30) |
| Display name | `CarFai · Frais auto` | (19/30) |
| Link | `https://carfai.app/fr` | |

Bio (136/150):
```
Un deuxième avis pour votre voiture.
Scannez un reçu → l'IA note la dépense.
Codes OBD2 en clair.
Gratuit, sans carte.
↓ Sur Google Play
```

---

## Facebook — 1 Page (EN)

| Field | Value |
|---|---|
| Page name | `CarFai` |
| Username / URL | `facebook.com/carfai.app` |
| Category | `App Page` → secondary `Product/Service` |
| Website | `https://carfai.app` |
| Email | `carfai.info@gmail.com` |

**Short description** (239/255):
```
CarFai is a second opinion for your car. Photograph a receipt and the AI logs the amount, vendor and category. Plug in any OBD2 adapter and get fault codes in plain language. Ask the advisor anything about your vehicle. Free tier, no card.
```

**About preview** (96/101) — this is the line that shows in search:
```
Scan receipts, read OBD2 codes, ask an AI about your car. Free tier, no card. Built for drivers.
```

---

## Profile picture — same image everywhere

Use the app icon: `carfai-app-mobile/assets/icon.png` (1024×1024, teal→navy mark on cream).

Sized exports are generated by `scripts/gen-social-avatars.mjs` into `output/social/`:

| Platform | File | Size |
|---|---|---|
| TikTok | `avatar-tiktok-200.png` | 200×200 (displays 100×100) |
| Instagram | `avatar-instagram-320.png` | 320×320 (displays 110×110) |
| Facebook | `avatar-facebook-360.png` | 360×360 (displays 176×176) |
| Universal 2× | `avatar-1024.png` | 1024×1024 |

All are square with **no rounded corners baked in** — every platform applies its own circular mask. Baking a radius in produces a visible double-rounding artifact.

---

## Link strategy

**Now (Play live, iOS in review)** — link goes straight to the Play Store on the TikTok accounts, and to `carfai.app` on Instagram/Facebook. No link-in-bio aggregator yet; one hop is better than two.

**When iOS approves** — switch all links to `carfai.app` (or `carfai.app/{locale}`). The site's store badges already handle store routing per platform, and `install-urls.ts` makes it a one-line change. That's better than an aggregator because it keeps the traffic on a property you own and it's already localized.

Do not add a Linktree. It adds a hop, it's a third-party dependency, and `carfai.app` already does the job better.

---

## Setup order

Create in this sequence so the cross-links resolve on the first pass:

**Now (EN only, one desktop sitting):**

1. **Facebook Page** first — Instagram Business conversion asks to link a Page, and having it ready avoids a re-do
2. **Instagram** — convert to Business, link the Page
3. **TikTok** — Business account, add the Play Store link

**Deferred** — TikTok FR / ES / AR and Instagram FR come later, one per day, once the trigger in `references/markets.md` fires.

Step-by-step console instructions: `references/account-setup.md`.
