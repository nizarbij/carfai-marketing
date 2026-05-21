/**
 * i18n/routing.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for the locales supported by the marketing
 * site. Used by:
 *   - middleware.ts (locale detection + routing)
 *   - i18n/request.ts (server message loading)
 *   - app/[locale]/layout.tsx (html lang + dir)
 *   - app/sitemap.ts (per-locale URLs + hreflang)
 *
 * Strategy: English at the root, others at /<locale>. This keeps the
 * primary audience (English) on the canonical URL while giving each
 * other locale a clean, predictable prefix.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales:       ['en', 'fr', 'es', 'ar'] as const,
  defaultLocale: 'en',
  // English stays at the root (no /en prefix). Other locales get /fr,
  // /es, /ar. Less repetition for the largest audience; canonical
  // English URL stays clean for sharing.
  localePrefix:  'as-needed',
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
