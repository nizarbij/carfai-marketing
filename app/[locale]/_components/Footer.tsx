import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LEGAL_PAGES, type LegalPage } from '../legal/_data/pages';

export function Footer() {
  const t  = useTranslations('Footer');
  const tl = useTranslations('LegalPages');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule mt-24">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link href="/" aria-label="CarFai" className="inline-flex items-center">
              <Image
                src="/logo.png"
                alt="CarFai"
                width={420}
                height={96}
                className="h-14 md:h-16 w-auto"
              />
            </Link>
            <p className="mt-5 text-sm text-slate2 max-w-prose">
              {t.rich('brandLine', {
                strong: (chunks) => <strong className="text-ink font-medium">{chunks}</strong>,
              })}
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate2 mb-3">
              {t('productHeading')}
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/"        className="hover:text-accent">{t('navHome')}</Link></li>
              <li><Link href="/pricing" className="hover:text-accent">{t('navPricing')}</Link></li>
              <li><Link href="/support" className="hover:text-accent">{t('navSupport')}</Link></li>
              <li><Link href="/contact" className="hover:text-accent">{t('navContact')}</Link></li>
              <li><Link href="/press"   className="hover:text-accent">{t('navPress')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate2 mb-3">
              {t('legalHeading')}
            </h4>
            <ul className="space-y-2 text-sm">
              {LEGAL_PAGES.map((p: LegalPage) => (
                <li key={p.slug}>
                  <Link href={`/${p.slug}`} className="hover:text-accent">
                    {tl(p.slug as 'privacy' | 'terms' | 'eula' | 'ai-disclosure' | 'cookies' | 'dpa' | 'aup')}
                  </Link>
                </li>
              ))}
              {/* Account deletion — standalone page, not a renderLegalPage
                  markdown route, so it lives outside LEGAL_PAGES. Surface
                  here for crawler reachability + UX symmetry with Privacy /
                  Terms (Play 2024 Data Safety crawler may follow this). */}
              <li>
                <Link href="/account-deletion" className="hover:text-accent">
                  {t('navAccountDeletion')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-rule text-xs text-slate2 flex flex-wrap gap-x-6 gap-y-2">
          <span>{t('copyright', { year })}</span>
          <a href="mailto:carfai.info@gmail.com" className="hover:text-accent">
            carfai.info@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
