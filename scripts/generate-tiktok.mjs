/**
 * scripts/generate-tiktok.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Generate the CarFai gig-driver TikTok video via Google Veo 2.
 *
 * 6 scenes, 42 seconds total, 9:16 vertical. Same pattern as
 * scripts/generate-hero.mjs: uses @google/genai with the API key from
 * .env.local. Veo 2 generates one clip per scene; we stitch in post
 * (CapCut / Premiere / DaVinci).
 *
 * USAGE
 *   npm run gen:tiktok                       # generate all 6 scenes
 *   npm run gen:tiktok -- --scene 3          # regenerate scene 3 only
 *   npm run gen:tiktok -- --scenes 3,5       # regenerate scenes 3 and 5
 *   npm run gen:tiktok -- --dry-run          # print prompts + cost, no API call
 *
 * OUTPUT
 *   output/tiktok/01-shoebox.mp4
 *   output/tiktok/02-manual-sort.mp4
 *   output/tiktok/03-snap.mp4
 *   output/tiktok/04-review-refine.mp4
 *   output/tiktok/05-year.mp4
 *   output/tiktok/06-exhale.mp4
 *   output/tiktok/MANIFEST.md                # what was generated, cost, next steps
 *
 * COST
 *   Veo 2: ~$0.10–0.20 per generated second.
 *   Full run = 42s × ~$0.15/s ≈ $6.30 base.
 *   Realistic with 3–5 retries per scene: $20–40 total.
 *
 * EDITING SCENES
 *   The full scene prompts are inline in the SCENES array below.
 *   Edit them directly, then re-run.
 *
 * POST-PRODUCTION (NOT handled by this script)
 *   - Stitch the 6 clips in order in any NLE
 *   - Layer post-comp text overlays per scene (see SCENES[].postComp.text)
 *   - Add music + sound design (see SCENES[].postComp.audio)
 *   - Veo 2 does NOT generate native audio — all sound is added in post.
 *
 * API VERSION NOTE
 *   This script targets @google/genai v2.5.x with Veo 2 endpoints
 *   (`ai.models.generateVideos`, `ai.operations.getVideosOperation`,
 *   `ai.files.download`). If the SDK API surface changes in a future
 *   version, the three call sites at the bottom are the only ones
 *   that need updating.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { GoogleGenAI } from '@google/genai';
import { readFileSync, writeFileSync, existsSync, mkdirSync, createWriteStream } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT = join(ROOT, 'output', 'tiktok');

/* ─── Load .env.local (same loader as generate-hero.mjs) ──────────────────── */

const envPath = join(ROOT, '.env.local');
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY && !process.argv.includes('--dry-run')) {
  console.error(
    '\n  ✖ GEMINI_API_KEY not set.\n' +
    '    Drop it into .env.local at the repo root, then re-run.\n' +
    '    Get a key at https://aistudio.google.com/apikey\n' +
    '    (Or pass --dry-run to inspect prompts and costs without calling Veo.)\n',
  );
  process.exit(1);
}

/* ─── CLI args ────────────────────────────────────────────────────────────── */

function parseArgs() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');

  let only = null;
  const sceneIdx = args.findIndex((a) => a === '--scene' || a === '--scenes');
  if (sceneIdx >= 0 && args[sceneIdx + 1]) {
    only = args[sceneIdx + 1]
      .split(',')
      .map((n) => parseInt(n.trim(), 10))
      .filter((n) => n >= 1 && n <= 6);
  }

  return { dryRun, only };
}

/* ─── Set bible — pasted into every scene prompt for consistency ──────────── */

const SET_BIBLE = `
SET BIBLE — applies to every scene in this cut.

LOCATION
A modest North American kitchen. Mid-tone walnut table, ~1m × 1.5m,
visibly worn. Behind the table, slightly out of focus: a wooden chair
back, the edge of a window frame, a cabinet handle. Time of day shifts
across the cut — golden hour in scenes 1-4, blue hour (post-sunset)
in scenes 5-6. Window light from upper-left of frame.

DRIVER (hands only in scenes 1–5, face in scene 6)
Forearm entering from frame right. Dark grey hoodie sleeve. Hands are
average-sized, light olive skin, no rings, no nail polish, no tattoos.
Knuckles look slightly worn — they have worked.

Face (scene 6 only): mid-30s male, the same person whose hands we
have watched. Tired-but-relieved expression. Light short beard, neatly
trimmed. Dark eyes. Short dark hair, slightly messy from a long day.
Same dark grey hoodie, hood down, zip half-up.

THE PHONE (scenes 3, 4, 5, 6 — identical hardware)
Modern unbranded smartphone, matte graphite body, completely clean
glass. NO Apple / Samsung / Google logos. NO camera-bump branding.
Always shown either flat on the table or held in the right hand.

PALETTE (treat as design tokens)
  warm paper       #F7F1E1
  warm walnut      #8B6B4A
  cream wall       #EFEAE0
  hoodie graphite  #2A2A2A
  phone dark bg    #0B0E13
  CarFai teal      #089BC3
  CarFai indigo    #6B6BFF  (AI moments only — scenes 3, 4)
  CarFai green     #4ADE80  (checkmarks, line-item totals)
  CarFai navy      #0A3E8F  (secondary brand)

FILM LOOK
Kodak Portra 400 simulation. Slight organic grain. Neutral neutrals
with a soft magenta cast in shadows. Aperture f/4 — phone face and
hand crisp, table edges softly out of focus.

ABSOLUTE BANS (every scene)
- NO glowing UI, NO holograms, NO neon, NO electric blue, NO Tron lines
- NO sci-fi HUD, NO floating UI cards above the phone screen
- NO readable text on the paper receipts (text comp'd in post if needed)
- NO Apple / Samsung / Google / car-brand logos visible anywhere
- NO body above the wrist in scenes 1–5 (face appears only in scene 6)
- NO quick cuts within a scene (except scene 6's deliberate hand-to-face cut)
- NO stock-photo cleanliness — every surface is lived-in
- NO music cues in the genai render (all sound added in post)
`.trim();

