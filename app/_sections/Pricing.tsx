/**
 * Section 6 — Pricing.
 * Motion: sticky-stack via Tailwind `sticky` positioning. Each card
 * holds while the next slides over. Lighter footprint than a
 * full GSAP timeline and works reliably across mobile webviews.
 *
 * Recommended tier (Max) gets the only teal accent — no "Most Popular"
 * ribbon hack.
 */
const tiers = [
  {
    name:    'Free',
    price:   '$0',
    cadence: 'forever',
    body:    'Add 1 vehicle. Scan up to 50 documents a year. Basic analytics.',
    cta:     'Start free',
    accent:  false,
  },
  {
    name:    'Starter',
    price:   '$8.99',
    cadence: '/ month',
    body:    'Up to 3 vehicles. Detailed analytics. Document exports. No AI Advisor.',
    cta:     'Choose Starter',
    accent:  false,
  },
  {
    name:    'Max',
    price:   '$19.99',
    cadence: '/ month',
    body:    'Everything in Starter, plus the AI Advisor with vehicle valuation, OBD2 reasoning, and detailed analysis.',
    cta:     'Choose Max',
    accent:  true,
    note:    'Recommended for individual owners',
  },
  {
    name:    'Pro',
    price:   '$49.99',
    cadence: '/ month',
    body:    'Up to 50 vehicles. Team roles. Org-wide analytics. Fleet-grade advisor with multi-vehicle Q&A.',
    cta:     'Choose Pro',
    accent:  false,
  },
  {
    name:    'Fleet',
    price:   '$99',
    cadence: '/ month',
    body:    'Up to 200 vehicles. Driver vs manager scope. Cost leaderboards. Per-period accountant exports.',
    cta:     'Choose Fleet',
    accent:  false,
  },
];

export function Pricing() {
  return (
    <section id="start" className="bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <p className="font-mono text-xs uppercase tracking-widest text-slate2 mb-8">
          Pricing
        </p>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-ink max-w-3xl leading-[1.1]">
          One price ladder. Pick the rung you actually need.
        </h2>
        <p className="mt-6 text-lg text-slate2 max-w-prose leading-relaxed">
          Free is genuinely free — no trial timer. Every paid tier
          rolls leftover tokens to the next month so a slow month
          isn&apos;t wasted.
        </p>
      </div>

      {/* sticky-stack: each card pins as the next scrolls in over it */}
      <div className="mx-auto max-w-6xl px-6 pb-32 space-y-6 md:space-y-10">
        {tiers.map((t, i) => (
          <article
            key={t.name}
            className="sticky rounded-3xl border border-rule bg-paper p-8 md:p-14 grid md:grid-cols-[1fr_auto] gap-8 items-start shadow-[0_1px_0_rgba(11,14,19,0.04)]"
            style={{
              top: `${72 + i * 16}px`,
              // staggered top offset = each card rests slightly below the
              // previous one's sticky position, producing the "stack" look.
            }}
          >
            <div>
              <div className="flex items-baseline gap-3 mb-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-ink">
                  {t.name}
                </h3>
                {t.accent && (
                  <span className="text-xs uppercase tracking-widest font-mono text-accent">
                    {t.note}
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-2 mb-5">
                <span className="text-4xl md:text-5xl font-medium text-ink">
                  {t.price}
                </span>
                <span className="text-base text-slate2">{t.cadence}</span>
              </div>
              <p className="text-base md:text-lg text-slate2 leading-relaxed max-w-prose">
                {t.body}
              </p>
            </div>

            <a
              href="#"
              className={
                'shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-colors ' +
                (t.accent
                  ? 'bg-accent text-white hover:bg-accentDeep'
                  : 'bg-ink text-paper hover:bg-accentDeep')
              }
            >
              {t.cta}
              <span aria-hidden>→</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
