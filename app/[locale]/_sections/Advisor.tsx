import { existsSync } from 'fs';
import { join } from 'path';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { SplitTextReveal } from '../_components/SplitTextReveal';

const ADVISOR_IMAGE_EXISTS = existsSync(join(process.cwd(), 'public', 'app-aiadvisor.jpg'));

export function Advisor() {
  const t = useTranslations('Advisor');

  return (
    <section className="border-t border-rule">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-40">
        <p className="font-mono text-base uppercase tracking-widest text-slate2 mb-8">
          {t('eyebrow')}
        </p>

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
              <p className="font-mono text-base uppercase tracking-widest text-slate2 mb-2">
                {t('youLabel')}
              </p>
              <p className="text-ink leading-relaxed">
                {t('question')}
              </p>
            </li>
            <li>
              <p className="font-mono text-base uppercase tracking-widest text-accent mb-2">
                {t('answerLabel')}
              </p>
              <p className="text-slate2 leading-relaxed">
                {t.rich('answer', {
                  strong: (chunks) => <span className="text-ink font-medium">{chunks}</span>,
                })}
              </p>
            </li>
          </ul>

          <div className="relative aspect-[9/19] max-h-[78vh] mx-auto w-full max-w-xs rounded-[2.5rem] border-[10px] border-ink bg-ink overflow-hidden shadow-[0_30px_60px_-20px_rgba(11,14,19,0.35)]">
            {ADVISOR_IMAGE_EXISTS ? (
              <Image
                src="/app-aiadvisor.jpg"
                alt={t('imageAlt')}
                fill
                sizes="(min-width: 768px) 320px, 80vw"
                className="phone-screen-img"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-center px-6 bg-paperDeep">
                <p className="font-mono text-base uppercase tracking-widest text-slate2">
                  {t.rich('missing', { br: () => <br /> })}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
