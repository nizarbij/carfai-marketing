/**
 * scripts/gen-play-graphics.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Generate the Play Store listing graphics + a proper app icon set, all
 * cut from the same wordmark so the brand language stays consistent.
 *
 *   output/play/feature-graphic-1024x500.png   — Play Store listing banner
 *   output/play/icon-master-1024.png           — square icon, paper bg + glyph
 *                                                (drop into mobile assets/icon.png)
 *   output/play/adaptive-foreground-1024.png   — Android adaptive icon
 *                                                foreground (transparent bg)
 *                                                (drop into mobile assets/adaptive-icon.png)
 *   output/play/play-icon-512.png              — 512×512 Play store icon
 *
 * The "glyph" is the document-with-chevron mark to the left of "CARFAI" in
 * public/logo.png. Extracted via a generous crop + sharp.trim() so the
 * crop bounds don't matter much.
 *
 * USAGE
 *   npm run gen:play
 *
 * Source assets:
 *   public/logo.png  (878×254 trimmed wordmark)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = join(__dirname, '..');
const PUBLIC    = join(ROOT, 'public');
const OUT       = join(ROOT, 'output', 'play');

const T = {
  paper:      '#FAFAF7',
  paperDeep:  '#F2EFE8',
  rule:       '#E6E4DE',
  ink:        '#0B0E13',
  slate2:     '#3B475C',
  accent:     '#089BC3',
  accentDeep: '#0A3E8F',
  accentMist: '#E0F4FA',
};

const SANS = "Inter, 'Segoe UI', system-ui, -apple-system, sans-serif";
const MONO = "'JetBrains Mono', 'Cascadia Mono', Consolas, ui-monospace, monospace";

mkdirSync(OUT, { recursive: true });

/* ─── Glyph extraction ───────────────────────────────────────────────────── */

// The wordmark is 878×254 — glyph on the left, "CARFAI" text on the right.
// Column-scan the source to find:
//   - the first non-paper column (left edge of the glyph)
//   - the first all-paper column after that (right edge of the glyph,
//     before the gap to the "C")
// A naive width-220 crop pulls in the left of the "C", so we have to be
// precise. The detected gap on the current logo is ~44px wide; the
// `minGap` parameter rejects short paper streaks inside the glyph itself.
async function detectGlyphBounds() {
  const { data, info } = await sharp(join(PUBLIC, 'logo.png'))
    .raw()
    .toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, C = info.channels;
  const PAPER = [0xFA, 0xFA, 0xF7];
  const THRESH = 30;
  const MIN_GAP = 8;

  const isPaperColumn = (x) => {
    for (let y = 0; y < H; y++) {
      const i = (y * W + x) * C;
      const a = C === 4 ? data[i + 3] : 255;
      if (a < 80) continue;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      if (Math.abs(r - PAPER[0]) > THRESH ||
          Math.abs(g - PAPER[1]) > THRESH ||
          Math.abs(b - PAPER[2]) > THRESH) return false;
    }
    return true;
  };

  let left = 0;
  while (left < W && isPaperColumn(left)) left++;

  let right = left;
  let gapStart = -1;
  for (let x = left; x < W; x++) {
    const paper = isPaperColumn(x);
    if (paper && gapStart < 0) gapStart = x;
    if (!paper && gapStart >= 0) {
      if (x - gapStart >= MIN_GAP) { right = gapStart; break; }
      gapStart = -1;
    }
  }
  if (right === left) right = gapStart >= 0 ? gapStart : W;

  return { left, top: 0, width: right - left, height: H };
}

async function extractGlyph() {
  const bounds = await detectGlyphBounds();
  console.log(`Glyph bounds: x=${bounds.left}..${bounds.left + bounds.width}  (${bounds.width}×${bounds.height})`);
  return sharp(join(PUBLIC, 'logo.png'))
    .extract(bounds)
    .png()
    .toBuffer();
}

/* ─── Feature graphic ────────────────────────────────────────────────────── */

