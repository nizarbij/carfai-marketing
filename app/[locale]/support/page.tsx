import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const CONTACT_EMAIL = 'carfai.info@gmail.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SupportPage' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: `/${locale}/support` },
  };
}

export default async function SupportPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SupportPageContent />;
}

function SupportPageContent() {
  const t = useTranslations('SupportPage');

  const sections = [
    {
      heading: t('section1Title'),
      items: [
        { q: t('faq11Q'), a: t('faq11A') },
        { q: t('faq12Q'), a: t('faq12A') },
        { q: t('faq13Q'), a: t('faq13A') },
        { q: t('faq14Q'), a: t('faq14A') },
      ],
    },
    {
      heading: t('section2Title'),
      items: [
        { q: t('faq21Q'), a: t('faq21A') },
        { q: t('faq22Q'), a: t('faq22A') },
        { q: t('faq23Q'), a: t('faq23A') },
      ],
    },
    {
      heading: t('section3Title'),
      items: [
        { q: t('faq31Q'), a: t('faq31A') },
        { q: t('faq32Q'), a: t('faq32A') },
        { q: t('faq33Q'), a: t('faq33A') },
      ],
    },
    {
      heading: t('section4Title'),
      items: [
        { q: t('faq41Q'), a: t('faq41A') },
        { q: t('faq42Q'), a: t('faq42A') },
        // last QA appends a Privacy Policy link inline
        { q: t('faq43Q'), a: t('faq43A'), trailingLink: true },
      ],
    },
  ];

  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-12 md:pt-28">
        <p className="font-mono text-sm md:text-base uppercase tracking-widest text-slate2 mb-6">
          {t('eyebrow')}
        </p>
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-ink leading-[1.05]">
          {t('h1Line1')}<br />
          {t('h1Line2')}
        </h1>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="rounded-3xl border border-rule bg-paper p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-slate2 mb-1">
              {t('bannerLabel')}
            </p>
            <p className="text-lg md:text-xl text-ink font-medium break-all">
              {CONTACT_EMAIL}
            </p>
          </div>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Support%20request`}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-white hover:bg-accentDeep transition-colors font-medium text-sm"
          >
            {t('bannerCta')}
          </a>
        </div>
        <p className="mt-3 text-xs text-slate2 leading-relaxed">
          {t('bannerNote')}
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24 md:pb-32 space-y-16">
        {sections.map((s) => (
          <div key={s.heading}>
            <h2 className="font-mono text-sm uppercase tracking-widest text-accent mb-6">
              {s.heading}
            </h2>
            <dl className="space-y-8">
              {s.items.map((qa, i) => (
                <div key={i}>
                  <dt className="text-lg md:text-xl font-medium text-ink mb-3 leading-snug">{qa.q}</dt>
                  <dd className="text-base md:text-lg text-slate2 leading-relaxed">
                    {qa.a}
                    {('trailingLink' in qa) && qa.trailingLink && (
                      <>
                        <Link href="/privacy" className="text-accent underline underline-offset-2 hover:no-underline">
                          {t('privacyShareLinkText')}
                        </Link>
                        .
                      </>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24 text-sm text-slate2 leading-relaxed border-t border-rule pt-10">
        <p>
          {t.rich('footnote', { strong: (chunks) => <strong className="text-ink">{chunks}</strong> })}
        </p>
      </section>
    </>
  );
}