/* ─── Scene data ──────────────────────────────────────────────────────────── */

const SCENES = [
  /* ─── Scene 1 — THE SHOEBOX (the hook) ─────────────────────────────────── */
  {
    id: '01-shoebox',
    title: 'The shoebox',
    arc: 'Hook — the chaos lands in 2 seconds',
    duration: 6,
    prompt: `${SET_BIBLE}

SCENE 1 — THE SHOEBOX

Vertical 9:16 aspect ratio. 6-second continuous shot.

Shot type: locked top-down close-up. Camera positioned 0.7m directly
above the table, looking straight down. No camera movement of any
kind — no dolly, no zoom, no pan, no tilt, no shake. The camera is
on a tripod, locked.

Subject: dead centre of frame, an old cardboard shoebox, beige with
slightly torn corners, lid askew on top. The shoebox is OVERFLOWING
with crumpled paper receipts — fuel receipts, parking stubs, folded
invoices, insurance cards. Maybe 40–60 individual pieces of paper
visible, varying in size, mostly cream-toned (#F7F1E1) and faintly
yellowed.

Action (timed):
  0.0s — static establishing frame. Shoebox dead centre, lid askew,
         papers visible spilling slightly. No movement.
  0.6s — driver's forearm enters from frame-right. Dark grey hoodie
         sleeve. The hand grips the side of the shoebox.
  1.0s — the hand TIPS the shoebox sideways toward frame-left in
         a single decisive motion.
  1.0s–4.5s — in slightly slowed motion (~1.4× — natural-feeling,
         not stylised), the receipts AVALANCHE out of the box across
         the table surface. Dozens of papers spread in a chaotic
         spray. Some flip mid-air, some crumple as they land, some
         slide. Real-world paper physics.
  4.5s — the avalanche settles. The hand releases the box, withdraws
         back out of frame to the right.
  4.5s–6.0s — static final frame. Table now covered in scattered
         receipts. Shoebox lying on its side, empty.

Lighting: warm directional key from upper-left (window, 3200K), soft
fill from front, slightly harsh micro-shadows under crumpled paper
edges give the spread depth. The table wood grain is visible but
softly out of focus at f/4.

Mood: documentary realism. This isn't dramatic — it's just a person
finally facing a year of receipts. The frustration is implied, not
performed.

Anti-patterns: NO face, NO body beyond the forearm, NO phone in this
scene, NO readable text on the receipts, NO logos visible, NO speed-
ramp visual effects beyond the gentle 1.4× on the avalanche moment.`,
    postComp: {
      text: [
        { time: '0:02', content: 'I drove Uber for a year.\nWant to see how much I actually kept?', style: 'Inter Medium, 84px, paper #FAFAF7, slight drop shadow, centered upper-third' },
      ],
      audio: [
        '0:00–0:02 — ambient kitchen silence',
        '0:02 — music enters: low synth pad, slow build',
        '0:01–0:05 — paper-rustle SFX layered under the avalanche',
      ],
    },
  },

  /* ─── Scene 2 — THE MANUAL SORT (frustration peak) ─────────────────────── */
  {
    id: '02-manual-sort',
    title: 'The manual sort',
    arc: 'Frustration peak — chaos despite effort',
    duration: 7,
    prompt: `${SET_BIBLE}

SCENE 2 — THE MANUAL SORT

Vertical 9:16 aspect ratio. 7-second continuous shot.

Shot type: same locked top-down position as scene 1, ~0.7m above the
table. Camera stays absolutely still — no movement of any kind. The
shot is a direct visual continuation; we begin on the same scattered-
receipts arrangement that ended scene 1.

Props now on the table (added since scene 1 ended):
  · a small pocket-size spiral notebook, open, blank pages, lower-left
  · a basic black pocket calculator, upper-right corner of frame
  · a black ballpoint pen, mid-frame, on top of the receipts
The shoebox is gone (off-frame).

Action (timed):
  0.0s–0.5s — static establishing frame. Same scattered receipts as
              scene 1's end frame. Notebook and calculator visible.

  0.5s–5.0s — TIME-LAPSE / SPEED-RAMP at approximately 6× real speed.
              The forearm (dark grey hoodie sleeve, from frame right)
              moves rapidly in and out of frame:
                · grabbing receipts, smoothing them, sorting them into
                  four loose stacks at the four cardinal points of the
                  frame (top, bottom, left, right edges of the table)
                · jotting numbers into the notebook between receipts
                · stabbing the calculator buttons in rapid bursts
                · occasionally re-sorting — moving a receipt from one
                  stack to another, then back
              The piles GROW visibly. The mess never fully resolves —
              for every receipt sorted, the stacks lean, slide, fall
              over. Some receipts get crumpled in the speed of it.
              Several receipts fall off the edge of the table.

              The speed-up should read as natural time-lapse (steady
              acceleration, hand visible as a moving blur entering
              and exiting), NOT as stylised stop-motion or jerky cuts.

  5.0s–6.0s — SPEED RAMPS BACK DOWN to normal time (1×) over ~0.5s.
              The transition: hand drops the pen onto the table. Pen
              hits, bounces once, rolls a few cm, stops.

  6.0s–7.0s — locked static normal-speed shot. The hand RESTS, palm
              down, fingers spread across the receipts in the
              foreground. Knuckles slightly flexed. Stays still.
              Hold on this beat. The frame is now significantly MORE
              chaotic than where we started — more crumpled receipts,
              papers fallen off the edge, numbers scribbled illegibly
              in the open notebook.

Lighting: identical to scene 1 — warm directional key from upper-left
window, slight shift in shadow length to suggest 30 mins of time has
passed (shadows ~10% longer). The light slightly cooler than scene 1,
suggesting late afternoon turning toward early evening.

Mood: silent struggle. We do not see frustration via face or body —
we see it via the GROWING mess despite the effort, and the final
defeated hand placement.

Anti-patterns: NO face, NO body above the wrist, NO phone, NO digital
displays, NO readable text on receipts, NO readable numbers on the
calculator (it shows random digits but unreadable), NO comedy beats.`,
    postComp: {
      text: [],
      audio: [
        '0:00–0:05 — calculator clicks, paper rustle, ticking clock SFX under the time-lapse',
        '0:05–0:06 — sounds drop out as speed ramps down',
        '0:06–0:07 — single pen-drop SFX, then silence',
        'Music throughout: tension build, no resolution',
      ],
    },
  },

  /* ─── Scene 3 — THE SNAP (the pivot) ───────────────────────────────────── */
  {
    id: '03-snap',
    title: 'The snap',
    arc: 'Pivot — try a different tool',
    duration: 7,
    prompt: `${SET_BIBLE}

SCENE 3 — THE SNAP

Vertical 9:16 aspect ratio. 7-second continuous shot.

Shot type: same locked top-down position as scenes 1–2, ~0.7m above
the table. Camera holds static for the first half. From 4.5s onward,
a very slight push-in (10cm closer) toward the phone. No other camera
movement.

Starting frame: identical to the closing frame of scene 2 — chaotic
scattered receipts across the walnut table, notebook with illegible
scribbles in lower-left, calculator in upper-right, pen mid-frame.
The dark-grey-hoodie forearm rests palm-down across the receipts in
the foreground.

Lighting: continues the warm key from upper-left. Shadows ~15% longer
than scene 2 — late afternoon turning early evening. Colour temp
4500K → 3800K.

Action (timed):
  0.0s–0.8s — static establishing. Hand resting, scene-2 final frame.

  0.8s–1.5s — the hand lifts off the receipts and exits frame right
              in a single calm motion. ~0.3s of empty pause.

  1.5s–2.5s — the same forearm re-enters from frame right carrying
              THE PHONE per set bible. Phone held in a relaxed grip,
              fingers wrapped around the long edges, thumb visible
              on the screen-side rim. The hand positions the phone
              ~25cm above the table, directly over a folded auto-
              service receipt in the centre-left of frame.

  2.5s–4.5s — the phone hovers. The phone SCREEN shows the CarFai
              SCAN DOCUMENT screen, with the following layout
              (top to bottom of the phone screen):

                · top status-bar strip: thin, dark, small system icons
                · top app-bar: black background. A small "X" close
                  glyph in the upper-left. The title placeholder
                  centred (thin white horizontal rectangle ~50% of
                  screen width — "SCAN DOCUMENT" comp'd in post). A
                  small flash-icon glyph in the upper-right.
                · capture viewfinder filling most of the screen: near-
                  black background (very dark navy #0A1014). Four
                  L-shaped white corner brackets (~24px stroke, ~80px
                  arm length) mark the four corners of a tall
                  rectangular receipt-framing zone in the centre.
                · bottom of viewfinder: small "Gallery" and "PDF"
                  label placeholders flanking a larger dark circular
                  CAPTURE BUTTON centred (~12% of screen width, faint
                  white outline ring, tiny camera-icon glyph centre).
                · below: small "Enter manually" placeholder.
                · bottom tab bar: five tab slots in a row, separator
                  line above. Centre tab highlighted as a small dark
                  circle with a white camera glyph (active tab). The
                  other four tabs (Home, Documents, Analytics, AI
                  Advisor) appear as small dimmed icon+label slots.

              The receipt below the phone is visible THROUGH the
              corner-bracketed viewfinder zone (rendered as if camera-
              passthrough is showing the receipt beneath, stylised
              not photoreal).

  4.5s–5.0s — THE SNAP MOMENT. The screen's overall brightness pulses
              upward (~15% lift) for ~0.15 seconds, then returns to
              normal. NO bright white flash, NO scan-line sweep. Just
              a soft luminance bump that reads as "captured."

  5.0s–6.0s — the WHITE ANALYZING MODAL appears on top of the dark
              capture screen via a quick scale-in (95% → 100% over
              ~0.2s) from screen centre:
                · a rounded white card, ~80% of screen width, centred,
                  filling roughly the middle third of the screen
                · at the top: a circular pale-lavender badge
                  (#E8E4FF), ~80px diameter, containing a small four-
                  pointed sparkle glyph in indigo #6B6BFF
                · below the badge: an arc-shaped loading indicator
                  in indigo #6B6BFF, ~60% of a full circle, positioned
                  where the bottom half of a circle would be (smile-
                  shape arc, not a full ring). Arc rotates slowly
                  (one half-turn over ~1.5s).
                · below the arc: a bold dark-text placeholder ~30%
                  screen width ("Analyzing document…" comp'd in post)
                · below that: a thinner light-grey text placeholder
                  ~50% screen width ("AI is extracting data from your
                  document" comp'd in post)
                · dark capture screen behind the modal still visible
                  at top and bottom edges, slightly dimmed.

  6.0s–7.0s — phone TILTS slightly toward the camera (~10° tilt along
              its long axis). Analyzing modal stays visible — indigo
              loading arc continues its slow rotation. Hold.

Mood: quiet competence in the act, then a beat of expectation while
the AI works. We do not jump to celebration — we end suspended in
the waiting moment. Scene 4 delivers the payoff.

Anti-patterns: NO face, NO glowing UI on the dark capture screen
beyond the 4.5s brightness pulse, NO particle effects, NO Tron-line
scanning across the receipt, NO data-card floating above the receipt,
NO bright white camera-flash, NO Apple/Samsung/Google logos, NO
readable text on the receipt or phone screen (text comp'd in post),
NO indigo/purple elements anywhere except inside the analyzing modal.`,
    postComp: {
      text: [
        { time: '4.5s on phone screen', content: 'SCAN DOCUMENT', style: 'Inter Medium, 36px, white, app bar title' },
        { time: '5.5s on phone screen', content: 'Analyzing document…', style: 'Inter Semibold, 52px, ink #0B0E13, modal title' },
        { time: '5.6s on phone screen', content: 'AI is extracting data from your document', style: 'Inter Regular, 28px, slate2, modal subtitle' },
        { time: 'throughout', content: 'Gallery (1–5) · PDF · Enter manually · Home · Documents · Analytics · AI Advisor', style: 'tab + footer labels, Inter Regular, ~22px, white/grey' },
      ],
      audio: [
        '4.5s — soft shutter SFX synced to brightness pulse',
        '5.0s — music shift: tension resolves into a calmer tone',
        '5.0s–7.0s — subtle high-frequency hum on the analyzing modal',
      ],
    },
  },

  /* ─── Scene 4 — REVIEW & REFINE (the payoff for the snap) ──────────────── */
  {
    id: '04-review-refine',
    title: 'Review & Refine',
    arc: 'Payoff — one receipt becomes structured data',
    duration: 8,
    prompt: `${SET_BIBLE}

SCENE 4 — REVIEW & REFINE

Vertical 9:16 aspect ratio. 8-second continuous shot.

Shot type: continuation of the end-of-scene-3 framing. Camera locked
at ~0.6m above the table. The phone is held in the same right hand,
tilted ~10° toward the lens. The phone screen fills roughly 55% of
the 9:16 frame height, centred horizontally, top-third of the frame.

In the second half (4.0s onward) the phone TILTS further toward the
camera — from 10° to 25° — so the screen faces the lens more directly.
The hand follows the tilt; the wrist rotates. No camera movement.

Lighting: continuation from scene 3. Warm key from upper-left, colour
temp 3800K. The phone screen — now showing the dark "Review & Refine"
UI — is darker overall but the green checkmarks and teal Save button
provide bright accent highlights against the dark background.

THE PHONE SCREEN — CarFai Review & Refine, top to bottom:

  · TOP STATUS STRIP (~5% screen height, dark, abstract system icons)

  · TOP APP BAR (black, ~7% screen height):
    - small back-chevron "<" glyph upper-left
    - title placeholder ~50% width (REVIEW & REFINE comp'd in post)
    - upper-right: rounded pill, ~18% screen width, thin teal #089BC3
      outline + teal "Save" label placeholder

  · THREE STACKED CARDS below the app bar, each ~88% screen width,
    centred, dark-navy fills #0F1722 with thin teal-tinted outlines:

    CARD 1 — CORE DATA (top, ~25% of remaining screen):
      · header: teal-tinted square icon-badge upper-left with a small
        database glyph (three stacked horizontal lines). Right of it:
        small teal #089BC3 text-block placeholder ("CORE DATA").
      · 3 rows separated by faint dividers, each with:
          left: small grey label placeholder
          right: bold white value placeholder
          far-right: GREEN CIRCLE with white checkmark inside,
          ~24px diameter, fill #4ADE80

    CARD 2 — AI INSIGHTS (middle):
      · header: dark square icon-badge upper-left containing the
        four-pointed INDIGO sparkle glyph (#6B6BFF — same sparkle
        from scene 3's analyzing modal). Right of it: small white
        text-block placeholder ("AI INSIGHTS").
      · 3 rows: "Type" / "Category" / "Notes" with same row layout,
        each ending in a green-circle checkmark. The "Notes" row's
        value placeholder is taller (3 lines of wrapped text).

    CARD 3 — LINE ITEMS (bottom, partially clipped at start, fully
    visible after the phone tilt):
      · header: GREEN-TINTED square icon-badge containing an abstract
        list glyph. Right of it: small green #4ADE80 text-block
        ("LINE ITEMS"). Far right of header: small green circle with
        "+" glyph.
      · two sub-sections each with:
          - small green caps sub-header label
          - small grey "subtotal" + green text-block on the right
          - one-or-more item rows: thin grey description placeholder
            on left + green dollar-amount placeholder on right.

Action (timed):
  0.0s–0.3s — open on Review & Refine FULLY LAID OUT but EMPTY OF
              CHECKMARKS. All three cards visible, all data labels
              and values populated, every green-circle checkmark slot
              is EMPTY (just a thin grey ring). Teal Save button at
              top is dimmed/disabled.

  0.3s–1.5s — GREEN CHECKMARK CASCADE. Six green-circle checkmarks
              POP IN sequentially, one every ~0.2s:
                0.3s — Date row check (95% → 100% scale, ~80ms)
                0.5s — Vendor row check
                0.7s — Amount row check
                0.9s — Type row check
                1.1s — Category row check
                1.3s — Notes row check
              Each pop is QUICK and SUBTLE — no bounce, no elastic,
              no flash. Just fast scale-up to 100% with a slight inner
              brightness pulse on impact (~10%).

  1.5s–1.7s — teal SAVE button transitions from dimmed to active —
              outline brightens to full teal opacity, fill takes a
              faint teal-tinted background. ONE soft pulse (scale
              100% → 102% → 100% over 0.2s).

  1.7s–3.5s — slow phone-tilt continues. As phone tilts, framing
              reveals more of Card 3 at bottom. Within Card 3:
                1.8s — "ENGINE REPAIR" sub-header + green subtotal
                       fade-in (~0.3s)
                2.0s — one item row beneath fades in
                2.3s — "ELECTRICAL" sub-header + green subtotal
                2.6s — three item rows fade in (each ~0.15s apart)
              All fade-ins quick and clean — no slide, no shimmer.

  3.5s–5.5s — HOLD. Phone tilted at 25°, screen facing camera more
              directly. Every card fully populated, every checkmark
              visible, teal Save button active.

  5.5s–7.0s — slow phone-LOWERING begins. Hand lowers the phone back
              toward the table surface. Phone descends ~5cm. Tilt
              relaxes from 25° back to ~5°.

  7.0s–8.0s — phone lands flat on the table, screen still facing up,
              still showing the fully populated Review & Refine. The
              hand RELEASES the phone — fingers lift off the screen
              edges, but the wrist stays in frame, palm-up, resting
              next to the phone. Hold this final frame.

Mood: confident competence. The AI is doing exactly what it should.
The viewer's feeling is "okay, that's actually impressive — and that
was just one receipt."

Anti-patterns: NO face, NO glowing UI beyond the checkmark-impact
luminance pulse, NO particle effects, NO Tron-line sweep, NO floating
UI cards hovering above the phone, NO Apple/Samsung/Google logos, NO
readable text on the receipts around the phone, NO indigo elements
anywhere except the AI INSIGHTS sparkle badge, NO bouncy spring-easing
on the checkmark pops.`,
    postComp: {
      text: [
        { time: 'throughout on phone screen', content: 'App bar: "Review & Refine" + "Save" pill (teal)', style: 'Inter Medium 38px white + Semibold 30px teal' },
        { time: 'throughout on phone screen', content: 'CORE DATA card: Date 2026-03-14 · Vendor "Midas Auto Service" · Amount $487.32', style: 'Mono caps 22px teal label + Regular 24px grey labels + Bold 28px white values' },
        { time: 'throughout on phone screen', content: 'AI INSIGHTS card: Type "Maintenance" · Category "Brake Service" · Notes "Front brake pads and rotors replaced, includes labour and multi-point inspection."', style: 'Same as CORE DATA, indigo accents on label' },
        { time: 'throughout on phone screen', content: 'LINE ITEMS card:\n  BRAKE COMPONENTS  subtotal $312.40\n    Front brake pads (set)  $94.99\n    Front rotors (pair)  $189.99\n    Brake fluid (1L)  $27.42\n  LABOR  subtotal $174.92\n    Front brake service (1.5 hrs)  $134.92\n    Multi-point inspection  $40.00', style: 'Mono caps 20px green sub-headers + Regular grey items + Bold green amounts' },
      ],
      audio: [
        '0:00–0:30 (per checkmark) — soft tick/chime SFX on each of the 6 checkmark pops',
        '1.7s — brief musical pause + resolution on Save-button activation',
        '3.5s onward — calm sustained tone',
      ],
    },
  },

  /* ─── Scene 5 — THE YEAR (the aggregate reveal) ────────────────────────── */
  {
    id: '05-year',
    title: 'The year',
    arc: 'Aggregate payoff — one year compressed onto one screen',
    duration: 8,
    prompt: `${SET_BIBLE}

SCENE 5 — THE YEAR

Vertical 9:16 aspect ratio. 8-second continuous shot.

Shot type: locked top-down position, camera ~0.7m above the table.
Over the 8 seconds, a VERY SLOW PUSH-IN (camera moves from 0.7m to
0.55m above the table — barely perceptible, ~21% closer over 8s).
No other camera movement.

OPENING FRAME (radically different from scene 4's closing):
  · the walnut table is now COMPLETELY CLEAN — no scattered receipts,
    no notebook, no calculator, no pen. Just bare wood grain, centred.
  · dead-centre on the table: the matte graphite unbranded smartphone
    per set bible, flat on its back, screen up. Same phone, same
    orientation as end of scene 4.
  · lighting has SHIFTED TO BLUE HOUR. The warm window key from
    upper-left is now gone, replaced by cool diffuse fading blue-grey
    ambient light (~5500K → 6500K). Shadows softer, longer, more
    diffuse. Wood grain reads cooler. The kitchen background is
    darker, quieter — early evening with no interior lights on yet.
  · the phone screen is now BY FAR the brightest surface in the
    frame. It LITERALLY glows against the dimmed kitchen — the light-
    theme bright dashboard throws a soft cool glow onto the
    immediate wood surface around the phone.

THE PHONE SCREEN — CarFai Analytics screen (LIGHT THEME),
top to bottom:

  · top status strip (thin, abstract system icons)

  · main title row: large bold dark text placeholder ("Analytics") on
    the left ~40% screen width. Upper-right: small white-square share-
    icon glyph.

  · subtitle row: small grey text placeholder ~30% width ("2026 Honda
    Civic" comp'd in post).

  · vehicle selector pill: rounded white pill ~75% screen width,
    centred. Contains a small circular vehicle thumbnail (tiny
    abstract dark car silhouette), bold dark text placeholder, small
    chevron-down on the right.

  · primary toggle: two-pill rounded segmented control. LEFT pill
    ("Spending") WHITE with soft drop shadow + active dark-navy text.
    RIGHT pill ("Maintenance") muted/grey with small wrench glyph.

  · secondary filter row: four-pill segmented horizontal scroller.
    FIRST pill ("This Year") white-with-shadow + active. The other
    three ("Last Year", "Last 6 Mo.", "All Time") muted. Rightmost
    pill partially clipped to suggest horizontal scroll.

  · "Overview" section header: large bold dark text placeholder.

  · 2×2 STAT CARDS GRID. Four white rounded cards, ~45% screen width
    each, in a 2×2 grid with small gaps:

      CARD A (top-left) — TOTAL SPENT
        · teal-tinted circular badge with small wallet glyph
        · Mono caps label placeholder
        · LARGE bold number value rendered in TEAL #089BC3 —
          animates from "$0" at 1.0s up to "$13,847.20" by 3.0s
          (counter roll-up, steady rate, no easing).

      CARD B (top-right) — AVG / MONTH
        · grey-tinted circular badge with calendar glyph
        · Mono caps label placeholder
        · NAVY #0A3E8F number value placeholder — "$1,153.93" from
          frame 0, no animation.

      CARD C (bottom-left) — DOCUMENTS
        · pale-purple circular badge with document glyph
        · Mono caps label placeholder
        · PURPLE #6B6BFF number value placeholder — "247" from
          frame 0, no animation. Small grey subtext below ("247 total").

      CARD D (bottom-right) — REVIEWED
        · pale-green circular badge with shield-check glyph
        · Mono caps label placeholder
        · GREEN #4ADE80 number value placeholder — "247" from frame
          0, no animation. Small grey subtext below ("of 247").

  · "Monthly Spending Trends" section header: bold dark text.
  · subtitle: small grey text ("Tap a dot to inspect that month").
  · top of a line-chart visible at bottom (partially clipped) — faint
    light-blue curved line on a grid background, no data dots. Just
    a suggestion of a chart.

  · bottom tab bar: five tab slots, separator above. "Analytics" tab
    (4th from left) HIGHLIGHTED in teal #089BC3. Centre slot is the
    camera-button (dark-blue rounded square, white camera glyph,
    slightly raised). Other tabs (Home, Documents, AI Advisor) dimmed.

Action (timed):
  0.0s–1.0s — open on the locked top-down framing. Clean wood table,
              phone centred, full Analytics dashboard visible. All
              cards populated EXCEPT CARD A — Card A shows "$0" in
              teal. Hold.

  1.0s–3.0s — CARD A NUMBER COUNTS UP. Teal value rolls from "$0.00"
              to "$13,847.20" over 2.0 seconds. Steady counter, no
              bounce, no ease — clean rapid scroll. Digits change too
              fast to read individually until the final ~0.3s where
              the count slows to land on $13,847.20.

  3.0s–3.5s — once Card A lands, ALL FOUR CARDS pulse briefly in
              sequence (A → B → C → D), each pulse a quick brightness
              lift on the card's number value (~10% luminance bump
              over 100ms, then back). Cadence ~120ms between pulses.

  3.5s–8.0s — HOLD. Dashboard fully populated, all numbers visible,
              counter landed. The phone glows against the dimmed
              blue-hour kitchen. The very slow camera push-in
              continues, ending at ~0.55m above the table.

Mood: the quiet shock of seeing a year compressed onto one screen.
NOT celebratory — a "huh, that's actually a lot" beat. The viewer
should lean in.

Anti-patterns: NO face, NO body, NO hands (the phone is alone on the
table for the entire scene), NO glowing rim around the phone beyond
the natural screen-luminance bounce, NO particle effects, NO confetti,
NO Tron-line animations across the dashboard, NO floating data-card
pop-ups, NO Apple/Samsung/Google logos, NO animations on Card B/C/D
number values, NO bouncy ease on Card A's counter, NO comp'd text
strings (all readable text is post — Veo only renders the geometric
layout + Card A counter motion).`,
    postComp: {
      text: [
        { time: 'on phone screen throughout', content: 'Analytics title + "2026 Honda Civic" subtitle + vehicle pill + Spending/Maintenance toggle + This Year filter pills', style: 'See SCENES[4] in script for full strings + sizes' },
        { time: 'on phone screen throughout', content: 'Card values: TOTAL SPENT $13,847.20 (teal, count-up via Veo) · AVG/MONTH $1,153.93 (navy) · DOCUMENTS 247 (purple, "247 total" subtext) · REVIEWED 247 (green, "of 247" subtext)', style: 'Bold ~80px values, Mono caps ~26px labels' },
        { time: '4.5s editorial overlay above phone', content: '$8,407 in deductions I would\'ve missed.', style: 'Inter Medium 96px paper #FAFAF7 with slight drop shadow, centered upper-third, fades in over 0.4s' },
        { time: '6.0s editorial overlay below phone', content: 'Real $/hr last year: $14\nReal $/hr this year: $19', style: 'Inter Medium 64px cream + teal #089BC3 highlight on "$19", stacked vertical, lines land 0.2s apart' },
      ],
      audio: [
        '1.0s–3.0s — subtle music build during the counter, escalating tension',
        '3.0s — resolving downbeat on the counter landing',
        '4.5s — soft chime SFX with first text overlay',
        '6.0s — softer second chime with second text overlay',
        '3.5s onward — sustained holding chord',
      ],
    },
  },

  /* ─── Scene 6 — THE EXHALE (the close, the face reveal) ────────────────── */
  {
    id: '06-exhale',
    title: 'The exhale',
    arc: 'Close — face reveal + small smirk + logo fade',
    duration: 6,
    prompt: `${SET_BIBLE}

SCENE 6 — THE EXHALE

Vertical 9:16 aspect ratio. 6-second shot. THIS SCENE CONTAINS ONE
INTERNAL CUT at 1.7s, from top-down to mid-shot. (Deliberate
exception to the one-shot rule used in scenes 1–5.)

PART A — 0.0s to 1.7s — TOP-DOWN HAND-LIFT (continuation of scene 5):

  Shot type: identical locked top-down framing from end of scene 5.
  Camera at ~0.55m above the table. Clean walnut, phone in centre,
  blue-hour cool ambient light. Post-comp text overlays from scene 5
  ($8,407 deductible / Real $/hr $14 → $19) remain visible — they
  HOLD into scene 6 to bridge the two scenes.

  Action:
    0.0s–0.5s — static frame. Same as scene 5's closing.
    0.5s–1.3s — dark-grey-hoodie forearm enters from frame right.
                Hand reaches over the phone, fingers close gently
                around the long edges. Phone is LIFTED — hand carries
                it up and out of the top-down frame, exiting frame
                right. As the phone leaves, the post-comp text
                overlays gently fade out (handled in post).
    1.3s–1.7s — empty top-down frame. Just bare walnut. Hold for
                the half-beat. The kitchen is quiet.

PART B — 1.7s to 6.0s — HARD CUT to MID-SHOT, the FACE:

  CUT. New camera position: front-on mid-shot of the driver, framed
  from mid-chest to just above the top of the head. Camera at the
  driver's eye-level, ~1.2m away. 9:16 vertical framing. 3/4 angle —
  the driver is turned ~15° to the camera's right (NOT fully frontal).

  THE DRIVER (per set bible face description):
    · mid-30s male, light-olive skin matching the hands we saw
    · light short beard, neatly trimmed
    · dark eyes
    · short dark hair, slightly messy from a long day
    · wearing the same dark grey hoodie, hood down, zip half-up
    · seated at the same kitchen table (sliver of walnut visible
      in lower-left foreground, slightly out of focus)

  THE PHONE in his hand:
    · same matte graphite unbranded smartphone, per set bible
    · held in his right hand at chest level, ~30cm in front of him,
      screen facing him (away from camera — we see the back of the
      phone or the side edge, NOT the screen)
    · the phone screen's GLOW is the dominant light source on his
      face — a cool teal/blue cast lights his face from below,
      strongest on his chin and the underside of his cheekbones,
      fading toward the top of his head

  LIGHTING:
    · primary key: the phone screen glow from below, cool teal
      #089BC3-tinted, gentle (~150 lux equivalent at his face)
    · ambient fill: cool blue-hour ambient from a window off-frame
      to his left (camera's right) — soft, ~2 stops below the phone
      glow, gives shape to the right side of his face
    · the room behind him is dim — early evening, no interior lights
      on. Suggestion of a wall and a cabinet edge, heavily defocused.
    · NO overhead light, NO ring light, NO sunset-window cliché, NO
      key from the upper-front (the phone screen is the only "key").

  Action (timed from the cut at 1.7s):
    1.7s–2.5s — the driver is looking DOWN at the phone screen. Face
                calm-but-tired. Eyes scanning — micro-movements of
                the eyeballs as he reads dashboard numbers (no eye
                animation needed beyond natural settle). Mouth closed,
                relaxed.
    2.5s–3.5s — beat. He processes. No movement. Slow blink.
    3.5s–4.3s — THE EXHALE. Shoulders drop ~1cm. Barely-audible breath
                out through his nose. Eyebrows lift ~5% — smallest
                possible "huh, okay" gesture. Corner of his mouth
                lifts ~3mm on the camera-facing side — a quiet smirk,
                NOT a smile. He does not laugh. He does not nod
                emphatically. He simply REGISTERS.
    4.3s–5.0s — eyes LIFT off the phone screen and look slightly off-
                camera (up and to camera's right, toward where the
                window is — toward "outside," toward "tomorrow's
                shift"). Expression holds: small smirk, eyes lifted,
                cool teal glow still on his chin.
    5.0s–6.0s — HOLD on the lifted-eyes expression. No further
                movement. The phone glow continues to light his chin
                from below. Scene ends here.

Mood: tired, relieved, ready. NOT triumphant. NOT smiling. He is a
working person who just figured out he has been underpaid by his
own bookkeeping for a year. He is not celebrating — he is RESOLVED.
Tomorrow's shift will be different.

Anti-patterns:
  · NO smile (the smirk is ~3mm, not teeth-showing)
  · NO laugh, NO chuckle, NO emphatic nod
  · NO fist-pump, NO chair-lean-back, NO arms-crossing
  · NO speaking, NO mouthed words, NO direct address to camera
  · NO upward sunbeam, NO golden-hour resurgence (blue hour holds)
  · NO secondary characters — he is alone in the kitchen
  · NO phone screen visible to the camera (only back/side; the
    glow is the only evidence)
  · NO Apple/Samsung/Google logos on the phone
  · NO branded merchandise visible (no hoodie logos, no kitchen
    appliances with readable logos)
  · NO logo wordmark overlay in the genai render (the wordmark is
    added in post — see comp section below)`,
    postComp: {
      text: [
        { time: '5.0s', content: 'CarFai\nDrive smarter.', style: 'Wordmark: "Car" in ink #0B0E13 Mono Medium + "Fai" in teal #089BC3 Mono Medium, ~88px combined. Tagline in slate2 Inter Regular 32px below. Fades in over 0.6s, lower third of frame, driver stays visible above the wordmark.' },
      ],
      audio: [
        '1.7s — sub-audible heartbeat thump in bass at the hard cut',
        '3.7s — soft exhale through the nose (record yourself, drop in)',
        '5.0s — music resolves to final sustained chord with the wordmark fade',
        '5.0s–6.0s — single soft brand-stinger or silence holds the close',
      ],
    },
  },
];

