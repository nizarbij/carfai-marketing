import type { MetadataRoute } from 'next';
import { LEGAL_PAGES } from './[locale]/legal/_data/pages';
import { routing } from '../i18n/routing';

const BASE_URL = 'https://carfai.app';

/**
 * Emit per-locale URLs for every route. English at the root,
 * other locales under /<locale>/. Each entry tagged with proper
 * hreflang alternates so search engines surface the right
 * variant per visitor.
 */
function urlFor(locale: string, path: string): string {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  return `${BASE_URL}${prefix}${path}`;
}

function alternates(path: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of routing.locales) out[l] = urlFor(l, path);
  return out;
}

const ROUTES: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }> = [
  { path: '/',        changeFrequency: 'weekly',  priority: 1.0 },
  { path: '/pricing', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/support', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/contact', changeFrequency: 'yearly',  priority: 0.6 },
  ...LEGAL_PAGES.map((p) => ({
    path:            `/${p.slug}`,
    changeFrequency: 'monthly' as const,
    priority:        0.5,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];
  for (const route of ROUTES) {
    for (const locale of routing.locales) {
      entries.push({
        url:            urlFor(locale, route.path),
        lastModified:   now,
        changeFrequency: route.changeFrequency,
        priority:       route.priority,
        alternates:     { languages: alternates(route.path) },
      });
    }
  }
  return entries;
}
