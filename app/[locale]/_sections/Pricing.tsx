import { useTranslations } from 'next-intl';

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
        <p className="font-mono text-base uppercase tracking-widest text-slate2 mb-8">
          {t('eyebrow')}
        </p>
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
            className="sticky rounded-3xl border border-rule bg-paper p-8 md:p-14 grid md:grid-cols-[1fr_auto] gap-8 items-start shadow-[0_1px_0_rgba(11,14,19,0.04)]"
            style={{ top: `${72 + i * 16}px` }}
          >
            <div>
              <div className="flex items-baseline gap-3 mb-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-ink">{tier.name}</h3>
                {tier.accent && tier.note && (
                  <span className="text-sm uppercase tracking-widest font-mono text-accent">
                    {tier.note}
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-2 mb-5">
                <span className="text-4xl md:text-5xl font-medium text-ink">{tier.price}</span>
                <span className="text-base text-slate2">{tier.cadence}</span>
              </div>
              <p className="text-base md:text-lg text-slate2 leading-relaxed max-w-prose">
                {tier.body}
              </p>
            </div>

            <a
              href="#"
              className={
                'shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-colors ' +
                (tier.accent
                  ? 'bg-accent text-white hover:bg-accentDeep'
                  : 'bg-ink text-paper hover:bg-accentDeep')
              }
            >
              {tier.cta}
              <span aria-hidden>→</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
