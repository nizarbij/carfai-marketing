/**
 * scripts/gen-store-screenshots.mjs — v2
 * ─────────────────────────────────────────────────────────────────────────────
 * Generate App Store (iOS) and Google Play Store (Android) screenshots.
 *
 * 6 sequences × 2 platforms = 12 PNGs + 1 contact sheet.
 *
 *   iOS:     1290 × 2796 → output/ios/01_hero.png … 06_spending.png
 *   Android: 1080 × 1920 → output/android/01_hero.png … 06_spending.png
 *   Sheet:   output/contact_sheet.png
 *
 * v2 changes (vs v1):
 *   1. Dynamic vertical layout. Phone position is computed from the
 *      headline block's actual rendered height + bezel + tail margin —
 *      so the wordmark band never overlaps the device (the Android bug
 *      in v1 came from a fixed 0.33 ratio that worked for iOS but not
 *      for the shorter Android canvas).
 *   2. Six-step gradient flow. Each screenshot uses a diagonal
 *      linearGradient whose end colour matches the next screen's start
 *      colour. Seen side-by-side in the store carousel, the 6 shots
 *      read as a brand journey: paper → mist → teal → navy → ink → paper.
 *   3. Surface-aware. On the dark / teal / navy screens the headline,
 *      subhead, wordmark, and section index flip to paper tones; the
 *      device bezel flips to a translucent paper/15 rim (matches
 *      PhoneFrame surface="dark" on the marketing site).
 *   4. 3D device treatment. Each phone tilts ±1.5° (alternating), with
 *      a two-layer shadow (soft offset + tighter contact), a top-edge
 *      highlight on the bezel, and a screen sheen gradient suggesting
 *      glass. The rotation is applied via SVG <g transform="rotate">.
 *
 * USAGE
 *   npm run gen:store
 *
 * Outputs are overwritten on each run. Source screenshots are read
 * from public/.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import sharp from 'sharp';
import { mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC = join(ROOT, 'public');
const OUT = join(ROOT, 'output');

/* ─── Brand tokens (mirror app/[locale]/globals.css + tailwind.config.ts) ── */

const T = {
  paper:       '#FAFAF7',
  paperDeep:   '#F2EFE8',
  rule:        '#E6E4DE',
  ink:         '#0B0E13',
  graphite:    '#1C2230',
  slate2:      '#3B475C',
  accent:      '#089BC3',
  accentDeep:  '#0A3E8F',
  accentMist:  '#E0F4FA',
};

const SANS = "Inter, 'Segoe UI', system-ui, -apple-system, sans-serif";
const MONO = "'JetBrains Mono', 'Cascadia Mono', Consolas, ui-monospace, monospace";

/* ─── Sequences: copy + raw screenshot + per-screen colour journey ───────── */

// The six gradients are tuned so screen N's bottom-right corner colour
// matches screen N+1's top-left corner. Read the `gradient.from` of one
// row against the `gradient.to` of the row above — they should match.
// This is what produces the "flow" effect when shots are scrolled
// horizontally in the App Store / Play Store carousel.
const SEQUENCES = [
  {
    id: 'hero',
    headline: "Your Car's Memory, Reinvented",
    subhead:  "AI-powered document management for every vehicle",
    src:      'app-home.jpg',
    gradient: { from: T.paper,      to: T.paperDeep,  surface: 'light' },
    tilt:     -1.5,
  },
  {
    id: 'capture',
    headline: "Snap. Extract. Done.",
    subhead:  "Photograph invoices — AI builds the record",
    src:      'app-scan.jpg',
    gradient: { from: T.paperDeep,  to: T.accentMist, surface: 'light' },
    tilt:     +1.5,
  },
  {
    id: 'advisor',
    headline: "Ask Anything About Your Car",
    subhead:  "Maintenance, costs, recommendations — instantly",
    src:      'app-aiadvisor.jpg',
    gradient: { from: T.accentMist, to: T.accent,     surface: 'light' },
    tilt:     -1.5,
  },
  {
    id: 'fleet',
    headline: "Run Your Fleet With Confidence",
    subhead:  "Real-time analytics for managers and owners",
    src:      'app-fleet-overview.jpg',
    gradient: { from: T.accent,     to: T.accentDeep, surface: 'dark'  },
    tilt:     +1.5,
  },
  {
    id: 'obd2',
    headline: "Connect. Diagnose. Drive Smarter.",
    subhead:  "Live vehicle data via Bluetooth OBD2",
    src:      'app-obd2.jpg',
    gradient: { from: T.accentDeep, to: T.ink,        surface: 'dark'  },
    tilt:     -1.5,
  },
  {
    // Seq 6 is the closing bookend: the arc travels paper → mist →
    // teal → navy → ink, then resolves back to a light cream pair.
    // An ink → paper gradient (the obvious "return to start") killed
    // the wordmark visibility because the bottom of the canvas is
    // where the paper-coloured wordmark sits — paper-on-paper = gone.
    // Light-only gradient solves it and still reads as "back to home"
    // visually next to the deep-dark sequences 4-5.
    id: 'spending',
    headline: "Every Vehicle. Every Receipt. One App.",
    subhead:  "Track spending, maintenance, and value over time",
    src:      'app-analytics-spending.jpg',
    gradient: { from: T.paper,      to: T.paperDeep,  surface: 'light' },
    tilt:     +1.5,
  },
];

