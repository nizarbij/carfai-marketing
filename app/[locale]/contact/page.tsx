import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

const CONTACT_EMAIL = 'carfai.info@gmail.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ContactPage' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: `/${locale}/contact` },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactPageContent />;
}

function ContactPageContent() {
  const t = useTranslations('ContactPage');

  const reasons = [
    { key: 1, eyebrow: t('reason1Eyebrow'), title: t('reason1Title'), body: t('reason1Body'), cta: t('reason1Cta'), href: `mailto:${CONTACT_EMAIL}` },
    { key: 2, eyebrow: t('reason2Eyebrow'), title: t('reason2Title'), body: t('reason2Body'), cta: t('reason2Cta'), href: `mailto:${CONTACT_EMAIL}?subject=Support%20request` },
    { key: 3, eyebrow: t('reason3Eyebrow'), title: t('reason3Title'), body: t('reason3Body'), cta: t('reason3Cta'), href: `mailto:${CONTACT_EMAIL}?subject=Business%20enquiry` },
  ];

  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-12 md:pt-28">
        <p className="font-mono text-sm md:text-base uppercase tracking-widest text-slate2 mb-6">
          {t('eyebrow')}
        </p>
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-ink leading-[1.05]">
          {t('h1')}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-slate2 leading-relaxed">
          {t('intro')}
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="block rounded-3xl border border-rule bg-paper hover:bg-paperDeep transition-colors px-8 py-10 text-center"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-slate2 mb-3">
            {t('directEmailLabel')}
          </p>
          <p className="text-2xl md:text-3xl font-medium text-accent break-all">
            {CONTACT_EMAIL}
          </p>
          <p className="mt-4 text-sm text-slate2">
            {t('directEmailHint')}
          </p>
        </a>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24 md:pb-32 space-y-6">
        {reasons.map((r) => (
          <article key={r.key} className="rounded-3xl border border-rule bg-paperDeep/40 p-6 md:p-10">
            <p className="font-mono text-xs md:text-sm uppercase tracking-widest text-accent mb-3">{r.eyebrow}</p>
            <h2 className="text-xl md:text-2xl font-medium tracking-tight text-ink leading-snug mb-3">{r.title}</h2>
            <p className="text-base md:text-lg text-slate2 leading-relaxed max-w-prose mb-6">{r.body}</p>
            <a href={r.href} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-ink text-paper hover:bg-accentDeep transition-colors font-medium text-sm">
              {r.cta}
              <span aria-hidden className="arrow-rtl-flip">→</span>
            </a>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24 text-sm text-slate2 leading-relaxed">
        <p>{t('footnote')}</p>
      </section>
    </>
  );
}
