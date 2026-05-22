# Deploy — carfai.app (Cloudflare Pages)

This site ships to **Cloudflare Pages** via the `@cloudflare/next-on-pages`
adapter. DNS sits in Cloudflare too — one vendor dashboard, no Vercel ToS
grey zone for commercial use. See `RELEASE_PLAN.md` H1a/H1b for the
hosting decision rationale.

> **Local-build caveat (Windows)**: `npm run pages:build` does not work on
> native Windows — the adapter calls `spawn('npx', …)` which fails
> (`ENOENT`). Use WSL, Docker, or just push and let Cloudflare's Linux
> runner do the build. `npm run build` (regular Next build) works fine
> on Windows for sanity-checking.

---

## 1 · One-time setup (you, in the Cloudflare dashboard)

### 1.1 — Connect the repo

1. Cloudflare dashboard → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Authorize Cloudflare to access your GitHub account; pick the `carfai-marketing` repo.
3. Production branch: `main`. Preview branches: `*` (all non-main → preview deployments per branch).

### 1.2 — Build settings

| Field | Value |
|---|---|
| Framework preset | **None** (we drive everything via `wrangler.toml`) |
| Build command | `npm run pages:build` |
| Build output directory | `.vercel/output/static` |
| Root directory | *(leave blank)* |
| Node version | `20` (set in the **Environment variables** tab as `NODE_VERSION=20`) |

The `wrangler.toml` at the repo root pins `compatibility_date` and the
`nodejs_compat` flag — Cloudflare reads it automatically, no need to
configure those in the dashboard.

### 1.3 — Environment variables

**Production**: none required at runtime. The site is pure SSG; the only
process.env references in the codebase are in `scripts/*.mjs` (local-only
generators for hero/QR/play graphics) and they pull from `.env.local`,
which is gitignored and never reaches the deploy.

**Local preview only** (`.dev.vars` at repo root, gitignored):
none for now.

### 1.4 — First deploy

After "Save and deploy" Cloudflare runs the build (~3-4 min). When the
build status flips to **Success**, smoke-test the temporary
`*.pages.dev` URL across all four locales before pointing DNS:

- [ ] `/` (EN home) — hero loads, store badges show the "Launching summer 2026" caption
- [ ] `/fr` (FR home) — hero h1 reads "Un deuxième avis pour votre voiture."
- [ ] `/es` (ES home)
- [ ] `/ar` (AR home) — direction is RTL, layout doesn't break
- [ ] `/privacy` and `/fr/privacy` etc. render — no `[TBD]` or `**[POST-LAUNCH]**` markers visible
- [ ] `/press` shows 6 Android slide thumbnails
- [ ] LocaleSwitcher in the header changes the URL and reloads in the chosen locale

### 1.5 — Custom domain + DNS

1. **Custom domains** tab on the Pages project → **Set up a custom domain** → `carfai.app`.
2. Cloudflare prompts you to add a CNAME-flattened `A`/`AAAA` record or a `CNAME` to `<project>.pages.dev`. Accept the proposed records.
3. Repeat for `www.carfai.app` (add a redirect rule: `www.carfai.app/*` → `https://carfai.app/$1` 301).
4. SSL: pick **Full (strict)** in the SSL/TLS settings. Cloudflare provisions the cert automatically (a few minutes).
5. After DNS propagates, repeat the §1.4 smoke checklist on `https://carfai.app`.

---

## 2 · Recurring deploys (automatic)

Once §1 is done, every push to `main` triggers a production deploy.
Every push to a non-main branch triggers a preview deploy at a unique
`<branch>.<project>.pages.dev` URL — handy for PR review.

Roll back to a previous deploy: Pages project → **Deployments** → pick a
prior successful build → **Manage** → **Rollback to this deployment**.
Reversible in one click; no DNS change.

---

## 3 · Local workflows

### 3.1 — Standard dev (Windows-friendly)

```
npm run dev          # Next.js dev server, localhost:3000 (and on LAN via -H 0.0.0.0)
npm run build        # production Next build, sanity check
```

### 3.2 — Cloudflare-adapter preview (NOT Windows-friendly)

Run from **WSL / Linux / macOS / Docker**:

```
npm run pages:build  # runs the adapter, produces .vercel/output/static
npm run preview      # wrangler pages dev .vercel/output/static
```

Docker one-liner for Windows users:

```
docker run --rm -it -v "${PWD}:/app" -w /app node:20 sh -c "npm ci && npm run pages:build"
```

Then serve `.vercel/output/static` with any static server, or push and
review the auto-generated preview deploy.

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

## 5 · Fallback to Vercel (if Cloudflare adapter blocks us)

The marketing repo has no Cloudflare-specific code outside `wrangler.toml`
and the `pages:build` / `preview` scripts in `package.json`. If the
adapter ever blocks a feature we need, the fallback to Vercel is:

1. Remove `wrangler.toml`, `@cloudflare/next-on-pages`, `wrangler`, and the
   two scripts from `package.json`.
2. Cloudflare DNS → CNAME `carfai.app` → `cname.vercel-dns.com`.
3. Vercel dashboard → Import repo → defaults work. Buy Pro ($20/mo) for
   commercial-use compliance.

Same-day swap; no application code touched.
