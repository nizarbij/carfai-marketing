import createNextIntlPlugin from 'next-intl/plugin';

// Points next-intl at i18n/request.ts where the per-request message
// loader lives. Wraps the base Next.js config.
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default withNextIntl(nextConfig);
