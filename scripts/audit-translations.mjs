/**
 * scripts/audit-translations.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Surfaces translation drift across messages/{en,fr,es,ar}.json:
 *   - Placeholder mismatch ({year} dropped or renamed)
 *   - HTML tag mismatch (<strong>, <em>, <br />)
 *   - Brand terms lost (CarFai, OBD2, AI Advisor, App Store, Google Play)
 *   - Currency drift ($X.XX prices changed)
 *   - Suspect "untranslated" keys (value identical to EN in a non-EN locale)
 *
 * Read-only; emits a report. Run before any per-locale review.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MSG = join(__dirname, '..', 'messages');

const d = {
  en: JSON.parse(readFileSync(join(MSG, 'en.json'), 'utf-8')),
  fr: JSON.parse(readFileSync(join(MSG, 'fr.json'), 'utf-8')),
  es: JSON.parse(readFileSync(join(MSG, 'es.json'), 'utf-8')),
  ar: JSON.parse(readFileSync(join(MSG, 'ar.json'), 'utf-8')),
};

function flat(o, prefix = '', out = {}) {
  for (const k of Object.keys(o)) {
    const full = prefix ? `${prefix}.${k}` : k;
    if (typeof o[k] === 'object' && o[k] !== null) flat(o[k], full, out);
    else out[full] = o[k];
  }
  return out;
}

const F = { en: flat(d.en), fr: flat(d.fr), es: flat(d.es), ar: flat(d.ar) };
const issues = [];

const PLACEHOLDER  = /\{[^}]+\}/g;
const HTML_TAG     = /<\/?\w[^>]*>/g;
const PRICE        = /\$\d[\d.,]*/g;
const BRANDS       = ['CarFai', 'OBD2', 'AI Advisor', 'App Store', 'Google Play'];

// Keys we intentionally allow to be unchanged across locales (brand
// names, single-symbol punctuation, short codes that translate to
// themselves).
const ALLOW_IDENTICAL = new Set([
  'StoreBadges.appleLabel',
  'StoreBadges.googleLabel',
  'Valuation.statValue',
  'Valuation.factor1Delta',
  'Valuation.factor2Delta',
  'Valuation.factor3Delta',
  'Valuation.factor4Delta',
  'PricingSection.tier1Price',
  'PricingSection.tier2Price',
  'PricingSection.tier3Price',
  'PricingSection.tier4Price',
  'PricingSection.tier5Price',
  'PricingPage.multi10',
]);

for (const k of Object.keys(F.en)) {
  const en = F.en[k];

  for (const loc of ['fr', 'es', 'ar']) {
    const v = F[loc][k];
    if (v === undefined) continue;

    // placeholder check
    const enPH = (en.match(PLACEHOLDER) || []).sort().join(',');
    const vPH  = (v.match(PLACEHOLDER)  || []).sort().join(',');
    if (enPH !== vPH) {
      issues.push(`PLACEHOLDER  [${loc}] ${k}  en=${enPH || '∅'}  vs  ${loc}=${vPH || '∅'}`);
    }

    // html tag check
    const enT = (en.match(HTML_TAG) || []).sort().join(',');
    const vT  = (v.match(HTML_TAG)  || []).sort().join(',');
    if (enT !== vT) {
      issues.push(`HTML TAGS    [${loc}] ${k}  en=${enT || '∅'}  vs  ${loc}=${vT || '∅'}`);
    }

    // brand term check
    for (const b of BRANDS) {
      if (en.includes(b) && !v.includes(b)) {
        issues.push(`BRAND LOST   [${loc}] ${k}  missing "${b}"`);
      }
    }

    // price check
    const enP = (en.match(PRICE) || []).sort().join(',');
    const vP  = (v.match(PRICE)  || []).sort().join(',');
    if (enP && enP !== vP) {
      issues.push(`PRICE DRIFT  [${loc}] ${k}  en=${enP}  vs  ${loc}=${vP}`);
    }

    // suspect "untranslated" — value identical to EN in a non-EN
    // locale and longer than 3 chars
    if (v === en && en.length > 3 && !ALLOW_IDENTICAL.has(k)) {
      issues.push(`UNTRANSLATED [${loc}] ${k}  "${en.slice(0, 60)}"`);
    }
  }
}

console.log(`Total findings: ${issues.length}\n`);

// group by type for readability
const grouped = {};
for (const i of issues) {
  const type = i.split(' ')[0];
  (grouped[type] ||= []).push(i);
}
for (const type of Object.keys(grouped)) {
  console.log(`── ${type} (${grouped[type].length}) ──`);
  for (const x of grouped[type].slice(0, 30)) console.log('  ' + x);
  if (grouped[type].length > 30) console.log(`  ... ${grouped[type].length - 30} more`);
  console.log('');
}