/* ─── Veo 2 generation ────────────────────────────────────────────────────── */

const VEO_MODEL = 'veo-2.0-generate-001';
const VEO_PRICE_PER_SECOND = 0.15; // ~midpoint of $0.10–0.20/s

async function generateScene(ai, scene) {
  const aspectRatio = '9:16';
  const durationSeconds = scene.duration;

  console.log(`  → Calling Veo: ${scene.id} (${durationSeconds}s, ${aspectRatio})...`);

  let operation = await ai.models.generateVideos({
    model: VEO_MODEL,
    prompt: scene.prompt,
    config: {
      aspectRatio,
      numberOfVideos: 1,
      durationSeconds,
      // Allow adult faces — scene 6 needs this. Veo defaults to
      // disallowing person generation otherwise.
      personGeneration: 'allow_adult',
    },
  });

  // Poll until done. Veo operations typically take 1–5 minutes.
  const startedAt = Date.now();
  const MAX_WAIT_MS = 10 * 60 * 1000; // 10 minute safety cap

  while (!operation.done) {
    if (Date.now() - startedAt > MAX_WAIT_MS) {
      throw new Error(`Operation timed out after ${MAX_WAIT_MS / 1000}s`);
    }
    process.stdout.write('.');
    await new Promise((r) => setTimeout(r, 10_000));
    operation = await ai.operations.getVideosOperation({ operation });
  }
  process.stdout.write('\n');

  const videos = operation.response?.generatedVideos ?? [];
  if (videos.length === 0) {
    throw new Error(`No video returned. Response: ${JSON.stringify(operation.response)}`);
  }

  // Download the first (only) generated video to disk.
  const outFile = join(OUT, `${scene.id}.mp4`);
  await ai.files.download({
    file: videos[0].video,
    downloadPath: outFile,
  });

  return outFile;
}