/* ─── Platforms ──────────────────────────────────────────────────────────── */

const PLATFORMS = [
  {
    id: 'ios',
    width:  1290,
    height: 2796,
    sectionIndexSize: 30,
    headlineSize:     108,
    headlineLineHeight: 1.05,
    subheadSize:      44,
    wordmarkSize:     54,
    taglineSize:      26,
    phoneInnerW:      720,
    // Bezel + corner radius tuned to match the iPhone silhouette in
    // the user's reference: thinner bezel, larger corner radius.
    bezel:            18,
    cornerRadius:     90,
    // Distance from top of canvas to start of section index.
    topPad:           170,
    // Distance from bottom of canvas to bottom of tagline.
    bottomPad:        120,
    // Wordmark zone height (wordmark + tagline + breathing).
    bottomZone:       190,
  },
  {
    id: 'android',
    width:  1080,
    height: 1920,
    sectionIndexSize: 22,
    headlineSize:     74,
    headlineLineHeight: 1.05,
    subheadSize:      32,
    wordmarkSize:     40,
    taglineSize:      20,
    phoneInnerW:      490,
    bezel:            13,
    cornerRadius:     64,
    topPad:           110,
    bottomPad:        80,
    bottomZone:       140,
  },
];

/* ─── SVG helpers ────────────────────────────────────────────────────────── */

function svg(width, height, body) {
  return Buffer.from(
    `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
${body}
</svg>`
  );
}

