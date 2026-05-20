# carfai-marketing

Next.js 14 marketing + legal site for **CarFai**. Sister repo to
[`carfai-app-mobile`](../carfai-app-mobile).

**Scope on this branch (H1a)** — legal pages only. The marketing
landing pages (`/pricing`, `/contact`, `/support`, `/press`) land
in H1b.

---

## Stack

- Next.js 14 (app router)
- React 18 + TypeScript 5.6
- Tailwind CSS 3
- `react-markdown` + `remark-gfm` for the legal page rendering

## Local dev

```powershell
npm install
npm run dev
# → http://localhost:3000
```

Routes:
- `/`                  — H1a placeholder (becomes the marketing landing in H1b)
- `/privacy`           — Privacy Policy
- `/terms`             — Terms of Service
- `/eula`              — EULA
- `/ai-disclosure`     — AI Disclosure
- `/cookies`           — Cookie Policy
- `/dpa`               — Data Processing Addendum
- `/aup`               — Acceptable Use Policy

## How the legal pages work

Source markdown lives in `content/legal/*.md` — one file per page.
These files are kept in sync with the mobile repo's `docs/legal/`
(originally drafted there before this site existed). When updating
copy, **edit here**; the mobile-repo docs are now a snapshot.

Adding or renaming a page:

1. Drop the `.md` file in `content/legal/`.
2. Add an entry to `app/legal/_data/pages.ts`.
3. Create a one-line `app/<slug>/page.tsx` that calls
   `renderLegalPage('<slug>')`.

The shared `LegalLayout` renders a sidebar with every other legal
page so cross-references stay reachable.

## Deploy

Vercel — point the project at this folder, no env vars needed for
H1a (everything is static). Domain: `carfai.app`. DNS via
Cloudflare (per RELEASE_PLAN H2). Setting `metadataBase` in
`app/layout.tsx` controls the canonical URL for OG cards.

## CI

`npm run typecheck` runs `tsc --noEmit` and should be the gate on
every PR. Lighthouse CI (perf > 90, accessibility 100) is wired in
Sprint 5 per RELEASE_PLAN D11.

## Branch / commit conventions

Same as the mobile repo — Conventional Commits, short-lived feature
branches off `main`, squash-merge. See
`../carfai-app-mobile/CONTRIBUTING.md` for the full rules.
