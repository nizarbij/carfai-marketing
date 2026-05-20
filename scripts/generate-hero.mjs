/**
 * scripts/generate-hero.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Generate the landing-page hero photograph via Google's
 * Gemini 2.5 Flash Image model (a.k.a. "Nano Banana").
 *
 * Why a script and not a one-shot CLI:
 *   - The prompt is the source of truth — versioned with the repo.
 *   - Variants are reproducible (tweak the prompt, re-run, diff the
 *     output rather than re-typing into a chat UI).
 *   - No external CLI dependency.
 *
 * USAGE
 *   1. Put your Google AI Studio key in .env.local at the repo root:
 *        GEMINI_API_KEY=AIza...
 *   2. Run:
 *        npm run gen:hero
 *   3. Inspect public/hero.png. If you want a variant, tweak PROMPT
 *      below and run again. Each run overwrites public/hero.png.
 *   4. Wire it into the Hero component (see README).
 *
 * COST
 *   Gemini 2.5 Flash Image: ~$0.039 per generated image at the time
 *   of writing (free tier covers the first ~12 images).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { GoogleGenAI } from '@google/genai';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

/* ─── Load .env.local manually (no dotenv dep) ────────────────────────────── */

const envPath = join(ROOT, '.env.local');
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error(
    '\n  ✖ GEMINI_API_KEY not set.\n' +
    '    Drop it into .env.local at the repo root, then re-run.\n' +
    '    Get a key at https://aistudio.google.com/apikey\n',
  );
  process.exit(1);
}

/* ─── The hero prompt — locked per docs/DESIGN_TOKENS.md ──────────────────── */

const PROMPT = `
Editorial automotive product photograph. Wide cinematic landscape
composition. Hyper-realistic, shot on a full-frame DSLR with a
35mm prime lens at f/2.8.

Subject: a modern car's instrument cluster — twin analog gauges
(tachometer left, speedometer right) flanking a centered rectangular
digital info display. The digital display glows a distinct, clearly
visible teal color (hex #089BC3) — this teal is the visual anchor
of the entire image and the ONLY saturated color anywhere in the
frame. Everything else is warm cream, deep charcoal, and chrome.

The car is a generic understated premium sedan — no manufacturer
badges, no recognizable model lines, no logos, no brand names
anywhere visible. NOT a sports car. NOT a Subaru, NOT a BMW, NOT
any identifiable make.

Composition (CRITICAL): true landscape orientation 16:9. The
instrument cluster sits in the RIGHT THIRD of the frame, allowing
the LEFT TWO-THIRDS to show the broader dark dashboard surface
and a slice of out-of-focus steering wheel rim on the far left
edge. The right edge of the frame includes a soft hint of a
window with golden light spilling in. Plenty of negative space
on the dashboard surface (cream-warm reflection of sky light).

Light: golden-hour sunlight raking in from the driver's-right
window (off-frame right). Warm 3000K color temperature. Long
soft shadows across the dashboard. The chrome rings of the gauges
catch a single warm rim of light. The teal digital display is
self-luminous against the surrounding warm light, making it pop
without being neon.

Camera detail: subtle film grain, mild lens vignetting in corners,
real-world depth of field (gauges sharpest, steering wheel
rim soft, dashboard ambient soft). NO HDR, NO over-sharpening,
NO clarity boost.

Mood: calm, considered, premium, almost still-life. The viewer
should feel like they just opened a parked car at sunset.

Strictly forbidden: square crop, vertical crop, AI-art glossy
plastic, fisheye distortion, impossible specular highlights,
visible badges or text or numbers (gauges can have abstract tick
marks but no readable numerals), sci-fi blue HUDs, futuristic
holograms, neon, anime, motion blur, rain droplets, lens flare,
bokeh balls, sunset gradient sky.

Output resolution: as high as possible.
`.trim();

/* ─── Generate ───────────────────────────────────────────────────────────── */

console.log('  → Calling gemini-2.5-flash-image...');
const ai = new GoogleGenAI({ apiKey: API_KEY });

const response = await ai.models.generateContent({
  model:    'gemini-2.5-flash-image',
  contents: PROMPT,
  config: {
    // Force 16:9 landscape — the prompt alone isn't enough; the
    // model defaults to 1:1 unless aspectRatio is set via config.
    imageConfig: { aspectRatio: '16:9' },
  },
});

/* ─── Extract the image bytes ────────────────────────────────────────────── */

const parts = response.candidates?.[0]?.content?.parts ?? [];
let imageData = null;
let textNote = null;

for (const part of parts) {
  if (part.inlineData?.data) imageData = part.inlineData.data;
  else if (part.text)        textNote  = part.text;
}

if (textNote) console.log(`  → Model note: ${textNote.trim().slice(0, 200)}`);

if (!imageData) {
  console.error('  ✖ No image returned. Full response:');
  console.error(JSON.stringify(response, null, 2));
  process.exit(1);
}

const outPath = join(ROOT, 'public', 'hero.png');
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, Buffer.from(imageData, 'base64'));

const sizeKb = (Buffer.from(imageData, 'base64').length / 1024).toFixed(0);
console.log(`  ✓ Wrote ${outPath} (${sizeKb} KB)\n`);
console.log('  Next: edit app/_sections/Hero.tsx and replace the');
console.log('  placeholder slot with:');
console.log('');
console.log('    <Image src="/hero.png" alt="..." fill className="object-cover rounded-2xl" />');
console.log('');
