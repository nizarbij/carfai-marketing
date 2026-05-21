import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:       'Pricing',
  description: 'CarFai pricing — five tiers, from free for one car to fleet management at scale. Token rollover on every paid plan; no card required for the free tier.',
};

/* ─── Tier data ──────────────────────────────────────────────────────────── */

const tiers = [
  {
    name:     'Free',
    price:    '$0',
    cadence:  'forever',
    summary:  'Try CarFai with one car. Everything you need to scan documents and track basic spend.',
    cta:      'Start free',
    href:     '#',
    accent:   false,
  },
  {
    name:     'Starter',
    price:    '$8.99',
    cadence:  '/ month',
    summary:  'Up to 3 vehicles, detailed analytics, document exports. No AI Advisor.',
    cta:      'Choose Starter',
    href:     '#',
    accent:   false,
  },
  {
    name:     'Max',
    price:    '$19.99',
    cadence:  '/ month',
    summary:  'Everything in Starter + the AI Advisor with vehicle valuation, OBD2 reasoning, detailed analysis.',
    cta:      'Choose Max',
    href:     '#',
    accent:   true,
    note:     'Recommended for individual owners',
  },
  {
    name:     'Pro',
    price:    '$49.99',
    cadence:  '/ month',
    summary:  'Up to 50 vehicles. Team roles, org-wide analytics, fleet-grade multi-vehicle Q&A.',
    cta:      'Choose Pro',
    href:     '#',
    accent:   false,
  },
  {
    name:     'Fleet',
    price:    '$99',
    cadence:  '/ month',
    summary:  'Up to 200 vehicles. Driver vs manager scope, cost leaderboards, accountant-ready exports.',
    cta:      'Choose Fleet',
    href:     '#',
    accent:   false,
  },
];

/* ─── Feature comparison rows ────────────────────────────────────────────── */

type Cell = string | boolean;
interface Row { feature: string; values: [Cell, Cell, Cell, Cell, Cell]; }

const sections: { heading: string; rows: Row[] }[] = [
  {
    heading: 'Vehicles & documents',
    rows: [
      { feature: 'Vehicles',                values: ['1',   '3',     '5',     '50',    '200'] },
      { feature: 'Document scanning + AI extraction', values: [true, true, true, true, true] },
      { feature: 'Categorization (fuel / maintenance / insurance / …)', values: [true, true, true, true, true] },
      { feature: 'Document expiry tracking', values: [true, true, true, true, true] },
      { feature: 'CSV / Excel / PDF exports', values: [false, true, true, true, true] },
    ],
  },
  {
    heading: 'AI Advisor',
    rows: [
      { feature: 'Ask your car anything', values: [false, false, true, true, true] },
      { feature: 'Detailed Analysis',     values: [false, false, true, true, true] },
      { feature: 'Vehicle valuation',     values: [false, false, true, true, true] },
      { feature: 'OBD2 dashboard + reasoning', values: [false, false, true, true, true] },
      { feature: 'Multi-vehicle Q&A',     values: [false, false, false, '10 / query', '10 / query'] },
      { feature: 'Monthly AI tokens',     values: ['100K', '450K', '1.2M', '3M', '9M'] },
      { feature: 'Token rollover',        values: [false, true, true, true, true] },
    ],
  },
  {
    heading: 'Team & fleet',
    rows: [
      { feature: 'Org accounts',       values: [false, false, false, true, true] },
      { feature: 'Driver / manager / owner roles', values: [false, false, false, true, true] },
      { feature: 'Vehicle assignments', values: [false, false, false, true, true] },
      { feature: 'Cost leaderboards',  values: [false, false, false, true, true] },
      { feature: 'Per-period accountant exports', values: [false, false, false, true, true] },
    ],
  },
  {
    heading: 'Support',
    rows: [
      { feature: 'Email support',     values: [true, true, true, true, true] },
      { feature: 'Priority support',  values: [false, false, true, true, true] },
      { feature: 'Onboarding call',   values: [false, false, false, true, true] },
    ],
  },
];

/* ─── FAQ ────────────────────────────────────────────────────────────────── */

