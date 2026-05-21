/**
 * One-off helper: retry a single (slug, locale) pair from the legal
 * translation pipeline. Useful when a flake drops a file in the
 * bulk run.
 *
 *   node scripts/translate-legal-one.mjs <slug> <locale>
 *   # e.g. node scripts/translate-legal-one.mjs cookies fr
 *
 * Mirrors translate-legal.mjs prompt + banner verbatim.
 */

import { GoogleGenAI } from '@google/genai';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = join(__dirname, '..');
const LEGAL_DIR = join(ROOT, 'content', 'legal');

const envPath = join(ROOT, '.env.local');
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const [, , slug, target] = process.argv;
if (!slug || !target) {
  console.error('Usage: node scripts/translate-legal-one.mjs <slug> <locale>');
  process.exit(1);
}

const TARGETS = {
  fr: { name: 'French (France / Quebec — neutral)',  banner: '> ⚠ Cette traduction est générée par IA et fournie à titre informatif uniquement. La version anglaise officielle prévaut en cas de divergence.' },
  es: { name: 'Spanish (international / neutral)',   banner: '> ⚠ Esta traducción se ha generado mediante IA y se ofrece únicamente con fines informativos. La versión oficial en inglés prevalece en caso de discrepancia.' },
  ar: { name: 'Arabic (Modern Standard / RTL)',      banner: '> ⚠ هذه ترجمة مُولَّدة بواسطة الذكاء الاصطناعي ومتاحة لأغراض إعلامية فقط. النسخة الإنجليزية الرسمية هي المعتمدة عند وجود أي اختلاف.' },
};
const meta = TARGETS[target];
if (!meta) { console.error(`Unknown locale: ${target}`); process.exit(1); }

const src = readFileSync(join(LEGAL_DIR, 'en', `${slug}.md`), 'utf-8');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const systemPrompt = `You are a senior legal-document translator. Translate the markdown legal document from English into ${meta.name}.

Preserve markdown features (headings, lists, tables, links, code, emphasis, blockquotes, hr) exactly. DO NOT translate brand terms (CarFai, OBD2, AI Advisor, App Store, Google Play, Apple, Google, Microsoft, Bluetooth, GDPR). Preserve URLs and email addresses. Preserve [JURISDICTION-SPECIFIC: ...] markers verbatim. Preserve dates (2026-05-20) and currency formatting ($50). For Arabic: Modern Standard, Western digits.

Return the FULL translated markdown body only — no code fences, no commentary.`;

console.log(`  → ${slug}.md (${target}) one-off retry...`);

const response = await ai.models.generateContent({
  model: 'gemini-2.5-pro',
  contents: [{ role: 'user', parts: [{ text: 'English markdown source:\n\n' + src }] }],
  config: { systemInstruction: systemPrompt, temperature: 0.2 },
});

let raw = response.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
if (!raw) { console.error('  ✖ empty response'); process.exit(1); }

raw = raw.replace(/^```(?:markdown|md)?\n?/m, '').replace(/\n```\s*$/m, '');
const out = meta.banner + '\n\n' + raw.trim() + '\n';

const outPath = join(LEGAL_DIR, target, `${slug}.md`);
writeFileSync(outPath, out, 'utf-8');
console.log(`  ✓ ${outPath} (${(Buffer.byteLength(out)/1024).toFixed(1)} KB)`);
