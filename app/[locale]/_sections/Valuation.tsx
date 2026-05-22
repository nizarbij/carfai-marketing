import { useTranslations } from 'next-intl';
import { SplitTextReveal } from '../_components/SplitTextReveal';
import { PhoneFrame } from '../_components/PhoneFrame';
import { Eyebrow } from '../_components/Eyebrow';
import { SectionIndex } from '../_components/SectionIndex';

export function Valuation() {
  const t = useTranslations('Valuation');

  const factors = [
    { label: t('factor1'), delta: t('factor1Delta') },
    { label: t('factor2'), delta: t('factor2Delta') },
    { label: t('factor3'), delta: t('factor3Delta') },
    { label: t('factor4'), delta: t('factor4Delta') },
  ];

  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-40">
        <SectionIndex number={5} label={t('eyebrow')} surface="dark" className="mb-10 md:mb-16" />
      <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-center">
        <div>

          <SplitTextReveal
            as="h2"
            className="text-3xl md:text-5xl font-medium tracking-tight max-w-xl leading-[1.1]"
          >
            {t('h2')}
          </SplitTextReveal>

          <p className="mt-6 md:mt-8 text-base md:text-xl text-paper/70 max-w-prose leading-relaxed">
            {t('body')}
          </p>

          <div className="mt-8 md:mt-12 flex flex-wrap items-baseline gap-x-4 gap-y-2 px-5 py-4 md:px-6 md:py-5 border border-paper/15 rounded-2xl bg-paper/[0.03] w-fit max-w-full">
            <span className="font-mono text-xs md:text-base uppercase tracking-widest text-paper/50">
              {t('statLabel')}
            </span>
            <span className="font-mono text-2xl md:text-4xl font-medium text-accent">
              {t('statValue')}
            </span>
            <span className="text-xs text-paper/40 w-full md:w-auto">
              {t('statBand')}
            </span>
          </div>

          <ul className="mt-6 md:mt-8 flex flex-wrap gap-2 max-w-md">
            {factors.map((f) => (
              <li
                key={f.label}
                className="font-mono text-xs px-3 py-1.5 border border-paper/15 rounded-full text-paper/80"
              >
                <span className="text-paper">{f.label}</span>{' '}
                <span className="text-paper/40">{f.delta}</span>
              </li>
            ))}
          </ul>
        </div>

        <PhoneFrame
          surface="dark"
          src="/app-valuation.jpg"
          alt={t('imageAlt')}
          className="max-h-[70vh] md:max-h-[78vh] mx-auto w-full max-w-[260px] md:max-w-xs"
        />
      </div>
      </div>
    </section>
  );
}
