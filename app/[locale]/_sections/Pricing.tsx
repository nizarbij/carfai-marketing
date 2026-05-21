import { useTranslations } from 'next-intl';
import { Button } from '../_components/Button';
import { SectionIndex } from '../_components/SectionIndex';

/**
 * Section 8 — Pricing. Sticky-stack with the recommended tier
 * breaking the rhythm.
 *
 * Polish pass H2: the absolute ban "Identical card grids" applies to
 * pricing as much as to feature blocks — five identical sticky cards
 * read as template. The Max tier (tier 3 of 5) now:
 *   • sits on an accentMist wash (teal-on-cream) instead of bare paper
 *   • carries a 1px accent border instead of the standard rule border
 *   • runs a touch taller via extra vertical padding
 *   • carries the recommendation copy as a quiet kicker, not a ribbon
 *
 * The "Recommended for individual owners" copy is intentional rationale
 * (per the brand-register exception to the no-rationale ribbon ban),
 * so it stays — just no longer as a tracked-mono badge floating top-right.
 */
export function Pricing() {
  const t = useTranslations('PricingSection');

  const tiers = [
    { key: 1, name: t('tier1Name'), price: t('tier1Price'), cadence: t('tier1Cadence'), body: t('tier1Body'), cta: t('tier1Cta'), accent: false, note: null },
    { key: 2, name: t('tier2Name'), price: t('tier2Price'), cadence: t('tier2Cadence'), body: t('tier2Body'), cta: t('tier2Cta'), accent: false, note: null },
    { key: 3, name: t('tier3Name'), price: t('tier3Price'), cadence: t('tier3Cadence'), body: t('tier3Body'), cta: t('tier3Cta'), accent: true,  note: t('tier3Note') },
    { key: 4, name: t('tier4Name'), price: t('tier4Price'), cadence: t('tier4Cadence'), body: t('tier4Body'), cta: t('tier4Cta'), accent: false, note: null },
    { key: 5, name: t('tier5Name'), price: t('tier5Price'), cadence: t('tier5Cadence'), body: t('tier5Body'), cta: t('tier5Cta'), accent: false, note: null },
  ];

  return (
    <section id="start" className="bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionIndex number={8} label={t('eyebrow')} className="mb-10 md:mb-14" />
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-ink max-w-3xl leading-[1.1]">
          {t('h2')}
        </h2>
        <p className="mt-6 text-lg text-slate2 max-w-prose leading-relaxed">
          {t('body')}
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-32 space-y-6 md:space-y-10">
        {tiers.map((tier, i) => (
          <article
            key={tier.key}
            className={
              'sticky rounded-3xl border grid md:grid-cols-[1fr_auto] gap-8 items-start shadow-[0_1px_0_rgba(11,14,19,0.04)] ' +
              (tier.accent
                ? 'p-10 md:p-16 border-accent/30 bg-accentMist/40'
                : 'p-8 md:p-14 border-rule bg-paper')
            }
            style={{ top: `${72 + i * 16}px` }}
          >
            <div>
              {tier.accent && tier.note && (
                <p className="font-mono text-xs md:text-sm uppercase tracking-widest text-accentDeep mb-5">
                  {tier.note}
                </p>
              )}
              <div className="flex items-baseline gap-3 mb-4">
                <h3 className={(tier.accent ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl') + ' font-semibold text-ink'}>
                  {tier.name}
                </h3>
              </div>
              <div className="flex items-baseline gap-2 mb-5">
                <span className={(tier.accent ? 'text-5xl md:text-6xl' : 'text-4xl md:text-5xl') + ' font-medium text-ink'}>
                  {tier.price}
                </span>
                <span className="text-base text-slate2">{tier.cadence}</span>
              </div>
              <p className={(tier.accent ? 'text-lg md:text-xl' : 'text-base md:text-lg') + ' text-slate2 leading-relaxed max-w-prose'}>
                {tier.body}
              </p>
            </div>

            <Button
              href="#"
              variant={tier.accent ? 'accent' : 'ink'}
              size={tier.accent ? 'lg' : 'md'}
              className="shrink-0"
            >
              {tier.cta}
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
