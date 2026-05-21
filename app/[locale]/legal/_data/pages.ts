/**
 * Single source of truth for the 7 legal route slugs. Titles are
 * locale-resolved via the LegalPages namespace in messages/<locale>.json.
 *
 * Adding a new legal page:
 *   1. Add an entry here (slug + the markdown filename)
 *   2. Drop the EN source at content/legal/en/<slug>.md
 *   3. Add a key for the title in every messages/<locale>.json's
 *      LegalPages namespace
 *   4. Re-run `npm run gen:legal-translations` to translate the
 *      markdown for fr / es / ar
 *   5. Create app/[locale]/<slug>/page.tsx with a one-line
 *      renderLegalPage('<slug>', locale) call
 */

export interface LegalPage {
  slug: string;
  file: string;
}

export const LEGAL_PAGES: LegalPage[] = [
  { slug: 'privacy',       file: 'privacy.md' },
  { slug: 'terms',         file: 'terms.md' },
  { slug: 'eula',          file: 'eula.md' },
  { slug: 'ai-disclosure', file: 'ai-disclosure.md' },
  { slug: 'cookies',       file: 'cookies.md' },
  { slug: 'dpa',           file: 'dpa.md' },
  { slug: 'aup',           file: 'aup.md' },
];

export function findLegalPage(slug: string): LegalPage | undefined {
  return LEGAL_PAGES.find((p) => p.slug === slug);
}
