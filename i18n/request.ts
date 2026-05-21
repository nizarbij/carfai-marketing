/**
 * i18n/request.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Server-side message loader for next-intl. Called once per request
 * (cached) to deliver the right messages dictionary for the requested
 * locale.
 *
 * Convention: messages live at messages/<locale>.json with namespaced
 * keys (Hero, Pricing, Footer, etc.) so components can scope their
 * useTranslations('Hero') call cleanly.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale    = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
