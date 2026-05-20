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
Editorial product photograph for a mobile-app marketing site. Wide
cinematic landscape composition. Hyper-realistic, shot on a full-
frame DSLR with a 35mm prime lens at f/2.8.

Subject: a clean human hand holding a modern smartphone vertically.
The phone is the visual hero of the frame. CRITICAL: the phone's
display is completely BLACK / OFF / powered down — a pure dark
matte rectangular surface with subtle ambient reflections only.
Absolutely NO user interface, NO text, NO icons, NO graphics, NO
brand wordmarks on the screen. The screen reads as glossy black
glass. We will composite real app UI onto this screen separately
in code.

The hand: relaxed, natural grip, holding the phone from the bottom
edge with thumb visible. Real human skin, slightly weathered (not
model-perfect). Plain neutral-toned long-sleeve cuff visible at
the wrist — no jewelry, no watch, no tattoos, no nail polish.

Context: out-of-focus warm car interior in the background — soft
hint of a dashboard surface, a slice of steering wheel rim, and
a window letting in golden sunlight. The car is generic premium
(no badges, no logos, no recognizable manufacturer). The viewer
should read this as 'sitting in a parked car at sunset, checking
something on a phone' without ever seeing a brand mark.

Composition (CRITICAL — 16:9 landscape):
- Phone occupies the CENTRE-RIGHT, vertically oriented, tilted
  about 8 degrees toward the camera so the screen catches some
  warm ambient light.
- Hand enters from the bottom-right corner of the frame.
- LEFT THIRD of the frame is the soft out-of-focus dashboard
  surface — generous negative space.
- Background extends past the phone with depth, not a flat wall.

Light: golden-hour sunlight raking in from the right edge of the
frame, off-camera. Warm 3000K color temperature. One warm rim
catchlight on the phone's right bezel. Soft warm ambient
reflection on the black screen surface (so the screen isn't
matte-dead — it has gentle gradient reflection of the warm
interior). The hand is lit warmly from the right, slightly
shadowed on the left.

Color story: warm cream highlights, deep charcoal shadows, no
saturated colors anywhere. Cream paper / charcoal / matte black
phone / warm skin. ABSOLUTELY no teal, no blue, no green — the
brand color goes on the composited app UI layer later.

Camera detail: subtle film grain, mild lens vignetting in corners,
true depth of field (phone tack sharp, hand sharp, background
softly blurred). NO HDR, NO over-sharpening, NO clarity boost,
NO aggressive bokeh balls.

Mood: calm, considered, premium, lived-in. The viewer feels like
they're watching someone in their own car at the end of the day.

Strictly forbidden: anything on the phone screen (text / icons /
UI / brand / glow / wallpaper / pattern — the screen must be
pure black glass), square crop, vertical crop, AI-art glossy
plastic, impossible specular highlights, visible badges or
text anywhere in the frame, sci-fi blue HUDs, holograms, neon,
anime stylization, motion blur, rain, lens flare flares,
sunset gradient skies, multiple phones, two hands.

Output: highest resolution available, 16:9 aspect ratio.
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
