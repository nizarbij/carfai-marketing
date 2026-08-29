/**
 * scripts/gen-appstore-screenshots.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Branded App Store screenshots — real app captures placed in a device frame
 * on a CarFai-gradient background with a headline, in the style App Store
 * listings actually use (cf. CARFAX, Mint, YNAB).
 *
 *   npm run gen:appstore                  # all locales
 *   npm run gen:appstore -- --locale fr   # one locale
 *
 * OUTPUT → output/appstore/<locale>/<slot>/
 *   6.5/    1242 × 2688   iPhone 6.5" slot (already accepted for this listing)
 *   6.9/    1290 × 2796   iPhone 6.9" slot
 *   video/  1080 × 1920   9:16 frames for the launch video (see
 *                         social/launch-video.md) — the store slots are 0.462
 *                         aspect and letterbox badly in a video timeline
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
 *   Excluded on purpose: the old Documents capture (near-empty, reads as an
 *   app with no content), all three pricing screens (one is in French, and
 *   leading a listing with a paywall converts badly), and the camera-view
 *   capture (an empty black viewfinder carrying an upgrade nag).
 *
 *   Still missing: an iOS capture of the OBD2 dashboard. public/app-obd2.jpg
 *   is an ANDROID screenshot — its three-button nav bar is visible — and an
 *   Android capture in an App Store listing is a rejection risk.
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
  { id: '6.5',   width: 1242, height: 2688 },
  { id: '6.9',   width: 1290, height: 2796 },
  { id: 'video', width: 1080, height: 1920 },
];

/* ─── Panels — structure only; copy lives in COPY below ──────────────────── */
const IOS = join(ROOT, 'output', 'ios-rounded');

const PANELS = [
  { id: '01_home',        src: join(IOS, 'IMG_9138.png') },
  // The scan story told through its RESULT rather than the act. IMG_9673
  // shows 16 documents auto-sorted into 7 categories, which is the evidence
  // the headline claims — an empty camera viewfinder proves nothing.
  { id: '02_scan',        src: join(IOS, 'IMG_9673.PNG') },
  { id: '03_advisor',     src: join(IOS, 'IMG_9142.png') },
  // Predictive maintenance took the OBD2 slot; see SOURCE SELECTION above.
  { id: '04_maintenance', src: join(IOS, 'IMG_9675.PNG') },
  { id: '05_spending',    src: join(IOS, 'IMG_9141.png') },
  { id: '06_fleet',       src: join(IOS, 'IMG_9140.png') },
];

/* ─── Copy per locale ─────────────────────────────────────────────────────────
 * French terminology follows the live site's messages/fr.json so the listing
 * and carfai.app read as one product — "le conseiller", "la flotte", "frais"
 * rather than freshly-invented synonyms.
 *
 * ⚠️  The captures are ENGLISH UI. A French listing showing an English app is
 * a visible quality gap, though not a rejection reason. The app ships French,
 * so the proper fix is re-capturing the six screens with the app set to French
 * and pointing SRC_OVERRIDES at them — no other change needed.
 *
 * French runs ~15-20% longer than English, so the headlines are kept short on
 * purpose; the layout wraps fine but long lines flatten the visual hierarchy.
 * ───────────────────────────────────────────────────────────────────────────*/
