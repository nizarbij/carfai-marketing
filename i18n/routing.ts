/**
 * i18n/routing.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for the locales supported by the marketing
 * site. Used by:
 *   - i18n/request.ts (server message loading)
 *   - app/[locale]/layout.tsx (html lang + dir)
 *   - app/sitemap.ts (per-locale URLs + hreflang)
 *
 * Strategy: every locale is prefixed (/en, /fr, /es, /ar). The static
 * export emits all pages under /[locale]/, and Link components from
 * next-intl/navigation auto-emit prefixed URLs that match the static
 * files. Visitors landing on `/` are 302'd to `/en/` via
 * public/_redirects since middleware doesn't run in static export.
 *
 * Earlier we used `localePrefix: 'as-needed'` (English at root, others
 * prefixed) but that depended on middleware to strip the /en prefix at
 * request time. Static export = no middleware → bare /privacy 404'd
 * while /en/privacy resolved. See feedback memory
 * `feedback-cloudflare-static-export`.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales:       ['en', 'fr', 'es', 'ar'] as const,
  defaultLocale: 'en',
  localePrefix:  'always',
});

export type Locale = (typeof routing.locales)[number];

/** Locales that render right-to-left. Drives `<html dir="rtl">`. */
export const RTL_LOCALES: Locale[] = ['ar'];

/** Human-readable label for the locale switcher. */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  ar: 'العربية',
};