async function genFeatureGraphic() {
  const W = 1024;
  const H = 500;

  const WORDMARK_H = 110;
  const wordmark = await sharp(join(PUBLIC, 'logo.png'))
    .resize({ height: WORDMARK_H })
    .png()
    .toBuffer();

  const PADDING_X  = 72;
  const SECTION_Y  = 88;
  const WORDMARK_Y = 188;
  const TAGLINE_Y  = 348;

  const svg = `
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="band" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stop-color="${T.paper}" />
          <stop offset="60%"  stop-color="${T.paper}" />
          <stop offset="100%" stop-color="${T.accentMist}" />
        </linearGradient>
      </defs>

      <rect width="${W}" height="${H}" fill="url(#band)" />

      <text x="${PADDING_X}" y="${SECTION_Y}"
            font-family="${MONO}" font-size="20" font-weight="500"
            letter-spacing="3" fill="${T.slate2}">
        00 &#183; INTRODUCING
      </text>

      <line x1="${W - PADDING_X - 120}" y1="${SECTION_Y - 8}"
            x2="${W - PADDING_X}"       y2="${SECTION_Y - 8}"
            stroke="${T.accent}" stroke-width="2" />

      <text x="${PADDING_X}" y="${TAGLINE_Y}"
            font-family="${SANS}" font-size="34" font-weight="500"
            fill="${T.ink}" letter-spacing="-0.5">
        Car Financial &amp; Administrative
      </text>
      <text x="${PADDING_X}" y="${TAGLINE_Y + 48}"
            font-family="${SANS}" font-size="34" font-weight="500"
            fill="${T.ink}" letter-spacing="-0.5">
        Intelligence &#8212; powered by AI.
      </text>

      <circle cx="${W - PADDING_X}" cy="${TAGLINE_Y + 38}" r="6" fill="${T.accent}" />
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .composite([{ input: wordmark, left: PADDING_X, top: WORDMARK_Y }])
    .png({ compressionLevel: 9 })
    .toFile(join(OUT, 'feature-graphic-1024x500.png'));

  console.log(`✓ feature-graphic-1024x500.png   (${W}×${H})`);
}

/* ─── Icon master (paper bg + glyph) ─────────────────────────────────────── */

async function genIconMaster(glyph) {
  const ICON_SIZE   = 1024;
  const SAFE_ZONE   = 0.70; // glyph fills 70 % of the square — generous of the 66/108 adaptive-icon safe zone
  const FIT_SIZE    = Math.floor(ICON_SIZE * SAFE_ZONE);

  // Fit the glyph inside FIT_SIZE square while preserving aspect ratio.
  // Then centre it on a paper-coloured 1024×1024 canvas.
  const fittedGlyph = await sharp(glyph)
    .resize(FIT_SIZE, FIT_SIZE, {
      fit:    'inside',
      kernel: 'lanczos3',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const m = await sharp(fittedGlyph).metadata();
  const left = Math.floor((ICON_SIZE - m.width)  / 2);
  const top  = Math.floor((ICON_SIZE - m.height) / 2);

  await sharp({
    create: {
      width:    ICON_SIZE,
      height:   ICON_SIZE,
      channels: 4,
      background: T.paper,
    },
  })
    .composite([{ input: fittedGlyph, left, top }])
    .png({ compressionLevel: 9 })
    .toFile(join(OUT, 'icon-master-1024.png'));

  console.log('✓ icon-master-1024.png           (1024×1024, paper bg + glyph)');
}

/* ─── Adaptive foreground (transparent bg + glyph) ───────────────────────── */

async function genAdaptiveForeground(glyph) {
  const ICON_SIZE = 1024;
  // Android Adaptive Icon: 108dp total, inner 66dp is the "safe zone" for
  // the foreground layer. 66/108 ≈ 0.611. We use 0.55 to stay well inside
  // since the OS adds parallax + masking + various device-vendor masks.
  const SAFE_ZONE = 0.55;
  const FIT_SIZE  = Math.floor(ICON_SIZE * SAFE_ZONE);

  const fittedGlyph = await sharp(glyph)
    .resize(FIT_SIZE, FIT_SIZE, {
      fit:    'inside',
      kernel: 'lanczos3',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const m = await sharp(fittedGlyph).metadata();
  const left = Math.floor((ICON_SIZE - m.width)  / 2);
  const top  = Math.floor((ICON_SIZE - m.height) / 2);

  await sharp({
    create: {
      width:    ICON_SIZE,
      height:   ICON_SIZE,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: fittedGlyph, left, top }])
    .png({ compressionLevel: 9 })
    .toFile(join(OUT, 'adaptive-foreground-1024.png'));

  console.log('✓ adaptive-foreground-1024.png   (1024×1024, transparent bg + glyph)');
}

/* ─── Play icon (resize from master) ─────────────────────────────────────── */

async function genPlayIcon() {
  await sharp(join(OUT, 'icon-master-1024.png'))
    .resize(512, 512, { fit: 'cover', kernel: 'lanczos3' })
    .png({ compressionLevel: 9 })
    .toFile(join(OUT, 'play-icon-512.png'));

  console.log('✓ play-icon-512.png              (512×512, resampled from master)');
}

/* ─── Main ───────────────────────────────────────────────────────────────── */

const glyph = await extractGlyph();
console.log('');

await genFeatureGraphic();
await genIconMaster(glyph);
await genAdaptiveForeground(glyph);
await genPlayIcon();

console.log(`\nWrote to ${OUT}`);
console.log('\nNext: review the icons; if good, copy to mobile repo:');
console.log('  carfai-app-mobile/assets/icon.png            <-  icon-master-1024.png');
console.log('  carfai-app-mobile/assets/adaptive-icon.png   <-  adaptive-foreground-1024.png');
