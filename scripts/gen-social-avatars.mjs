/**
 * scripts/gen-social-avatars.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Generate profile pictures + cover art for the CarFai social accounts.
 *
 *   npm run gen:social
 *
 * Output → output/social/
 *   avatar-1024.png             universal 2× master
 *   avatar-tiktok-200.png       TikTok    (displays 100×100)
 *   avatar-instagram-320.png    Instagram (displays 110×110)
 *   avatar-facebook-360.png     Facebook  (displays 176×176)
 *   cover-facebook-1640x856.png Facebook Page cover
 *
 * Source: carfai-app-mobile/assets/icon.png — the shipped app icon, so the
 * avatar matches what a user sees on their home screen after installing.
 *
 * Avatars are square with NO rounded corners baked in. Every platform applies
 * its own circular mask; pre-rounding produces a double-rounded artifact with
 * pale fringing at the corners.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import sharp from 'sharp';
import { mkdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT = join(ROOT, 'output', 'social');

/* Brand tokens — mirror tailwind.config.ts */
const T = {
  paper:      '#FAFAF7',
  paperDeep:  '#F2EFE8',
  ink:        '#0B0E13',
  slate2:     '#3B475C',
  accent:     '#089BC3',
};

const MONO = "'JetBrains Mono', 'Cascadia Mono', Consolas, ui-monospace, monospace";
const SANS = "Inter, 'Segoe UI', system-ui, -apple-system, sans-serif";

/* Icon source — the shipped app icon. Falls back to the marketing copy. */
const ICON_CANDIDATES = [
  'C:/app/carfai-app-mobile/assets/icon.png',
  join(ROOT, 'app', 'icon.png'),
];
const ICON = ICON_CANDIDATES.find((p) => existsSync(p));
if (!ICON) {
  console.error('\n  ✖ No source icon found. Looked in:\n' + ICON_CANDIDATES.map((p) => '    ' + p).join('\n') + '\n');
  process.exit(1);
}

const kb = (p) => Math.round(statSync(p).size / 1024) + ' KB';

mkdirSync(OUT, { recursive: true });
console.log(`\n  Source icon: ${ICON}\n`);

/* ─── Avatars ────────────────────────────────────────────────────────────── */

const AVATARS = [
  { name: 'avatar-1024.png',          size: 1024, note: 'universal 2× master' },
  { name: 'avatar-tiktok-200.png',    size: 200,  note: 'TikTok · displays 100×100' },
  { name: 'avatar-instagram-320.png', size: 320,  note: 'Instagram · displays 110×110' },
  { name: 'avatar-facebook-360.png',  size: 360,  note: 'Facebook · displays 176×176' },
];

for (const a of AVATARS) {
  const out = join(OUT, a.name);
  await sharp(ICON)
    .resize(a.size, a.size, { kernel: sharp.kernel.lanczos3, fit: 'cover' })
    // Flatten onto paper so any transparency doesn't render as black in the
    // platforms that composite avatars on a dark surface.
    .flatten({ background: T.paper })
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(`  ✓ ${a.name.padEnd(28)} ${a.size}×${a.size}  ${kb(out).padStart(7)}   ${a.note}`);
}

/* ─── Facebook Page cover ────────────────────────────────────────────────── */

/**
 * 1640×856 is the upload size. Facebook crops to ~820×312 on desktop and
 * ~640×360 on mobile from the CENTRE, so anything load-bearing has to sit
 * inside the mobile-safe box. We keep the lockup well inside it.
 */
const COVER_W = 1640;
const COVER_H = 856;
const SAFE_W  = 1180; // ≈ mobile-safe width at this scale

/**
 * The app icon ships with its own cream plate baked in, so dropping it flat
 * onto the cover's gradient leaves a visible square seam. Rounding the
 * corners turns that seam into a deliberate app-icon shape instead.
 */
const ICON_IN_COVER = 190;
const iconRadius = Math.round(ICON_IN_COVER * 0.22); // iOS-squircle-adjacent
const iconMask = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${ICON_IN_COVER}" height="${ICON_IN_COVER}">` +
  `<rect width="${ICON_IN_COVER}" height="${ICON_IN_COVER}" rx="${iconRadius}" ry="${iconRadius}" fill="white"/></svg>`,
);

const iconInCover = await sharp(ICON)
  .resize(ICON_IN_COVER, ICON_IN_COVER, { kernel: sharp.kernel.lanczos3 })
  .composite([{ input: iconMask, blend: 'dest-in' }])
  .png()
  .toBuffer();

const coverBg = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${COVER_W}" height="${COVER_H}" viewBox="0 0 ${COVER_W} ${COVER_H}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="${T.paper}" />
      <stop offset="100%" stop-color="${T.paperDeep}" />
    </linearGradient>
  </defs>
  <rect width="${COVER_W}" height="${COVER_H}" fill="url(#bg)" />

  <!-- hairline rule, the SectionIndex motif from the site -->
  <line x1="${(COVER_W - SAFE_W) / 2}" y1="${COVER_H * 0.30}"
        x2="${(COVER_W - SAFE_W) / 2 + 150}" y2="${COVER_H * 0.30}"
        stroke="${T.accent}" stroke-width="3" />

  <text x="${(COVER_W - SAFE_W) / 2 + 235}" y="${COVER_H * 0.455}"
        font-family="${SANS}" font-weight="500" font-size="76"
        letter-spacing="-0.02em" fill="${T.ink}">
    A second opinion for your car.
  </text>

  <text x="${(COVER_W - SAFE_W) / 2 + 235}" y="${COVER_H * 0.575}"
        font-family="${SANS}" font-weight="400" font-size="34"
        fill="${T.slate2}">
    Scan receipts · read OBD2 · ask the advisor anything
  </text>

  <text x="${(COVER_W - SAFE_W) / 2 + 235}" y="${COVER_H * 0.695}"
        font-family="${MONO}" font-weight="500" font-size="26"
        letter-spacing="0.18em" fill="${T.accent}">
    CARFAI.APP
  </text>
</svg>`);

const coverOut = join(OUT, `cover-facebook-${COVER_W}x${COVER_H}.png`);
await sharp(coverBg)
  .composite([{ input: iconInCover, left: Math.round((COVER_W - SAFE_W) / 2), top: Math.round(COVER_H * 0.36) }])
  .png({ compressionLevel: 9 })
  .toFile(coverOut);
console.log(`  ✓ ${`cover-facebook-${COVER_W}x${COVER_H}.png`.padEnd(28)} ${COVER_W}×${COVER_H}  ${kb(coverOut).padStart(7)}   Facebook Page cover`);

console.log(`\n  Done → output/social/\n`);
