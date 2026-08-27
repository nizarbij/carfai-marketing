/**
 * scripts/gen-appstore-screenshots.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Branded App Store screenshots — real app captures placed in a device frame
 * on a CarFai-gradient background with a headline, in the style App Store
 * listings actually use (cf. CARFAX, Mint, YNAB).
 *
 *   npm run gen:appstore
 *
 * OUTPUT → output/appstore/
 *   6.5/01_home.png … 06_fleet.png     1242 × 2688   (iPhone 11 Pro Max / XS Max slot)
 *   6.9/01_home.png … 06_fleet.png     1290 × 2796   (iPhone 16 Pro Max slot)
 *
 * WHY TWO SIZES
 *   ASC validates uploads against exact per-slot dimensions and rejects
 *   anything else. 1242×2688 is the size already accepted for this listing;
 *   1290×2796 covers the 6.9" slot. Generating both avoids a re-run.
 *
 * APP STORE COMPLIANCE
 *   Apple permits marketing screenshots with text, backgrounds and device
 *   frames — it is the norm, not an exception. The constraints that matter:
 *     · the app content shown must be real and must represent the app
 *     · no fabricated data, no claims the app doesn't deliver
 *     · no Apple hardware trade dress implying Apple endorsement
 *     · exact pixel dimensions per slot
 *   Every capture here is a real screen from the shipping build. The device
 *   frame is a neutral rounded rectangle, deliberately NOT a photoreal iPhone
 *   render, which keeps it clear of Apple's hardware-image guidelines.
 *
 * SOURCE SELECTION
 *   All captures must be genuine iOS screenshots. output/ios-rounded/ holds
 *   real iPhone captures at 1170×2532.
 *
 *   Currently generating 4 of 6 panels. Scan and OBD2 are skipped: the only
 *   captures of those screens (public/app-scan.jpg, public/app-obd2.jpg) were
 *   taken on ANDROID — their three-button navigation bar is visible — and an
 *   Android capture in an App Store listing is a rejection risk. Drop iPhone
 *   captures at output/ios-rounded/scan-ios.png and obd2-ios.png and re-run to
 *   get all six.
 *
 *   Excluded on purpose: the Documents screen (near-empty, reads as an app with
 *   no content) and all three pricing screens (one is in French, and leading a
 *   store listing with a paywall converts badly).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import sharp from 'sharp';
import { mkdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT = join(ROOT, 'output', 'appstore');

/* ─── Brand tokens (tailwind.config.ts) ──────────────────────────────────── */
const T = {
  accent:     '#089BC3',
  accentDeep: '#0A3E8F',
  ink:        '#0B0E13',
  paper:      '#FAFAF7',
};

const SANS = "Inter, 'Segoe UI', system-ui, -apple-system, sans-serif";

/* ─── Slots ──────────────────────────────────────────────────────────────── */
const SLOTS = [
  { id: '6.5', width: 1242, height: 2688 },
  { id: '6.9', width: 1290, height: 2796 },
];

/* ─── Panels ─────────────────────────────────────────────────────────────── */
const IOS = join(ROOT, 'output', 'ios-rounded');
const PUB = join(ROOT, 'public');

const PANELS = [
  {
    id: '01_home',
    src: join(IOS, 'IMG_9138.png'),
    headline: 'Every car cost,\nin one place.',
    sub: 'Documents, spending and service history — tracked automatically.',
  },
  {
    // The scan story told through its RESULT, not the act of scanning.
    // IMG_9674 is a genuine iOS capture of the camera screen, but it's an
    // empty black viewfinder with a "18/50 documents used — Upgrade" nag in
    // it: visually dead inside a device frame, and it points the eye at a
    // usage limit on the second panel a shopper sees. IMG_9673 shows 16
    // documents auto-sorted into 7 categories, which is the evidence for
    // the claim the headline makes.
    id: '02_scan',
    src: join(IOS, 'IMG_9673.PNG'),
    headline: 'Snap a receipt.\nIt files itself.',
    sub: 'AI reads the amount, vendor and date — then sorts it by category.',
  },
  {
    id: '03_advisor',
    src: join(IOS, 'IMG_9142.png'),
    headline: 'Ask anything\nabout your car.',
    sub: 'Answers from your own service history — not generic web results.',
  },
  {
    // Predictive maintenance — a real differentiator, and the strongest
    // screen left in the set. Took the OBD2 panel's slot because there is
    // still no iOS capture of the OBD2 dashboard (public/app-obd2.jpg is
    // Android). To run both: capture the OBD2 screen on the iPhone, save it
    // as output/ios-rounded/obd2-ios.png, and re-add a panel — Apple allows
    // up to 10 screenshots, so nothing has to be dropped for it.
    id: '04_maintenance',
    src: join(IOS, 'IMG_9675.PNG'),
    headline: 'Know what breaks\nbefore it does.',
    sub: 'An AI maintenance calendar built from your own service records.',
  },
  {
    id: '05_spending',
    src: join(IOS, 'IMG_9141.png'),
    headline: 'See what your car\nreally costs.',
    sub: 'Monthly totals, category breakdowns and spending trends.',
  },
  {
    id: '06_fleet',
    src: join(IOS, 'IMG_9140.png'),
    headline: 'From one car\nto a whole fleet.',
    sub: 'Team roles, driver assignment and org-wide analytics.',
  },
];

/* ─── Helpers ────────────────────────────────────────────────────────────── */

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function wrap(text, maxChars) {
  const out = [];
  for (const para of text.split('\n')) {
    let line = '';
    for (const w of para.split(/\s+/)) {
      const cand = line ? line + ' ' + w : w;
      if (cand.length > maxChars && line) { out.push(line); line = w; }
      else line = cand;
    }
    if (line) out.push(line);
  }
  return out;
}