function wrapText(text, maxCharsPerLine) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    const candidate = line ? line + ' ' + w : w;
    if (candidate.length > maxCharsPerLine && line) {
      lines.push(line);
      line = w;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function escapeXml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Resolve text + accent colours given the screen's surface.
 *   light → ink headline, slate2 subhead, ink wordmark, ink bezel.
 *   dark  → paper headline, paper/70 subhead, paper wordmark, paper/15 bezel.
 */
function tonesFor(surface) {
  if (surface === 'dark') {
    return {
      headline:    T.paper,
      subhead:     'rgba(250,250,247,0.75)',
      kicker:      'rgba(250,250,247,0.6)',
      number:      T.paper,
      ruleStroke:  'rgba(250,250,247,0.18)',
      wordmark:    T.paper,
      accentText:  T.accent,
      tagline:     'rgba(250,250,247,0.55)',
      bezelFill:   'rgba(250,250,247,0.10)',
      bezelStroke: 'rgba(250,250,247,0.18)',
      bezelHilite: 'rgba(250,250,247,0.30)',
    };
  }
  return {
    headline:    T.ink,
    subhead:     T.slate2,
    kicker:      T.slate2,
    number:      T.accent,
    ruleStroke:  T.rule,
    wordmark:    T.ink,
    accentText:  T.accent,
    tagline:     T.slate2,
    bezelFill:   T.ink,
    bezelStroke: T.ink,
    bezelHilite: 'rgba(255,255,255,0.18)',
  };
}

/* ─── Background gradient layer ──────────────────────────────────────────── */

function buildBackground(p, seq) {
  const { from, to } = seq.gradient;
  // Diagonal top-left → bottom-right. Combined with sequence-to-sequence
  // colour matching, the carousel scrolls as a smooth wash.
  return svg(p.width, p.height, `
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stop-color="${from}" />
        <stop offset="100%" stop-color="${to}"   />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="${p.width}" height="${p.height}" fill="url(#bg)" />
  `);
}

/* ─── Section index + hairline rule ──────────────────────────────────────── */

function buildSectionIndex(p, indexNum, tones) {
  const y = p.topPad + p.sectionIndexSize;
  const padX = Math.round(p.width * 0.08);
  const numStr = String(indexNum).padStart(2, '0');
  const totalStr = '06';
  const textW = p.sectionIndexSize * 4.8;
  const ruleStart = padX + textW + 28;
  const ruleEnd   = Math.min(p.width - padX, ruleStart + p.width * 0.22);
  return svg(p.width, p.height, `
    <g font-family="${MONO}" font-size="${p.sectionIndexSize}" letter-spacing="${p.sectionIndexSize * 0.22}">
      <text x="${padX}" y="${y}" fill="${tones.kicker}" text-rendering="geometricPrecision">
        <tspan fill="${tones.number}" font-weight="500">${numStr}</tspan>
        <tspan dx="14">/</tspan>
        <tspan dx="14">${totalStr}</tspan>
      </text>
      <line x1="${ruleStart}" y1="${y - p.sectionIndexSize * 0.35}"
            x2="${ruleEnd}"   y2="${y - p.sectionIndexSize * 0.35}"
            stroke="${tones.ruleStroke}" stroke-width="1" />
    </g>
  `);
}

/* ─── Headline + subhead ─────────────────────────────────────────────────── */

function buildHeadline(p, seq, tones) {
  const padX = Math.round(p.width * 0.08);
  const usableW = p.width - padX * 2;
  const charsPerLine = Math.floor(usableW / (p.headlineSize * 0.62));
  const lines = wrapText(seq.headline, charsPerLine);

  // Headline starts a fixed gap below the section index.
  const headlineY = p.topPad + p.sectionIndexSize + p.headlineSize * 1.4;
  const lineH = p.headlineSize * p.headlineLineHeight;

  const headlineTspans = lines.map((line, i) =>
    `<tspan x="${padX}" dy="${i === 0 ? 0 : lineH}">${escapeXml(line)}</tspan>`
  ).join('\n      ');

  const subheadY = headlineY + (lines.length - 1) * lineH + p.headlineSize * 0.85;
  const subCharsPerLine = Math.floor(usableW / (p.subheadSize * 0.55));
  const subLines = wrapText(seq.subhead, subCharsPerLine);
  const subTspans = subLines.map((line, i) =>
    `<tspan x="${padX}" dy="${i === 0 ? 0 : p.subheadSize * 1.25}">${escapeXml(line)}</tspan>`
  ).join('\n      ');

  // Return both the SVG layer AND the y-coordinate where the text block
  // ends — the phone placement uses this to position itself without
  // overlapping.
  const subheadEndY = subheadY + (subLines.length - 1) * p.subheadSize * 1.25 + p.subheadSize * 0.5;

  const layer = svg(p.width, p.height, `
    <text font-family="${SANS}" font-weight="500" fill="${tones.headline}"
          font-size="${p.headlineSize}" letter-spacing="-0.025em"
          x="${padX}" y="${headlineY}" text-rendering="geometricPrecision">
      ${headlineTspans}
    </text>
    <text font-family="${SANS}" font-weight="400" fill="${tones.subhead}"
          font-size="${p.subheadSize}"
          x="${padX}" y="${subheadY}" text-rendering="geometricPrecision">
      ${subTspans}
    </text>
  `);

  return { layer, textBottomY: subheadEndY };
}

/* ─── Wordmark + tagline (bottom) ────────────────────────────────────────── */

function buildWordmark(p, tones) {
  const cx = p.width / 2;
  // Centre the wordmark block vertically inside the bottom zone, leaving
  // bottomPad below the tagline.
  const taglineY = p.height - p.bottomPad;
  const wordmarkY = taglineY - p.taglineSize * 0.7 - p.wordmarkSize * 0.6;

  return svg(p.width, p.height, `
    <text x="${cx}" y="${wordmarkY}" text-anchor="middle"
          font-family="${MONO}" font-weight="500" font-size="${p.wordmarkSize}"
          fill="${tones.wordmark}" letter-spacing="0.04em">
      <tspan>Car</tspan><tspan fill="${tones.accentText}">Fai</tspan>
    </text>
    <text x="${cx}" y="${taglineY}" text-anchor="middle"
          font-family="${SANS}" font-weight="400" font-size="${p.taglineSize}"
          fill="${tones.tagline}">
      Drive smarter.
    </text>
  `);
}

/* ─── 3D phone frame ─────────────────────────────────────────────────────── */

/**
 * Build a tilted iPhone-style phone frame containing the supplied
 * screenshot. Returns { buffer, width, height } where width/height
 * are the bounding box of the rotated frame.
 *
 * Composition layers (bottom up):
 *   1. Side buttons (silent + vol-up + vol-down on left, power on
 *      right) — drawn FIRST so the bezel rect overlaps them and only
 *      the protruding portion remains visible.
 *   2. Soft drop shadow under the device.
 *   3. Outer bezel rect (ink on light surface, paper/15 on dark).
 *   4. Top-edge highlight on the bezel (subtle depth cue).
 *   5. Screenshot, rounded to inner-radius.
 *   6. Dynamic Island pill at top centre of the screen — overlays
 *      the screenshot, matches modern iPhone (14 Pro+).
 *
 * The whole flat composite is rotated ONCE by `seq.tilt` at the end.
 * (v2 had a bug where the bezel SVG rotated internally AND sharp
 * rotated the composite again — bezel was at 2× tilt vs the
 * screenshot. Fixed here by keeping the SVG flat.)
 */
async function buildPhoneFrame(p, seq, tones) {
  const innerW = p.phoneInnerW;
  const innerH = Math.round(innerW * 19.5 / 9);
  const outerW = innerW + p.bezel * 2;
  const outerH = innerH + p.bezel * 2;
  const innerRadius = p.cornerRadius - p.bezel;

  // Pad the canvas to accommodate rotation, drop shadow, and side
  // buttons sticking out.
  const pad = Math.round(Math.max(outerW, outerH) * 0.13);
  const canvasW = outerW + pad * 2;
  const canvasH = outerH + pad * 2;
  const bezelLeft = (canvasW - outerW) / 2;
  const bezelTop  = (canvasH - outerH) / 2;

  /* Side buttons — sizes / positions modelled on iPhone 14 Pro layout.
     Buttons extend partly under the bezel (covered, anchors the
     visual) and partly outside (protrusion you actually see).        */
  const btnW       = Math.max(3, Math.round(outerW * 0.012));
  const btnStickOut = Math.max(2, Math.round(p.bezel * 0.55));
  const btnTotalW  = btnW + btnStickOut;
  const btnR       = btnW * 0.55;

  // Left side, top → bottom: silent / mute switch, volume up, volume down
  const silentY  = bezelTop + Math.round(outerH * 0.115);
  const silentH  = Math.round(outerH * 0.030);
  const volUpY   = bezelTop + Math.round(outerH * 0.190);
  const volH     = Math.round(outerH * 0.070);
  const volDownY = volUpY + volH + Math.round(outerH * 0.012);

  // Right side: power / side button
  const powerY = bezelTop + Math.round(outerH * 0.165);
  const powerH = Math.round(outerH * 0.115);

  const leftBtnX  = bezelLeft - btnStickOut;
  const rightBtnX = bezelLeft + outerW - btnW;

  /* Dynamic Island — pill at top centre of the screen.               */
  const islandW = Math.round(innerW * 0.21);
  const islandH = Math.round(islandW * 0.32);
  const islandX = bezelLeft + p.bezel + (innerW - islandW) / 2;
  const islandY = bezelTop + p.bezel + Math.max(14, Math.round(p.bezel * 0.7));

  /* Phone SVG — single flat layer with shadow, buttons, bezel, edge
     highlight, and Dynamic Island. Screenshot is composited as a
     raster image on top of this layer.                               */
  const phoneSvg = svg(canvasW, canvasH, `
    <defs>
      <filter id="softShadow" x="-30%" y="-15%" width="160%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="${Math.round(p.bezel * 3.0)}" />
        <feOffset dx="0" dy="${Math.round(p.bezel * 1.8)}" />
        <feComponentTransfer><feFuncA type="linear" slope="0.22" /></feComponentTransfer>
        <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <linearGradient id="bezelEdge" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"  stop-color="${tones.bezelHilite}" stop-opacity="0.9" />
        <stop offset="22%" stop-color="${tones.bezelHilite}" stop-opacity="0"   />
      </linearGradient>
    </defs>

    <!-- Side buttons (drawn FIRST so bezel overlaps them, leaving only
         the protruding portion visible) -->
    <rect x="${leftBtnX}"  y="${silentY}"  width="${btnTotalW}" height="${silentH}" rx="${btnR}" fill="${tones.bezelFill}" />
    <rect x="${leftBtnX}"  y="${volUpY}"   width="${btnTotalW}" height="${volH}"    rx="${btnR}" fill="${tones.bezelFill}" />
    <rect x="${leftBtnX}"  y="${volDownY}" width="${btnTotalW}" height="${volH}"    rx="${btnR}" fill="${tones.bezelFill}" />
    <rect x="${rightBtnX}" y="${powerY}"   width="${btnTotalW}" height="${powerH}"  rx="${btnR}" fill="${tones.bezelFill}" />

    <!-- Drop shadow under the device -->
    <rect x="${bezelLeft}" y="${bezelTop}" width="${outerW}" height="${outerH}"
          rx="${p.cornerRadius}" ry="${p.cornerRadius}"
          fill="${tones.bezelFill}" filter="url(#softShadow)" />

    <!-- Bezel + thin stroke -->
    <rect x="${bezelLeft}" y="${bezelTop}" width="${outerW}" height="${outerH}"
          rx="${p.cornerRadius}" ry="${p.cornerRadius}"
          fill="${tones.bezelFill}" stroke="${tones.bezelStroke}" stroke-width="1.2" />

    <!-- Top-edge highlight (paler stroke fading down — subtle 3D cue) -->
    <rect x="${bezelLeft}" y="${bezelTop}" width="${outerW}" height="${Math.round(outerH * 0.30)}"
          rx="${p.cornerRadius}" ry="${p.cornerRadius}"
          fill="url(#bezelEdge)" />
  `);

  /* Screenshot: resize to inner dimensions + round its corners.      */
  const screenshotBuf = await sharp(join(PUBLIC, seq.src))
    .resize(innerW, innerH, { fit: 'cover', position: 'top' })
    .png()
    .toBuffer();

  const cornerMask = svg(innerW, innerH, `
    <rect width="${innerW}" height="${innerH}" rx="${innerRadius}" ry="${innerRadius}" fill="white" />
  `);
  const roundedScreenshot = await sharp(screenshotBuf)
    .composite([{ input: cornerMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  /* Dynamic Island — drawn AFTER the screenshot composite so it sits
     on top, matching real iPhone behaviour where the island is a
     hardware element that visually overlays whatever app is open.    */
  const islandLayer = svg(canvasW, canvasH, `
    <rect x="${islandX}" y="${islandY}" width="${islandW}" height="${islandH}"
          rx="${islandH / 2}" ry="${islandH / 2}" fill="${T.ink}" />
  `);

  const innerLeft = bezelLeft + p.bezel;
  const innerTop  = bezelTop  + p.bezel;

  const composite = await sharp(phoneSvg)
    .composite([
      { input: roundedScreenshot, left: Math.round(innerLeft), top: Math.round(innerTop) },
      { input: islandLayer,       left: 0,                     top: 0, blend: 'over' },
    ])
    .png()
    .toBuffer();

  /* Single rotation on the rastered composite.                       */
  const rotated = await sharp(composite)
    .rotate(seq.tilt, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const meta = await sharp(rotated).metadata();
  return { buffer: rotated, width: meta.width, height: meta.height };
}

/* ─── Composer ───────────────────────────────────────────────────────────── */

async function generateScreenshot(p, seq, indexNum) {
  if (!existsSync(join(PUBLIC, seq.src))) {
    throw new Error(`Missing source: ${seq.src}`);
  }

  const tones = tonesFor(seq.gradient.surface);

  // Build headline layer FIRST so we know where text ends — phone
  // placement uses that.
  const { layer: headlineLayer, textBottomY } = buildHeadline(p, seq, tones);

  // Build phone frame.
  const phone = await buildPhoneFrame(p, seq, tones);

  // Vertical math: phone sits between text bottom + breathing and
  // wordmark zone top - breathing. If the phone is too tall, scale it.
  const wordmarkTopY = p.height - p.bottomZone;
  const phoneTopMargin = 60;
  const phoneBottomMargin = 60;
  const availableH = wordmarkTopY - textBottomY - phoneTopMargin - phoneBottomMargin;

  let phoneBuf = phone.buffer;
  let phoneW = phone.width;
  let phoneH = phone.height;
  if (phoneH > availableH) {
    const scale = availableH / phoneH;
    phoneW = Math.round(phoneW * scale);
    phoneH = Math.round(phoneH * scale);
    phoneBuf = await sharp(phone.buffer).resize(phoneW, phoneH).png().toBuffer();
  }

  const phoneX = Math.round((p.width - phoneW) / 2);
  // Centre the (possibly shrunk) phone vertically between text end and
  // wordmark zone top.
  const phoneY = Math.round(textBottomY + phoneTopMargin + (availableH - phoneH) / 2);

  const outFile = join(OUT, p.id, `${String(indexNum).padStart(2, '0')}_${seq.id}.png`);
  mkdirSync(dirname(outFile), { recursive: true });

  await sharp({
    create: { width: p.width, height: p.height, channels: 3, background: T.paper },
  })
    .composite([
      { input: buildBackground(p, seq),                     top: 0,      left: 0 },
      { input: buildSectionIndex(p, indexNum, tones),       top: 0,      left: 0 },
      { input: headlineLayer,                               top: 0,      left: 0 },
      { input: phoneBuf,                                    top: phoneY, left: phoneX },
      { input: buildWordmark(p, tones),                     top: 0,      left: 0 },
    ])
    .png({ compressionLevel: 9 })
    .toFile(outFile);

  console.log(`  ✓ ${outFile.replace(ROOT + '/', '').replace(/\\/g, '/')}`);
  return outFile;
}

/* ─── Contact sheet ──────────────────────────────────────────────────────── */

async function generateContactSheet(allOutputs) {
  const thumbW = 400;
  const cols = 6;
  const rows = 2;
  const sheetW = thumbW * cols;
  const thumbH = Math.round(thumbW * 2796 / 1290);
  const sheetH = thumbH * rows + 80;

  const thumbs = [];
  for (let i = 0; i < allOutputs.length; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const thumb = await sharp(allOutputs[i])
      .resize(thumbW, thumbH, { fit: 'contain', background: T.paper })
      .png()
      .toBuffer();
    thumbs.push({
      input: thumb,
      top: 80 + row * thumbH,
      left: col * thumbW,
    });
  }

  const header = svg(sheetW, 80, `
    <rect width="${sheetW}" height="80" fill="${T.paperDeep}" />
    <text x="40" y="50" font-family="${MONO}" font-weight="500" font-size="24"
          fill="${T.ink}" letter-spacing="0.04em">
      <tspan>Car</tspan><tspan fill="${T.accent}">Fai</tspan>
      <tspan dx="20" fill="${T.slate2}" font-weight="400">· App Store + Play Store · 12 screenshots · v2</tspan>
    </text>
  `);
  thumbs.unshift({ input: header, top: 0, left: 0 });

  const out = join(OUT, 'contact_sheet.png');
  await sharp({
    create: { width: sheetW, height: sheetH, channels: 3, background: T.paper },
  })
    .composite(thumbs)
    .png({ compressionLevel: 9 })
    .toFile(out);

  console.log(`  ✓ ${out.replace(ROOT + '/', '').replace(/\\/g, '/')}`);
}

/* ─── Main ───────────────────────────────────────────────────────────────── */

console.log(`\n  Generating ${SEQUENCES.length * PLATFORMS.length} store screenshots (v2)...\n`);

const allOutputs = [];
for (const p of PLATFORMS) {
  console.log(`  [${p.id}] ${p.width} × ${p.height}`);
  for (let i = 0; i < SEQUENCES.length; i++) {
    const out = await generateScreenshot(p, SEQUENCES[i], i + 1);
    allOutputs.push(out);
  }
  console.log();
}

console.log('  Generating contact sheet...');
await generateContactSheet(allOutputs);
console.log(`\n  Done. Review at output/contact_sheet.png\n`);
