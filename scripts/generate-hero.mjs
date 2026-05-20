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
Editorial product photograph for a mobile-app marketing landing.
Wide cinematic landscape composition. Hyper-realistic, shot on a
full-frame DSLR with a 50mm prime lens at f/2.0. Slight overhead
angle — the camera looks DOWN from approximately driver's-eye
height onto the lap area.

Subject: a single human hand holding a modern smartphone
vertically, positioned ABOVE a car's steering wheel. The phone
is closer to the camera; the steering wheel is just below it,
softly out of focus, framing the lower third of the image.

CRITICAL — the phone screen: completely BLACK / OFF / matte
glass. NO user interface, NO text, NO icons, NO graphics, NO
brand wordmarks, NO glow, NO patterns. Just dark glossy glass
with a subtle gradient reflection of the warm cabin ambient
light. We composite real app UI onto this screen later in code.

The hand: a single relaxed adult hand, palm up, holding the
phone from the bottom edge between thumb and the side of the
hand. Real human skin, slightly weathered (not model-perfect).
Plain neutral cotton sleeve cuff visible at the wrist. No watch,
no jewelry, no tattoos, no nail polish. Five fingers, total.
ONE hand only.

The steering wheel: a generic premium-sedan steering wheel,
leather-wrapped, three-spoke. NO recognizable badges, NO
manufacturer logos, NO model markings, NO visible audio buttons
with brand names. The wheel sits in the bottom third of the
frame, out of focus, providing context.

Background: the upper portion of the frame is the dashboard
edge and the lower part of the windshield, also out of focus.
A thin slice of golden sunlight enters from the upper right
corner of the frame. The cabin is calm and ordinary — no
passengers, no clutter.

Composition (CRITICAL — 16:9 landscape):
- Phone centered horizontally, occupying the centre-top half
  of the frame (about 35% of frame height).
- Steering wheel rim arc visible across the bottom 25–30% of
  the frame, out of focus.
- Hand enters from the bottom-right.
- The camera looks slightly down (~15-degree top-down angle)
  so the phone face is visible to the viewer.

Light: warm golden-hour sunlight from upper right (off-frame).
3000K color temperature. Soft directional light wrapping the
phone bezel and the side of the hand. The dashboard ambient
provides cool fill on the underside of the phone. The black
phone screen catches a soft warm gradient reflection (so it
doesn't look matte-dead).

Color story: warm cream highlights, deep charcoal shadows,
muted leather brown on the wheel. ABSOLUTELY NO saturated
colors — no teal, no blue, no green, no red, no neon. The
brand color will be added in code via the composited app UI.

Camera detail: subtle film grain, mild lens vignetting, true
shallow DOF (phone sharp; hand sharp; wheel + dashboard soft).
NO HDR, NO clarity boost, NO over-sharpening, NO heavy bokeh
balls.

Mood: calm, considered, premium, lived-in. The viewer feels
like they have just sat in their parked car at the end of a
long day and pulled out their phone.

Strictly forbidden: anything on the phone screen (text / icons
/ UI / glow / wallpaper / brand mark — phone screen must be
PURE BLACK GLASS), square crop, vertical crop, two hands,
extra fingers, sci-fi HUDs, holograms, neon, fisheye, motion
blur, rain on the windshield, dramatic lens flare, visible
manufacturer badges, gear-shift detail in foreground, GPS
unit, hanging air freshener, child seat, sunset gradient
in sky, anime stylization, glossy CGI feel.

Output: highest resolution available, strict 16:9 aspect ratio.
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
