import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '../_components/Button';
import { Eyebrow } from '../_components/Eyebrow';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../_components/Accordion';

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
        <Eyebrow className="mb-6">{t('eyebrow')}</Eyebrow>
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-ink leading-[1.05] max-w-3xl">{t('h1')}</h1>
        <p className="mt-6 text-lg md:text-xl text-slate2 max-w-prose leading-relaxed">{t('intro')}</p>
        {/* Footnote: USD / localization disclosure. Set apart from
            marketing copy as an informational aside — small italic,
            asterisk in accent teal as the marker. */}
        <p className="mt-4 text-sm text-slate2/80 italic max-w-prose">
          <span aria-hidden className="text-accent not-italic me-1">*</span>
          {t('priceNote')}
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        {/* Polish pass H2: break the 5-identical-card grid by giving the
            recommended tier its own row. Featured tier full-width with
            accentMist wash, taller padding, larger typography. The other
            4 tiers split into a 4-column row underneath. Reads as
            two layouts deliberately composed, not five identical bricks. */}
        {(() => {
          const featured = tiers.find((tier) => tier.accent);
          const rest = tiers.filter((tier) => !tier.accent);
          return (
            <>
              {featured && (
                <article className="rounded-3xl border border-accent/30 bg-accentMist/40 p-8 md:p-12 mb-4 grid md:grid-cols-[2fr_3fr_auto] gap-6 md:gap-10 items-center">
                  <div>
                    {featured.note && (
                      <p className="font-mono text-xs md:text-sm uppercase tracking-widest text-accentDeep mb-3">
                        {featured.note}
                      </p>
                    )}
                    <h2 className="text-3xl md:text-4xl font-semibold text-ink mb-3">{featured.name}</h2>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl md:text-6xl font-medium text-ink">{featured.price}</span>
                      <span className="text-base text-slate2">{featured.cadence}</span>
                    </div>
                  </div>
                  <p className="text-base md:text-lg text-slate2 leading-relaxed">{featured.summary}</p>
                  <Button href="#" variant="accent" size="lg" className="shrink-0">{featured.cta}</Button>
                </article>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {rest.map((tier) => (
                  <article
                    key={tier.key}
                    className="rounded-3xl border border-rule bg-paper p-6 flex flex-col"
                  >
                    <h2 className="text-xl font-semibold text-ink mb-3">{tier.name}</h2>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-3xl font-medium text-ink">{tier.price}</span>
                      <span className="text-sm text-slate2">{tier.cadence}</span>
                    </div>
                    <p className="text-sm text-slate2 leading-relaxed flex-1 mb-6">{tier.summary}</p>
                    <Button
                      href="#"
                      variant="ink"
                      className="!px-4 !py-2.5 !text-sm justify-center"
                    >
                      {tier.cta}
                    </Button>
                  </article>
                ))}
              </div>

              {/* One-time alternative — separate card below the subscription grid.
                  Same content as the homepage callout; this is the page-local copy. */}
              <article className="mt-6 rounded-3xl border border-rule bg-paperDeep p-8 md:p-10 grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-center">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-slate2 mb-3">
                    {ts('bundleEyebrow')}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-semibold text-ink mb-3">
                    {ts('bundleName')}
                  </h2>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-5xl font-medium text-ink">{ts('bundlePrice')}</span>
                    <span className="text-base text-slate2">{ts('bundleCadence')}</span>
                  </div>
                </div>
                <p className="text-base md:text-lg text-slate2 leading-relaxed">
                  {ts('bundleBody')}
                </p>
                <Button href="#" variant="ink" size="md" className="shrink-0">
                  {ts('bundleCta')}
                </Button>
              </article>
            </>
          );
        })()}
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
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-ink mb-10 md:mb-12">{t('faqHeading')}</h2>

        <Accordion type="single" collapsible className="border-b border-rule">
          {faq.map((qa, i) => (
            <AccordionItem key={qa.q} value={`q${i}`}>
              <AccordionTrigger>{qa.q}</AccordionTrigger>
              <AccordionContent>{qa.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

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