/* ─── Manifest writer (human-readable summary of the run) ────────────────── */

function writeManifest(scenes, results) {
  const lines = [];
  lines.push('# CarFai TikTok — generation manifest');
  lines.push('');
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push('');
  lines.push('## Scenes');
  lines.push('');
  lines.push('| # | Scene | Duration | Status | File |');
  lines.push('|---|---|---|---|---|');
  for (const scene of scenes) {
    const result = results[scene.id];
    const status = result?.ok ? '✓' : result?.error ? '✖' : '—';
    const file = result?.file ? `\`${scene.id}.mp4\`` : (result?.error ?? '—');
    lines.push(`| ${scene.id.split('-')[0]} | ${scene.title} | ${scene.duration}s | ${status} | ${file} |`);
  }

  const totalDuration = scenes.reduce((sum, s) => sum + s.duration, 0);
  const estimatedCost = (totalDuration * VEO_PRICE_PER_SECOND).toFixed(2);
  lines.push('');
  lines.push(`**Total duration**: ${totalDuration}s`);
  lines.push(`**Estimated Veo cost (this run)**: ~$${estimatedCost}`);
  lines.push('');
  lines.push('## Post-production');
  lines.push('');
  lines.push('1. Stitch the 6 mp4 clips in order in any NLE (CapCut / Premiere / DaVinci)');
  lines.push('2. Add per-scene text overlays — see `docs/TIKTOK_PRODUCTION.md` for exact strings, fonts, timing');
  lines.push('3. Add music + sound design — Veo 2 generates silent video; all audio is post');
  lines.push('4. Export 9:16 vertical at TikTok-recommended specs (H.264, 1080×1920 minimum)');
  lines.push('');
  lines.push('## Regenerate a single scene');
  lines.push('');
  lines.push('```');
  lines.push('npm run gen:tiktok -- --scene 3');
  lines.push('```');
  lines.push('');

  writeFileSync(join(OUT, 'MANIFEST.md'), lines.join('\n'));
}