const faq = [
  {
    q: 'Is the free tier really free, with no trial timer?',
    a: 'Yes. The free tier is permanent — one vehicle, basic analytics, 50 scanned documents per year, no AI Advisor. No card on file.',
  },
  {
    q: 'What is a token, and what happens if I run out?',
    a: 'Tokens measure the AI work CarFai does on your behalf — scanning a receipt, answering an Advisor question, running a Detailed Analysis. Each plan ships a monthly bucket. If you do not use them in a month, leftover tokens roll over to the next month on every paid plan. If you exhaust them, you can buy a one-time Token Pack from the in-app settings or wait for the next monthly refill.',
  },
  {
    q: 'Can I switch tiers mid-month?',
    a: 'Yes — upgrades take effect immediately; downgrades take effect at the end of the current billing period. Token balances on paid tiers carry forward.',
  },
  {
    q: 'How does the 3-day free trial work?',
    a: 'Some paid tiers offer a 3-day trial. You get the full feature set for 3 days; cancel before the trial ends and you are not charged. The trial is enforced by Apple / Google per account, so it can only be used once per Apple ID or Google account.',
  },
  {
    q: 'Are prices the same worldwide?',
    a: 'No — prices are localized by Apple and Google to your region. The figures above are USD references; you will see your currency in-app.',
  },
  {
    q: 'How do I cancel?',
    a: 'Manage your subscription directly in the App Store (iOS) or Google Play (Android) — the same place you manage every other subscription on your device.',
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

function Check() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent/15 text-accent" aria-hidden>
      ✓
    </span>
  );
}

function Dash() {
  return <span className="text-slate2/40" aria-hidden>—</span>;
}

function cell(v: Cell) {
  if (v === true)  return <Check />;
  if (v === false) return <Dash />;
  return <span className="text-ink">{v}</span>;
}

export default function PricingPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-12 md:pt-28">
        <p className="font-mono text-sm uppercase tracking-widest text-slate2 mb-6">
          Pricing
        </p>
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-ink leading-[1.05] max-w-3xl">
          One ladder. Pick the rung you actually need.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-slate2 max-w-prose leading-relaxed">
          Free is genuinely free — no trial timer. Every paid plan rolls
          leftover tokens to the next month so a slow month is not wasted.
          Prices below in USD; in-app prices are localized.
        </p>
      </section>

      {/* ── Tier cards ── */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {tiers.map((t) => (
            <article
              key={t.name}
              className={
                'rounded-3xl border p-6 flex flex-col bg-paper ' +
                (t.accent
                  ? 'border-accent/40 shadow-[0_8px_30px_-15px_rgba(8,155,195,0.4)]'
                  : 'border-rule')
              }
            >
              <div className="flex items-baseline justify-between mb-3">
                <h2 className="text-xl font-semibold text-ink">{t.name}</h2>
                {t.accent && (
                  <span className="text-[10px] uppercase tracking-widest font-mono text-accent">
                    Recommended
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-medium text-ink">{t.price}</span>
                <span className="text-sm text-slate2">{t.cadence}</span>
              </div>
              <p className="text-sm text-slate2 leading-relaxed flex-1 mb-6">
                {t.summary}
              </p>
              <a
                href={t.href}
                className={
                  'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-medium text-sm transition-colors ' +
                  (t.accent
                    ? 'bg-accent text-white hover:bg-accentDeep'
                    : 'bg-ink text-paper hover:bg-accentDeep')
                }
              >
                {t.cta} →
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* ── Comparison table ── */}
      <section className="bg-paperDeep/60 border-y border-rule">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-ink mb-3">
            Every feature, side by side.
          </h2>
          <p className="text-base md:text-lg text-slate2 max-w-prose mb-12">
            What you get on each plan. Everything in a lower tier is
            included in the tier above it.
          </p>

          {sections.map((section) => (
            <div key={section.heading} className="mb-12">
              <h3 className="font-mono text-sm uppercase tracking-widest text-accent mb-4">
                {section.heading}
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-rule bg-paper">
                <table className="w-full text-sm">
                  <thead className="bg-paperDeep/60">
                    <tr>
                      <th className="text-left px-5 py-3 font-semibold text-ink">Feature</th>
                      {tiers.map((t) => (
                        <th key={t.name} className={'px-3 py-3 text-center font-semibold ' + (t.accent ? 'text-accent' : 'text-ink')}>
                          {t.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.rows.map((row, i) => (
                      <tr key={row.feature} className={i % 2 ? 'bg-paperDeep/30' : ''}>
                        <td className="px-5 py-3 text-ink">{row.feature}</td>
                        {row.values.map((v, j) => (
                          <td key={j} className="px-3 py-3 text-center">{cell(v)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="mx-auto max-w-3xl px-6 py-24 md:py-32">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-ink mb-12">
          Common questions.
        </h2>
        <dl className="space-y-10">
          {faq.map((qa) => (
            <div key={qa.q}>
              <dt className="text-lg md:text-xl font-medium text-ink mb-3 leading-snug">
                {qa.q}
              </dt>
              <dd className="text-base md:text-lg text-slate2 leading-relaxed">
                {qa.a}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 pt-10 border-t border-rule text-sm text-slate2">
          Still have questions?{' '}
          <Link href="/support" className="text-accent underline underline-offset-2 hover:no-underline">
            Contact support
          </Link>
          {' '}or email{' '}
          <a href="mailto:carfai.info@gmail.com" className="text-accent underline underline-offset-2 hover:no-underline">
            carfai.info@gmail.com
          </a>.
        </div>
      </section>
    </>
  );
}
