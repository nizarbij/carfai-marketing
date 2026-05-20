/**
 * scripts/clean-legal-docs.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * One-shot scrub of the lawyer-draft legal markdown before launch.
 *
 * What it strips / replaces:
 *   - "v0 DRAFT — NOT FOR PUBLICATION" banners at the top of each file
 *   - [Effective Date]         → today's date (frozen below)
 *   - [CarFai Legal Entity]    → "CarFai" (user must rename when entity registers)
 *   - [Registered Address]     → "address available on request via the email below"
 *   - [Governing Law jurisdiction] → "Quebec, Canada" (default; lawyer can change)
 *   - `[Email: foo@bar]`       → `foo@bar` (drops the "Email:" label and code-tick)
 *   - Internal MD links        → site routes (PRIVACY_POLICY.md → /privacy, etc.)
 *   - "v0 (DRAFT)" revision rows → "v1" + today's date + "Initial publication"
 *
 * What it preserves:
 *   - [JURISDICTION-SPECIFIC: ...] blocks — these are substantive lawyer notes
 *     that need real legal review before going live, so they stay visible.
 *   - [FOR US USERS] / [FOR EU/UK USERS] tags — legitimate jurisdiction labels.
 *
 * Run once, then commit the cleaned content/legal/*.md files.
 *   node scripts/clean-legal-docs.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const LEGAL_DIR = join(__dirname, '..', 'content', 'legal');
const TODAY = '2026-05-20';

const MD_LINK_REWRITE = {
  'PRIVACY_POLICY.md':         '/privacy',
  'TERMS_OF_SERVICE.md':       '/terms',
  'EULA.md':                   '/eula',
  'AI_DISCLOSURE.md':          '/ai-disclosure',
  'COOKIE_POLICY.md':          '/cookies',
  'DPA.md':                    '/dpa',
  'ACCEPTABLE_USE_POLICY.md':  '/aup',
};

function scrub(src) {
  let s = src;

  // 1. Remove the v0 DRAFT banner block. Spans two blockquote lines + the
  //    trailing blank line. Use a non-greedy multi-line match.
  s = s.replace(
    /^> .*v0 DRAFT.*NOT FOR PUBLICATION.*\n> .*For status \+ placeholders\.\n\n/m,
    '',
  );
  // Defensive: a few variants used "lawyer review only" wording.
  s = s.replace(
    /^> .*v0 DRAFT.*\n> .*\n\n/m,
    '',
  );

  // 2. Effective + Last updated dates
  s = s.replace(/\[Effective Date\]/g, TODAY);

  // 3. Entity / address / jurisdiction placeholders
  s = s.replace(/\[CarFai Legal Entity\]/g, 'CarFai');
  s = s.replace(/\[Registered Address\]/g, 'address available on request via privacy@carfai.app');
  s = s.replace(/\[Governing Law jurisdiction\]/g, 'Quebec, Canada');
  s = s.replace(/\[Arbitration Forum: e\.g\., AAA\]/g, 'JAMS');

  // 4. `[Email: foo@bar]` → foo@bar (drop the code-tick + label wrapper)
  s = s.replace(/`\[Email:\s*([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+)\]`/g, '$1');

  // 5. Rewrite internal MD links to site routes
  for (const [md, route] of Object.entries(MD_LINK_REWRITE)) {
    s = s.replaceAll(md, route);
  }

  // 6. Revision-history rows — replace the v0 (DRAFT) row with v1 published
  s = s.replace(
    /\|\s*v0 \(DRAFT\)\s*\|.*\|.*\|/g,
    `| v1 | ${TODAY} | Initial publication. |`,
  );

  return s;
}

let touched = 0;
for (const file of readdirSync(LEGAL_DIR)) {
  if (!file.endsWith('.md')) continue;
  const path  = join(LEGAL_DIR, file);
  const src   = readFileSync(path, 'utf-8');
  const clean = scrub(src);
  if (clean === src) {
    console.log(`  · ${file}: no changes`);
    continue;
  }
  writeFileSync(path, clean);
  console.log(`  ✓ ${file}: scrubbed`);
  touched++;
}

console.log(`\n  ${touched}/${readdirSync(LEGAL_DIR).filter(f => f.endsWith('.md')).length} files updated.\n`);
