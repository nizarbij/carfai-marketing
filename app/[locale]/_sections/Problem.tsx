import { useTranslations } from 'next-intl';

/**
 * Section 2 — Problem. Static motion (restraint after the hero reveal).
 */
export function Problem() {
  const t = useTranslations('Problem');

  return (
    <section className="border-y border-rule bg-paperDeep/60">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-20 items-start">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-ink leading-[1.1]">
          {t('h2Line1')}
          <span className="block text-slate2 mt-2">
            {t('h2Line2')}
          </span>
        </h2>

        <div className="md:pt-3">
          <p className="text-base md:text-lg text-slate2 leading-relaxed">
            {t.rich('body', {
              em: (chunks) => <em className="text-ink not-italic font-medium">{chunks}</em>,
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
