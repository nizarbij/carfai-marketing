/**
 * install-urls.ts
 * ─────────────────────────────────────────────────────────────────
 * Single source of truth for App Store / Play Store URLs and the
 * install-CTA routing rule. When iOS ships, drop the App Store URL
 * into `apple` here — every install-flow button + store badge picks
 * it up automatically.
 * ─────────────────────────────────────────────────────────────────
 */

export const INSTALL_URLS = {
  google: 'https://play.google.com/store/apps/details?id=com.carfai.app',
  // Set once Apple approves + assigns the real app ID.
  apple:  null as string | null,
} as const;

/**
 * The URL a generic "install" CTA should route to.
 *   both stores live  → '#install' (anchor near the store-badge row —
 *                       let the user pick their platform)
 *   one store live    → that store's URL directly
 *   neither live      → '#install' anchor (badges show coming-soon)
 */
export const PRIMARY_INSTALL_URL: string =
  INSTALL_URLS.apple && INSTALL_URLS.google
    ? '#install'
    : INSTALL_URLS.google ?? INSTALL_URLS.apple ?? '#install';
