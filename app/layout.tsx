import type { Metadata } from 'next';
import './globals.css';
import { Footer } from './_components/Footer';
import { SmoothScroll } from './_components/SmoothScroll';
import { SiteHeader } from './_components/SiteHeader';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <SmoothScroll />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
