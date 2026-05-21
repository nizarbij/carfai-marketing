import { readFile } from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LegalLayout } from '../_components/LegalLayout';
import { findLegalPage } from '../_data/pages';
import { routing } from '@/i18n/routing';

type LegalSlug = 'privacy' | 'terms' | 'eula' | 'ai-disclosure' | 'cookies' | 'dpa' | 'aup';

/**
 * Locale-aware legal-page renderer. Each route file is a one-line
 * wrapper that calls `renderLegalPage('its-slug', locale)`.
 *
 * The markdown file lives at content/legal/<locale>/<slug>.md.
 * If the locale-specific file is missing (e.g. translation not
 * generated yet), we fall back to the English source.
 */
export async function renderLegalPage(slug: string, locale: string) {
  if (!findLegalPage(slug)) notFound();
  setRequestLocale(locale);

  const fileForLocale = path.join(process.cwd(), 'content', 'legal', locale, `${slug}.md`);
  const fileForEn     = path.join(process.cwd(), 'content', 'legal', 'en',  `${slug}.md`);

  let markdown: string;
  try {
    markdown = await readFile(fileForLocale, 'utf-8');
  } catch {
    markdown = await readFile(fileForEn, 'utf-8');
  }

  const tl = await getTranslations({ locale, namespace: 'LegalPages' });
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
