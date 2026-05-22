import createNextIntlPlugin from 'next-intl/plugin';

// Points next-intl at i18n/request.ts where the per-request message
// loader lives. Wraps the base Next.js config.
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Static export — the marketing site is pure SSG (53 prerendered pages
  // across 4 locales). Build emits `out/` which Cloudflare Pages serves
  // directly without any adapter. Trade-off: middleware does not run, so
  // there's no Accept-Language auto-redirect on `/`. Visitors land on
  // the default-locale (English) homepage; the LocaleSwitcher in the
  // header handles per-user locale selection.
  output: 'export',

  // next/image's runtime optimizer needs a server. With static export
  // we ship pre-sized originals from public/ and rely on browser-native
  // lazy loading. Sharp scripts (gen-hero, gen-store, gen-play) already
  // produce the right dimensions at generate time.
  images: { unoptimized: true },
};

export default withNextIntl(nextConfig);
