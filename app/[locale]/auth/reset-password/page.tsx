/**
 * /[locale]/auth/reset-password — Universal Link landing page.
 *
 * Two audiences:
 *
 *  1. Mobile user with the CarFai app installed: iOS / Android intercept
 *     the URL before this page renders and route to the app directly.
 *     This page never actually loads for them.
 *
 *  2. Anyone else (desktop browser, mobile without the app installed,
 *     or a webview that doesn't honor the AssociatedDomains entitlement):
 *     this page is what they see. It tells them they need the app to
 *     complete the reset, with download links.
 *
 *  The page lives inside the [locale] tree because the site uses
 *  localePrefix: 'always' — root-level routes 404. apple-app-site-
 *  association enumerates /{en,fr,es,ar}/auth/* to match.
 */

import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Reset password — CarFai',
    description: 'Complete your CarFai password reset in the app.',
    robots: { index: false, follow: false },
    alternates: { canonical: `/${locale}/auth/reset-password` },
  };
}

export default async function ResetPasswordLanding({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'AuthResetPassword' });

  return (
    <main className="mx-auto max-w-xl px-6 py-16 text-center">
      <h1 className="mb-4 text-2xl font-bold text-ink">{t('title')}</h1>

      <p className="mb-8 text-slate2">{t('intro')}</p>

      <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href="https://apps.apple.com/app/idXXXXXXX"
          className="inline-block rounded-lg bg-ink px-6 py-3 font-semibold text-white"
        >
          {t('appStoreBtn')}
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=com.carfai.app"
          className="inline-block rounded-lg bg-ink px-6 py-3 font-semibold text-white"
        >
          {t('googlePlayBtn')}
        </a>
      </div>

      <p className="text-sm text-slate2/70">{t('hint')}</p>
    </main>
  );
}
