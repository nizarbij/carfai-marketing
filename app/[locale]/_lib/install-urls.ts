/**
 * install-urls.ts
 * ─────────────────────────────────────────────────────────────────
 * Single source of truth for App Store / Play Store URLs and the
 * install-CTA routing rule.
 *
 * Both stores live as of 2026-08-27.
 * ─────────────────────────────────────────────────────────────────
 */

export const INSTALL_URLS = {
  google: 'https://play.google.com/store/apps/details?id=com.carfai.app',
  // Short universal form on purpose. The long variant Apple shows in the
  // browser (/us/app/carfai-ai-car-advisor/id…) pins the visitor to the US
  // storefront; this one redirects each visitor to their own country's store,
  // which matters on a site serving en/fr/es/ar.
  apple: 'https://apps.apple.com/app/id6767415867' as string | null,
} as const;

/**
 * Where a generic "install" CTA should send someone.
 *
 *   both stores live  → '#install', the anchor on the closing section that
 *                       shows both badges + QR codes, so the visitor picks
 *                       their own platform. Sending an iPhone user straight
 *                       to Google Play is the failure this avoids.
 *   one store live    → that store's URL directly
 *   neither live      → '#install' (badges render as coming-soon there)
 *
 * The '#install' target must exist. It's on the ClosingCTA <section>. If that
 * section is ever renamed or removed, this silently degrades to a dead anchor
 * — there's a build-time guard for it in ClosingCTA.tsx.
 */
export const PRIMARY_INSTALL_URL: string =
  INSTALL_URLS.apple && INSTALL_URLS.google
    ? '#install'
    : INSTALL_URLS.google ?? INSTALL_URLS.apple ?? '#install';
