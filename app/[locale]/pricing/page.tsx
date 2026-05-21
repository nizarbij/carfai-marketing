import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const CONTACT_EMAIL = 'carfai.info@gmail.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PricingPage' });
  return { title: t('metaTitle'), description: t('metaDescription') };
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PricingPageContent />;
}

type Cell = string | boolean;

function Check() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent/15 text-accent" aria-hidden>✓</span>
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

function PricingPageContent() {
  const t  = useTranslations('PricingPage');
  const ts = useTranslations('PricingSection');

  const tiers = [
    { key: 1, name: ts('tier1Name'), price: ts('tier1Price'), cadence: ts('tier1Cadence'), summary: ts('tier1Body'), cta: ts('tier1Cta'), accent: false, note: null },
    { key: 2, name: ts('tier2Name'), price: ts('tier2Price'), cadence: ts('tier2Cadence'), summary: ts('tier2Body'), cta: ts('tier2Cta'), accent: false, note: null },
    { key: 3, name: ts('tier3Name'), price: ts('tier3Price'), cadence: ts('tier3Cadence'), summary: ts('tier3Body'), cta: ts('tier3Cta'), accent: true,  note: t('recommended') },
    { key: 4, name: ts('tier4Name'), price: ts('tier4Price'), cadence: ts('tier4Cadence'), summary: ts('tier4Body'), cta: ts('tier4Cta'), accent: false, note: null },
    { key: 5, name: ts('tier5Name'), price: ts('tier5Price'), cadence: ts('tier5Cadence'), summary: ts('tier5Body'), cta: ts('tier5Cta'), accent: false, note: null },
  ];

  const sections: { heading: string; rows: { feature: string; values: [Cell, Cell, Cell, Cell, Cell] }[] }[] = [
    {
      heading: t('section1Title'),
      rows: [
        { feature: t('featureVehicles'),       values: ['1', '3', '5', '50', '200'] },
        { feature: t('featureScanning'),       values: [true, true, true, true, true] },
        { feature: t('featureCategorization'), values: [true, true, true, true, true] },
        { feature: t('featureExpiry'),         values: [true, true, true, true, true] },
        { feature: t('featureExports'),        values: [false, true, true, true, true] },
      ],
    },
    {
      heading: t('section2Title'),
      rows: [
        { feature: t('featureAskAnything'),     values: [false, false, true, true, true] },
        { feature: t('featureDetailedAnalysis'),values: [false, false, true, true, true] },
        { feature: t('featureValuation'),       values: [false, false, true, true, true] },
        { feature: t('featureObd2'),            values: [false, false, true, true, true] },
        { feature: t('featureMultiVehicle'),    values: [false, false, false, t('multi10'), t('multi10')] },
        { feature: t('featureMonthlyTokens'),   values: ['100K', '450K', '1.2M', '3M', '9M'] },
        { feature: t('featureRollover'),        values: [false, true, true, true, true] },
      ],
    },
    {
      heading: t('section3Title'),
      rows: [
        { feature: t('featureOrgAccounts'),       values: [false, false, false, true, true] },
        { feature: t('featureRoles'),             values: [false, false, false, true, true] },
        { feature: t('featureAssignments'),       values: [false, false, false, true, true] },
        { feature: t('featureLeaderboards'),      values: [false, false, false, true, true] },
        { feature: t('featureAccountantExports'), values: [false, false, false, true, true] },
      ],
    },
    {
      heading: t('section4Title'),
      rows: [
        { feature: t('featureEmail'),      values: [true, true, true, true, true] },
        { feature: t('featurePriority'),   values: [false, false, true, true, true] },
        { feature: t('featureOnboarding'), values: [false, false, false, true, true] },
      ],
    },
  ];

  const faq = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') },
    { q: t('faq5Q'), a: t('faq5A') },
    { q: t('faq6Q'), a: t('faq6A') },
  ];

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-12 md:pt-28">
        <p className="font-mono text-sm uppercase tracking-widest text-slate2 mb-6">{t('eyebrow')}</p>
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-ink leading-[1.05] max-w-3xl">{t('h1')}</h1>
        <p className="mt-6 text-lg md:text-xl text-slate2 max-w-prose leading-relaxed">{t('intro')}</p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {tiers.map((tier) => (
            <article
              key={tier.key}
              className={
                'rounded-3xl border p-6 flex flex-col bg-paper ' +
                (tier.accent
                  ? 'border-accent/40 shadow-[0_8px_30px_-15px_rgba(8,155,195,0.4)]'
                  : 'border-rule')
              }
            >
              <div className="flex items-baseline justify-between mb-3">
                <h2 className="text-xl font-semibold text-ink">{tier.name}</h2>
                {tier.accent && tier.note && (
                  <span className="text-[10px] uppercase tracking-widest font-mono text-accent">
                    {tier.note}
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-medium text-ink">{tier.price}</span>
                <span className="text-sm text-slate2">{tier.cadence}</span>
              </div>
              <p className="text-sm text-slate2 leading-relaxed flex-1 mb-6">{tier.summary}</p>
              <a
                href="#"
                className={
                  'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-medium text-sm transition-colors ' +
                  (tier.accent
                    ? 'bg-accent text-white hover:bg-accentDeep'
                    : 'bg-ink text-paper hover:bg-accentDeep')
                }
              >
                {tier.cta} →
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-paperDeep/60 border-y border-rule">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-ink mb-3">{t('comparisonHeading')}</h2>
          <p className="text-base md:text-lg text-slate2 max-w-prose mb-12">{t('comparisonIntro')}</p>

          {sections.map((section) => (
            <div key={section.heading} className="mb-12">
              <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-4">{section.heading}</h3>
              <div className="overflow-x-auto rounded-2xl border border-rule bg-paper">
                <table className="w-full text-sm">
                  <thead className="bg-paperDeep/60">
                    <tr>
                      <th className="text-left px-5 py-3 font-semibold text-ink">{t('tableHeaderFeature')}</th>
                      {tiers.map((tier) => (
                        <th key={tier.key} className={'px-3 py-3 text-center font-semibold ' + (tier.accent ? 'text-accent' : 'text-ink')}>
                          {tier.name}
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

      <section className="mx-auto max-w-3xl px-6 py-24 md:py-32">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-ink mb-12">{t('faqHeading')}</h2>
        <dl className="space-y-10">
          {faq.map((qa) => (
            <div key={qa.q}>
              <dt className="text-lg md:text-xl font-medium text-ink mb-3 leading-snug">{qa.q}</dt>
              <dd className="text-base md:text-lg text-slate2 leading-relaxed">{qa.a}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 pt-10 border-t border-rule text-sm text-slate2">
          {t('faqStillQuestions')}{' '}
          <Link href="/support" className="text-accent underline underline-offset-2 hover:no-underline">
            {t('faqContactSupport')}
          </Link>
          {' '}{t('faqOr')}{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline underline-offset-2 hover:no-underline">
            {CONTACT_EMAIL}
          </a>.
        </div>
      </section>
    </>
  );
}
