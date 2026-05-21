import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import './globals.css';
import { Footer } from './_components/Footer';
import { SmoothScroll } from './_components/SmoothScroll';
import { SiteHeader } from './_components/SiteHeader';
import { routing, RTL_LOCALES, type Locale } from '../../i18n/routing';

export const metadata: Metadata = {
  title: {
    default: 'CarFai — AI-assisted vehicle ownership',
    template: '%s — CarFai',
  },
  description:
    'Cost tracking, OBD2 diagnostics, document scanning, valuation, and an AI advisor that answers questions about your car using your own history — not generic advice.',
  metadataBase: new URL('https://carfai.app'),
  openGraph: {
    title: 'CarFai',
    description:
      'AI-assisted vehicle ownership — cost tracking, OBD2, document scanning, an advisor that knows your car.',
    url: 'https://carfai.app',
    siteName: 'CarFai',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Pre-render all 4 locales statically at build time.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Enables static rendering for this locale segment.
  setRequestLocale(locale);

  const dir = RTL_LOCALES.includes(locale as Locale) ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider>
          <SmoothScroll />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
