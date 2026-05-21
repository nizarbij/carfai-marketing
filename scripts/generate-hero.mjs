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

// Hero concept v4 — "history flows into the phone."
//
// Founder pitched a narrative we kept: an open glove box on
// one side spilling documents (receipts / insurance / service
// records) toward a phone on the dashboard; analog gauges on
// the other side facing the phone too. The phone is the
// convergence point — the AI brain that turns physical history
// into one number.
//
// Critical departure from the founder's original draft: NO
// glowing data streams, NO holograms, NO electric-blue
// sci-fi light. The "AI flow" is told COMPOSITIONALLY —
// documents physically angled toward the phone, gauge faces
// oriented toward it, warm window light raking from above to
// land on it. The phone's screen shows the same minimal "87"
// app UI we locked in v3. Editorial restraint over sci-fi
// aesthetic, per docs/DESIGN_TOKENS.md anti-pattern list.

const PROMPT = `
CREATIVE BRIEF — editorial cinematic still-life for the hero
of a premium SaaS landing page. Quote it illustrates:
  "The first AI that's actually seen what your car has seen."

NARRATIVE: physical car history (paper documents in the open
glove box, analog gauge data on the dashboard) flows into a
phone resting on the dashboard. The phone is the AI brain
that turns scattered physical evidence into one structured
insight. The "flow" is suggested COMPOSITIONALLY (everything
angles toward the phone), not literally — there are NO glowing
data streams, NO illuminated cables, NO holograms, NO floating
UI cards. The viewer reads the convergence intuitively.

REFERENCES (the look we are targeting, in priority order):
  · Apple iPhone product page editorial (warm neutrals, real
    materials, single subject hero, no UI tricks)
  · Stripe Press / Stripe annual report editorial photography
    (paper, ink, daylight, monastic restraint)
  · 1843 Magazine product cover stills (object-on-surface,
    magic-hour window light, real shadows)
  · Wes Anderson interior cinematography (symmetrical but
    warm, considered materials, no kitsch)

NOT REFERENCES (avoid the feel):
  · stock photo "businessman with phone"
  · IBM Watson / 2015-era "AI = electric blue cables" ads
  · Midjourney art / SVG gradient meshes / glowing circuit
    motifs / holographic floating UI cards
  · CGI car render
  · sci-fi dashboard HUD
  · tech-bro flat-lay

CAMERA PACKAGE:
  · Body: Hasselblad H6D-100c (medium-format, 100MP)
  · Lens: 80mm f/2.8 prime (normal focal length for MF)
  · Aperture: f/4.0 (receipt edges crisp, phone face crisp,
    leather background softly out of focus, no bokeh balls)
  · ISO 200, shutter 1/125, handheld
  · Film simulation: Kodak Portra 400 — warm skin tones,
    neutral neutrals, slight magenta cast in shadows, fine
    organic grain

CAMERA ANGLE — CRITICAL:
  · Position: looking STRAIGHT AT the dashboard surface from
    directly above the passenger-side footwell, perpendicular
    to the dashboard, NOT from the passenger seat back.
  · The frame contains ONLY: the dashboard surface, the open
    glove box on the left, and the analog gauge cluster on
    the right. NOTHING ELSE.
  · CRITICAL: the STEERING WHEEL is NOT VISIBLE in this
    frame. Not partially, not as a soft blur, not as a rim
    arc. Zero steering wheel. The camera angle is chosen
    specifically to exclude it.
  · No windshield visible. No seats visible. No doors visible.
  · Strict 16:9 landscape crop.

THE SCENE — a wide cinematic view inside a premium car interior
that quietly blends retro analog character with modern
sophistication. Worn-but-loved aesthetic. Filling the frame
edge to edge.

Anatomical note: this is a left-hand-drive car. The instrument
cluster is in front of the driver (LEFT side of the image); the
glove box is in front of the passenger (RIGHT side of the
image). The camera is positioned above the centre of the
dashboard looking down at it.

  LEFT THIRD — the dashboard data (driver-side instrument
  cluster):
    - Two analog gauges seen from above: a tachometer
      and a speedometer, chrome-rimmed, cream faces with
      black needles
    - A small recessed digital readout between them in
      muted amber (NOT teal — the only teal in the frame
      stays on the phone screen)
    - Brushed-metal panel framing the gauges
    - The gauge faces visually orient toward the centre
      of the frame (toward the phone)
    - NO manufacturer badges anywhere on the dashboard

  CENTRE — the phone (THE HERO ELEMENT):
    - A modern unbranded smartphone LYING FLAT on its back
      directly on the dashboard surface, screen FACING
      STRAIGHT UP toward the camera, fully readable. The
      phone is HORIZONTAL in physical orientation but its
      content reads as PORTRAIT (the "87" + arc displays
      portrait-rotated so the camera sees them upright).
    - CRITICAL: the phone is NOT in a mount, NOT in a vent
      clip, NOT on a MagSafe stand, NOT in a phone holder of
      any kind, NOT propped up at an angle, NOT in a cradle.
      It rests directly and flatly on the dashboard surface.
    - Body is matte graphite, completely clean glass, NO
      Apple/Samsung/Google logos, NO branded camera bump.
    - Resting on a small dark microfibre cloth on the dash
      so the surface looks intentional, not improvised.
    - All other elements visually point toward this phone.

  RIGHT THIRD — open glove compartment (passenger-side):
    - Glove box door open and dropped down, revealing the
      inside
    - Folded paper documents spilling slightly outward over
      the lip of the open glove box, leftward toward the
      centre of the frame: 5–7 visible items — fuel receipts
      (curled edges), an insurance card, a folded service
      history, a registration paper
    - All paper is plausibly aged (5–10 years), paper colour
      cream #F7F1E1 to faintly yellowed
    - CRITICAL: NO readable text, NO numerals, NO bar codes,
      NO QR codes, NO logos, NO brand marks. Ink abstracted
      to soft grey suggestions only.
    - The papers ANGLE COMPOSITIONALLY toward the centre of
      the frame (toward the phone)

THE PHONE SCREEN — this is the critical product cue. The
screen is ON and shows a minimal app interface with three
elements stacked vertically:

  1. TOP of screen: the wordmark "CarFai" rendered as exactly
     six letters in this order: C, a, r, F, a, i. Medium-
     weight sans-serif, in teal #089BC3, roughly 24pt
     equivalent, centred horizontally, with a small amount of
     top padding. Render the letters cleanly — they MUST
     spell "CarFai" exactly, no extra letters, no missing
     letters, no garbled glyphs.

  2. CENTRE of screen: a circular progress arc, ~60%
     complete, stroked in teal #089BC3 (our brand colour),
     8px stroke. Inside the arc, centred: the number "87"
     in a clean medium-weight sans-serif, ~120pt equivalent,
     in warm cream #FAFAF7.

  3. BELOW the arc, centred: the small uppercase label
     "OVERALL SCORE" in a 12pt mono-style face, in cool
     slate #6B7480 with wide letter-spacing. Render as
     exactly the two words "OVERALL SCORE" — no extra text.

  · Background: dark navy-charcoal #0B0E13
  · Subtle glass-reflection sheen across the screen from the
    ambient cabin light — not enough to obscure the content
  · ABSOLUTELY NO other UI: no header bar, no buttons, no
    menu bar, no battery indicator, no status bar, no nav
    tabs, no icons, no notification dots. Just CarFai
    wordmark + arc with "87" + "OVERALL SCORE" label.
    Three text elements total. Nothing else.

THE "FLOW" — narrative made visible WITHOUT sci-fi tricks:
  · The papers in the glove box physically ANGLE toward
    the phone (the open-glove-box geometry naturally points
    inward and toward the centre)
  · The gauge cluster on the right physically FACES the
    phone (the curvature of the gauge bezels reads as
    "oriented to the centre")
  · The key warm-light ray from above lands on the phone
    first, the documents and gauges sit in slightly softer
    fill — the phone is visually the BRIGHTEST element by
    a small margin
  · This composition reads as convergence without ANY
    illuminated cables, glowing streams, holograms, or
    floating UI fragments. Those are explicitly forbidden
    (see anti-patterns).

LIGHTING:
  · Key light: warm golden-hour window light entering from
    upper-right (driver's window, off-frame), ~30° elevation,
    colour temperature 3200K — falls primarily on the phone
  · Fill: cool soft ambient bounce from the windshield
    direction (5500K), at -2 stops vs key — softly lights
    the glove box and dashboard equally
  · Kicker: subtle warm rim of light along the upper edge of
    the phone, separating it from the dashboard surface
  · Shadow: long, low-contrast, falling diagonally from the
    phone toward the lower-left. Soft edges, never harsh.
  · NO direct overhead light, NO ring light, NO studio
    strobes, NO under-dash LED glow.

COMPOSITION (16:9, classical balance):
  · Phone sits dead-centre, ~30% of frame width, the most
    detailed element — this is the only intentional symmetry
    breaking the rule-of-thirds because the phone is the
    convergence point
  · Gauge cluster fills the LEFT third (driver-side)
  · Glove box opening + spilling documents fills the RIGHT
    third (passenger-side)
  · Upper third of frame is the dashboard top (soft, out of
    focus), NOT the windshield (no windshield visible)
  · Lower third is the dashboard surface itself, with the
    phone as the foreground anchor
  · No element touches the frame edges

PALETTE (locked, treat as design tokens):
  · Highlight cream: #FAFAF7 (paper highlights, "87" digit)
  · Warm mid: #C9A57A (worn leather, tobacco)
  · Brushed metal: #8E8B85 (gauge bezels, dashboard trim)
  · Deep shadow: #2A2520 (warm charcoal)
  · Phone screen background: #0B0E13
  · Brand accent: #089BC3 (the single teal — ONLY on the
    progress arc on the phone screen, NOWHERE ELSE in frame)
  · Amber readout: muted warm #C49A5C (the digital dashboard
    readout only — explicitly amber/warm, NOT electric blue)
  · Paper warm: #F7F1E1 to #E7DDC4
  · NO other saturated colours anywhere — no green, no red,
    no electric blue, no purple, no neon.

MOOD:
  · intelligent, connected, transformative
  · monastic, considered, lived-in
  · quietly confident
  · NOT bright, NOT loud, NOT energetic, NOT futuristic

ANTI-PATTERNS — strictly forbidden, treat as instant retake:
  · ANY steering wheel — not partially visible, not a soft
    rim arc, not a blur at the edge of frame. Zero wheel.
  · ANY phone mount, vent clip, MagSafe stand, dashboard
    cradle, suction cup, magnetic disc, charging puck under
    the phone. The phone rests flat on the cloth on the dash.
  · ANY glowing cable, illuminated wire, light stream, data
    flow visualisation, energy beam, neon line
  · ANY hologram, floating UI card, transparent panel, AR
    overlay, sci-fi HUD, HUD reticle
  · ANY electric-blue light, neon-blue glow, "Tron" line work
  · readable text/numbers anywhere (except the "87" + small
    "OVERALL SCORE" label on the phone screen)
  · a coffee cup, a wallet, AirPods, a laptop, a clipboard,
    a person, any hand
  · windshield, seats, doors, ceiling, sun-visor, rear-view
    mirror — none should be visible
  · two phones, smart-watch, GPS unit, hanging air freshener
  · any visible Apple / Samsung / Google / car-brand logo
  · CGI plastic, impossible specular highlights, HDR feel
  · over-sharpening, clarity boost, halos, chromatic
    aberration exaggeration
  · big bokeh balls, dramatic lens flare, sunset gradient sky
  · rain, snow, condensation, fog
  · anime, illustration, painterly, watercolour, sketch
  · vertical or square crop

OUTPUT: highest resolution available, strict 16:9 landscape
crop, photographic realism, single take.
`.trim();

/* ─── Generate ───────────────────────────────────────────────────────────── */

console.log('  → Calling gemini-2.5-flash-image...');
const ai = new GoogleGenAI({ apiKey: API_KEY });

const response = await ai.models.generateContent({
  model:    'gemini-2.5-flash-image',
  contents: PROMPT,
  config: {
    // Force the model to return an image binary, not a text
    // "here is the image:" message. Gemini 2.5 Flash Image can
    // output either modality; without this flag the model
    // sometimes chooses text (especially when the prompt reads
    // like a brief / conversation rather than a direct ask).
    responseModalities: ['Image'],
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
