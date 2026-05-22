# Deploy — carfai.app (Cloudflare Pages, static export)

This site ships to **Cloudflare Pages** as a **Next.js static export** —
no adapter, no edge runtime, just static HTML/CSS/JS served from
Cloudflare's CDN. DNS sits in Cloudflare too. One vendor, no
Vercel ToS grey zone for commercial use.

> **Why not `@cloudflare/next-on-pages`?** Tried it (commit `041d712`,
> later removed). The 1.13+ series requires Next ≥14.3 which never
> shipped. Pinning to 1.12.1 hit a cascade of issues: fs/path missing
> in edge runtime, React hooks not exported, build-time peer-dep
> drift. Cloudflare officially deprecated 1.x in favor of OpenNext.
> Switching to static export side-stepped all of it — and the
> marketing site is 100% SSG anyway, so we lose nothing of substance.

**Trade-off**: middleware doesn't run in static export, so there's no
Accept-Language auto-redirect. Visitors landing on `/` are 302'd to
`/en/` via `public/_redirects`. The LocaleSwitcher in the header
handles per-user locale changes from there.

---

## 1 · One-time setup (you, in the Cloudflare dashboard)

### 1.1 — Connect the repo

1. Cloudflare dashboard → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Authorize Cloudflare to access your GitHub account; pick the `carfai-marketing` repo.
3. Production branch: `main`. Preview branches: `*` (all non-main → preview deployments per branch).

### 1.2 — Build settings

| Field | Value |
|---|---|
| Framework preset | **Next.js (Static HTML Export)** if offered, otherwise **None** |
| Build command | `npm run pages:build` |
| Build output directory | `out` |
| Root directory | *(leave blank)* |
| Node version | `20` (set in the **Environment variables** tab as `NODE_VERSION=20`) |

`wrangler.toml` at the repo root pins `pages_build_output_dir = "out"`
and the compatibility date. Cloudflare reads it automatically — if
the dashboard form shows different values, the wrangler.toml values
should win, but verify after the first build.

### 1.3 — Environment variables

**Production**: none required at runtime. The site is pure SSG; the
only `process.env` references in the codebase are in `scripts/*.mjs`
(local-only generators for hero/QR/play graphics) and they pull from
`.env.local`, which is gitignored and never reaches the deploy.

### 1.4 — First deploy

After "Save and deploy" Cloudflare runs the build (~2–3 min). When the
status flips to **Success**, smoke-test the temporary `*.pages.dev`
URL across all four locales before pointing DNS:

- [ ] `/` (302 → `/en/` via `_redirects`)
- [ ] `/en/` — hero loads, store badges show "Launching summer 2026"
- [ ] `/fr/` — hero h1 reads "Un deuxième avis pour votre voiture."
- [ ] `/es/`
- [ ] `/ar/` — direction flips to RTL, layout doesn't break
- [ ] `/en/privacy/` (and the same for fr/es/ar) — no `[TBD]` or `**[POST-LAUNCH]**` markers
- [ ] `/en/press/` shows 6 Android slide thumbnails
- [ ] LocaleSwitcher in the header changes the URL and reloads in the chosen locale

### 1.5 — Custom domain + DNS

1. **Custom domains** tab on the Pages project → **Set up a custom domain** → `carfai.app`.
2. Cloudflare prompts you to add a CNAME-flattened `A`/`AAAA` record or a `CNAME` to `<project>.pages.dev`. Accept the proposed records.
3. Repeat for `www.carfai.app` (add a redirect rule: `www.carfai.app/*` → `https://carfai.app/$1` 301).
4. SSL: pick **Full (strict)** in the SSL/TLS settings. Cloudflare provisions the cert automatically.
5. After DNS propagates, repeat the §1.4 smoke checklist on `https://carfai.app`.

---

## 2 · Recurring deploys (automatic)

Once §1 is done, every push to `main` triggers a production deploy.
Every push to a non-main branch triggers a preview deploy at a unique
`<branch>.<project>.pages.dev` URL — handy for PR review.

Rollback: Pages project → **Deployments** → pick a prior successful
build → **Manage** → **Rollback to this deployment**. One-click,
reversible, no DNS change.

---

## 3 · Local workflows

```
npm run dev          # Next.js dev server (localhost:3000, also LAN via -H 0.0.0.0)
npm run build        # production static export → out/
npm run pages:build  # same as `next build` (script kept for Cloudflare's build trigger)
npm run preview      # wrangler pages dev out/ — serves the static output locally
```

`npm run build:legal` regenerates `app/[locale]/legal/_lib/manifest.generated.ts`
from the markdown sources. Runs automatically before any `next build` via
the `prebuild` hook in `package.json`.

---

## 4 · Launch-day swap-ins

Two final-mile items that ride with the carfai.app deploy. See
`RELEASE_PLAN.md` H5.b and Sprint 6 for the canonical list.

- **Store badges live**: in `app/[locale]/_components/StoreBadges.tsx`,
  flip `STORES_LIVE = true`, paste real Apple + Play URLs, run
  `npm run gen:qr` to regenerate `public/qr-{apple,google}.png`.
- **Cookie consent banner** (M1.x — GDPR / Quebec Law 25): not wired yet.
  Required if EU traffic > 0 — add before any analytics SDK fires on EU
  visitors.

---

## 5 · Fallback path

The repo has no Cloudflare-specific code outside `wrangler.toml` and
`public/_redirects`. To move to any other static host (Vercel,
Netlify, S3+CloudFront, plain GitHub Pages):

1. Build → `out/`
2. Upload `out/` to the target host
3. Point DNS

`_redirects` syntax is identical on Netlify; on Vercel use `vercel.json`
rewrites; on plain CDN, generate an `out/index.html` with a meta-refresh.