const COPY = {
  en: {
    '01_home':        { headline: 'Every car cost,\nin one place.',    sub: 'Documents, spending and service history — tracked automatically.' },
    '02_scan':        { headline: 'Snap a receipt.\nIt files itself.', sub: 'AI reads the amount, vendor and date — then sorts it by category.' },
    '03_advisor':     { headline: 'Ask anything\nabout your car.',     sub: 'Answers from your own service history — not generic web results.' },
    '04_maintenance': { headline: 'Know what breaks\nbefore it does.', sub: 'An AI maintenance calendar built from your own service records.' },
    '05_spending':    { headline: 'See what your car\nreally costs.',  sub: 'Monthly totals, category breakdowns and spending trends.' },
    '06_fleet':       { headline: 'From one car\nto a whole fleet.',   sub: 'Team roles, driver assignment and org-wide analytics.' },
  },
  // Headlines must fit TWO lines. Every slot wraps at 19 characters per line
  // (the widths differ but the type scale is proportional, so the character
  // budget lands identically on all three). French runs long, so three of
  // these are deliberately shorter than a literal translation would be — a
  // three-line headline pushes the device down and flattens the hierarchy.
  // Verify with: node -e "…wrap(headline, 19)" before changing any of them.
  fr: {
    '01_home':        { headline: 'Vos frais auto,\nau même endroit.',        sub: "Documents, dépenses et historique d'entretien — suivis automatiquement." },
    '02_scan':        { headline: 'Scannez un reçu.\nIl se classe seul.',     sub: "L'IA lit le montant, le marchand et la date, puis range par catégorie." },
    '03_advisor':     { headline: 'Demandez tout\nsur votre voiture.',        sub: 'Des réponses tirées de votre historique, pas du web générique.' },
    '04_maintenance': { headline: 'Sachez ce qui lâche\navant que ça lâche.', sub: "Un calendrier d'entretien par IA, bâti sur vos propres factures." },
    '05_spending':    { headline: 'Le vrai coût\nde votre voiture.',          sub: 'Totaux mensuels, répartition par catégorie et tendances.' },
    '06_fleet':       { headline: "D'une voiture\nà toute une flotte.",       sub: "Rôles d'équipe, affectation des conducteurs et analyses d'organisation." },
  },
};

/**
 * Per-locale capture overrides. Empty means "reuse the English captures".
 * Once French screen captures exist, add e.g.
 *   fr: { '01_home': join(IOS, 'fr', 'IMG_xxxx.PNG'), … }
 * and the French set picks them up with nothing else to change.
 */
const SRC_OVERRIDES = { fr: {} };

const localeFlag = process.argv.indexOf('--locale');
const LOCALES = localeFlag >= 0 && process.argv[localeFlag + 1]
  ? [process.argv[localeFlag + 1]]
  : Object.keys(COPY);

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

async function compose(locale, slot, panel, index) {
  const { width: W, height: H } = slot;

  const copy = COPY[locale][panel.id];
  const src  = (SRC_OVERRIDES[locale] && SRC_OVERRIDES[locale][panel.id]) || panel.src;

  if (!existsSync(src)) return null;   // caller reports it as skipped

  const padX = Math.round(W * 0.085);
  const usableW = W - padX * 2;

  // Type scale relative to canvas width so every slot looks identical.
  const headSize = Math.round(W * 0.077);
  const subSize  = Math.round(W * 0.0335);

  const headLines = wrap(copy.headline, Math.floor(usableW / (headSize * 0.55)));
  const subLines  = wrap(copy.sub,      Math.floor(usableW / (subSize  * 0.52)));

  const headTop = Math.round(H * 0.062) + headSize;
  const headLH  = Math.round(headSize * 1.12);
  const subTop  = headTop + (headLines.length - 1) * headLH + Math.round(headSize * 0.95);
  const subLH   = Math.round(subSize * 1.38);
  const textBottom = subTop + (subLines.length - 1) * subLH;

  // Device bleeds a little past the bottom edge so it reads as larger than
  // the frame — the standard trick in store listings.
  const deviceW = Math.round(W * 0.72);
  const device  = await buildDevice(src, deviceW);
  const deviceY = Math.round(textBottom + H * 0.055);

  // Alternate a slight tilt so the set has rhythm seen as a row.
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

  const outDir = join(OUT, locale, slot.id);
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

for (const locale of LOCALES) {
  if (!COPY[locale]) { console.log(`  ✖ unknown locale: ${locale}`); continue; }
  console.log(`  ══ ${locale.toUpperCase()} ══`);
  for (const slot of SLOTS) {
    console.log(`  [${slot.id}]  ${slot.width} × ${slot.height}`);
    for (let i = 0; i < PANELS.length; i++) {
      const f = await compose(locale, slot, PANELS[i], i);
      if (!f) {
        console.log(`    ⏭  ${PANELS[i].id.padEnd(16)} skipped — missing capture`);
        continue;
      }
      const kb = Math.round(statSync(f).size / 1024);
      console.log(`    ✓ ${PANELS[i].id.padEnd(16)} ${String(kb).padStart(4)} KB`);
    }
    console.log();
  }
}

console.log(`  Done → output/appstore/<locale>/<slot>/\n`);
