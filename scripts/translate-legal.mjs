/**
 * scripts/translate-legal.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Translates the 7 legal markdown docs in content/legal/en/ into
 * fr/es/ar via the Gemini API.
 *
 * Output structure:
 *   content/legal/en/<slug>.md  (source, untouched)
 *   content/legal/fr/<slug>.md  (translated)
 *   content/legal/es/<slug>.md  (translated)
 *   content/legal/ar/<slug>.md  (translated)
 *
 * Each non-English file gets an "AI-translated, English prevails"
 * banner injected at the top.
 *
 * Run:
 *   npm run gen:legal-translations
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { GoogleGenAI } from '@google/genai';
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname  = dirname(fileURLToPath(import.meta.url));
const ROOT       = join(__dirname, '..');
const LEGAL_DIR  = join(ROOT, 'content', 'legal');
const EN_DIR     = join(LEGAL_DIR, 'en');

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
  fr: { name: 'French (France / Quebec — neutral)',  banner: '> ⚠ Cette traduction est générée par IA et fournie à titre informatif uniquement. La version anglaise officielle prévaut en cas de divergence.' },
  es: { name: 'Spanish (international / neutral)',   banner: '> ⚠ Esta traducción se ha generado mediante IA y se ofrece únicamente con fines informativos. La versión oficial en inglés prevalece en caso de discrepancia.' },
  ar: { name: 'Arabic (Modern Standard / RTL)',      banner: '> ⚠ هذه ترجمة مُولَّدة بواسطة الذكاء الاصطناعي ومتاحة لأغراض إعلامية فقط. النسخة الإنجليزية الرسمية هي المعتمدة عند وجود أي اختلاف.' },
};

const ai = new GoogleGenAI({ apiKey: API_KEY });

function systemPrompt(targetName) {
  return `You are a senior legal-document translator. Translate the markdown legal document from English into ${targetName}.

STRICT RULES — non-negotiable:

1. Output the COMPLETE translated markdown. No preamble, no
   markdown code fences wrapping the output, no commentary.

2. Preserve every markdown feature EXACTLY: headings (# / ## / ###),
   bullet (-) and numbered (1.) lists with their indentation,
   tables with pipes and dashes, links [text](url) — translate
   only the text, leave URLs alone — inline code, fenced code,
   bold/italic emphasis, blockquotes (>), horizontal rules ---,
   hard line breaks.

3. DO NOT translate these terms — keep them in English exactly:
   CarFai, CARFAI, OBD2, AI Advisor, App Store, Google Play,
   Apple, Google, Microsoft, Bluetooth, GDPR, Quebec Law 25,
   AAA, JAMS, Anthropic, Supabase, Sentry, PostHog, RevenueCat.

4. Preserve URLs and email addresses verbatim.

5. Preserve every [JURISDICTION-SPECIFIC: ...] lawyer marker
   verbatim — translate the explanatory text inside but keep
   the brackets and the "JURISDICTION-SPECIFIC:" tag.

6. Preserve every [FOR US USERS] / [FOR EU/UK USERS] /
   [CONSUMERS WORLDWIDE] jurisdiction marker verbatim.

7. Preserve dates exactly (2026-05-20). Preserve currency
   formatting ($50, CAD 40,000).

8. For Arabic: Modern Standard Arabic. No LTR override marks
   (the page already sets dir="rtl"). Western digits 0–9.

9. Tone: formal, precise legal target language. No casual register.

Return the FULL translated markdown body only.`;
}

async function translateFile(slug, target) {
  const meta = TARGETS[target];
  const src  = readFileSync(join(EN_DIR, `${slug}.md`), 'utf-8');

  console.log(`    → ${slug}.md (${target})...`);

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-pro',
    contents: [
      { role: 'user', parts: [{ text: 'English markdown source:\n\n' + src }] },
    ],
    config: {
      systemInstruction: systemPrompt(meta.name),
      temperature: 0.2,
    },
  });

  let raw = response.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  if (!raw) {
    console.error(`    ✖ ${slug}.md (${target}): empty response`);
    return false;
  }

  raw = raw.replace(/^```(?:markdown|md)?\n?/m, '').replace(/\n```\s*$/m, '');
  const out = meta.banner + '\n\n' + raw.trim() + '\n';

  const outPath = join(LEGAL_DIR, target, `${slug}.md`);
  writeFileSync(outPath, out, 'utf-8');
  const sizeKb = (Buffer.byteLength(out) / 1024).toFixed(1);
  console.log(`    ✓ ${outPath} (${sizeKb} KB)`);
  return true;
}

const slugs = readdirSync(EN_DIR)
  .filter((f) => f.endsWith('.md'))
  .map((f) => f.replace(/\.md$/, ''));

console.log(`\n  Translating ${slugs.length} legal docs × ${Object.keys(TARGETS).length} locales = ${slugs.length * Object.keys(TARGETS).length} files\n`);

let ok = 0;
let total = 0;
for (const target of Object.keys(TARGETS)) {
  console.log(`\n  ── ${target} (${TARGETS[target].name}) ──`);
  for (const slug of slugs) {
    total++;
    try {
      if (await translateFile(slug, target)) ok++;
    } catch (err) {
      console.error(`    ✖ ${slug}.md (${target}): ${err.message}`);
    }
  }
}
console.log(`\n  Done. ${ok}/${total} files translated.\n`);
