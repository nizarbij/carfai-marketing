import { existsSync } from 'fs';
import { join } from 'path';
import { useTranslations } from 'next-intl';
import { PhoneFrame } from '../_components/PhoneFrame';
import { Eyebrow } from '../_components/Eyebrow';
import { SectionIndex } from '../_components/SectionIndex';

const OBD2_IMAGE_EXISTS = existsSync(
  join(process.cwd(), 'public', 'app-obd2.jpg'),
);

/**
 * Section 4 — Maintenance & OBD2.
 *
 * Top-of-section eyebrow replaced by the numbered <SectionIndex>
 * system. The original tiny-uppercase-tracked label was risking the
 * "recurring kicker as section grammar" warning; the numbered system
 * earns the repetition by carrying variety (01 → 09) plus the scrub-in
 * hairline rule.
 */
export function Maintenance() {
  const t = useTranslations('Maintenance');

  const bullets = [
    { eyebrow: t('bullet1Eyebrow'), body: t('bullet1Body') },
    { eyebrow: t('bullet2Eyebrow'), body: t('bullet2Body') },
    { eyebrow: t('bullet3Eyebrow'), body: t('bullet3Body') },
  ];

  return (
    <section className="border-t border-rule bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-40">
        <SectionIndex number={4} label={t('eyebrow')} className="mb-12 md:mb-20" />
      <div className="grid md:grid-cols-[1fr_1fr] gap-12 md:gap-16 items-center">
        <PhoneFrame
          src={OBD2_IMAGE_EXISTS ? '/app-obd2.jpg' : undefined}
          alt={t('obd2Alt')}
          fallback={
            <p className="font-mono text-base uppercase tracking-widest text-slate2">
              {t.rich('missing', { br: () => <br /> })}
            </p>
          }
          className="max-h-[78vh] mx-auto w-full max-w-xs order-2 md:order-1"
        />

        <div className="order-1 md:order-2">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-ink leading-[1.1] max-w-xl">
            {t('h2')}
          </h2>

          <ul className="mt-10 space-y-8">
            {bullets.map((b) => (
              <li key={b.eyebrow}>
                <Eyebrow tone="accent" className="mb-2">{b.eyebrow}</Eyebrow>
                <p className="text-lg md:text-xl text-slate2 leading-relaxed max-w-prose">
                  {b.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
    </section>
  );
}
