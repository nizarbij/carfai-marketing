/**
 * app/legal/_data/pages.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for the 7 legal routes shipped under H1a.
 *
 * `slug`  — the URL path under /legal (e.g. /privacy → 'privacy')
 * `title` — the human-readable name shown in nav + page <h1>
 * `file`  — the markdown file under content/legal/ that holds the copy
 *
 * Adding a new legal page = add one entry here + drop the .md file in
 * content/legal/. The folder-route generator at app/[slug]/page.tsx
 * reads from this list, so no other edits are needed.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface LegalPage {
  slug:  string;
  title: string;
  file:  string;
}

export const LEGAL_PAGES: LegalPage[] = [
  { slug: 'privacy',        title: 'Privacy Policy',       file: 'privacy.md' },
  { slug: 'terms',          title: 'Terms of Service',     file: 'terms.md' },
  { slug: 'eula',           title: 'EULA',                 file: 'eula.md' },
  { slug: 'ai-disclosure',  title: 'AI Disclosure',        file: 'ai-disclosure.md' },
  { slug: 'cookies',        title: 'Cookie Policy',        file: 'cookies.md' },
  { slug: 'dpa',            title: 'Data Processing Addendum', file: 'dpa.md' },
  { slug: 'aup',            title: 'Acceptable Use Policy',file: 'aup.md' },
];

export function findLegalPage(slug: string): LegalPage | undefined {
  return LEGAL_PAGES.find(p => p.slug === slug);
}
