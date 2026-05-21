/**
 * middleware.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * next-intl locale-routing middleware.
 *
 * - Detects the user's preferred locale from cookie / Accept-Language
 * - Rewrites incoming requests to the locale-prefixed segment
 * - Respects routing.localePrefix = 'as-needed' (English stays at root,
 *   /fr, /es, /ar for the others)
 *
 * The `matcher` excludes static assets, API routes, robots/sitemap,
 * Next.js internals, and the favicon — those serve the same content
 * regardless of locale.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all paths except _next, api, static files, sitemap, robots.
    '/((?!api|_next|.*\\..*|sitemap.xml|robots.txt).*)',
  ],
};
