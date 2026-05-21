import { existsSync } from 'fs';
import { join } from 'path';
import { useTranslations } from 'next-intl';
import { SplitTextReveal } from '../_components/SplitTextReveal';
import { PhoneFrame } from '../_components/PhoneFrame';
import { Eyebrow } from '../_components/Eyebrow';
import { SectionIndex } from '../_components/SectionIndex';

const ADVISOR_IMAGE_EXISTS = existsSync(join(process.cwd(), 'public', 'app-aiadvisor.jpg'));

export function Advisor() {
  const t = useTranslations('Advisor');

  return (
    <section className="border-t border-rule">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-40">
        <SectionIndex number={6} label={t('eyebrow')} className="mb-10 md:mb-14" />

        <SplitTextReveal
          as="h2"
          className="text-4xl md:text-6xl font-medium tracking-tight text-ink max-w-3xl leading-[1.05]"
        >
          {t('h2')}
        </SplitTextReveal>

        <p className="mt-8 text-lg md:text-xl text-slate2 max-w-prose leading-relaxed">
          {t('body')}
        </p>

        <div className="mt-16 grid md:grid-cols-2 gap-12 items-start">
          <ul className="space-y-8 text-base md:text-lg">
            <li>
              <Eyebrow className="mb-2">{t('youLabel')}</Eyebrow>
              <p className="text-ink leading-relaxed">
                {t('question')}
              </p>
            </li>
            <li>
              <Eyebrow tone="accent" className="mb-2">{t('answerLabel')}</Eyebrow>
              <p className="text-slate2 leading-relaxed">
                {t.rich('answer', {
                  strong: (chunks) => <span className="text-ink font-medium">{chunks}</span>,
                })}
              </p>
            </li>
          </ul>

          <PhoneFrame
            src={ADVISOR_IMAGE_EXISTS ? '/app-aiadvisor.jpg' : undefined}
            alt={t('imageAlt')}
            fallback={
              <p className="font-mono text-base uppercase tracking-widest text-slate2">
                {t.rich('missing', { br: () => <br /> })}
              </p>
            }
            className="max-h-[78vh] mx-auto w-full max-w-xs"
          />
        </div>
      </div>
    </section>
  );
}