/* ─── Main ───────────────────────────────────────────────────────────────── */

const { dryRun, only } = parseArgs();
const scenesToRun = only
  ? SCENES.filter((_, i) => only.includes(i + 1))
  : SCENES;

console.log(`\n  CarFai TikTok generator\n`);

const totalDuration = scenesToRun.reduce((sum, s) => sum + s.duration, 0);
const estimatedCost = (totalDuration * VEO_PRICE_PER_SECOND).toFixed(2);
console.log(`  Scenes to generate: ${scenesToRun.length} (${scenesToRun.map((s) => s.id.split('-')[0]).join(', ')})`);
console.log(`  Total duration:     ${totalDuration}s`);
console.log(`  Estimated cost:     ~$${estimatedCost} (Veo 2 @ $${VEO_PRICE_PER_SECOND}/s, single attempt — multiply by retry count)\n`);

if (dryRun) {
  console.log(`  --dry-run: printing first 500 chars of each prompt and exiting.\n`);
  for (const scene of scenesToRun) {
    console.log(`  ─── ${scene.id} (${scene.title}) ─── ${scene.duration}s`);
    console.log(`  Arc: ${scene.arc}`);
    console.log(`  Prompt preview: ${scene.prompt.slice(0, 500).replace(/\n/g, '\n  ')}...`);
    console.log('');
  }
  process.exit(0);
}

mkdirSync(OUT, { recursive: true });
const ai = new GoogleGenAI({ apiKey: API_KEY });
const results = {};

for (const scene of scenesToRun) {
  console.log(`  ─── ${scene.id} (${scene.title}) ───`);
  try {
    const file = await generateScene(ai, scene);
    results[scene.id] = { ok: true, file };
    console.log(`  ✓ Wrote ${file.replace(ROOT + '/', '').replace(/\\/g, '/')}\n`);
  } catch (err) {
    results[scene.id] = { ok: false, error: err.message };
    console.error(`  ✖ ${scene.id} failed: ${err.message}\n`);
  }
}

writeManifest(scenesToRun, results);
console.log(`  ✓ Manifest written to output/tiktok/MANIFEST.md\n`);
console.log(`  Next: review the clips, regenerate failures with --scene N, then edit in your NLE.\n`);
