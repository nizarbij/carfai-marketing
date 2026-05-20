import type { MetadataRoute } from 'next';
import { LEGAL_PAGES } from './legal/_data/pages';

const BASE_URL = 'https://carfai.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    ...LEGAL_PAGES.map(p => ({
      url:            `${BASE_URL}/${p.slug}`,
      lastModified:   now,
      changeFrequency: 'monthly' as const,
      priority:       0.5,
    })),
  ];
}
