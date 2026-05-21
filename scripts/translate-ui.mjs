/**
 * scripts/translate-ui.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Translates messages/en.json into messages/{fr,es,ar}.json using the
 * Gemini API. Marketing-quality first draft; founder polishes per
 * locale.
 *
 * Strategy:
 *   - Send the whole en.json + a strict system prompt per locale
 *   - Use JSON response mode so we get parse-safe output
 *   - Preserve: JSON structure, all keys, interpolation placeholders
 *     ({year} etc.), HTML tags inside values (<strong>, <em>, <br>),
 *     smart quotes, brand-specific terms (CarFai, OBD2, AI Advisor,
 *     CARFAI)
 *   - Currency values stay in USD (the site is locked to USD as a
 *     reference per the en.json copy itself)
 *
 * Run:
 *   npm run gen:translations
 *   # → writes messages/{fr,es,ar}.json
 *
 * Re-runnable. Each locale is independent — failure on one doesn't
 * stop the others.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { GoogleGenAI } from '@google/genai';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT     = join(__dirname, '..');
const MSG_DIR  = join(ROOT, 'messages');

// Reuse the same .env.local the hero generator uses.
const envPath = join(ROOT, '.env.local');
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error('\n  ✖ GEMINI_API_KEY not set in .env.local\n');
  process.exit(1);
}

const TARGETS = {
  fr: { name: 'French (France / Quebec — neutral)',  rtl: false },
  es: { name: 'Spanish (international / neutral)',   rtl: false },
  ar: { name: 'Arabic (Modern Standard / RTL)',      rtl: true  },
};

const ai = new GoogleGenAI({ apiKey: API_KEY });

const enPath = join(MSG_DIR, 'en.json');
const en     = JSON.parse(readFileSync(enPath, 'utf-8'));

function systemPrompt(targetName, isRtl) {
  return `You are a senior marketing-copy translator. Translate the JSON values from English into ${targetName}.

STRICT RULES — non-negotiable:

1. Output JSON ONLY. Same structure as the input. Same keys (do NOT translate keys). Translate ONLY string values.

2. Preserve EVERY interpolation placeholder verbatim. Examples: {year}, {count}, {locale}. They stay in English curly braces, exact case.

3. Preserve every HTML tag inside values verbatim. Examples: <strong>...</strong>, <em>...</em>, <br />. Translate the text BETWEEN the tags only.

4. DO NOT translate these brand / product terms — keep them in English exactly as written:
   CarFai, CARFAI, OBD2, AI Advisor, App Store, Google Play,
   AutoTrader.ca, Apple, Google, Microsoft, Bluetooth,
   Eastern Time, USD, ELM327, Veepeak, Vgate iCar, OBDLink MX+,
   "Detailed Analysis" (when referring to the feature),
   "Overall Score" (when referring to the score),
   "Token Pack", "AI Actions Remaining"

5. Currency values stay in USD. Do NOT convert "$8.99" to "€8.99" or
   any other currency. The string is a reference price; localized
   pricing happens in the app store.

6. Preserve typographic punctuation as written (em-dashes —,
   ellipses …, curly quotes “ ” ‘ ’, the operators × ÷ ± + −,
   bullet · and middle dot characters).

7. Marketing tone: editorial, restrained, premium. Match Stripe /
   Linear / Apple voice in the target language. Do not pad. Do not
   moralize. Keep sentences tight.

${isRtl ? '8. For Arabic specifically: use Modern Standard Arabic. Standard right-to-left script. Do NOT add LTR override marks; the page already sets dir="rtl".\n\n' : ''}9. If a string is intentionally a short label (eyebrow / button /
   table-header) keep the translation short to match the visual
   weight.

10. Return the ENTIRE JSON. No commentary, no preamble, no markdown
    code fences. Just the JSON object.`;
}

async function translateLocale(target) {
  const meta = TARGETS[target];
  console.log(`  → ${target} (${meta.name})...`);

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-pro',
    contents: [
      { role: 'user', parts: [{ text: 'Source JSON (English):\n\n' + JSON.stringify(en, null, 2) }] },
    ],
    config: {
      systemInstruction: systemPrompt(meta.name, meta.rtl),
      responseMimeType: 'application/json',
      temperature: 0.3, // low to keep terminology consistent
    },
  });

  const raw = response.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  if (!raw) {
    console.error(`  ✖ ${target}: empty response`);
    return false;
  }

  let translated;
  try {
    translated = JSON.parse(raw);
  } catch (err) {
    console.error(`  ✖ ${target}: failed to parse model output as JSON`);
    console.error('     first 200 chars:', raw.slice(0, 200));
    return false;
  }

  // Sanity: the keys should match en.json exactly. Catch any
  // missing-namespace or key-drift before writing.
  for (const ns of Object.keys(en)) {
    if (!(ns in translated)) {
      console.error(`  ✖ ${target}: missing namespace "${ns}" in model output`);
      return false;
    }
  }

  const outPath = join(MSG_DIR, `${target}.json`);
  writeFileSync(outPath, JSON.stringify(translated, null, 2) + '\n', 'utf-8');
  const sizeKb = (Buffer.byteLength(JSON.stringify(translated)) / 1024).toFixed(1);
  console.log(`  ✓ Wrote ${outPath} (${sizeKb} KB)`);
  return true;
}

console.log(`\n  Translating messages/en.json → fr / es / ar\n`);
let okCount = 0;
for (const target of Object.keys(TARGETS)) {
  try {
    if (await translateLocale(target)) okCount++;
  } catch (err) {
    console.error(`  ✖ ${target}: ${err.message}`);
  }
}
console.log(`\n  Done. ${okCount}/${Object.keys(TARGETS).length} locales translated.\n`);
