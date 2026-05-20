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
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
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
Editorial product photograph, hyper-realistic.

Subject: a tight close-up of a car's instrument cluster — analog
tachometer and speedometer side-by-side, a small recessed digital
readout between them. Slightly older premium European sedan
aesthetic (think understated, not flashy).

Light: golden-hour sunlight raking in from the driver's-left
window. Warm tone, long shadows, soft falloff. One subtle catchlight
on the gauge bezel. Faint blue ambient bounce from the dashboard's
black plastic.

Composition: dashboard fills frame; gauges occupy the right two-
thirds; the left third is dark plastic and steering wheel rim with
shallow depth-of-field falloff. Eye-level perspective, 35mm
equivalent focal length, f/2.8 feel.

Camera detail: faint film grain, real lens chromatic aberration on
the gauge needles, no over-sharpening. Mood is calm, premium,
considered. NOT motion-blurred, NOT a moving car, NOT an action shot.

Color story: warm cream highlights tying to a #FAFAF7 page
background, deep #0B0E13-ish shadows, a faint teal #089BC3 glow
from the digital readout — that teal is the only saturated color
in the frame.

Strictly avoid: AI-art hallmarks (over-rendered specular highlights,
impossible reflections, fisheye distortion, glossy CGI plastic,
visible UI elements, neon colors, anime stylization, sci-fi
elements, text overlays, watermarks).

Aspect ratio 16:9. High resolution.
`.trim();

/* ─── Generate ───────────────────────────────────────────────────────────── */

console.log('  → Calling gemini-2.5-flash-image...');
const ai = new GoogleGenAI({ apiKey: API_KEY });

const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash-image-preview',
  contents: PROMPT,
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
writeFileSync(outPath, Buffer.from(imageData, 'base64'));

const sizeKb = (Buffer.from(imageData, 'base64').length / 1024).toFixed(0);
console.log(`  ✓ Wrote ${outPath} (${sizeKb} KB)\n`);
console.log('  Next: edit app/_sections/Hero.tsx and replace the');
console.log('  placeholder slot with:');
console.log('');
console.log('    <Image src="/hero.png" alt="..." fill className="object-cover rounded-2xl" />');
console.log('');
