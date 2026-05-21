import { existsSync } from 'fs';
import { join } from 'path';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const OBD2_IMAGE_EXISTS = existsSync(
  join(process.cwd(), 'public', 'app-obd2.jpg'),
);

export function Maintenance() {
  const t = useTranslations('Maintenance');

  const bullets = [
    { eyebrow: t('bullet1Eyebrow'), body: t('bullet1Body') },
    { eyebrow: t('bullet2Eyebrow'), body: t('bullet2Body') },
    { eyebrow: t('bullet3Eyebrow'), body: t('bullet3Body') },
  ];

  return (
    <section className="border-t border-rule bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-40 grid md:grid-cols-[1fr_1fr] gap-12 md:gap-16 items-center">
        <div className="relative aspect-[9/19] max-h-[78vh] mx-auto w-full max-w-xs rounded-[2.5rem] border-[10px] border-ink bg-ink overflow-hidden shadow-[0_30px_60px_-20px_rgba(11,14,19,0.35)] order-2 md:order-1">
          {OBD2_IMAGE_EXISTS ? (
            <Image
              src="/app-obd2.jpg"
              alt={t('obd2Alt')}
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

        <div className="order-1 md:order-2">
          <p className="font-mono text-base uppercase tracking-widest text-slate2 mb-6">
            {t('eyebrow')}
          </p>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-ink leading-[1.1] max-w-xl">
            {t('h2')}
          </h2>

          <ul className="mt-10 space-y-8">
            {bullets.map((b) => (
              <li key={b.eyebrow}>
                <p className="font-mono text-base uppercase tracking-widest text-accent mb-2">
                  {b.eyebrow}
                </p>
                <p className="text-lg md:text-xl text-slate2 leading-relaxed max-w-prose">
                  {b.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
