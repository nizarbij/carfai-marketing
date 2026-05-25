import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Eyebrow } from '../_components/Eyebrow';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PressPage' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: `/${locale}/press` },
  };
}

export default async function PressPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PressPageContent />;
}

/**
 * Six Play Store preview screenshots shipped to Google Play, served
 * as-is for press / reviews. Honest meta-use of the assets generated
 * by scripts/gen-store-screenshots.mjs — the store and the press kit
 * see the same shots, no separate brand-asset stack to maintain.
 */
const PREVIEWS = [
  { src: '/press/carfai-android-01-hero.png',     captionKey: 'captionHero'     as const },
  { src: '/press/carfai-android-02-capture.png',  captionKey: 'captionCapture'  as const },
  { src: '/press/carfai-android-03-advisor.png',  captionKey: 'captionAdvisor'  as const },
  { src: '/press/carfai-android-04-fleet.png',    captionKey: 'captionFleet'    as const },
  { src: '/press/carfai-android-05-obd2.png',     captionKey: 'captionObd2'     as const },
  { src: '/press/carfai-android-06-spending.png', captionKey: 'captionSpending' as const },
];

function PressPageContent() {
  const t = useTranslations('PressPage');

  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-12 md:pt-28">
        <Eyebrow className="mb-6">{t('eyebrow')}</Eyebrow>
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-ink leading-[1.05]">
          {t('h1')}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-slate2 leading-relaxed">
          {t('intro')}
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 md:pb-32">
        <div className="mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-ink mb-3">
            {t('sectionTitle')}
          </h2>
          <p className="text-base md:text-lg text-slate2 max-w-prose leading-relaxed">
            {t('sectionIntro')}
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PREVIEWS.map((preview) => (
            <li
              key={preview.src}
              className="rounded-3xl border border-rule bg-paperDeep/30 p-4 md:p-5 flex flex-col"
            >
              <div className="relative block aspect-[9/16] rounded-2xl overflow-hidden bg-paper border border-rule">
                <Image
                  src={preview.src}
                  alt={t(preview.captionKey)}
                  fill
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 92vw"
                  className="object-contain"
                />
              </div>

              <p className="mt-4 text-sm md:text-base text-ink leading-snug">
                {t(preview.captionKey)}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-12 md:mt-16 text-sm text-slate2 italic">
          <span aria-hidden className="text-accent not-italic me-1">*</span>
          {t('contactCta')}
        </p>
      </section>
    </>
  );
}
