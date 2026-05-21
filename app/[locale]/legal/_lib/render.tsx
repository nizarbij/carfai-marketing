import { readFile } from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import { LegalLayout } from '../_components/LegalLayout';
import { findLegalPage } from '../_data/pages';

/**
 * Shared async render for every legal page route. Each route file is a
 * one-line wrapper that calls `renderLegalPage('its-slug')`. Keeps the
 * fs read + LegalLayout assembly in one place.
 *
 * Throws `notFound()` (Next.js 404) if the slug isn't in LEGAL_PAGES —
 * acts as a guard against typo'd route files.
 */
export async function renderLegalPage(slug: string) {
  const page = findLegalPage(slug);
  if (!page) notFound();

  const filePath = path.join(process.cwd(), 'content', 'legal', page.file);
  const markdown = await readFile(filePath, 'utf-8');

  return (
    <LegalLayout slug={page.slug} title={page.title} markdown={markdown} />
  );
}

export function legalMetadata(slug: string) {
  const page = findLegalPage(slug);
  return { title: page?.title ?? 'Legal' };
}
