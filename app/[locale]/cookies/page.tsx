import { renderLegalPage, legalMetadata } from '../legal/_lib/render';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return legalMetadata('cookies', locale);
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return renderLegalPage('cookies', locale);
}
