/**
 * scripts/generate-qr.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Generates the two store-link QR codes used on the landing page.
 *
 * - public/qr-apple.png   → App Store (iOS)
 * - public/qr-google.png  → Google Play (Android)
 *
 * URLs below are PLACEHOLDERS until the app ships. Update both
 * constants and re-run when the real store URLs land.
 *
 * Why generated on disk (instead of inline SVG): Apple and Google
 * occasionally block QR-redirector services, and the marketing
 * site has no API route. Static PNGs are the safest path.
 *
 * Run:
 *   npm run gen:qr
 * ─────────────────────────────────────────────────────────────────────────────
 */

import QRCode from 'qrcode';
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Both stores live as of 2026-08-27. Keep in sync with
// app/[locale]/_lib/install-urls.ts — a QR encoding a stale URL is worse than
// no QR, because nothing on the page reveals that it's broken.
const URLS = {
  apple:  'https://apps.apple.com/app/id6767415867',
  google: 'https://play.google.com/store/apps/details?id=com.carfai.app',
};

const OPTS = {
  errorCorrectionLevel: 'H',           // High — survives a logo overlay later
  margin:               1,
  width:                512,
  color: {
    dark:  '#0B0E13',                  // matches site ink colour
    light: '#FAFAF7',                  // matches site paper colour
  },
};

mkdirSync(join(ROOT, 'public'), { recursive: true });

for (const [store, url] of Object.entries(URLS)) {
  const out = join(ROOT, 'public', `qr-${store}.png`);
  await QRCode.toFile(out, url, OPTS);
  console.log(`  ✓ Wrote ${out}\n    → encodes: ${url}`);
}
