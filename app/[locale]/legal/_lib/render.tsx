import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LegalLayout } from '../_components/LegalLayout';
import { findLegalPage } from '../_data/pages';
import { routing } from '@/i18n/routing';
import { LEGAL_CONTENT, type LegalSlug, type LegalLocale } from './manifest.generated';

/**
 * Locale-aware legal-page renderer. Each route file is a one-line wrapper
 * that calls `renderLegalPage('its-slug', locale)`.
 *
 * Markdown content is inlined at build time via
 * scripts/build-legal-manifest.mjs — read manifest.generated.ts to see
 * the embedded data. No fs/path is touched at request time, so the
 * Cloudflare edge runtime can render these pages.
 *
 * If the locale-specific markdown is missing (translation not yet
 * generated), the English source is used as fallback.
 */
export async function renderLegalPage(slug: string, locale: string) {
  if (!findLegalPage(slug)) notFound();
  setRequestLocale(locale);

  const localeKey = (LEGAL_CONTENT[locale as LegalLocale] ? locale : 'en') as LegalLocale;
  const markdown  =
    LEGAL_CONTENT[localeKey][slug as LegalSlug] ??
    LEGAL_CONTENT.en[slug as LegalSlug];

  if (!markdown) notFound();

  const tl    = await getTranslations({ locale, namespace: 'LegalPages' });
  const title = tl(slug as LegalSlug);

  return <LegalLayout slug={slug} title={title} markdown={markdown} />;
}

export async function legalMetadata(slug: string, locale: string) {
  if (!routing.locales.includes(locale as never)) return { title: 'Legal' };
  const tl = await getTranslations({ locale, namespace: 'LegalPages' });
  try {
    return { title: tl(slug as LegalSlug) };
  } catch {
    return { title: 'Legal' };
  }
}
