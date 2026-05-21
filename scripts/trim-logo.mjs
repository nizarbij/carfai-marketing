/**
 * scripts/trim-logo.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Auto-crops public/logo.png to remove transparent / near-white padding
 * around the brand mark. The source PNG ships with ~30% padding top/
 * bottom, which made the rendered logo look small even at h-24
 * (because half the box was empty pixels).
 *
 * - Archives the original to public/_mockups/logo-original.png
 * - Writes the trimmed PNG back to public/logo.png
 *
 * Run:
 *   node scripts/trim-logo.mjs
 *
 * Re-runnable: safe to call again if you replace the logo.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import sharp from 'sharp';
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT    = join(__dirname, '..');
const SRC     = join(ROOT, 'public', 'logo.png');
const ARCHIVE = join(ROOT, 'public', '_mockups', 'logo-original.png');

mkdirSync(join(ROOT, 'public', '_mockups'), { recursive: true });

if (!existsSync(ARCHIVE)) {
  copyFileSync(SRC, ARCHIVE);
  console.log(`  · archived original → ${ARCHIVE}`);
}

const before = await sharp(SRC).metadata();
console.log(`  · before: ${before.width} × ${before.height}`);

// sharp.trim() removes pixels that match the background colour of the
// outermost pixel within a tolerance. Threshold 20 catches faintly-
// tinted "white" pixels that aren't quite #FFF. 8px breathing margin
// around the cropped mark so the logo doesn't render edge-to-edge.
const trimmed = await sharp(SRC)
  .trim({ threshold: 20 })
  .extend({
    top:    8,
    bottom: 8,
    left:   8,
    right:  8,
    background: { r: 255, g: 255, b: 255, alpha: 0 },
  })
  .png()
  .toBuffer();

await sharp(trimmed).toFile(SRC);

const after = await sharp(SRC).metadata();
console.log(`  · after:  ${after.width} × ${after.height}`);
console.log(`  ✓ Cropped ${(((before.height - after.height) / before.height) * 100).toFixed(0)}% off height\n`);
