/**
 * /[locale]/account-deletion — Play 2024 hard-requirement landing page.
 *
 * Google Play (since 2024) requires every app that supports user accounts
 * to publish a publicly-reachable URL that:
 *   1. Is accessible without logging in
 *   2. Explains how a user initiates account deletion
 *   3. Tells the user what data gets deleted vs retained
 *   4. Provides an alternative path for users who can't access the app
 *
 * This page is what the Data Safety form in Play Console points at.
 * Without it, Play submission auto-rejects on Data Safety review.
 *
 * Lives inside [locale]/ because the site uses localePrefix:'always';
 * root-level routes 404.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale, getTranslations } from 'next-intl/server';

const SUPPORT_EMAIL = 'carfai.info@gmail.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Delete your CarFai account',
    description: 'How to permanently delete your CarFai account and what happens to your data.',
    robots: { index: true, follow: true },
    alternates: { canonical: `/${locale}/account-deletion` },
  };
}

export default async function AccountDeletionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'AccountDeletion' });

  return (
    <main className="mx-auto max-w-2xl px-6 py-12 text-ink">
      <h1 className="mb-4 text-3xl font-bold">{t('title')}</h1>
      <p className="mb-8 text-slate2">{t('intro')}</p>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">{t('inAppTitle')}</h2>
        <ol className="ml-5 list-decimal space-y-2 text-slate2">
          <li>{t('inAppStep1')}</li>
          <li>{t('inAppStep2')}</li>
          <li>{t('inAppStep3')}</li>
        </ol>
        <p className="mt-3 text-sm text-slate2/70">{t('inAppNote')}</p>
      </section>

      <section className="mb-10 rounded-xl border border-ink/10 bg-paper p-6">
        <h2 className="mb-3 text-xl font-semibold">{t('emailTitle')}</h2>
        <p className="mb-4 text-slate2">{t('emailIntro')}</p>
        <a
          href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(t('emailSubject'))}&body=${encodeURIComponent(t('emailBodyTemplate'))}`}
          className="inline-block rounded-lg bg-ink px-5 py-3 font-semibold text-white"
        >
          {t('emailButton')}
        </a>
        <p className="mt-3 text-sm text-slate2/70">{t('emailSla')}</p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">{t('whatGetsDeletedTitle')}</h2>
        <ul className="ml-5 list-disc space-y-2 text-slate2">
          <li>{t('deletedItem1')}</li>
          <li>{t('deletedItem2')}</li>
          <li>{t('deletedItem3')}</li>
          <li>{t('deletedItem4')}</li>
          <li>{t('deletedItem5')}</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">{t('whatGetsRetainedTitle')}</h2>
        <p className="mb-3 text-slate2">{t('retainedIntro')}</p>
        <ul className="ml-5 list-disc space-y-2 text-slate2">
          <li>{t('retainedItem1')}</li>
          <li>{t('retainedItem2')}</li>
          <li>{t('retainedItem3')}</li>
        </ul>
        <p className="mt-3 text-sm text-slate2/70">{t('retainedNote')}</p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">{t('timingTitle')}</h2>
        <p className="text-slate2">{t('timingBody')}</p>
      </section>

      <section className="mb-10 border-t border-ink/10 pt-6">
        <p className="text-sm text-slate2/70">
          {t('relatedDocsLabel')}{' '}
          <Link href={`/${locale}/privacy`} className="text-accent underline">
            {t('relatedPrivacy')}
          </Link>
          {' · '}
          <Link href={`/${locale}/terms`} className="text-accent underline">
            {t('relatedTerms')}
          </Link>
        </p>
      </section>
    </main>
  );
}