/**
 * Device frame: neutral dark rounded rect with the capture inside.
 * Deliberately not a photoreal iPhone — keeps clear of Apple's rules on
 * depicting their hardware, and looks cleaner at small sizes anyway.
 */
async function buildDevice(srcPath, innerW) {
  const meta = await sharp(srcPath).metadata();
  const innerH = Math.round(innerW * (meta.height / meta.width));

  const bezel  = Math.round(innerW * 0.022);
  const radius = Math.round(innerW * 0.085);
  const outerW = innerW + bezel * 2;
  const outerH = innerH + bezel * 2;

  // Round the capture's own corners so it sits flush inside the bezel.
  const innerRadius = Math.max(2, radius - bezel);
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${innerW}" height="${innerH}">` +
    `<rect width="${innerW}" height="${innerH}" rx="${innerRadius}" ry="${innerRadius}" fill="#fff"/></svg>`
  );
  const shot = await sharp(srcPath)
    .resize(innerW, innerH, { fit: 'cover', position: 'top' })
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  const frame = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${outerW}" height="${outerH}">
    <defs>
      <linearGradient id="bez" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"   stop-color="#2A2F3A"/>
        <stop offset="100%" stop-color="#0B0E13"/>
      </linearGradient>
    </defs>
    <rect width="${outerW}" height="${outerH}" rx="${radius}" ry="${radius}" fill="url(#bez)"/>
  </svg>`);

  const buf = await sharp(frame)
    .composite([{ input: shot, left: bezel, top: bezel }])
    .png()
    .toBuffer();

  return { buf, outerW, outerH };
}

/* ─── Compose one panel ──────────────────────────────────────────────────── */

async function compose(slot, panel, index) {
  const { width: W, height: H } = slot;

  if (!existsSync(panel.src)) return null;  // caller reports it as skipped

  const padX = Math.round(W * 0.085);
  const usableW = W - padX * 2;

  // Type scale relative to canvas width so both slots look identical.
  const headSize = Math.round(W * 0.077);
  const subSize  = Math.round(W * 0.0335);

  const headLines = wrap(panel.headline, Math.floor(usableW / (headSize * 0.55)));
  const subLines  = wrap(panel.sub,      Math.floor(usableW / (subSize  * 0.52)));

  const headTop = Math.round(H * 0.062) + headSize;
  const headLH  = Math.round(headSize * 1.12);
  const subTop  = headTop + (headLines.length - 1) * headLH + Math.round(headSize * 0.95);
  const subLH   = Math.round(subSize * 1.38);
  const textBottom = subTop + (subLines.length - 1) * subLH;

  // Device: centred, bleeding a little past the bottom edge so it reads as
  // larger than the frame — the standard trick in store listings.
  const deviceW = Math.round(W * 0.72);
  const device  = await buildDevice(panel.src, deviceW);
  const deviceX = Math.round((W - device.outerW) / 2);
  const deviceY = Math.round(textBottom + H * 0.055);

  // Alternate a slight tilt so the set has rhythm when seen as a row.
  const tilt = index % 2 === 0 ? -1.2 : 1.2;
  const rotated = await sharp(device.buf)
    .rotate(tilt, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const rMeta = await sharp(rotated).metadata();
  const rX = Math.round((W - rMeta.width) / 2);

  const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stop-color="${T.accent}"/>
        <stop offset="100%" stop-color="${T.accentDeep}"/>
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="18%" r="62%">
        <stop offset="0%"   stop-color="#FFFFFF" stop-opacity="0.16"/>
        <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>

    <text x="${W / 2}" y="${headTop}" text-anchor="middle"
          font-family="${SANS}" font-weight="600" font-size="${headSize}"
          fill="${T.paper}" letter-spacing="-0.025em">
      ${headLines.map((l, i) => `<tspan x="${W / 2}" dy="${i === 0 ? 0 : headLH}">${esc(l)}</tspan>`).join('')}
    </text>

    <text x="${W / 2}" y="${subTop}" text-anchor="middle"
          font-family="${SANS}" font-weight="400" font-size="${subSize}"
          fill="#FFFFFF" fill-opacity="0.82">
      ${subLines.map((l, i) => `<tspan x="${W / 2}" dy="${i === 0 ? 0 : subLH}">${esc(l)}</tspan>`).join('')}
    </text>
  </svg>`);

  const outDir = join(OUT, slot.id);
  mkdirSync(outDir, { recursive: true });
  const outFile = join(outDir, `${panel.id}.png`);

  await sharp(bg)
    .composite([{ input: rotated, left: rX, top: deviceY }])
    .png({ compressionLevel: 9 })
    .toFile(outFile);

  return outFile;
}

/* ─── Main ───────────────────────────────────────────────────────────────── */

console.log(`\n  CarFai — App Store screenshots\n`);

for (const slot of SLOTS) {
  console.log(`  [${slot.id}"]  ${slot.width} × ${slot.height}`);
  for (let i = 0; i < PANELS.length; i++) {
    const f = await compose(slot, PANELS[i], i);
    if (!f) {
      console.log(`    ⏭  ${PANELS[i].id.padEnd(14)} skipped — needs an iOS capture at ${PANELS[i].src.replace(ROOT, '.')}`);
      continue;
    }
    const kb = Math.round(statSync(f).size / 1024);
    console.log(`    ✓ ${PANELS[i].id.padEnd(14)} ${String(kb).padStart(4)} KB`);
  }
  console.log();
}

console.log(`  Done → output/appstore/\n`);
